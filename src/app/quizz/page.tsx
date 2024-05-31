"use client";

import ProgressBar from "@/components/progressBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import { boolean } from "drizzle-orm/pg-core";
const questions = [
  {
    questionText: "What is React?",
    answers: [
      {
        answerText: "A library for building user interfaces",
        isCorrect: true,
        id: 1,
      },
      {
        answerText: "A frontend framework",
        isCorrect: true,
        id: 2,
      },
      {
        answerText: "A backend framework",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "A database",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    questionText: "Who maintains React?",
    answers: [
      {
        answerText: "Google",
        isCorrect: false,
        id: 1,
      },
      {
        answerText: "Facebook (Meta)",
        isCorrect: true,
        id: 2,
      },
      {
        answerText: "Microsoft",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "Twitter",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    questionText: "What is JSX?",
    answers: [
      {
        answerText: "A CSS framework",
        isCorrect: false,
        id: 1,
      },
      {
        answerText: "A syntax extension for JavaScript",
        isCorrect: true,
        id: 2,
      },
      {
        answerText: "A database query language",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "A version control system",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    questionText: "What is a component in React?",
    answers: [
      {
        answerText: "A function or class that renders part of the UI",
        isCorrect: true,
        id: 1,
      },
      {
        answerText: "A type of database",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "A CSS preprocessor",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "A built-in browser API",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    questionText: "What is the Virtual DOM in React?",
    answers: [
      {
        answerText: "A direct representation of the actual DOM",
        isCorrect: false,
        id: 1,
      },
      {
        answerText: "A lightweight copy of the actual DOM",
        isCorrect: true,
        id: 2,
      },
      {
        answerText: "A type of database schema",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "A backend service",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    questionText: "How do you create a React component?",
    answers: [
      {
        answerText: "Using a function or a class",
        isCorrect: true,
        id: 1,
      },
      {
        answerText: "Using an HTML tag",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "Using a CSS rule",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "Using a JSON object",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    questionText: "How do you pass data to a React component?",
    answers: [
      {
        answerText: "Using props",
        isCorrect: true,
        id: 1,
      },
      {
        answerText: "Using states",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "Using context",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "Using cookies",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    questionText: "What is the useState hook used for in React?",
    answers: [
      {
        answerText: "To manage component state",
        isCorrect: true,
        id: 1,
      },
      {
        answerText: "To fetch data from an API",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "To apply CSS styles",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "To create a new component",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    questionText: "What is the purpose of useEffect hook in React?",
    answers: [
      {
        answerText: "To perform side effects in function components",
        isCorrect: true,
        id: 1,
      },
      {
        answerText: "To manage component state",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "To create a context",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "To write unit tests",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    questionText: "How do you handle events in React?",
    answers: [
      {
        answerText: "By attaching event listeners directly in HTML",
        isCorrect: false,
        id: 1,
      },
      {
        answerText: "By using synthetic events",
        isCorrect: true,
        id: 2,
      },
      {
        answerText: "By using jQuery",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "By writing server-side code",
        isCorrect: false,
        id: 4,
      },
    ],
  },
];
export default function Home() {
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleNext = () => {
    if (!started) {
      setStarted(true);
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer.id);
    const isCurrentCorrect = answer.isCorrect;
    if (isCurrentCorrect) {
      setScore(score + 1);
    }
    setIsCorrect(isCurrentCorrect);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
        <header
          className="grid grid-cols-[auto,1fr,auto]
grid-flow-col items-center justify-between py-2 gap-2"
        >
          <Button
            size="icon"
            variant="outline"
          >
            <ChevronLeft />
          </Button>
          <ProgressBar value={(currentQuestion / questions.length) * 100} />

          <Button
            size="icon"
            variant="outline"
          >
            <X />
          </Button>
        </header>
      </div>
      <main className="flex justify-center flex-1">
        {!started ? (
          <h1 className="text-3xl font-bold">Hello to quizz page👋</h1>
        ) : (
          <div>
            <h2 className="text-3xl font-bold">
              {questions[currentQuestion].questionText}
            </h2>
            <div className="grid grid-cols-1 gap-6 mt-6">
              {questions[currentQuestion].answers.map((answer) => {
                return (
                  <Button
                    key={answer.id}
                    variant={"secondary"}
                    onClick={() => handleAnswer(answer)}
                  >
                    {answer.answerText}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <footer className="footer pb-9 px-6 relative mb-0">
        <p>{isCorrect ? "correct" : "incorrect"}</p>
        <Button onClick={handleNext}>{!started ? "Start" : "Next"}</Button>
      </footer>
    </div>
  );
}
