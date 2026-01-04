import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
    try {   
        const { id } = await params;
        console.log(id)
        const [rows] = await db.query("SELECT * FROM donation_cat WHERE id = ?", [id]);

        return NextResponse.json(rows[0] || null);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        console.log(id)
        const { title } = await req.json();

        if (!title)
            return NextResponse.json({ error: "title is required" }, { status: 400 });

        await db.query(
            "UPDATE donation_cat SET title = ? WHERE id = ?",
            [title, id]
        );

        return NextResponse.json({ message: "updated" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function DELETE(req, { params }) {
    try {
        const { id } = await params;

        await db.query("DELETE FROM donation_cat WHERE id = ?", [id]);

        return NextResponse.json({ message: "deleted" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
