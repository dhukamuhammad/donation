import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const [rows] = await db.query(
      `
      SELECT *
      FROM donation_info
      WHERE fund_id = ?
      `,
      [id]
    );

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// hello everyone i am okay 
