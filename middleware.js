import { NextResponse } from "next/server";

export function middleware(req) {
    const { pathname } = req.nextUrl;
    const adminToken = req.cookies.get("admin_token");
    console.log(adminToken)

    // 1️⃣ /admin hit
    if (pathname === "/admin") {
        // logged-in admin → dashboard
        if (adminToken) {
            return NextResponse.redirect(
                new URL("/admin/dashboard", req.url)
            );
        }
        // not logged-in → login
        return NextResponse.redirect(
            new URL("/admin/login", req.url)
        );
    }

    // 2️⃣ admin login page
    if (pathname === "/admin/login") {
        // already logged-in → dashboard
        if (adminToken) {
            return NextResponse.redirect(
                new URL("/admin/dashboard", req.url)
            );
        }
        return NextResponse.next();
    }

    // 3️⃣ protect all other admin pages
    if (pathname.startsWith("/admin")) {
        if (!adminToken) {
            return NextResponse.redirect(
                new URL("/admin/login", req.url)
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
