import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase/server';
import { resend, FROM_EMAIL, BRAND_NAME } from '@/lib/resend/client';
import { orderShippedEmail, orderDeliveredEmail } from '@/lib/resend/templates';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);
    const supabase = createAdminClient();

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      await supabase
        .from('payments')
        .update({ status: 'paid', method: payment.method })
        .eq('razorpay_payment_id', payment.id);
    }

    if (event.event === 'payment.failed') {
      const payment = event.payload.payment.entity;
      await supabase
        .from('payments')
        .update({
          status:            'failed',
          error_code:        payment.error_code,
          error_description: payment.error_description,
        })
        .eq('razorpay_payment_id', payment.id);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
