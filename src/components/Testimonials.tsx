
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Luana',
      course: 'Pedagogia',
      text: 'Muito grata por passarem tão bons conhecimentos de forma acessível! O material é excelente e as mentorias me ajudaram muito.',
      rating: 5
    },
    {
      name: 'Jéssica',
      course: 'Farmácia',
      text: 'O material me ajuda de verdade na faculdade. Chega de noites sem dormir! Consegui terminar meu TCC em tempo recorde.',
      rating: 5
    },
    {
      name: 'Ricardo',
      course: 'Engenharia Civil',
      text: 'A trilha do mercado da construção civil foi perfeita para mim. Aprendi a escrever relatórios técnicos de forma clara e objetiva.',
      rating: 5
    },
    {
      name: 'Marina',
      course: 'Administração',
      text: 'As videoaulas são fantásticas e os templates salvaram minha vida acadêmica. Recomendo para todos os estudantes!',
      rating: 5
    },
    {
      name: 'Carlos',
      course: 'Tecnologia da Informação',
      text: 'Método RAC realmente funciona! Consegui destavar minha escrita e agora escrevo com muito mais confiança.',
      rating: 5
    },
    {
      name: 'Ana Paula',
      course: 'Psicologia',
      text: 'As mentorias são o diferencial. Ter feedback personalizado fez toda a diferença na qualidade dos meus textos.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            O que nossos alunos dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 500 estudantes já transformaram sua escrita conosco
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-secondary/30 mr-2" />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.course}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
