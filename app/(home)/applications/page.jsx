"use client";

import React from "react";
import { useFetchApplications } from "./service";
import ApplicationCard from "./applicationCard";
import CustomToast from "@/components/base/CustomToast";
import { ToastProvider, ToastViewport } from "@/components/ui/toast"; // 假設你的 ToastProvider 位於這個路徑

export default function ApplicationPage() {
  const {
    applications,
    isLoading,
    showToast,
    setShowToast,
    toastType,
    toastMessage,
  } = useFetchApplications();

  return (
    <ToastProvider>
      {/* 將所有吐司相關的組件包裹在 ToastProvider 內部 */}
      <div className="mx-auto min-h-screen bg-gray-50 pt-32 px-40">
        <div className="mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Applications</h1>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[630px] overflow-y-auto">
              {applications &&
                applications.map((application) => (
                  <ApplicationCard
                    key={application.uid}
                    application={application}
                  />
                ))}
            </div>
          )}
        </div>

        {/* 使用封裝的 CustomToast 組件來顯示吐司通知 */}
        <CustomToast
          type={toastType}
          message={toastMessage}
          showToast={showToast}
          setShowToast={setShowToast}
        />

        {/* 確保包含 ToastViewport 組件 */}
        <ToastViewport />
      </div>
    </ToastProvider>
  );
}
