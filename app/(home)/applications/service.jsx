"use client";

import { useEffect, useState } from "react";
import { postAPI } from "@/app/api/entrypoint";
import APIKEYS from "@/app/api/api_key.json";
export const useFetchApplications = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);

      try {
        const response = await postAPI(APIKEYS.RETRIEVE_APPLICATION);
        if (response && response.data) {
          setApplications(response.data.data);
          setToastType("success");
          setToastMessage("Applications fetched successfully!");
          setShowToast(true);
        } else {
          throw new Error("Failed to fetch applications.");
        }
      } catch (error) {
        setToastType("error");
        setToastMessage(
          error.message ||
            "An unexpected error occurred while fetching applications."
        );
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [fetchTrigger]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000); // 3秒後自動隱藏吐司
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return {
    applications,
    isLoading,
    showToast,
    setShowToast,
    toastType,
    toastMessage,
  };
};
