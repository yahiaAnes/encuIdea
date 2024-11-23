import React from "react";
import ReactMarkdown from "react-markdown";

const ChatHistory = ({ chatHistory }) => {
  return (
    <div className="space-y-4">
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`flex flex-wrap items-start space-x-4 ${
            message.type === "user" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {/* Avatar */}
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full ${
              message.type === "user" ? "bg-gray-400" : "bg-blue-900"
            } text-white font-bold p-5`}
          >
            {message.type === "user" ? "U" : "ENCU"}
          </div>

          {/* Message Bubble */}
          <div
            className={`max-w-full py-3 ${
              message.type === "user"
                ? "bg-gray-100 text-gray-500 self-end"
                : "whitespace-pre-wrap text-black text-xl text-right w-full"
            }`}
          >
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
