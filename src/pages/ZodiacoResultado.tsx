import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizResult } from '@/components/QuizResult';
import { useUserQuizResult } from '@/hooks/useUserQuizResult';
import { useArquetipos } from '@/hooks/useQuizData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Brain, ArrowLeft } from 'lucide-react';
import type { QuizResult as QuizResultType } from '@/utils/quizCalculator';

export default function ZodiacoResultado() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: userQuizResult, isLoading: loadingResult } = useUserQuizResult();
  const { data: arquetipos, isLoading: loadingArquetipos } = useArquetipos();
  const [resultado, setResultado] = useState<QuizResultType | null>(null);

  useEffect(() => {
    if (userQuizResult && arquetipos) {
      // Encontrar o arquétipo correspondente
      const arquetipo = arquetipos.find(arq => arq.nome === userQuizResult.arquetipo_nome);
      
      if (arquetipo) {
        setResultado({
          arquetipo,
          niveis: userQuizResult.niveis_calculados as any,
          nivelConfianca: userQuizResult.nivel_confianca as 'Alto' | 'Médio' | 'Baixo',
          similaridade: 1 // Não precisamos calcular novamente
        });
      }
    }
  }, [userQuizResult, arquetipos]);

  const handleUpgrade = () => {
    toast({
      title: "Em breve",
      description: "Sistema de pagamento será implementado em breve.",
    });
  };

  const handleLogin = () => {
    sessionStorage.setItem('redirectAfterLogin', '/zodiaco-resultado');
    window.location.href = '/login';
  };

  if (loadingResult || loadingArquetipos) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando resultado...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 pt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="text-center py-12">
            <CardContent>
              <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Login Necessário</h2>
              <p className="text-muted-foreground mb-6">
                Você precisa estar logado para ver seus resultados do Zodíaco Profissional.
              </p>
              <Button onClick={handleLogin}>
                Fazer Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!userQuizResult || !resultado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 pt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="text-center py-12">
            <CardContent>
              <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Nenhum Resultado Encontrado</h2>
              <p className="text-muted-foreground mb-6">
                Você ainda não fez o teste do Zodíaco Profissional.
              </p>
              <Link to="/zodiaco-profissional">
                <Button>
                  Fazer Teste Agora
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 pt-20">
      <div className="container mx-auto px-4 max-w-4xl py-8">
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Seu Zodíaco Profissional
          </h1>
          <p className="text-muted-foreground">
            Resultado do teste realizado em {new Date(userQuizResult.created_at).toLocaleDateString('pt-BR')}
          </p>
        </div>
        
        <QuizResult 
          result={resultado} 
          onUpgrade={handleUpgrade}
          onLogin={handleLogin}
        />
        
        <div className="text-center mt-8">
          <Link to="/zodiaco-profissional">
            <Button variant="outline">
              Fazer Teste Novamente
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}