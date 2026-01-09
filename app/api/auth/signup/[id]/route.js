import { NextResponse } from "next/server";
import db from "@/lib/db";
import { uploadImage } from "@/lib/uploadImage";
import fs from "fs/promises";
import path from "path";


export async function GET(req, { params }) {
    try {
        const { id } = await params;
        console.log(id)
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

        return NextResponse.json(rows[0] || null);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;

        const formData = await req.formData();

        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const profileFile = formData.get("profile_img");

        const [rows] = await db.query(
            "SELECT profile_img FROM users WHERE id = ?",
            [id]
        );

        if (!rows.length) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const oldUser = rows[0];
        let profilePath = oldUser.profile_img;

        // upload new image
        if (profileFile && profileFile.size > 0) {
            profilePath = await uploadImage(profileFile);

            // delete old image
            if (oldUser.profile_img) {
                await fs
                    .unlink(
                        path.join(process.cwd(), "public/uploads", oldUser.profile_img)
                    )
                    .catch(() => { });
            }
        }

        await db.query(
            `UPDATE users 
       SET name = ?, email = ?, phone = ?, profile_img = ?
       WHERE id = ?`,
            [
                name ?? null,
                email ?? null,
                phone ?? null,
                profilePath,
                id,
            ]
        );

        return NextResponse.json({ success: true, profile_img: profilePath });
    } catch (error) {
        console.error("PUT API ERROR:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}