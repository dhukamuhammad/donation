import { NextResponse } from "next/server";
import db from "@/lib/db";
import { uploadImage } from "@/lib/uploadImage";
import fs from "fs/promises";
import path from "path";

// GET with ID
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const [rows] = await db.query("SELECT * FROM donation_fund WHERE id = ?", [
      id,
    ]);
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const data = await req.formData();
    const fields = Object.fromEntries(data.entries());
    const file = data.get("thumbnail");

    const [[old]] = await db.query(
      "SELECT thumbnail FROM donation_fund WHERE id = ?",
      [id]
    );

    let imagePath = old.thumbnail;

    if (file && file.size > 0) {
      imagePath = await uploadImage(file);

      if (old.thumbnail) {
        await fs
          .unlink(path.join(process.cwd(), "public/uploads", old.thumbnail))
          .catch(() => {});
      }
    }

    await db.query(
      "UPDATE donation_fund SET title=?, date=?, total_amount=?, thumbnail=?, fun_cat=? WHERE id=?",
      [
        fields.title,
        fields.date,
        fields.total_amount,
        imagePath,
        fields.fun_cat,
        id,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const [[old]] = await db.query(
      "SELECT thumbnail FROM donation_fund WHERE id = ?",
      [id]
    );

    if (old?.thumbnail) {
      await fs
        .unlink(path.join(process.cwd(), "public/uploads", old.thumbnail))
        .catch(() => {});
    }

    await db.query("DELETE FROM donation_fund WHERE id = ?", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
