import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { saveAs } from "file-saver";
import "./App.css";
import ChatHistory from "./component/ChatHistory";
import Loading from "./component/Loading";
import encu  from './assets/encu.png'

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
      const combinedInput = ` من خلال هذه الأجوبة قدم لي فكرة مشروع :
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
      const responseText = response.text();

      //console.log(responseText);


    setChatHistory([
      ...chatHistory,
      //{ type: "user", message: combinedInput },
      { type: "bot", message: response.text() },
    ]);

      // Save response to a text file
    const blob = new Blob([responseText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "project_idea.txt");
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 rtl">
      <img src={encu} alt="encu"/>
      <h1 className="text-4xl font-extrabold text-blue-900 mb-6 text-center">
        مولد أفكار المشاريع
      </h1>

      <div className="chat-container w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mb-8">
        <ChatHistory chatHistory={chatHistory} />
        <Loading isLoading={isLoading} />
      </div>

      <div className="w-full max-w-3xl text-lg bg-white shadow-lg rounded-lg p-6 relative"
        >
          
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1 text-right">
               ما المشكلة التي ترغب في حلها؟
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              value={questionOne}
              onChange={(e) => handleUserInput(e, setQuestionOne)}
              placeholder="أدخل إجابتك هنا"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 text-right">
               من هو جمهورك المستهدف؟
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              value={questionTwo}
              onChange={(e) => handleUserInput(e, setQuestionTwo)}
              placeholder="أدخل إجابتك هنا"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 text-right">
               ما هي الفجوات التي تلاحظها في السوق؟
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              value={questionThree}
              onChange={(e) => handleUserInput(e, setQuestionThree)}
              placeholder="أدخل إجابتك هنا"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 text-right">
              كيف ترى استخدام التكنولوجيا في المشروع؟
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              value={questionFour}
              onChange={(e) => handleUserInput(e, setQuestionFour)}
              placeholder="أدخل إجابتك هنا"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 text-right">
               ما هي المهارات أو الموارد التي تمتلكها؟
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              value={questionFive}
              onChange={(e) => handleUserInput(e, setQuestionFive)}
              placeholder="أدخل إجابتك هنا"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 text-right">
              6. ما نوع الربح الذي تتطلع لتحقيقه؟
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              value={questionSix}
              onChange={(e) => handleUserInput(e, setQuestionSix)}
              placeholder="أدخل إجابتك هنا"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={sendMessage}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? "جاري الإرسال..." : "إرسال"}
          </button>
          <button
            onClick={clearChat}
            className="px-6 py-2 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            مسح الدردشة
          </button>
        </div>
      </div>
      <img src={encu} alt="encu"/>

    </div>
  );
};

export default App;
