import db from "@/lib/db";
import { NextResponse } from "next/server";

// 1. Current setting GET karne ke liye
export async function GET() {
  try {
    const [settings] = await db.query("SELECT active_gateway FROM payment_settings WHERE id = 1");
    return NextResponse.json(settings[0]);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// 2. Setting UPDATE karne ke liye (Admin Dashboard se)
export async function POST(req) {
  try {
    const { gateway } = await req.json();
    await db.query("UPDATE payment_settings SET active_gateway = ? WHERE id = 1", [gateway]);
    return NextResponse.json({ success: true, gateway });
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}