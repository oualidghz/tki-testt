import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ResultsChart } from "@/components/ResultsChart";
import { TestResult, conflictStyles, interpretationTexts } from "@/lib/index";

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const [results, setResults] = useState<TestResult | null>(null);

  useEffect(() => {
    const state = location.state as { results?: TestResult };
    if (state?.results) {
      setResults(state.results);
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);

  if (!results) {
    return null;
  }

  const dominantStyle = conflictStyles.find(s => s.id === results.dominantStyle);
  const sortedStyles = conflictStyles
    .map(style => ({
      ...style,
      percentage: results.percentages[style.id] || 0
    }))
    .sort((a, b) => b.percentage - a.percentage);

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>

          <Card className="p-8 md:p-12 shadow-lg">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Vos Résultats
              </h1>
              <div className="inline-block px-6 py-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Style dominant</p>
                <h2 className="text-2xl md:text-3xl font-bold" style={{ color: dominantStyle?.color }}>
                  {dominantStyle?.name}
                </h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-12"
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">Répartition des styles</h3>
              <div className="space-y-6">
                {sortedStyles.map((style, index) => (
                  <motion.div
                    key={style.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{style.name}</span>
                      <span className="text-sm font-semibold" style={{ color: style.color }}>
                        {style.percentage.toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={style.percentage} 
                      className="h-3"
                      style={{
                        ['--progress-background' as string]: style.color
                      } as React.CSSProperties}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mb-12"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">Graphique des résultats</h3>
              <ResultsChart results={results} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="bg-muted/50 rounded-lg p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">Interprétation</h3>
              <p className="text-base text-foreground/90 leading-relaxed">
                {interpretationTexts[results.dominantStyle]}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex justify-center"
            >
              <Button
                onClick={handleRestart}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-6 text-base shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Recommencer le test
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}