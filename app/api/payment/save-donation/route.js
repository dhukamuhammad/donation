import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();   // 👈 sabse upar

    // 1️⃣ Check if user exists
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [data.email]
    );

    let userId;

    if (existingUser.length === 0) {
      // 2️⃣ Create new user
      const [result] = await db.query(
        "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
        [data.name, data.email, data.phone]
      );

      userId = result.insertId;  // 👈 YEH SABSE IMPORTANT LINE
    } else {
      userId = existingUser[0].id;
    }

    // 3️⃣ Save Donation
    await db.query(
      `INSERT INTO donation_info
      (name, email, amount, mobile_no, donation_type, fund_id, user_id,
       razorpay_order_id, razorpay_payment_id, razorpay_signature)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.email,
        data.amount,
        data.phone,
        data.donationType,
        data.fundId,
        userId,  // 👈 guaranteed NOT NULL now
        data.razorpay_order_id,
        data.razorpay_payment_id,
        data.razorpay_signature,
      ]
    );

    return NextResponse.json({ success: true, fundId: data.fundId, userId });

  } catch (err) {
    console.error("Save donation error:", err);
    return NextResponse.json({ error: "DB insert failed" }, { status: 500 });
  }
}
