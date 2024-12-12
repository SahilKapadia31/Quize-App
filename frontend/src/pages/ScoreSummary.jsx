import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import only the necessary icon
import { useParams } from "react-router-dom";
import api from "../api/api";

const ScoreSummary = () => {
  const { score, totalQuestions, quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await api.get(`/quizzes/${quizId}`);
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  if (!quiz) return <div className="mt-10 text-center text-white">Loading...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen p-8 text-white bg-gray-900">
      <h1 className="mb-8 text-4xl font-extrabold">Quiz Results</h1>
      <div className="w-full max-w-3xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <p className="mb-6 text-2xl">
          Score: <span className="font-bold text-green-400">{score}</span> / {totalQuestions}
        </p>

        <div>
          <h2 className="mb-6 text-3xl font-semibold text-green-400">Summary</h2>
          <ul className="space-y-6">
            {quiz.questions.map((question, index) => (
              <li key={index} className="p-6 bg-gray-700 border border-gray-700 rounded-lg">
                <p className="mb-3 font-bold">
                  {index + 1}. {question.question}
                </p>
                <p className="flex items-center text-green-300">
                  <FaCheckCircle className="mr-2" /> Correct Answer: {question.correctAnswer}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="/"
          className="inline-block px-6 py-3 mt-8 font-bold text-gray-900 transition-transform transform bg-green-500 rounded-lg hover:scale-105"
        >
          Take Another Quiz
        </a>
      </div>
    </div>
  );
};

export default ScoreSummary;