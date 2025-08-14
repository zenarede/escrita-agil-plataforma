import { describe, it, expect } from 'vitest'
import { calcularPerfil } from '@/utils/quizCalculator'
import { Arquetipo } from '@/hooks/useQuizData'

const mockArquetipos: Arquetipo[] = [
  {
    id: '1',
    nome: 'Comunicador',
    entusiasta: 'Alto',
    sensivel: 'Alto',
    mente_aberta: 'Alto',
    organizado: 'Médio',
    tecnico: 'Baixo',
    descricao: 'Pessoa comunicativa',
    carreiras_favoraveis: ['Marketing', 'Vendas'],
    cursos_sugeridos: ['comunicacao'],
    cursos_indicados: ['comunicacao'],
  },
  {
    id: '2',
    nome: 'Analista',
    entusiasta: 'Baixo',
    sensivel: 'Baixo',
    mente_aberta: 'Médio',
    organizado: 'Alto',
    tecnico: 'Alto',
    descricao: 'Pessoa analítica',
    carreiras_favoraveis: ['TI', 'Finanças'],
    cursos_sugeridos: ['analise'],
    cursos_indicados: ['analise'],
  },
]

describe('quizCalculator', () => {
  it('should calculate profile correctly for high extrovert scores', () => {
    // Respostas que indicam alto entusiasmo, alta sensibilidade, mente aberta
    const respostas = [5, 1, 5, 1, 1, 5, 3, 3, 3, 3, 5, 5]
    
    const resultado = calcularPerfil(respostas, mockArquetipos)
    
    expect(resultado.arquetipo.nome).toBe('Comunicador')
    expect(resultado.niveis.Entusiasta).toBe('Alto')
    expect(resultado.niveis.Sensível).toBe('Alto')
    expect(resultado.niveis['Mente Aberta']).toBe('Alto')
  })

  it('should calculate profile correctly for analytical scores', () => {
    // Respostas que indicam baixo entusiasmo, baixa sensibilidade, alta organização e técnico
    const respostas = [1, 5, 3, 3, 5, 1, 5, 1, 1, 5, 1, 3]
    
    const resultado = calcularPerfil(respostas, mockArquetipos)
    
    expect(resultado.arquetipo.nome).toBe('Analista')
    expect(resultado.niveis.Entusiasta).toBe('Baixo')
    expect(resultado.niveis.Organizado).toBe('Alto')
    expect(resultado.niveis.Técnico).toBe('Alto')
  })

  it('should return appropriate confidence level', () => {
    const respostas = [5, 1, 5, 1, 1, 5, 3, 3, 3, 3, 5, 5]
    
    const resultado = calcularPerfil(respostas, mockArquetipos)
    
    expect(['Alto', 'Médio', 'Baixo']).toContain(resultado.nivelConfianca)
    expect(typeof resultado.similaridade).toBe('number')
    expect(resultado.similaridade).toBeGreaterThanOrEqual(0)
    expect(resultado.similaridade).toBeLessThanOrEqual(1)
  })
})