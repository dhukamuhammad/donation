import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        // const [rows] = await db.query("SELECT * FROM donation_info WHERE user_id = ?", [
        //   id,
        // ]);

        const [rows] = await db.query(
            `SELECT 
                di.*, 
                df.title, 
                df.thumbnail 
            FROM donation_info di
            JOIN donation_fund df ON di.fund_id = df.id
            WHERE di.user_id = ?`,
            [id]
        );

        // const [rows] = await db.query(`
        //   SELECT 
        //     df.*,
        //     IFNULL(SUM(di.amount), 0) AS raised_amount,
        //     COUNT(di.id) AS supporters
        //   FROM donation_fund df
        //   LEFT JOIN donation_info di ON di.fund_id = df.id
        //   WHERE df.id = ?
        //   GROUP BY df.id 
        // `, [id]);
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}