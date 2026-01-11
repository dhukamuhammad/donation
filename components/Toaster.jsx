"use client";

import { Toaster as HotToaster, toast } from "react-hot-toast";

const Toaster = () => {
  return (
    <HotToaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#1f2937",
          color: "black",
          fontSize: "14px",
        },
        success: {
          style: { background: "#ffffff" },
          iconTheme: {
            primary: "#16a34a",
            secondary: "#ffffff",
          },
        },
        error: {
          style: { background: "#ffffff" },
        },
      }}
    />
  );
};

export default Toaster;

// 🔥 Toast helper functions
export const showSuccess = (msg) => toast.success(msg);
export const showError = (msg) => toast.error(msg);
export const showLoading = (msg) => toast.loading(msg);
export const dismissToast = () => toast.dismiss();
