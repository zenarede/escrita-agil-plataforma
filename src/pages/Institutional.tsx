
import { Target, Eye, Heart, Users, Award, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Institutional = () => {
  const values = [
    {
      icon: Target,
      title: 'Excelência',
      description: 'Comprometemos-nos com a mais alta qualidade em todos os nossos cursos e mentorias.'
    },
    {
      icon: Heart,
      title: 'Humanização',
      description: 'Atendimento personalizado e focado na realidade e necessidades de cada aluno.'
    },
    {
      icon: Users,
      title: 'Colaboração',
      description: 'Acreditamos no poder das mentorias em grupo e na troca de experiências.'
    },
    {
      icon: Award,
      title: 'Inovação',
      description: 'Desenvolvemos metodologias próprias e eficazes para acelerar o aprendizado.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Alunos Transformados' },
    { number: '50+', label: 'Instrutores Especialistas' },
    { number: '200+', label: 'Horas de Conteúdo' },
    { number: '1000+', label: 'Horas de Mentoria' }
  ];

  const team = [
    {
      name: 'Dra. Ana Silva',
      role: 'Fundadora e Diretora Acadêmica',
      description: 'PhD em Educação com 15 anos de experiência em metodologias de ensino e escrita científica.',
      expertise: 'Metodologia RAC, Escrita Acadêmica'
    },
    {
      name: 'Prof. Carlos Santos',
      role: 'Coordenador de Cursos',
      description: 'Mestre em Linguística Aplicada, especialista em produtividade acadêmica e escrita técnica.',
      expertise: 'Escrita Ágil, TCCs e Dissertações'
    },
    {
      name: 'Dra. Maria Oliveira',
      role: 'Especialista em Pós-Graduação',
      description: 'Doutora em Ciências com experiência em orientação e processos seletivos de mestrado e doutorado.',
      expertise: 'Projetos de Pesquisa, Teses'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-secondary/90 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Transformando a Escrita Acadêmica no Brasil
          </h1>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Somos uma plataforma educacional especializada em desenvolver habilidades de escrita 
            científica e profissional, conectando estudantes ao mercado de trabalho através de 
            metodologias inovadoras e mentorias personalizadas.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Mission */}
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossa Missão</h2>
              <p className="text-gray-600 leading-relaxed">
                Capacitar estudantes e profissionais para escrever de forma clara, ágil e científica, 
                promovendo o desenvolvimento acadêmico e profissional através de metodologias 
                inovadoras e mentoria especializada.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossa Visão</h2>
              <p className="text-gray-600 leading-relaxed">
                Ser a principal referência em ensino de escrita científica no Brasil, 
                reconhecida pela excelência pedagógica e pelo impacto positivo na vida 
                acadêmica e profissional de nossos alunos.
              </p>
            </div>

            {/* Impact */}
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nosso Impacto</h2>
              <p className="text-gray-600 leading-relaxed">
                Mais de 500 vidas transformadas, centenas de TCCs, dissertações e teses 
                concluídas com sucesso, e profissionais mais preparados para os desafios 
                do mercado de trabalho.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Os princípios que guiam nossa missão educacional e nossa relação com cada aluno
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Nossos Números
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              O impacto real da nossa metodologia na vida de estudantes e profissionais
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Nossa Equipe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Especialistas dedicados ao seu sucesso acadêmico e profissional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-secondary to-secondary/80 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-700">
                      Especialidades: {member.expertise}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Nossa Metodologia
          </h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-secondary mb-6">Método RAC</h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Desenvolvemos o Método RAC (Rápido, Ágil e Científico), uma abordagem exclusiva 
              que combina técnicas de produtividade, estruturação lógica e escrita científica 
              para acelerar drasticamente o processo de produção acadêmica.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Rápido</h4>
                <p className="text-sm text-gray-600">Técnicas para escrever em menos tempo</p>
              </div>
              
              <div className="text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-secondary" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Ágil</h4>
                <p className="text-sm text-gray-600">Metodologia flexível e adaptável</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Científico</h4>
                <p className="text-sm text-gray-600">Rigor acadêmico e qualidade científica</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Institutional;
