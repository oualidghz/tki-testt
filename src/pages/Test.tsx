import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { questions, answerMapping, type TestResult } from "@/lib/index";
import { ProgressBar } from "@/components/ProgressBar";
import { QuestionCard } from "@/components/QuestionCard";

export default function Test() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B'>>({});
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnswered = answers[currentQuestion.id] !== undefined;

  const handleAnswer = (answer: 'A' | 'B') => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      const results = calculateResults(newAnswers);
      navigate('/results', { state: { results } });
    } else {
      setTimeout(() => {
        setDirection('forward');
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };

  const calculateResults = (finalAnswers: Record<string, 'A' | 'B'>): TestResult => {
    const scores: Record<string, number> = {
      competition: 0,
      collaboration: 0,
      compromis: 0,
      evitement: 0,
      accommodement: 0
    };

    Object.entries(finalAnswers).forEach(([questionId, answer]) => {
      const style = answerMapping[questionId][answer];
      scores[style] += 1;
    });

    const totalAnswers = Object.keys(finalAnswers).length;
    const percentages: Record<string, number> = {};

    Object.entries(scores).forEach(([style, score]) => {
      percentages[style] = parseFloat(((score / totalAnswers) * 100).toFixed(1));
    });

    const maxScore = Math.max(...Object.values(scores));
    const dominantStyles = Object.entries(scores)
      .filter(([_, score]) => score === maxScore)
      .map(([style]) => style);

    const dominantStyle = dominantStyles.length > 1 ? 'mixte' : dominantStyles[0];

    return {
      scores,
      percentages,
      dominantStyle,
      totalAnswers
    };
  };

  const variants = {
    enter: (direction: 'forward' | 'backward') => ({
      opacity: 0,
      y: direction === 'forward' ? 20 : -20
    }),
    center: {
      opacity: 1,
      y: 0
    },
    exit: (direction: 'forward' | 'backward') => ({
      opacity: 0,
      y: direction === 'forward' ? -20 : 20
    })
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Test TKI
            </h1>
            {/* <p className="text-muted-foreground">
              Question {currentQuestionIndex + 1} sur {questions.length}
            </p> */}
          </div>

          <ProgressBar
            current={currentQuestionIndex + 1}
            total={questions.length}
            className="mb-12"
          />

          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentQuestion.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.3 },
                  y: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
                className="w-full"
              >
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}