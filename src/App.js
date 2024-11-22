import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import "./App.css";
import ChatHistory from "./component/ChatHistory";
import Loading from "./component/Loading";

const App = () => {
  const [questionOne, setQuestionOne] = useState("");
  const [questionTwo, setQuestionTwo] = useState("");
  const [questionThree, setQuestionThree] = useState("");
  const [questionFour, setQuestionFour] = useState("");
  const [questionFive, setQuestionFive] = useState("");
  const [questionSix, setQuestionSix] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI("AIzaSyDR9lGdA6Qem-cPv71C8kwdTre2LKFSnSA");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


  const handleUserInput = (e, setter) => {
    setter(e.target.value);
  };

  const sendMessage = async () => {
    if (
      !questionOne.trim() ||
      !questionTwo.trim() ||
      !questionThree.trim() ||
      !questionFour.trim() ||
      !questionFive.trim() ||
      !questionSix.trim()
    ) {
      return;
    }

    setIsLoading(true);
    try {
      const combinedInput = `
        1. ما المشكلة التي ترغب في حلها؟ ${questionOne}
        2. من هو جمهورك المستهدف؟ ${questionTwo}
        3. ما هي الفجوات التي تلاحظها في السوق؟ ${questionThree}
        4. كيف ترى استخدام التكنولوجيا في المشروع؟ ${questionFour}
        5. ما هي المهارات أو الموارد التي تمتلكها؟ ${questionFive}
        6. ما نوع الربح الذي تتطلع لتحقيقه؟ ${questionSix}
      `;

      const result = await model.generateContent(combinedInput);
      const response = await result.response;
      console.log(response);

      setChatHistory([
        ...chatHistory,
        { type: "user", message: combinedInput },
        { type: "bot", message: response.text() },
      ]);
    } catch {
      console.error("حدث خطأ أثناء إرسال الرسالة");
    } finally {
      setQuestionOne("");
      setQuestionTwo("");
      setQuestionThree("");
      setQuestionFour("");
      setQuestionFive("");
      setQuestionSix("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">مولد أفكار المشاريع</h1>

      <div className="chat-container rounded-lg shadow-md p-4">
        <ChatHistory chatHistory={chatHistory} />
        <Loading isLoading={isLoading} />
      </div>

      <div className="mt-4">
        <div className="mb-4">
          <label className="block font-medium text-gray-700">1. ما المشكلة التي ترغب في حلها؟</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={questionOne}
            onChange={(e) => handleUserInput(e, setQuestionOne)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">2. من هو جمهورك المستهدف؟</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={questionTwo}
            onChange={(e) => handleUserInput(e, setQuestionTwo)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">3. ما هي الفجوات التي تلاحظها في السوق؟</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={questionThree}
            onChange={(e) => handleUserInput(e, setQuestionThree)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">4. كيف ترى استخدام التكنولوجيا في المشروع؟</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={questionFour}
            onChange={(e) => handleUserInput(e, setQuestionFour)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">5. ما هي المهارات أو الموارد التي تمتلكها؟</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={questionFive}
            onChange={(e) => handleUserInput(e, setQuestionFive)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">6. ما نوع الربح الذي تتطلع لتحقيقه؟</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={questionSix}
            onChange={(e) => handleUserInput(e, setQuestionSix)}
          />
        </div>
      </div>

      <div className="flex mt-4">
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          onClick={sendMessage}
          disabled={isLoading}
        >
          إرسال
        </button>
      </div>

      <button
        className="mt-4 block px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 focus:outline-none"
        onClick={clearChat}
      >
        مسح الدردشة
      </button>
    </div>
  );
};

export default App;
