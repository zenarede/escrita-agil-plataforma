
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems = [
    {
      category: "Conta e Login",
      questions: [
        {
          question: "Como faço login na plataforma?",
          answer: "Você pode fazer login usando sua conta do Google. Clique no botão 'Entrar' e selecione 'Continuar com Google'. Após o primeiro login, você será redirecionado para completar seu perfil."
        },
        {
          question: "Preciso criar uma senha?",
          answer: "Não, utilizamos apenas login social com Google por segurança e praticidade. Você não precisa criar ou lembrar de senhas."
        },
        {
          question: "Posso alterar meus dados cadastrais?",
          answer: "Sim, você pode atualizar suas informações na página de perfil. Acesse através do menu 'Dashboard' após fazer login."
        }
      ]
    },
    {
      category: "Cursos e Conteúdo",
      questions: [
        {
          question: "Quais cursos estão disponíveis?",
          answer: "Oferecemos cursos especializados em escrita científica, incluindo TCC em 30 dias, Método RAC, Preparação para Mestrado e Artigos Científicos de Impacto."
        },
        {
          question: "Os cursos têm certificado?",
          answer: "Sim, todos os nossos cursos oferecem certificado de conclusão reconhecido no meio acadêmico após a finalização de todas as atividades."
        },
        {
          question: "Posso acessar os cursos offline?",
          answer: "O conteúdo está disponível online através da nossa plataforma. Recomendamos uma conexão estável com a internet para a melhor experiência de aprendizado."
        },
        {
          question: "Há prazo para conclusão dos cursos?",
          answer: "Cada curso tem sua duração recomendada, mas você pode estudar no seu próprio ritmo. O acesso ao conteúdo não expira."
        }
      ]
    },
    {
      category: "Pagamento e Assinatura",
      questions: [
        {
          question: "Quais formas de pagamento são aceitas?",
          answer: "Aceitamos cartão de crédito, débito, PIX e boleto bancário. O pagamento é processado de forma segura através de nossa plataforma."
        },
        {
          question: "Posso cancelar minha assinatura?",
          answer: "Sim, você pode cancelar sua assinatura a qualquer momento. Entre em contato com nosso suporte através da página de contato."
        },
        {
          question: "Há desconto para estudantes?",
          answer: "Oferecemos descontos especiais para estudantes de graduação e pós-graduação. Consulte nossas promoções na página de cursos."
        }
      ]
    },
    {
      category: "Suporte Técnico",
      questions: [
        {
          question: "Estou com problemas para acessar a plataforma",
          answer: "Verifique sua conexão com a internet e tente fazer login novamente. Se o problema persistir, entre em contato conosco através da página de contato."
        },
        {
          question: "O vídeo não carrega ou trava",
          answer: "Isso pode ser devido à sua conexão com a internet. Tente pausar o vídeo por alguns segundos, reduzir a qualidade ou reiniciar a página."
        },
        {
          question: "Como entro em contato com o suporte?",
          answer: "Você pode nos contatar através da página de contato, onde encontrará nosso WhatsApp, email e formulário de contato."
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQ = faqItems.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossa plataforma e cursos
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar perguntas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQ.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 100 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <Card key={itemIndex} className="overflow-hidden">
                      <CardHeader className="pb-0">
                        <Button
                          variant="ghost"
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full justify-between text-left p-0 h-auto"
                        >
                          <CardTitle className="text-lg font-medium text-gray-900 pr-4">
                            {item.question}
                          </CardTitle>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          )}
                        </Button>
                      </CardHeader>
                      {isOpen && (
                        <CardContent className="pt-4">
                          <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQ.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              Nenhuma pergunta encontrada para "{searchTerm}"
            </p>
            <Button onClick={() => setSearchTerm('')} variant="outline">
              Limpar busca
            </Button>
          </div>
        )}

        {/* Contact Support */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Não encontrou sua resposta?
            </h3>
            <p className="text-gray-600 mb-6">
              Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Entrar em Contato
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
