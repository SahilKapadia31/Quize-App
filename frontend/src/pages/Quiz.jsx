import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHome,
  } from "react-icons/fa"; // Import icons

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    api
      .get(`/quizzes/${id}`)
      .then((response) => {
        setQuiz(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
      });
  }, [id]);

  const handleAnswerChange = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const handleSubmit = () => {
    const quizData = {
      quizId: id,
      answers: Object.values(answers),
    };

    api
      .post("/quizzes/submit", quizData)
      .then((response) => {
        window.location.href = `/score/${response.data.score}/${response.data.totalQuestions}/${id}`;
      })
      .catch((error) => {
        console.error("Error submitting quiz:", error);
      });
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-r from-indigo-50 to-blue-100">
      <div className="flex items-start w-full max-w-screen-lg space-x-10">
        {/* Question Panel */}
        <div className="flex-grow p-8 bg-white rounded-lg shadow-lg">
          <h1 className="flex items-center mb-6 text-xl font-bold text-slate-800">
            {" "}
            {currentQuestion + 1}) {quiz.questions[currentQuestion].question}
          </h1>
          <div className="mb-6 space-y-3">
            {quiz.questions[currentQuestion].choices.map((choice, index) => (
              <label
                key={index}
                className="block p-4 transition-colors border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={choice}
                  checked={answers[currentQuestion] === choice}
                  onChange={() => handleAnswerChange(currentQuestion, choice)}
                  className="mr-3"
                />
                {choice}
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            {currentQuestion > 0 && (
              <button
                className="flex items-center px-4 py-2 font-bold text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                <FaArrowLeft className="mr-2" /> Previous
              </button>
            )}

            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                className="flex items-center px-4 py-2 font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
              >
                Next <FaArrowRight className="ml-2" />
              </button>
            ) : (
              <button
                className="flex items-center px-4 py-2 font-bold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                onClick={handleSubmit}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="p-6 bg-white rounded-lg shadow-lg w-80">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-700">Answered Status</h2>
            <div className="flex items-center justify-between mt-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-8 h-8 font-bold text-white bg-green-400 rounded-full">
                  {Object.keys(answers).length}
                </div>
                <p className="mt-1 text-xs">Answered</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-8 h-8 font-bold text-white bg-red-400 rounded-full">
                  {quiz.questions.length - Object.keys(answers).length}
                </div>
                <p className="mt-1 text-xs">Not Answered</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-8 h-8 font-bold text-white bg-gray-300 rounded-full">
                  {quiz.questions.length}
                </div>
                <p className="mt-1 text-xs">Total</p>
              </div>
            </div>
          </div>

          <h2 className="mb-2 text-lg font-bold text-gray-600">Questions</h2>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                className={`h-10 w-10 font-bold rounded-lg ${currentQuestion === index
                    ? "bg-blue-500 text-white"
                    : answers[index]
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            className="flex items-center justify-center w-full px-4 py-2 mt-4 font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={() => navigate("/")}
          >
            <FaHome className="mr-2" /> Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
