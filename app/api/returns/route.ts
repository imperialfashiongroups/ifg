import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { resend, FROM_EMAIL, BRAND_NAME } from '@/lib/resend/client';
import { returnRequestEmail } from '@/lib/resend/templates';

// POST: Create return request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order_id, user_id, reason, description, email, customer_name, order_number } = body;

    // Validate: order must be delivered and within 7 days
    const supabase = createAdminClient();
    const { data: order } = await supabase
      .from('orders')
      .select('status, created_at, user_id')
      .eq('id', order_id)
      .single();

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    if (order.user_id !== user_id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    if (order.status !== 'delivered') {
      return NextResponse.json({ error: 'Order must be delivered to request a return' }, { status: 400 });
    }

    // Check 7-day window
    const deliveredAt = new Date(order.created_at);
    const now = new Date();
    const diffDays = (now.getTime() - deliveredAt.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays > 7) {
      return NextResponse.json({ error: 'Return window of 7 days has passed' }, { status: 400 });
    }

    // Create return request
    const { data: returnReq, error } = await supabase
      .from('return_requests')
      .insert({ order_id, user_id, reason, description })
      .select()
      .single();

    if (error) throw error;

    // Update order status
    await supabase
      .from('orders')
      .update({ status: 'return_requested' })
      .eq('id', order_id);

    // Send email notification
    if (email) {
      await resend.emails.send({
        from:    `${BRAND_NAME} <${FROM_EMAIL}>`,
        to:      email,
        subject: `Return Request Received — ${order_number} | ${BRAND_NAME}`,
        html:    returnRequestEmail(order_number, customer_name, reason),
      });
    }

    return NextResponse.json({ success: true, return_id: returnReq.id });
  } catch (error: any) {
    console.error('Return request error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Fetch user's return requests
export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get('user_id');
  if (!user_id) return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('return_requests')
    .select('*, order:orders(order_number, total_amount)')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
