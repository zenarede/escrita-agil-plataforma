
import { BookOpen, Users, FileText, Award, Clock, Target } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Método Exclusivo',
      description: 'Metodologia RAC testada e aprovada para escrita ágil e eficiente'
    },
    {
      icon: Users,
      title: 'Mentorias em Grupo',
      description: 'Sessões quinzenais e mensais com especialistas para tirar dúvidas'
    },
    {
      icon: FileText,
      title: 'Modelos Prontos',
      description: 'Templates e exemplos de projetos, artigos e relatórios'
    },
    {
      icon: Award,
      title: 'Certificação',
      description: 'Certificados reconhecidos para seu crescimento profissional'
    },
    {
      icon: Clock,
      title: 'TCC em 30 Dias',
      description: 'Curso intensivo para finalizar seu trabalho rapidamente'
    },
    {
      icon: Target,
      title: 'Foco no Mercado',
      description: 'Trilhas específicas para diferentes áreas profissionais'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Por que escolher a Escrita com Ciência?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa plataforma oferece tudo que você precisa para desenvolver suas habilidades 
            de escrita acadêmica e profissional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-6 group-hover:bg-blue-200 transition-colors">
                <feature.icon className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
