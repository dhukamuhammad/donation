"use client";
import React, { useEffect } from "react";
import { X, AlertCircle } from "lucide-react";

const CustomModel = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to perform this action?",
  Delete = "Confirm",
}) => {
  // ESC key se modal close karne ke liye
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] overflow-y-auto">
      {/* Overlay - Neutral Slate with minimal blur */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[1px] transition-opacity" 
        onClick={onClose} 
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-slate-200">
          
          {/* Main Content Area */}
          <div className="bg-white px-6 pt-6 pb-4 sm:p-8 sm:pb-4">
            <div className="sm:flex sm:items-start">
              
              {/* Warning Icon Container - Structured & Professional */}
              <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-red-50 border border-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <AlertCircle className="h-6 w-6 text-red-600" strokeWidth={2} />
              </div>

              <div className="mt-4 text-center sm:mt-0 sm:ml-5 sm:text-left">
                <h3 className="text-lg font-bold leading-6 text-slate-900 font-['Outfit']">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-slate-500 font-medium leading-relaxed font-['Outfit']">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer - Clean separation */}
          <div className="bg-slate-50/80 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-8 border-t border-slate-100">
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all sm:ml-3 sm:w-auto uppercase tracking-wider"
            >
              {Delete}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-all sm:mt-0 sm:w-auto uppercase tracking-wider"
            >
              Cancel
            </button>
          </div>

          {/* Optional Top-right close icon */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModel;