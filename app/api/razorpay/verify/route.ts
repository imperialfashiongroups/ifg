import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase/server';
import { resend, FROM_EMAIL, BRAND_NAME } from '@/lib/resend/client';
import { orderConfirmationEmail } from '@/lib/resend/templates';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
      items,
    } = body;

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Calculate totals
    const subtotal = items.reduce((s: number, i: any) => s + i.price * i.quantity, 0);
    const gstAmount = items.reduce((s: number, i: any) => {
      const gstMultiplier = i.gst_rate / (100 + i.gst_rate);
      return s + i.price * i.quantity * gstMultiplier;
    }, 0);
    const shipping = subtotal > 499 ? 0 : 49;
    const total = subtotal + shipping;

    // Create order in DB
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        shipping_name:     orderData.address.full_name,
        shipping_phone:    orderData.address.phone,
        shipping_address1: orderData.address.address_line1,
        shipping_address2: orderData.address.address_line2 || null,
        shipping_city:     orderData.address.city,
        shipping_state:    orderData.address.state,
        shipping_pincode:  orderData.address.pincode,
        subtotal,
        gst_amount:   gstAmount,
        shipping_charge: shipping,
        total_amount: total,
        status:           'confirmed',
        payment_method:   'razorpay',
        payment_status:   'paid',
        notes:            orderData.notes || null,
        coupon_code:      orderData.coupon_code || null,
      })
      .select()
      .single();

    if (orderError) throw orderError;

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

    // Record payment
    await supabase.from('payments').insert({
      order_id:           order.id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount:             total,
      currency:           'INR',
      status:             'paid',
    });

    // Send confirmation email
    if (orderData.email) {
      await resend.emails.send({
        from:    `${BRAND_NAME} <${FROM_EMAIL}>`,
        to:      orderData.email,
        subject: `Order Confirmed — ${order.order_number} | ${BRAND_NAME}`,
        html:    orderConfirmationEmail({ ...order, items }, orderData.address.full_name),
      });
    }

    return NextResponse.json({ success: true, order_number: order.order_number });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: error.message || 'Verification failed' }, { status: 500 });
  }
}
