import { NextResponse } from "next/server";
import db from "@/lib/db";
// GET with ID
export async function GET(req, { params }) {
    try {
        const { id } = await params;
        // const [rows] = await db.query("SELECT * FROM donation_fund WHERE id = ?", [
        //   id,
        // ]);

        const [rows] = await db.query(`
SELECT
    d.id,
    d.name,
    d.amount,
    DATE_FORMAT(d.created_date, '%d %b %Y') AS date,
    u.name AS user_name,
    f.title
FROM donation_info d
JOIN users u ON u.id = d.user_id
JOIN donation_fund f ON f.id = d.fund_id
WHERE d.id = ?
    `, [id]);
        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}