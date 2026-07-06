import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { resend, FROM_EMAIL, BRAND_NAME } from '@/lib/resend/client';
import { orderConfirmationEmail } from '@/lib/resend/templates';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { address, items, notes, coupon_code, email } = body;

    const supabase = createAdminClient();

    // Calculate totals
    const subtotal = items.reduce((s: number, i: any) => s + i.price * i.quantity, 0);
    const gstAmount = items.reduce((s: number, i: any) => {
      const gstMultiplier = i.gst_rate / (100 + i.gst_rate);
      return s + i.price * i.quantity * gstMultiplier;
    }, 0);
    const shipping = subtotal > 499 ? 0 : 49;
    const total = subtotal + shipping;

    // Create order
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        shipping_name:     address.full_name,
        shipping_phone:    address.phone,
        shipping_address1: address.address_line1,
        shipping_address2: address.address_line2 || null,
        shipping_city:     address.city,
        shipping_state:    address.state,
        shipping_pincode:  address.pincode,
        subtotal,
        gst_amount:      gstAmount,
        shipping_charge: shipping,
        total_amount:    total,
        status:          'confirmed',
        payment_method:  'cod',
        payment_status:  'pending',
        notes:           notes || null,
        coupon_code:     coupon_code || null,
      })
      .select()
      .single();

    if (error) throw error;

    // Create order items
    await supabase.from('order_items').insert(
      items.map((item: any) => ({
        order_id:     order.id,
        product_id:   item.product_id,
        variant_id:   item.variant_id || null,
        product_name: item.name,
        variant_name: item.variant_name || null,
        image_url:    item.image_url || null,
        quantity:     item.quantity,
        unit_price:   item.price,
        gst_rate:     item.gst_rate,
        total_price:  item.price * item.quantity,
      }))
    );

    // Send confirmation email
    if (email) {
      await resend.emails.send({
        from:    `${BRAND_NAME} <${FROM_EMAIL}>`,
        to:      email,
        subject: `Order Confirmed (COD) — ${order.order_number} | ${BRAND_NAME}`,
        html:    orderConfirmationEmail({ ...order, items }, address.full_name),
      });
    }

    return NextResponse.json({ success: true, order_number: order.order_number });
  } catch (error: any) {
    console.error('COD order error:', error);
    return NextResponse.json({ error: error.message || 'Order creation failed' }, { status: 500 });
  }
}
