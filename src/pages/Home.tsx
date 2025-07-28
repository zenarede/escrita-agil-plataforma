
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Briefcase, GraduationCap, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const courseTracks = [
    {
      icon: Target,
      title: 'Mercado de Tecnologia',
      description: 'Desenvolvimento de habilidades para documentação técnica, relatórios de projetos e comunicação eficaz no setor tech.',
      courses: 12,
      color: 'bg-primary'
    },
    {
      icon: Briefcase,
      title: 'Mercado Financeiro',
      description: 'Escrita profissional para análises, relatórios financeiros e comunicação corporativa no setor financeiro.',
      courses: 8,
      color: 'bg-secondary'
    },
    {
      icon: GraduationCap,
      title: 'Mercado de Educação',
      description: 'Metodologias de ensino, elaboração de materiais didáticos e comunicação acadêmica eficiente.',
      courses: 15,
      color: 'bg-primary'
    },
    {
      icon: Building,
      title: 'Mercado da Construção Civil',
      description: 'Elaboração de relatórios técnicos, projetos executivos e documentação para o setor da construção.',
      courses: 10,
      color: 'bg-secondary'
    }
  ];

  const featuredCourses = [
    {
      title: 'TCC em 30 Dias - Método Ágil',
      description: 'Aprenda a estruturar e escrever seu TCC de forma eficiente e rápida com nossa metodologia exclusiva.',
      instructor: 'Dr. Ana Silva',
      duration: '20h',
      students: 150,
      rating: 4.9,
      price: 'R$ 297',
      category: 'Destaque'
    },
    {
      title: 'Método RAC - Escrita Científica',
      description: 'Destrave sua escrita em menos de 6 horas com técnicas comprovadas de produtividade acadêmica.',
      instructor: 'Prof. Carlos Santos',
      duration: '6h',
      students: 200,
      rating: 5.0,
      price: 'R$ 97',
      category: 'Bestseller'
    },
    {
      title: 'Preparação para Mestrado',
      description: 'Guia completo para processo seletivo de mestrado, incluindo projeto de pesquisa e carta de motivação.',
      instructor: 'Dra. Maria Oliveira',
      duration: '15h',
      students: 80,
      rating: 4.8,
      price: 'R$ 197',
      category: 'Novo'
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      <Features />

      {/* Course Tracks Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trilhas de Aprendizado
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha a trilha ideal para sua área de atuação e desenvolva habilidades específicas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courseTracks.map((track, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow group">
                <div className="flex items-start space-x-4">
                  <div className={`${track.color} p-3 rounded-lg`}>
                    <track.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-secondary transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {track.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{track.courses} cursos disponíveis</span>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/cursos">
                          Explorar
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Cursos em Destaque
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossos cursos mais populares e eficazes para transformar sua escrita
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/cursos">
                Ver Todos os Cursos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary to-secondary/90 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Pronto para transformar sua escrita?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Junte-se a mais de 500 estudantes que já conquistaram seus objetivos acadêmicos e profissionais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link to="/cursos">Começar Agora</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary" asChild>
              <Link to="/contato">Falar com Especialista</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
