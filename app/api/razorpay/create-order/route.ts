import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID     || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    if (!amount || typeof amount !== 'number') {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const amountInPaise = Math.round(amount * 100);

    // Razorpay minimum is 100 paise (₹1)
    if (amountInPaise < 100) {
      return NextResponse.json({ error: 'Amount must be at least ₹1 (100 paise)' }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount:   amountInPaise,
      currency: 'INR',
      receipt:  `ifg_${Date.now()}`,
      notes: {
        brand: 'Imperial Fashion Groups',
        gst:   '22ASVPC0275C1Z4',
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Razorpay order creation failed:', error);
    return NextResponse.json(
      { error: error?.error?.description || error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
