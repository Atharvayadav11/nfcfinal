// src/components/ui/use-toast.js

import { useState } from "react";

export function useToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (msg) => {
    setMessage(msg);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000); // Auto-hide after 3 seconds
  };

  return { isVisible, message, showToast };
}
