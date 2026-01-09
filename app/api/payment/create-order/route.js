import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const { amount } = await req.json();

    console.log("Amount:", amount);
    console.log("Key:", process.env.RAZORPAY_KEY_ID);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay API Error:", error);
    return NextResponse.json(
      { error: "Order creation failed", details: error.message },
      { status: 500 }
    );
  }
}
