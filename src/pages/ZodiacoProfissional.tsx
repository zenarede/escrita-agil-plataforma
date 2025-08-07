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
import studentImage from '@/assets/student-professional.jpg';

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
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/5 pt-20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Zodiac Constellations */}
        <div className="absolute top-20 left-10 opacity-10 text-primary">
          <svg width="60" height="60" viewBox="0 0 60 60" className="animate-pulse">
            <circle cx="10" cy="10" r="1" fill="currentColor" />
            <circle cx="30" cy="15" r="1.5" fill="currentColor" />
            <circle cx="50" cy="20" r="1" fill="currentColor" />
            <circle cx="15" cy="35" r="1" fill="currentColor" />
            <circle cx="45" cy="40" r="1.5" fill="currentColor" />
            <circle cx="25" cy="50" r="1" fill="currentColor" />
            <path d="M10 10 L30 15 L50 20 M15 35 L25 50 L45 40" stroke="currentColor" strokeWidth="0.5" opacity="0.7"/>
          </svg>
        </div>
        
        <div className="absolute top-40 right-20 opacity-10 text-secondary">
          <svg width="80" height="80" viewBox="0 0 80 80" className="animate-pulse" style={{animationDelay: "1s"}}>
            <circle cx="20" cy="20" r="1.5" fill="currentColor" />
            <circle cx="40" cy="10" r="1" fill="currentColor" />
            <circle cx="60" cy="25" r="1.5" fill="currentColor" />
            <circle cx="30" cy="45" r="1" fill="currentColor" />
            <circle cx="50" cy="60" r="1.5" fill="currentColor" />
            <path d="M20 20 L40 10 L60 25 M30 45 L50 60" stroke="currentColor" strokeWidth="0.5" opacity="0.7"/>
          </svg>
        </div>

        {/* Professional Icons Scattered */}
        <div className="absolute top-60 left-20 opacity-8 text-muted-foreground">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-fade-in">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        </div>

        <div className="absolute top-80 right-40 opacity-8 text-muted-foreground">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-fade-in" style={{animationDelay: "0.5s"}}>
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="m22 7-10 5L2 7"/>
          </svg>
        </div>

        <div className="absolute bottom-40 left-40 opacity-8 text-muted-foreground">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-fade-in" style={{animationDelay: "1.5s"}}>
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            <rect x="4" y="20" width="16" height="2" rx="1"/>
            <rect x="8" y="6" width="8" height="2" rx="1"/>
            <rect x="8" y="10" width="8" height="2" rx="1"/>
            <rect x="8" y="14" width="5" height="2" rx="1"/>
          </svg>
        </div>

        {/* Zodiac Symbols */}
        <div className="absolute top-96 right-10 opacity-6 text-primary/50 text-2xl font-serif animate-fade-in" style={{animationDelay: "2s"}}>
          ♈ ♊ ♌
        </div>
        
        <div className="absolute bottom-60 left-10 opacity-6 text-secondary/50 text-2xl font-serif animate-fade-in" style={{animationDelay: "2.5s"}}>
          ♏ ♐ ♓
        </div>

        {/* More Professional Elements */}
        <div className="absolute top-32 right-60 opacity-8 text-muted-foreground">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-fade-in" style={{animationDelay: "3s"}}>
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        </div>

        <div className="absolute bottom-20 right-20 opacity-8 text-muted-foreground">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-fade-in" style={{animationDelay: "3.5s"}}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>

        {/* Subtle Career Path Lines */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="career-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#career-grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section - only show when quiz hasn't started */}
        {respostas.length === 0 && (
          <div className="py-12">
            <div className="max-w-6xl mx-auto">
              {/* Main Hero with Image */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div className="text-left">
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                    O que você <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">nasceu para fazer</span>?
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Em 2 minutos, descubra sua vocação com base na ciência — e veja quais caminhos profissionais realmente combinam com você.
                  </p>
                  
                  {/* CTA Button */}
                  <div className="mb-8">
                    <Button 
                      onClick={() => {
                        const firstQuestion = document.getElementById('quiz-start');
                        firstQuestion?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      size="lg"
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Começar Meu Zodíaco Profissional
                    </Button>
                  </div>
                </div>
                
                <div className="text-center">
                  <img 
                    src={studentImage} 
                    alt="Estudante descobrindo sua vocação profissional" 
                    className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
                  />
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Brain className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">Científico</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Fundado no modelo Big Five — o mesmo usado por recrutadores e psicólogos do mundo todo.
                  </p>
                </div>
                
                <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <Clock className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">Rápido</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    12 perguntas. 2 minutos. E um mapa claro de onde você pode brilhar profissionalmente.
                  </p>
                </div>
                
                <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <Target className="h-7 w-7 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">Personalizado</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Receba ideias de cursos e carreiras que combinam com você. Do seu jeito. No seu tempo.
                  </p>
                </div>
              </div>

              {/* Testimonials */}
              <div className="bg-card rounded-2xl p-8 shadow-lg mb-12 border">
                <h3 className="text-2xl font-bold text-foreground text-center mb-8">
                  O que quem já fez o teste diz:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <p className="text-muted-foreground italic text-lg mb-4">
                      "Nunca imaginei que minha vocação estivesse tão longe da área em que estudei. Foi um choque bom."
                    </p>
                    <p className="font-semibold text-foreground">Camila, 27 anos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground italic text-lg mb-4">
                      "O teste me mostrou exatamente onde eu poderia usar meus pontos fortes. Mudou minha perspectiva de carreira."
                    </p>
                    <p className="font-semibold text-foreground">Rafael, 32 anos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Start Section */}
        <div id="quiz-start" className="py-8">
          <div className="max-w-4xl mx-auto">
            {/* CTA forte antes do teste */}
            {questions && questions.length > 0 && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center text-primary-foreground shadow-xl">
                  <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                    <Target className="mr-3 h-8 w-8" />
                    Pronto para descobrir sua profissão ideal?
                  </h2>
                  <p className="text-xl mb-6 opacity-90">
                    Responda abaixo e receba seu perfil com recomendações personalizadas!
                  </p>
                  {respostas.length === 0 && (
                    <Button 
                      onClick={() => setCurrentQuestion(0)}
                      variant="secondary"
                      size="lg"
                      className="bg-background text-foreground hover:bg-background/90 font-semibold px-8 py-3"
                    >
                      Iniciar Teste Agora
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Quiz Questions */}
            {questions && questions.length > 0 && currentQuestion >= 0 && (
              <>
                {/* Fixed Header with Progress Bar */}
                <Card className="mb-8 shadow-lg bg-card border">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-foreground">
                        Seu Perfil Profissional
                      </h2>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-primary">
                          {Math.round(progress)}%
                        </span>
                        <p className="text-sm text-muted-foreground">concluído</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-foreground">
                          Pergunta {currentQuestion + 1} de {totalQuestions}
                        </span>
                        <span className="text-primary font-medium">
                          🚀 Falta pouco para você descobrir sua melhor versão profissional!
                        </span>
                      </div>
                      
                      <div className="relative">
                        <Progress 
                          value={progress} 
                          className="h-4"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Question */}
                <Card className="mb-8 shadow-xl bg-card border hover:shadow-2xl transition-shadow duration-300">
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
                      className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </Button>
                    
                    {currentQuestion < totalQuestions - 1 ? (
                      <Button 
                        onClick={goToNext}
                        className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
                      >
                        Próxima
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => finalizarTeste(respostas)}
                        className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
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