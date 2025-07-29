import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QuizQuestion } from '@/components/QuizQuestion';
import { QuizResult } from '@/components/QuizResult';
import { useQuizQuestions, useArquetipos } from '@/hooks/useQuizData';
import { calcularPerfil, salvarResultado } from '@/utils/quizCalculator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Brain, Star, Users, TrendingUp } from 'lucide-react';
import type { QuizResult as QuizResultType } from '@/utils/quizCalculator';

export default function ZodiacoProfissional() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [resultado, setResultado] = useState<QuizResultType | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: questions, isLoading: loadingQuestions } = useQuizQuestions();
  const { data: arquetipos, isLoading: loadingArquetipos } = useArquetipos();

  const totalQuestions = questions?.length || 12;
  const progress = respostas.length > 0 ? ((respostas.length) / totalQuestions) * 100 : 0;

  const handleAnswer = (value: number) => {
    const newRespostas = [...respostas];
    newRespostas[currentQuestion] = value;
    setRespostas(newRespostas);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Finalizar teste
      finalizarTeste(newRespostas);
    }
  };

  const finalizarTeste = async (respostasFinais: number[]) => {
    if (!arquetipos) {
      toast({
        title: "Erro",
        description: "Dados dos arquétipos não carregados. Tente novamente.",
        variant: "destructive"
      });
      return;
    }

    try {
      const result = calcularPerfil(respostasFinais, arquetipos);
      setResultado(result);
      
      // Salvar resultado
      await salvarResultado(result, respostasFinais, user?.id);
      
      setShowResult(true);
      
      toast({
        title: "Teste concluído!",
        description: `Seu perfil é: ${result.arquetipo.nome}`,
      });
    } catch (error) {
      console.error('Erro ao finalizar teste:', error);
      toast({
        title: "Erro",
        description: "Erro ao processar resultado. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestion < totalQuestions - 1 && respostas[currentQuestion]) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const reiniciarTeste = () => {
    setCurrentQuestion(0);
    setRespostas([]);
    setResultado(null);
    setShowResult(false);
  };

  const handleUpgrade = () => {
    // TODO: Implementar integração com Stripe
    toast({
      title: "Em breve",
      description: "Sistema de pagamento será implementado em breve.",
    });
  };

  const handleLogin = () => {
    // Salvar a rota atual para retornar após o login
    sessionStorage.setItem('redirectAfterLogin', '/zodiaco-profissional');
    window.location.href = '/login';
  };

  if (loadingQuestions || loadingArquetipos) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando teste...</p>
        </div>
      </div>
    );
  }

  if (showResult && resultado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Seu Zodíaco Profissional
            </h1>
            <p className="text-muted-foreground">
              Baseado no modelo científico Big Five
            </p>
          </div>
          
          <QuizResult 
            result={resultado} 
            onUpgrade={handleUpgrade}
            onLogin={handleLogin}
          />
          
          <div className="text-center mt-8">
            <Button onClick={reiniciarTeste} variant="outline">
              Fazer Teste Novamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 pt-20">
      <div className="container mx-auto px-4">
        {/* Hero Section - only show when quiz hasn't started */}
        {respostas.length === 0 && (
          <div className="py-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                Zodíaco Profissional
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Descubra seu superpoder profissional oculto com nosso teste científico baseado no modelo Big Five
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="text-center">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Científico</h3>
                  <p className="text-sm text-muted-foreground">Baseado no modelo Big Five de personalidade</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Rápido</h3>
                  <p className="text-sm text-muted-foreground">Apenas 12 perguntas, 2 minutos do seu tempo</p>
                </div>
                <div className="text-center">
                  <Star className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Personalizado</h3>
                  <p className="text-sm text-muted-foreground">Recomendações específicas para sua carreira</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Section */}
        <div className="py-8">
          <div className="max-w-2xl mx-auto">
            {questions && questions.length > 0 && (
              <>
                {/* Fixed Header with Progress Bar */}
                <div className="mb-8 bg-background/80 backdrop-blur-sm rounded-lg p-4 border">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-foreground">
                      Zodíaco Profissional
                    </h2>
                    <span className="text-sm font-medium text-muted-foreground">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Pergunta {currentQuestion + 1} de {totalQuestions}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Question */}
                <QuizQuestion
                  question={questions[currentQuestion]}
                  value={respostas[currentQuestion] || null}
                  onChange={handleAnswer}
                />

                {/* Navigation */}
                {respostas[currentQuestion] && (
                  <div className="flex justify-between mt-6">
                    <Button 
                      onClick={goToPrevious}
                      variant="outline"
                      disabled={currentQuestion === 0}
                    >
                      Anterior
                    </Button>
                    
                    {currentQuestion < totalQuestions - 1 ? (
                      <Button onClick={goToNext}>
                        Próxima
                      </Button>
                    ) : (
                      <Button onClick={() => finalizarTeste(respostas)}>
                        Finalizar Teste
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}