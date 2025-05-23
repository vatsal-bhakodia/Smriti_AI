"use client";
import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react";

type ReviewQuestionProps = {
  quizData: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }[];
  userAnswers: (string | null)[];
  returnToResults: () => void;
};

export default function QuizReview({
  quizData,
  userAnswers,
  returnToResults,
}: ReviewQuestionProps) {
  // Find indexes of questions answered incorrectly
  const incorrectQuestions = userAnswers
    .map((answer, index) => ({
      index,
      isCorrect: answer === quizData[index].answer,
    }))
    .filter((item) => !item.isCorrect)
    .map((item) => item.index);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Get the current question index from the list of incorrect questions
  const currentQuestionIndex = incorrectQuestions[currentIndex];
  const currentQuestion = quizData[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    setShowAnswer(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(incorrectQuestions.length - 1, prev + 1)
    );
    setShowAnswer(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setShowAnswer((prev) => !prev)}
          className="text-xs bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-600 transition-colors w-auto flex items-center justify-center gap-2"
        >
          {showAnswer ? (
            <>
              <EyeOff className="w-4 h-4" />
              Hide Correct Answer
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Show Correct Answer
            </>
          )}
        </button>
        <span className="text-sm text-gray-400">
          {currentIndex + 1} of {incorrectQuestions.length}
        </span>
      </div>

      <div className="w-full h-2 bg-zinc-700 rounded-full mb-6">
        <div
          className="h-2 bg-zinc-500 rounded-full transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / incorrectQuestions.length) * 100}%`,
          }}
        />
      </div>
      <div>
        <h3 className="text-base md:text-lg font-semibold mb-4">
          {currentQuestionIndex + 1}&#41; {currentQuestion.question}
        </h3>
        <div className="space-y-3">
          {currentQuestion.options.map((opt) => (
            <div key={opt}>
              <div
                className={`p-3 text-sm rounded border ${
                  showAnswer && opt === currentQuestion.answer
                    ? "bg-lime-500/20 border-lime-500 text-white font-bold"
                    : opt === userAnswer
                    ? "bg-red-500/20 border-red-500 text-white"
                    : "border-white/10 bg-zinc-800"
                }`}
              >
                <div>{opt}</div>
                {/* Show explanation below the correct answer only */}
                {showAnswer && opt === currentQuestion.answer && (
                  <div className="mt-4 p-4 bg-zinc-800 rounded border-l-4 border-primary">
                    <h4 className="font-semibold text-primary mb-2">
                      Explanation:
                    </h4>
                    <p className="text-xs font-medium">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <div>
          {currentIndex > 0 ? (
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-600 transition-colors"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
          ) : (
            <button
              onClick={returnToResults}
              className="flex items-center gap-2 bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-600 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Results
            </button>
          )}
        </div>

        <div>
          {currentIndex < incorrectQuestions.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded hover:bg-lime-300 transition-colors"
            >
              Next
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={returnToResults}
              className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded hover:bg-lime-300 transition-colors"
            >
              Finish Review
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
