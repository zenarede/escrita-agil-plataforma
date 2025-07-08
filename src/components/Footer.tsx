
import { BookOpen, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Escrita com Ciência</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Ajudamos estudantes e profissionais a escrever melhor, mais rápido e com mais confiança. 
              Especializados em TCCs, dissertações e teses com metodologia própria.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition-all">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition-all">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/institucional" className="text-gray-300 hover:text-white transition-colors">Institucional</Link></li>
              <li><Link to="/cursos" className="text-gray-300 hover:text-white transition-colors">Cursos</Link></li>
              <li><Link to="/contato" className="text-gray-300 hover:text-white transition-colors">Contato</Link></li>
              <li><Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Área do Aluno</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">contato@escritacomciencia.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Escrita com Ciência. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
