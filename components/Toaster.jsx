"use client";
import { Toaster as HotToaster, toast } from "react-hot-toast";

const Toaster = () => {
  return (
    <HotToaster
      position="top-center"
      reverseOrder={false}
      gutter={12}
      containerStyle={{
        top: 24,
        right: 24,
        bottom: 24,
        left: 24,
      }}
      toastOptions={{
        duration: 4000,
        // Default Industrial Style
        style: {
          background: "#ffffff",
          color: "#0f172a", // slate-900
          fontSize: "13px",
          fontWeight: "500",
          fontFamily: "'Outfit', sans-serif",
          borderRadius: "8px", // Shaper corners for professional look
          border: "1px solid #e2e8f0", // slate-200
          padding: "12px 16px",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          maxWidth: "380px",
          letterSpacing: "-0.01em",
        },
        // Success Overrides
        success: {
          iconTheme: {
            primary: "#10b981", // emerald-500
            secondary: "#ffffff",
          },
          style: {
            border: "1px solid #bbf7d0", // Subtle green border instead of thick left bar
            background: "#f8fafc",
          },
        },
        // Error Overrides
        error: {
          iconTheme: {
            primary: "#e11d48", // rose-600
            secondary: "#ffffff",
          },
          style: {
            border: "1px solid #fecdd3", // Subtle rose border
            background: "#f8fafc",
          },
        },
        // Loading State Overrides
        loading: {
          style: {
            border: "1px solid #e2e8f0",
            background: "#ffffff",
          },
        },
      }}
    />
  );
};

export default Toaster;

// --- Industrial Helper Functions ---
export const showSuccess = (msg) => toast.success(msg);
export const showError = (msg) => toast.error(msg);
export const showLoading = (msg) => toast.loading(msg);
export const dismissToast = () => toast.dismiss();