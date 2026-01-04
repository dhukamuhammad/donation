import Footer from "@/layout/client/Footer";
import Navbar from "@/layout/client/Navbar";

export default function ClientLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col font-outfit">
            <Navbar />
            <main className="flex-1 pt-16">
                {children}
            </main>
            <Footer />
        </div>

    )
}