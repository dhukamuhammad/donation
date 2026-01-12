"use client";
import { Toaster as HotToaster, toast } from "react-hot-toast";

const Toaster = () => {
  return (
    <HotToaster
      position="top-right" // Professional standard for dashboards
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#ffffff",
          color: "#1e293b", // slate-800
          fontSize: "14px",
          fontWeight: "600",
          fontFamily: "'Outfit', sans-serif",
          borderRadius: "12px",
          border: "1px solid #e2e8f0", // slate-200
          padding: "12px 16px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
        },
        success: {
          iconTheme: {
            primary: "#10b981", // emerald-500
            secondary: "#ffffff",
          },
          style: {
            borderLeft: "4px solid #10b981", // Success accent border
          },
        },
        error: {
          iconTheme: {
            primary: "#f43f5e", // rose-500
            secondary: "#ffffff",
          },
          style: {
            borderLeft: "4px solid #f43f5e", // Error accent border
          },
        },
        loading: {
          style: {
            borderLeft: "4px solid #3b82f6", // Info/Loading blue border
          },
        },
      }}
    />
  );
};

export default Toaster;

// --- Helper Functions ---
export const showSuccess = (msg) => toast.success(msg);
export const showError = (msg) => toast.error(msg);
export const showLoading = (msg) => toast.loading(msg);
export const dismissToast = () => toast.dismiss();