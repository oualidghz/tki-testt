import { motion } from "framer-motion";
import { Question } from "@/lib/index";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: 'A' | 'B') => void;
  className?: string;
}

export function QuestionCard({ question, onAnswer, className }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "w-full max-w-2xl mx-auto bg-card rounded-xl shadow-lg p-8",
        className
      )}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <motion.button
            onClick={() => onAnswer('A')}
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-6 text-left bg-primary/5 hover:bg-primary/10 border-2 border-border hover:border-primary rounded-xl transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                A
              </div>
              <p className="text-foreground text-base leading-relaxed pt-1.5">
                {question.textA}
              </p>
            </div>
          </motion.button>

          <motion.button
            onClick={() => onAnswer('B')}
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-6 text-left bg-primary/5 hover:bg-primary/10 border-2 border-border hover:border-primary rounded-xl transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                B
              </div>
              <p className="text-foreground text-base leading-relaxed pt-1.5">
                {question.textB}
              </p>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}