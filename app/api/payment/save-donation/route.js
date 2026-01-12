import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    // 1️⃣ Save Donation Info
    await db.query(
      `INSERT INTO donation_info
      (name, email, amount, mobile_no, donation_type, fund_id, 
       razorpay_order_id, razorpay_payment_id, razorpay_signature)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.email,
        data.amount,
        data.phone,
        data.donationType,
        data.fundId,
        data.razorpay_order_id,
        data.razorpay_payment_id,
        data.razorpay_signature,
      ]
    );

    // 2️⃣ Update donation_fund total
    // const [rows] = await db.query(
    //   "SELECT total_amount FROM donation_fund WHERE id = ?",
    //   [data.fundId]
    // );

    // const newTotal = Number(rows[0].total_amount || 0) + Number(data.amount);

    // await db.query("UPDATE donation_fund SET total_amount = ? WHERE id = ?", [
    //   newTotal,
    //   data.fundId,
    // ]);

    // 3️⃣ Insert / Update Users Table
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [data.email]
    );

    if (existingUser.length === 0) {
      // New user
      await db.query(
        "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
        [data.name, data.email, data.phone]
      );
    } else {
      // Existing user → update info
      // await db.query("UPDATE users SET name = ?, phone = ? WHERE email = ?", [
      //   data.name,
      //   data.phone,
      //   data.email,
      // ]);
    }

    return NextResponse.json({ success: true ,fundId: data.fundId});
  } catch (err) {
    console.error("Save donation error:", err);
    return NextResponse.json({ error: "DB insert failed" }, { status: 500 });
  }
}
