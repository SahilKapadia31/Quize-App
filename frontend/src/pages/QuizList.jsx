import React, { useState, useEffect } from "react";
import { FaBook, FaArrowRight } from "react-icons/fa";
import api from "../api/api";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await api.get("/quizzes");
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="container min-h-screen p-8 mx-auto text-gray-100 bg-gray-900">
      <h1 className="mb-8 text-4xl font-extrabold text-center">
        <FaBook className="inline-block mr-3 text-teal-400" />
        Explore Quizzes
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="p-6 transition duration-300 transform bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-2"
          >
            <h2 className="mb-2 text-xl font-bold text-teal-400">{quiz.title}</h2>
            <p className="mb-4 text-gray-300">{quiz.description}</p>
            <a
              href={`/quiz/${quiz._id}`}
              className="flex items-center justify-center px-4 py-2 mt-4 font-semibold text-gray-900 transition-colors duration-300 bg-teal-500 rounded-lg hover:bg-teal-600"
            >
              Start Quiz <FaArrowRight className="ml-2" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;