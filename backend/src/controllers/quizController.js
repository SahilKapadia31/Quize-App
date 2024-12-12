// src/controllers/quizController.js
const Quiz = require("../models/quizModel");

// Get all quizzes
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().lean(); // Use lean() for better performance
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Error fetching quizzes", error: error.message });
  }
};

// Get quiz by ID
exports.getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findById(id).lean();
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    res.status(500).json({ message: "Error fetching quiz", error: error.message });
  }
};

// Submit quiz answers and calculate score
exports.submitQuiz = async (req, res) => {
  const { quizId, answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId).lean();
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Calculate the score
    const score = quiz.questions.reduce((acc, question, index) => {
      return acc + (question.correctAnswer === answers[index] ? 1 : 0);
    }, 0);

    res.status(200).json({
      score,
      totalQuestions: quiz.questions.length,
      quiz, // Full quiz object for reference
      userAnswers: answers, // User's answers array
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: "Error submitting quiz", error: error.message });
  }
};
