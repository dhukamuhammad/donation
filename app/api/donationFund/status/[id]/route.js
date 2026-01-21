import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  // validation
  if (status !== 0 && status !== 1) {
    return NextResponse.json(
      { success: false, message: "Invalid status value" },
      { status: 400 },
    );
  }

  try {
    const [result] = await db.query(
      "UPDATE donation_fund SET status = ? WHERE id = ?",
      [status, id],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Campaign not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
      status,
    });
  } catch (error) {
    console.error("STATUS UPDATE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
