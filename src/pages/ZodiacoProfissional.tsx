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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cdefs%3E%3Cpattern id=%22grid%22 width=%2210%22 height=%2210%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M 10 0 L 0 0 0 10%22 fill=%22none%22 stroke=%22rgb(255,255,255)%22 stroke-width=%220.1%22 opacity=%220.1%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22100%22 height=%22100%22 fill=%22url(%23grid)%22/%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section - only show when quiz hasn't started */}
        {respostas.length === 0 && (
          <div className="py-16 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Glow effect background */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 font-aristotelica leading-tight">
                  Zodíaco Profissional
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Descubra seu superpoder profissional oculto com nosso teste científico baseado no modelo Big Five
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  <Card className="bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-white font-aristotelica">Científico</h3>
                      <p className="text-slate-300 leading-relaxed">Baseado no modelo Big Five de personalidade</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <TrendingUp className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-white font-aristotelica">Rápido</h3>
                      <p className="text-slate-300 leading-relaxed">Apenas 12 perguntas, 2 minutos do seu tempo</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <Star className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-white font-aristotelica">Personalizado</h3>
                      <p className="text-slate-300 leading-relaxed">Recomendações específicas para sua carreira</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Section */}
        <div className="py-8">
          <div className="max-w-3xl mx-auto">
            {questions && questions.length > 0 && (
              <>
                {/* Fixed Header with Progress Bar */}
                <Card className="mb-8 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/20">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-white font-aristotelica">
                        Zodíaco Profissional
                      </h2>
                      <div className="text-right">
                        <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          {Math.round(progress)}%
                        </span>
                        <p className="text-sm text-slate-300">concluído</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-slate-300">
                          Pergunta {currentQuestion + 1} de {totalQuestions}
                        </span>
                      </div>
                      
                      <div className="relative">
                        <Progress 
                          value={progress} 
                          className="h-3 bg-white/10 border border-white/20"
                        />
                        <div 
                          className="absolute top-0 left-0 h-3 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full shadow-lg shadow-purple-500/50 transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Question */}
                <Card className="mb-8 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/20 hover:shadow-purple-500/10 transition-all duration-300">
                  <CardContent className="p-8">
                    <QuizQuestion
                      question={questions[currentQuestion]}
                      value={respostas[currentQuestion] || null}
                      onChange={handleAnswer}
                    />
                  </CardContent>
                </Card>

                {/* Navigation */}
                {respostas[currentQuestion] && (
                  <div className="flex justify-between">
                    <Button 
                      onClick={goToPrevious}
                      variant="outline"
                      disabled={currentQuestion === 0}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 text-lg"
                    >
                      Anterior
                    </Button>
                    
                    {currentQuestion < totalQuestions - 1 ? (
                      <Button 
                        onClick={goToNext}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 px-8 py-3 text-lg"
                      >
                        Próxima
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => finalizarTeste(respostas)}
                        className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 px-8 py-3 text-lg"
                      >
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