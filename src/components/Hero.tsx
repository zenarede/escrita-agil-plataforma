
import { ArrowRight, Play, Users, BookOpen, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-20 bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-aristotelica">
                Escreva melhor,
                <span className="block text-primary">mais rápido</span>
                <span className="block">e com confiança</span>
              </h1>
              <p className="text-xl text-white/90 max-w-lg">
                Transforme sua escrita acadêmica e profissional com nossa metodologia exclusiva. 
                TCCs, dissertações e teses nunca foram tão acessíveis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link to="/cursos">
                  Explorar Cursos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
                <Play className="mr-2 h-5 w-5" />
                Assistir Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-white/80">Alunos Felizes</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm text-white/80">Horas de Conteúdo</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-white/80">Instrutores</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="aspect-video bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Play className="h-16 w-16 text-white" />
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold font-aristotelica">Método RAC</h3>
                <p className="text-white/90">
                  Destrave sua escrita em menos de 6 horas com nossa metodologia exclusiva
                </p>
                <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-secondary">
                  Começar Agora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
