"use client";
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
            fontFamily: "'Inter', sans-serif",
            lineHeight: "1.6",
            position: "relative",
            boxSizing: "border-box",
        },
        // --- Top Branding ---
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "60px",
            borderBottom: "2px solid #f1f5f9",
            paddingBottom: "30px",
        },
        brandName: {
            fontSize: "28px",
            fontWeight: "900",
            color: "#0f172a",
            margin: 0,
            letterSpacing: "-0.5px",
        },
        brandSub: {
            fontSize: "11px",
            color: "#3b82f6",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
        },
        docTitle: {
            fontSize: "18px",
            fontWeight: "800",
            color: "#2563eb",
            textAlign: "right",
            textTransform: "uppercase",
        },
        // --- Information Grid ---
        infoSection: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            marginBottom: "50px",
        },
        label: {
            fontSize: "10px",
            fontWeight: "800",
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "8px",
        },
        value: {
            fontSize: "14px",
            fontWeight: "700",
            color: "#1e293b",
        },
        // --- Table Section ---
        table: {
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "40px",
        },
        th: {
            textAlign: "left",
            padding: "12px 0",
            borderBottom: "2px solid #1e293b",
            fontSize: "11px",
            fontWeight: "800",
            textTransform: "uppercase",
            color: "#475569",
        },
        td: {
            padding: "20px 0",
            borderBottom: "1px solid #f1f5f9",
            verticalAlign: "top",
        },
        // --- Summary Area ---
        summaryContainer: {
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
        },
        summaryBox: {
            width: "250px",
            backgroundColor: "#f8fafc",
            padding: "20px",
            borderRadius: "8px",
        },
        totalRow: {
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "15px",
            marginTop: "15px",
            borderTop: "1px solid #e2e8f0",
            fontSize: "18px",
            fontWeight: "900",
            color: "#2563eb",
        },
        // --- Bottom Signature Area ---
        footer: {
            marginTop: "100px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        sealWrapper: {
            textAlign: "center",
        },
        seal: {
            width: "120px",
            height: "120px",
            border: "2px solid #dbeafe",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 10px",
            position: "relative",
        },
        sealText: {
            fontSize: "9px",
            fontWeight: "800",
            color: "#3b82f6",
            textTransform: "uppercase",
            textAlign: "center",
            padding: "5px",
        },
        noteBox: {
            fontSize: "11px",
            color: "#64748b",
            maxWidth: "400px",
            lineHeight: "1.8",
        }
    };

    return (
        <div style={styles.hiddenWrapper}>
            <div ref={ref} style={styles.page}>

                {/* --- Header --- */}
                <header style={styles.header}>
                    <div>
                        <h1 style={styles.brandName}>DonateCare</h1>
                        <div style={styles.brandSub}>Official Donation Receipt</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={styles.docTitle}>Receipt #INV-{invoice.id}</div>
                        <div style={{ fontSize: "12px", color: "#64748b", marginTop: "5px" }}>
                            Date of Issue: <strong>{invoice.date}</strong>
                        </div>
                    </div>
                </header>

                {/* --- Donor & Transaction Info --- */}
                <section style={styles.infoSection}>
                    <div>
                        <div style={styles.label}>Donor Particulars</div>
                        <div style={styles.value}>{invoice.name}</div>
                        <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                            Registered Beneficiary Address: India
                        </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={styles.label}>Transaction Details</div>
                        <div style={styles.value}>TXN-{invoice.id}9928471</div>
                        <div style={{ fontSize: "12px", color: "#10b981", fontWeight: "700", marginTop: "4px" }}>
                            Status: Payment Success (Confirmed)
                        </div>
                    </div>
                </section>

                {/* --- Donation Table --- */}
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Description of Donation Cause</th>
                            <th style={{ ...styles.th, textAlign: "right" }}>Amount (INR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.td}>
                                <div style={{ fontWeight: "700", color: "#0f172a", marginBottom: "5px" }}>
                                    {invoice.title}
                                </div>
                                <div style={{ fontSize: "12px", color: "#64748b" }}>
                                    Contribution towards our social welfare initiatives and verified community aid projects.
                                </div>
                            </td>
                            <td style={{ ...styles.td, textAlign: "right", fontWeight: "800", fontSize: "16px" }}>
                                ₹{Number(invoice.amount).toLocaleString('en-IN')}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* --- Calculation Box --- */}
                <div style={styles.summaryContainer}>
                    <div style={styles.summaryBox}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "10px" }}>
                            <span style={{ color: "#64748b" }}>Subtotal</span>
                            <span style={{ fontWeight: "700" }}>₹{Number(invoice.amount).toLocaleString('en-IN')}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                            <span style={{ color: "#64748b" }}>80G Tax Benefit</span>
                            <span style={{ fontWeight: "700", color: "#10b981" }}>Exempt</span>
                        </div>
                        <div style={styles.totalRow}>
                            <span>TOTAL</span>
                            <span>₹{Number(invoice.amount).toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>

                {/* --- Legal Disclaimer --- */}
                <div style={{ marginTop: "40px", padding: "15px", border: "1px solid #f1f5f9", borderRadius: "8px" }}>
                    <div style={styles.label}>Official Certification</div>
                    <div style={styles.noteBox}>
                        1. This receipt confirms the receipt of funds towards the mentioned cause. <br />
                        2. Donations are 100% tax-exempt under Section 80G of the Income Tax Act. <br />
                        3. This is a system-generated document and does not require a physical seal to be valid for tax purposes.
                    </div>
                </div>

                {/* --- Signature & Seal Area --- */}
                <footer style={styles.footer}>
                    <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "5px" }}>Organization Head Office</div>
                        <div style={{ fontSize: "11px", fontWeight: "700" }}>Mahi, Vadgam, Banaskantha</div>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>Gujarat, India - 385410</div>
                    </div>

                    <div style={styles.sealWrapper}>
                        <div style={styles.seal}>
                            <div style={styles.sealText}>
                                DonateCare<br />Foundation<br />India
                            </div>
                        </div>
                        <div style={{ fontSize: "10px", fontWeight: "900", color: "#1e293b", textTransform: "uppercase", letterSpacing: "1px" }}>
                            Authorized Signatory
                        </div>
                    </div>
                </footer>

                {/* --- Print Bottom Info --- */}
                <div style={{ position: "absolute", bottom: "10mm", left: "0", right: "0", textAlign: "center" }}>
                    <div style={{ fontSize: "9px", color: "#cbd5e1" }}>
                        Generate securely via DonateCare Portal | support@donatecare.org
                    </div>
                </div>

            </div>
        </div>
    );
});

InvoiceTemplate.displayName = "InvoiceTemplate";
export default InvoiceTemplate;