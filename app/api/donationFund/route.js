import { NextResponse } from "next/server";
import db from "@/lib/db";
import { uploadImage } from "@/lib/uploadImage";


// GET Category
export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM donation_fund");
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const data = await req.formData();
        const fields = Object.fromEntries(data.entries());
        const file = data.get("thumbnail");
        const imagePath = await uploadImage(file);

        await db.query(
            "INSERT INTO donation_fund (title,date,total_amount,thumbnail,fun_cat) VALUES (?,?,?,?,?)",
            [fields.title, fields.date, fields.total_amount, imagePath, fields.fun_cat]
        );

        return Response.json({ success: true }, { status: 201 });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
