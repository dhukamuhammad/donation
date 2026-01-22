import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import db from "@/lib/db";

export async function POST(req) {
  try {
    const { amount } = await req.json();

    // Database se check karein kaunsa gateway active hai
    const [settings] = await db.query("SELECT active_gateway FROM payment_settings WHERE id = 1");
    const activeGateway = settings[0].active_gateway;

    // --- CASE 1: RAZORPAY ---
    if (activeGateway === "razorpay") {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const order = await razorpay.orders.create({
        amount: Number(amount) * 100, // Paise mein
        currency: "INR",
        receipt: "rcpt_" + Date.now(),
      });

      return NextResponse.json({ gateway: "razorpay", order });
    }

    // --- CASE 2: CASHFREE ---
    if (activeGateway === "cashfree") {
      const cfResponse = await fetch("https://sandbox.cashfree.com/pg/orders", {
        method: "POST",
        headers: {
          "x-client-id": process.env.cashfree_APP_ID,
          "x-client-secret": process.env.cashfree_secret_key,
          "x-api-version": "2023-08-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_amount: amount,
          order_currency: "INR",
          order_id: "order_" + Date.now(),
          customer_details: {
            customer_id: "cust_" + Date.now(),
            customer_phone: "9999999999", // Test phone
          },
        }),
      });

      const cfOrder = await cfResponse.json();
      return NextResponse.json({ gateway: "cashfree", order: cfOrder });
    }

  } catch (error) {
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
  }
}