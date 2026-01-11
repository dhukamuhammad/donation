import React from 'react';

const InvoiceTemplate = React.forwardRef(({ invoice }, ref) => {
    if (!invoice) return null;

    const styles = {
        hiddenWrapper: {
            position: "absolute",
            left: "-9999px",
            top: "-9999px"
        },
        page: {
            width: "210mm",
            minHeight: "297mm",
            padding: "20mm",
            backgroundColor: "#ffffff",
            color: "#1e293b",
            fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
            lineHeight: "1.5",
            position: "relative",
        },
        // --- Watermark Header ---
        watermark: {
            position: "absolute",
            top: "22mm",
            right: "20mm",
            fontSize: "64px",
            fontWeight: "900",
            color: "#f1f5f9", // Very light grey watermark
            letterSpacing: "2px",
            zIndex: 0,
        },
        // --- Header Section ---
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "50px",
            position: "relative",
            zIndex: 1,
        },
        logoContainer: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
        },
        logoBox: {
            backgroundColor: "#2563eb",
            color: "white",
            width: "48px",
            height: "48px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "bold",
        },
        brandName: {
            fontSize: "26px",
            fontWeight: "800",
            color: "#0f172a",
            margin: 0,
        },
        brandSub: {
            fontSize: "12px",
            color: "#64748b",
            fontWeight: "500",
        },
        // --- Metadata Grid ---
        metaGrid: {
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr",
            gap: "20px",
            marginBottom: "40px",
            paddingBottom: "30px",
            borderBottom: "1px solid #f1f5f9",
        },
        metaLabel: {
            fontSize: "11px",
            fontWeight: "700",
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "6px",
        },
        metaValue: {
            fontSize: "15px",
            fontWeight: "700",
            color: "#1e293b",
        },
        statusDot: {
            height: "8px",
            width: "8px",
            backgroundColor: "#10b981",
            borderRadius: "50%",
            display: "inline-block",
            marginRight: "8px",
        },
        // --- Table Styling ---
        tableHeader: {
            backgroundColor: "#f8fafc",
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 20px",
            borderRadius: "6px",
            marginBottom: "15px",
        },
        tableHeaderText: {
            fontSize: "12px",
            fontWeight: "700",
            color: "#475569",
            textTransform: "uppercase",
        },
        row: {
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            borderBottom: "1px solid #f8fafc",
        },
        // --- Summary Card ---
        summaryCard: {
            backgroundColor: "#f8fafc",
            padding: "25px",
            borderRadius: "12px",
            width: "300px",
            marginLeft: "auto",
            marginTop: "30px",
        },
        summaryRow: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
            fontSize: "14px",
        },
        totalPaid: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
            paddingTop: "15px",
            borderTop: "2px solid #e2e8f0",
            fontSize: "20px",
            fontWeight: "800",
            color: "#2563eb",
        },
        // --- Footer ---
        footer: {
            marginTop: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
        },
        sealCircle: {
            width: "110px",
            height: "110px",
            border: "1px double #bfdbfe",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
            opacity: 0.7,
        }
    };

    return (
        <div style={styles.hiddenWrapper}>
            <div ref={ref} style={styles.page}>

                {/* Header Area */}
                <header style={styles.header}>
                    <div style={styles.logoContainer}>
                        <div>
                            <h1 style={styles.brandName}>DonateCare</h1>
                            <span style={styles.brandSub}>Foundation for Social Change</span>
                        </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={{ ...styles.metaValue, color: "#2563eb" }}>#INV-{invoice.id}</div>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>Date: {invoice.date}</div>
                    </div>
                </header>

                {/* Info Grid Area */}
                <section style={styles.metaGrid}>
                    <div>
                        <div style={styles.metaLabel}>Donor Information</div>
                        <div style={styles.metaValue}>{invoice.name}</div>
                        <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>India</div>
                    </div>
                    <div>
                        <div style={styles.metaLabel}>Payment Status</div>
                        <div style={{ ...styles.metaValue, color: "#10b981", display: "flex", alignItems: "end" }}>
                            <span style={styles.statusDot}></span> Confirmed
                        </div>
                    </div>
                    <div>
                        <div style={styles.metaLabel}>Transaction ID</div>
                        <div style={{ ...styles.metaValue, fontFamily: "monospace" }}>TXN-{invoice.id}479928</div>
                    </div>
                </section>

                {/* Table Header */}
                <div style={styles.tableHeader}>
                    <span style={styles.tableHeaderText}>Description</span>
                    <span style={styles.tableHeaderText}>Amount</span>
                </div>

                {/* Campaign Row */}
                <div style={styles.row}>
                    <div style={{ maxWidth: "70%" }}>
                        <div style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>{invoice.title}</div>
                        <p style={{ fontSize: "13px", color: "#64748b", margin: "6px 0 0 0" }}>
                            Your donation directly supports our ongoing social welfare campaigns and operational community aid.
                        </p>
                    </div>
                    <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>
                        ₹{Number(invoice.amount).toLocaleString('en-IN')}
                    </div>
                </div>

                {/* Summary Section */}
                <div style={styles.summaryCard}>
                    <div style={styles.summaryRow}>
                        <span style={{ color: "#64748b" }}>Subtotal</span>
                        <span style={{ fontWeight: "700" }}>₹{Number(invoice.amount).toLocaleString('en-IN')}</span>
                    </div>
                    <div style={styles.summaryRow}>
                        <span style={{ color: "#64748b" }}>Tax (80G Exempt)</span>
                        <span style={{ fontWeight: "700", color: "#10b981" }}>₹0.00</span>
                    </div>
                    <div style={styles.totalPaid}>
                        <span>Total Paid</span>
                        <span>₹{Number(invoice.amount).toLocaleString('en-IN')}</span>
                    </div>
                </div>

                {/* Footer Notes & Signature */}
                <footer style={styles.footer}>
                    <div style={{ flex: 1 }}>
                        <div style={{ ...styles.metaLabel, color: "#1e293b", marginBottom: "12px" }}>Important Notes</div>
                        <div style={{ fontSize: "11px", color: "#94a3b8", lineHeight: "1.8", maxWidth: "400px" }}>
                            1. This is a computer-generated receipt, hence does not require a physical signature.<br />
                            2. Donations are 100% tax-exempt under Section 80G of the Income Tax Act.<br />
                            3. Thank you for your generous heart. Your trust is our greatest asset.
                        </div>
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <div style={styles.sealCircle}>
                            <div style={{ fontSize: "9px", color: "#3b82f6", fontWeight: "700", textTransform: "uppercase", padding: "10px" }}>
                                DonateCare Foundation Certified Seal
                            </div>
                        </div>
                        <div style={{ fontSize: "10px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>
                            Authorized Signatory
                        </div>
                    </div>
                </footer>

                {/* Subtle Bottom Footer */}
                <div style={{ marginTop: "50px", textAlign: "center", borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
                    <div style={{ fontSize: "10px", color: "#94a3b8" }}>
                        DonateCare Foundation | Gujarat, India | support@donatecare.org | +91 999 888 7777
                    </div>
                </div>

            </div>
        </div>
    );
});

InvoiceTemplate.displayName = "InvoiceTemplate";
export default InvoiceTemplate;