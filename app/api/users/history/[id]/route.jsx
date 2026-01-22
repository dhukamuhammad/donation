import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;

        const [rows] = await db.query(
            `SELECT 
    di.*,

    -- fund info
    df.title AS fund_title,
    df.thumbnail AS fund_thumbnail,

    -- user info
    u.profile_img AS user_profile_img,
    u.name AS user_name,
    u.email AS user_email,
    u.phone AS user_phone

FROM donation_info di

JOIN donation_fund df 
    ON di.fund_id = df.id

JOIN users u 
    ON di.user_id = u.id

WHERE di.user_id = ?
`,
            [id]
        );

        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}