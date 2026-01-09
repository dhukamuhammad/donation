import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;

        const [rows] = await db.query(
            `
      SELECT 
        IFNULL(SUM(amount), 0) AS raised_amount,
        COUNT(id) AS supporters
      FROM donation_info
      WHERE fund_id = ?
      `,
            [id]
        );

        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
