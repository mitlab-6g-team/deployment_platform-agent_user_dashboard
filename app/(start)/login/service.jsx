"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../api/entrypoint";

export const useAuth = () => {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");

  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await login({
        account_name: accountName,
        account_password: password,
      });

      if (res.status === 200) {
        setError(null);
        setToastType("success");
        setToastMessage("Login Successful!");
        setShowToast(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("accountname", accountName);
        router.push("/applications");
      } else {
        setError(res.response?.data["message"]);
        setToastType("error");
        setToastMessage(res.response?.data["message"] || "Login Failed.");
        setShowToast(true);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      setToastType("error");
      setToastMessage("An unexpected error occurred. Please try again.");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000); // 3秒後自動隱藏吐司
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return {
    accountName,
    setAccountName,
    password,
    setPassword,
    error,
    isSubmitting,
    submit,
    showToast,
    setShowToast,
    toastType,
    toastMessage,
  };
};
