import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, Clock, Award, TrendingUp, BookOpen, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const stats = [
    { number: '10+', label: 'Instrutores habilitados', icon: Users },
    { number: '1.500+', label: 'Alunos felizes', icon: Users },
    { number: '200h+', label: 'Mentorias realizadas', icon: Clock },
    { number: '400h+', label: 'Cursos em vídeos', icon: BookOpen }
  ];

  const services = [
    {
      title: 'Escrita Ágil - TCC em 30 dias',
      description: 'Prazo curto e não sabe por onde começar seu TCC? Conheça nosso curso de Escrita ágil e acabe com as noites sem dormir. Com 14 videoaulas, modelos prontos de cada seção e 5 bônus incríveis, conclua seu TCC em até 30 dias!',
      cta: 'Aproveite já!',
      buttonText: 'Eu quero',
      link: '/comprar/tcc-em-30-dias-metodo-agil'
    },
    {
      title: 'Guia Smart - Preparação para Mestrado',
      description: 'Conquiste seu sonho de ser mestre com o Guia Smart! Com 12 videoaulas, modelos de projetos de pesquisa e 5 bônus sensacionais, desvende todos os segredos para garantir sua vaga na seleção deste ano!',
      cta: 'Transforme seu futuro hoje mesmo!',
      buttonText: 'Eu quero',
      link: '/comprar/preparacao-para-mestrado'
    },
    {
      title: 'Método RAC - E-book Escrita Científica',
      description: 'Cansado de noites em claro escrevendo trabalhos acadêmicos? O método RAC é a solução! Com 8 capítulos e menos de 6 horas de leitura, testado por +1500 universitários, este e-book ensina a combinar habilidades socioemocionais e técnicas de escrita ágil.',
      cta: 'Seja você mesmo seu próprio ChatGPT!',
      buttonText: 'Eu quero',
      link: '/comprar/metodo-rac-escrita-cientifica'
    }
  ];

  const testimonials = [
    {
      text: 'Esse curso deveria ser mais divulgado para os alunos iniciantes na vida acadêmica. É chocante entrar na universidade e perceber que ainda precisam aprender a ler e escrever.',
      author: 'Lorena',
      course: 'Aluna de Matemática'
    },
    {
      text: 'Muito grata por passarem tao bons conhecimentos de forma acessivel e bem feita! Vocês superaram minhas expectativas!',
      author: 'Luana',
      course: 'Aluna de pedagogia'
    },
    {
      text: 'Gostei bastante! Bem didático e necessário as temáticas abordadas. Obrigado por disponibilizarem materiais para download, será muito utilizados durante toda a minha vida acadêmica.',
      author: 'Mauro',
      course: 'Aluno da engenharia civil'
    },
    {
      text: 'Foi muito bom o curso. Acredito que o material de apoio será, de fato, meu apoio na hora de escrever meus trabalhos da faculdade. Chega de perder noites de sono para escrever meus relatórios. Escrita ágil mesmo!',
      author: 'Jéssica',
      course: 'Aluna de Farmácia'
    }
  ];

  const benefits = [
    'Método próprio e personalizado',
    'Apoio para publicação em periódicos de impacto',
    'Indicação de congressos nacionais e internacionais',
    'Atendimento humanizado',
    'Pagamento facilitado e parcelado'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-secondary min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Escrita com Ciência
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-4xl mx-auto">
              Ajudamos a escrever mais, melhor e mais rápido seu TCC, dissertação ou tese.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-8 w-8 text-white/80 mr-2" />
                    <span className="text-3xl lg:text-4xl font-bold text-white">
                      {stat.number}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm lg:text-base">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/cursos">Ver Cursos</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/contato">Entre em Contato</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              O que podemos fazer por você?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mb-6">
                    <p className="text-primary font-semibold text-lg mb-4">
                      {service.cta}
                    </p>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link to={service.link}>
                      {service.buttonText}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Olha só o que nossos clientes dizem sobre os nossos cursos e serviços:
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <p className="text-gray-600 italic mb-4 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.course}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Depoimentos de nossos mentorados
            </p>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Atendemos universitários das principais universidades do país e da comunidade lusófona
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {/* Placeholder for university logos */}
            <div className="bg-gray-200 h-20 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-medium">Universidade</span>
            </div>
            <div className="bg-gray-200 h-20 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-medium">Universidade</span>
            </div>
            <div className="bg-gray-200 h-20 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-medium">Universidade</span>
            </div>
            <div className="bg-gray-200 h-20 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-medium">Universidade</span>
            </div>
            <div className="bg-gray-200 h-20 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-medium">Universidade</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            VAMOS POTENCIALIZAR SUA PRODUTIVIDADE ACADÊMICA!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-white/90">{benefit}</span>
              </div>
            ))}
          </div>

          <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
            <Link to="/cursos">
              SIM, QUERO COMPRAR AGORA!
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;