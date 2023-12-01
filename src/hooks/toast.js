import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { addToast as add, removeToast } from "../Store/toastSlice";
import { useDispatch } from "react-redux";

const useToast = () => {
  // Toast Tab
  const dispatch = useDispatch();

  const deleteToast = (id) => {
    dispatch(removeToast(id));
  };

  const addToast = (toast) => {
    const toastWithId = {
      ...toast,
      id: uuidv4(),
    };
    dispatch(add(toastWithId));
    setTimeout(() => {
      deleteToast(toastWithId.id);
    }, 5000);
  };

  return { addToast, deleteToast };
};

export default useToast;
