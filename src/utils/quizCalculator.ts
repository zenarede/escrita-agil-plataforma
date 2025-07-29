import { QuizQuestion, Arquetipo } from '@/hooks/useQuizData';
import { supabase } from '@/integrations/supabase/client';

export interface QuizResult {
  arquetipo: Arquetipo;
  niveis: {
    Entusiasta: string;
    Sensível: string;
    'Mente Aberta': string;
    Organizado: string;
    Técnico: string;
  };
  nivelConfianca: 'Alto' | 'Médio' | 'Baixo';
  similaridade: number;
}

// Mapeamento dos traços para as perguntas
const PERGUNTA_TRACO_MAP: Record<number, { traco: string; inverso: boolean }> = {
  1: { traco: 'Entusiasta', inverso: false },
  2: { traco: 'Entusiasta', inverso: true },
  3: { traco: 'Mente Aberta', inverso: false },
  4: { traco: 'Mente Aberta', inverso: true },
  5: { traco: 'Sensível', inverso: true },
  6: { traco: 'Sensível', inverso: false },
  7: { traco: 'Organizado', inverso: false },
  8: { traco: 'Organizado', inverso: true },
  9: { traco: 'Técnico', inverso: true },
  10: { traco: 'Técnico', inverso: false },
  11: { traco: 'Entusiasta', inverso: false },
  12: { traco: 'Mente Aberta', inverso: false }
};

function processarRespostas(respostas: number[]): number[] {
  return respostas.map((resposta, index) => {
    const perguntaNum = index + 1;
    const config = PERGUNTA_TRACO_MAP[perguntaNum];
    return config?.inverso ? 6 - resposta : resposta;
  });
}

function calcularMediasPorTraco(respostasProcessadas: number[]): Record<string, number> {
  const medias: Record<string, number> = {};
  
  // Agrupar respostas por traço
  const respostasPorTraco: Record<string, number[]> = {};
  
  respostasProcessadas.forEach((resposta, index) => {
    const perguntaNum = index + 1;
    const config = PERGUNTA_TRACO_MAP[perguntaNum];
    if (config) {
      if (!respostasPorTraco[config.traco]) {
        respostasPorTraco[config.traco] = [];
      }
      respostasPorTraco[config.traco].push(resposta);
    }
  });
  
  // Calcular médias
  Object.keys(respostasPorTraco).forEach(traco => {
    const respostas = respostasPorTraco[traco];
    medias[traco] = respostas.reduce((sum, r) => sum + r, 0) / respostas.length;
  });
  
  return medias;
}

function classificarNivel(media: number): string {
  if (media >= 3.5) return 'Alto';
  if (media >= 2.5) return 'Médio';
  return 'Baixo';
}

function encontrarArquetipo(niveis: Record<string, string>, arquetipos: Arquetipo[], respostaP4: number): QuizResult {
  let melhorMatch: Arquetipo | null = null;
  let maiorSimilaridade = 0;
  
  arquetipos.forEach(arquetipo => {
    const niveisArquetipo = {
      'Entusiasta': arquetipo.entusiasta,
      'Sensível': arquetipo.sensivel,
      'Mente Aberta': arquetipo.mente_aberta,
      'Organizado': arquetipo.organizado,
      'Técnico': arquetipo.tecnico
    };
    
    let pontos = 0;
    let total = 0;
    
    Object.keys(niveis).forEach(traco => {
      total++;
      if (niveis[traco] === niveisArquetipo[traco as keyof typeof niveisArquetipo]) {
        pontos++;
      }
    });
    
    const similaridade = pontos / total;
    
    // Em caso de empate, usar pergunta 4 como desempate
    if (similaridade > maiorSimilaridade || 
        (similaridade === maiorSimilaridade && !melhorMatch) ||
        (similaridade === maiorSimilaridade && melhorMatch && 
         Math.abs(respostaP4 - 3) < Math.abs(respostaP4 - 3))) {
      maiorSimilaridade = similaridade;
      melhorMatch = arquetipo;
    }
  });
  
  // Determinar nível de confiança
  let nivelConfianca: 'Alto' | 'Médio' | 'Baixo';
  if (maiorSimilaridade >= 0.8) nivelConfianca = 'Alto';
  else if (maiorSimilaridade >= 0.6) nivelConfianca = 'Médio';
  else nivelConfianca = 'Baixo';
  
  return {
    arquetipo: melhorMatch!,
    niveis: niveis as any,
    nivelConfianca,
    similaridade: maiorSimilaridade
  };
}

export function calcularPerfil(respostas: number[], arquetipos: Arquetipo[]): QuizResult {
  // 1. Processar respostas (inverter quando necessário)
  const respostasProcessadas = processarRespostas(respostas);
  
  // 2. Calcular médias por traço
  const medias = calcularMediasPorTraco(respostasProcessadas);
  
  // 3. Converter para níveis
  const niveis: Record<string, string> = {};
  Object.keys(medias).forEach(traco => {
    niveis[traco] = classificarNivel(medias[traco]);
  });
  
  // 4. Encontrar arquétipo mais próximo
  const resultado = encontrarArquetipo(niveis, arquetipos, respostas[3]);
  
  return resultado;
}

export function salvarResultado(resultado: QuizResult, respostas: number[], userId?: string) {
  const dadosResultado = {
    user_id: userId || null,
    arquetipo_nome: resultado.arquetipo.nome,
    respostas: respostas,
    niveis_calculados: resultado.niveis,
    nivel_confianca: resultado.nivelConfianca,
    session_id: !userId ? crypto.randomUUID() : null
  };
  
  // Salvar no localStorage para usuários não logados
  if (!userId) {
    localStorage.setItem('zodiacoProfissional_ultimoResultado', JSON.stringify(dadosResultado));
  }
  
  return supabase.from('quiz_results').insert(dadosResultado);
}