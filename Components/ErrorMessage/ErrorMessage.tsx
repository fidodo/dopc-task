import React from "react";

interface ErrorMessageProps {
  message: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, isVisible, setIsVisible }) => {


  if (!isVisible) return null;

  return (
    <div
      role="alert"
      className="flex items-center justify-between p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
    >
      <span>{message}</span>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-4 text-red-700 hover:text-red-900"
        aria-label="Close"
      >
        ✖
      </button>
    </div>
  );
};

export default ErrorMessage;
