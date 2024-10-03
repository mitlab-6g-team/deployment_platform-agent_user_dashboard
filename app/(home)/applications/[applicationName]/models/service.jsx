"use client";

import { useEffect, useState } from "react";
import { postAPI } from "@/app/api/entrypoint";
import APIPKEYS from "@/app/api/api_key.json";

export const useFetchModels = (applicationUID) => {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //用於觸發重新抓取data
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      //開始抓取資料，畫面顯示loading
      setIsLoading(true);
      if (applicationUID) {
        const response = await postAPI(APIPKEYS.RETRIEVE_MODEL, {
          uid: applicationUID,
        });
        if (response && response.data) {
          setModels(response.data.data);
        } else if (response && response instanceof Error) {
          console.error("Error fetching models:", response.message);
        }
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    fetchModels();
  }, [applicationUID, fetchTrigger]);

  return {
    models,
    isLoading,
    // 用於觸發重新抓取
    triggerFetch: () => setFetchTrigger(!fetchTrigger),
  };
};

//更新application
export const useCreatePosition = async (formData) => {
  if (formData) {
    const response = await postAPI(APIPKEYS.CREATE_POSITION, formData);
    if (response && response.data) {
      return response.data;
    } else if (response && response instanceof Error) {
      console.error("Error updating application：", response.message);
    }
  }
};

//刪除application
export const useDeleteApplication = (applicationUID) => {
  const deleteApplication = async () => {
    if (applicationUID) {
      const response = await postAPI("deleteApplication", {
        uid: applicationUID,
      });
      if (response && response.data) {
        return response.data;
      } else if (response && response instanceof Error) {
        console.error("Error deleting application：", response.message);
      }
    }
  };
  return { deleteApplication };
};

//創建application
export const useCreateApplication = async () => {
  if (formData) {
    const response = await postAPI("createApplication", formData);
    if (response && response.data) {
      return response.data;
    } else if (response && response instanceof Error) {
      console.error("Error creating application:", response.message);
    }
  }
};

export const HandleUpdate = async (formData, onEdit, onClose) => {
  try {
    const data = await useCreatePosition(formData);
    if (data && !(data instanceof Error)) {
      onClose();
    }
  } catch (error) {
    console.error("Error updating application:", error);
  }
};

export const HandleDelete = async (applicationUID, onDelete, onClose) => {
  const { deleteApplication } = useDeleteApplication(applicationUID);
  try {
    const response = await deleteApplication();
    if (response && !(response instanceof Error)) {
      onDelete();
      onClose();
    }
  } catch (error) {
    console.error("Error deleting application:", error);
  }
};

export const HandleCreate = async (formData, onCreate, onClose) => {
  try {
    const response = await useCreateApplication(formData);
    if (response && !(response instanceof Error)) {
      onCreate();
      onClose();
    }
  } catch (error) {
    console.error("Error creating application:", error);
  }
};
