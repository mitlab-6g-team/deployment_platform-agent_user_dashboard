"use client";

import { useEffect, useState } from "react";
import { postAPI } from "@/app/api/entrypoint";
import APIKEYS from "@/app/api/api_key.json";

export const useFetchPositions = (applicationUID) => {
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //用於觸發重新抓取data
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchPositions = async () => {
      //開始抓取資料，畫面顯示loading
      setIsLoading(true);
      if (applicationUID) {
        const response = await postAPI(APIKEYS.RETRIEVE_POSITION, {
          uid: applicationUID,
        });
        if (response && response.data) {
          setPositions(response.data.data);
        } else if (response && response instanceof Error) {
          console.error("Error fetching applications:", response.message);
        }
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    fetchPositions();
  }, [applicationUID, fetchTrigger]);

  return {
    positions,
    isLoading,
    // 用於觸發重新抓取
    triggerFetch: () => setFetchTrigger(!fetchTrigger),
  };
};

//更新application
export const useUpdateApplication = (applicationUID, formData) => {
  const updateApplication = async () => {
    if (applicationUID) {
      const response = await postAPI("updateApplication", {
        uid: applicationUID,
        ...formData,
      });
      if (response && response.data) {
        return response.data;
      } else if (response && response instanceof Error) {
        console.error("Error updating application：", response.message);
      }
    }
  };
  return { updateApplication };
};

//刪除application
export const useDeleteApplication = (positionUID) => {
  const deleteApplication = async () => {
    if (positionUID) {
      const response = await postAPI(APIKEYS.DELETE_POSITION, {
        position_uid: [positionUID],
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
export const useCreateApplication = () => {
  const createApplication = async (formData) => {
    if (formData) {
      const response = await postAPI("createApplication", formData);
      if (response && response.data) {
        return response.data;
      } else if (response && response instanceof Error) {
        console.error("Error creating application:", response.message);
      }
    }
  };
  return { createApplication };
};

export const HandleUpdate = async (positionUID, formData, onEdit, onClose) => {
  const { updateApplication } = useUpdateApplication(positionUID, formData);
  const response = await updateApplication();
  if (response && !(response instanceof Error)) {
    onEdit();
    onClose();
  }
};

export const HandleDelete = async (positionUID, onDelete, onClose) => {
  const { deleteApplication } = useDeleteApplication(positionUID);
  const response = await deleteApplication();
  if (response && !(response instanceof Error)) {
    onDelete();
    onClose();
  }
};

export const HandleCreate = async (formData, onCreate, onClose) => {
  const { createApplication } = useCreateApplication();
  const response = await createApplication(formData);
  if (response && !(response instanceof Error)) {
    onCreate();
    onClose();
  }
};
