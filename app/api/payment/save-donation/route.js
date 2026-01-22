import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    // 1️⃣ Check if user exists
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [data.email]
    );

    let userId;
    if (existingUser.length === 0) {
      const [result] = await db.query(
        "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
        [data.name, data.email, data.phone]
      );
      userId = result.insertId;
    } else {
      userId = existingUser[0].id;
    }

    // 2️⃣ Save Donation with Gateway Logic
    // Hum ternary operator use karenge taaki agar data na ho toh 'NULL' save ho
    await db.query(
      `INSERT INTO donation_info 
      (name, email, amount, mobile_no, donation_type, fund_id, user_id, 
       gateway, razorpay_order_id, razorpay_payment_id, razorpay_signature, cashfree_order_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.email,
        data.amount,
        data.phone,
        data.donationType,
        data.fundId,
        userId,
        data.gateway || 'razorpay', // Default to razorpay if not sent
        data.razorpay_order_id || null,
        data.razorpay_payment_id || null,
        data.razorpay_signature || null,
        data.cashfree_order_id || null
      ]
    );

    return NextResponse.json({ success: true, fundId: data.fundId, userId });

  } catch (err) {
    console.error("Save donation error:", err);
    return NextResponse.json({ error: "DB insert failed", details: err.message }, { status: 500 });
  }
}