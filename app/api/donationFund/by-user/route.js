// import db from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET(req, { params }) {
//     try {
//         const resolvedParams = await params;
        
//         const [user_id, fund_id] = resolvedParams.id;

//         if (!user_id || !fund_id) {
//             return NextResponse.json({ error: "Missing user_id or fund_id" }, { status: 400 });
//         }

//         const [rows] = await db.query(
//             `SELECT 
//                 di.*, 
//                 df.title, 
//                 df.thumbnail 
//             FROM donation_info di
//             JOIN donation_fund df ON di.fund_id = df.id
//             WHERE di.user_id = ? AND di.fund_id = ?`, 
//             [user_id, fund_id]
//         );

//         if (rows.length === 0) {
//             return NextResponse.json({ message: "No donation found" }, { status: 404 });
//         }

//         return NextResponse.json(rows);
//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }