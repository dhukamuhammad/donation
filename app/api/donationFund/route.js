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

    const thumbnailFile = data.get("thumbnail");
    const documentFile = data.get("document_img");

    const thumbnailPath = thumbnailFile
      ? await uploadImage(thumbnailFile)
      : null;
    const documentPath = documentFile ? await uploadImage(documentFile) : null;

    await db.query(
      `INSERT INTO donation_fund 
      (title, date, total_amount, thumbnail, fun_cat, description, document_img) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        fields.title,
        fields.date,
        fields.total_amount,
        thumbnailPath,
        fields.fun_cat,
        fields.description,
        documentPath,
      ]
    );

    return Response.json({ success: true }, { status: 201 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
