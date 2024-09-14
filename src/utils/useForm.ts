'use client'
import { useState } from "react";

export const useForm = (initialState: any) => {
  const [formState, setFormState] = useState(initialState);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return {
    formState,
    handleInputChange,
  };
};
