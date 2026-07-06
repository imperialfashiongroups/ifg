import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id:     process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret',
});

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay works in paise
      currency: 'INR',
      receipt: `ifg_${Date.now()}`,
      notes: {
        brand: 'Imperial Fashion Groups',
        gst: '22ASVPC0275C1Z4',
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Razorpay order creation failed:', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
