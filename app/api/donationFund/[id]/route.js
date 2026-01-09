import { NextResponse } from "next/server";
import db from "@/lib/db";
import { uploadImage } from "@/lib/uploadImage";
import fs from "fs/promises";
import path from "path";

// GET with ID
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    // const [rows] = await db.query("SELECT * FROM donation_fund WHERE id = ?", [
    //   id,
    // ]);

        const [rows] = await db.query(`
      SELECT 
        df.*,
        IFNULL(SUM(di.amount), 0) AS raised_amount,
        COUNT(di.id) AS supporters
      FROM donation_fund df
      LEFT JOIN donation_info di ON di.fund_id = df.id
      WHERE df.id = ?
      GROUP BY df.id 
    `, [id]);
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update
export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    const data = await req.formData();
    const fields = Object.fromEntries(data.entries());

    const thumbnailFile = data.get("thumbnail");
    const documentFile = data.get("document_img");

    const [rows] = await db.query(
      "SELECT thumbnail, document_img FROM donation_fund WHERE id = ?",
      [id]
    );

    if (!rows.length) {
      return NextResponse.json({ error: "Fund not found" }, { status: 404 });
    }

    const old = rows[0];

    let thumbnailPath = old.thumbnail;
    let documentPath = old.document_img;

    if (thumbnailFile && thumbnailFile.size > 0) {
      thumbnailPath = await uploadImage(thumbnailFile);
      if (old.thumbnail) {
        await fs
          .unlink(path.join(process.cwd(), "public/uploads", old.thumbnail))
          .catch(() => { });
      }
    }

    if (documentFile && documentFile.size > 0) {
      documentPath = await uploadImage(documentFile);
      if (old.document_img) {
        await fs
          .unlink(path.join(process.cwd(), "public/uploads", old.document_img))
          .catch(() => { });
      }
    }

    await db.query(
      `UPDATE donation_fund 
       SET title=?, description=?, date=?, total_amount=?, thumbnail=?, document_img=?, fun_cat=? 
       WHERE id=?`,
      [
        fields.title || "",
        fields.description || "",
        fields.date || null,
        fields.total_amount || 0,
        thumbnailPath || null,
        documentPath || null,
        fields.fun_cat || null,
        id,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT API ERROR:", error);
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
        .catch(() => { });
    }

    await db.query("DELETE FROM donation_fund WHERE id = ?", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
