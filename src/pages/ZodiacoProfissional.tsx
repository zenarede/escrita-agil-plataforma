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
import { Brain, Star, Users, TrendingUp, Target, Sparkles, Clock } from 'lucide-react';
import type { QuizResult as QuizResultType } from '@/utils/quizCalculator';
import personasImage from '@/assets/professional-personas.jpg';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20">
      <div className="container mx-auto px-4">
        {/* Hero Section - only show when quiz hasn't started */}
        {respostas.length === 0 && (
          <div className="py-16">
            <div className="max-w-6xl mx-auto">
              {/* Main Hero */}
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                  O que você <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">nasceu para fazer</span>?
                </h1>
                <p className="text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Em 2 minutos, descubra sua vocação com base na ciência — e veja quais caminhos profissionais realmente combinam com você.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Brain className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-2xl mb-4 text-gray-900">Científico</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Fundado no modelo Big Five — o mesmo usado por recrutadores e psicólogos do mundo todo.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-2xl mb-4 text-gray-900">Rápido</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    12 perguntas. 2 minutos. E um mapa claro de onde você pode brilhar profissionalmente.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-2xl mb-4 text-gray-900">Personalizado</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Receba ideias de cursos e carreiras que combinam com você. Do seu jeito. No seu tempo.
                  </p>
                </div>
              </div>

              {/* Professional Personas Image */}
              <div className="text-center mb-16">
                <img 
                  src={personasImage} 
                  alt="Diferentes perfis profissionais" 
                  className="mx-auto rounded-2xl shadow-2xl max-w-2xl w-full"
                />
              </div>

              {/* Testimonials */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                  O que quem já fez o teste diz:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <p className="text-gray-600 italic text-lg mb-4">
                      "Nunca imaginei que minha vocação estivesse tão longe da área em que estudei. Foi um choque bom."
                    </p>
                    <p className="font-semibold text-gray-900">Camila, 27 anos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 italic text-lg mb-4">
                      "O teste me mostrou exatamente onde eu poderia usar meus pontos fortes. Mudou minha perspectiva de carreira."
                    </p>
                    <p className="font-semibold text-gray-900">Rafael, 32 anos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA forte antes do teste */}
        {questions && questions.length > 0 && respostas.length === 0 && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                <Target className="mr-3 h-8 w-8" />
                Pronto para descobrir sua profissão ideal?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Responda abaixo e receba seu perfil com recomendações personalizadas!
              </p>
            </div>
          </div>
        )}

        {/* Quiz Section */}
        <div className="py-8">
          <div className="max-w-3xl mx-auto">
            {questions && questions.length > 0 && respostas.length > 0 && (
              <>
                {/* Fixed Header with Progress Bar */}
                <Card className="mb-8 shadow-lg border-0 bg-white">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Seu Perfil Profissional
                      </h2>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-blue-700">
                          {Math.round(progress)}%
                        </span>
                        <p className="text-sm text-gray-600">concluído</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-700">
                          Pergunta {currentQuestion + 1} de {totalQuestions}
                        </span>
                        <span className="text-blue-600 font-medium">
                          🚀 Falta pouco para você descobrir sua melhor versão profissional!
                        </span>
                      </div>
                      
                      <div className="relative">
                        <Progress 
                          value={progress} 
                          className="h-4 bg-gray-200 shadow-inner"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Question */}
                <Card className="mb-8 shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow duration-300">
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
                      className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-gray-300"
                    >
                      Anterior
                    </Button>
                    
                    {currentQuestion < totalQuestions - 1 ? (
                      <Button 
                        onClick={goToNext}
                        className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                      >
                        Próxima
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => finalizarTeste(respostas)}
                        className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
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