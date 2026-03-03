import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-8 md:p-12 shadow-lg">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Test Thomas-Kilmann
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-primary mb-2">
  Styles de Gestion de Conflits (TKI)
</h2>

<p className="text-base md:text-lg font-semibold text-foreground">
  Réalisé par Oualid El Gholbzouri
</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="bg-muted/50 rounded-lg p-6 space-y-4"
            >
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Découvrez votre style dominant de gestion de conflits à travers ce test éducatif basé sur le modèle Thomas-Kilmann. Ce questionnaire vous aidera à mieux comprendre vos préférences naturelles face aux situations conflictuelles.
              </p>

              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span className="text-sm md:text-base">
                  Durée estimée du test : environ 2 minutes
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="pt-4"
            >
              <Link to="/test">
                <Button
                  size="lg"
                  className="w-full md:w-auto px-8 py-6 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
                >
                  Commencer le test
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="pt-6 border-t border-border"
            >
              
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}