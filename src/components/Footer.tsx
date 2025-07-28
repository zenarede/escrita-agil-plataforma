
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/a95023a3-d8ea-48f6-ae71-713487459df9.png" 
                alt="Escrita com Ciência" 
                className="h-12"
              />
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Ajudamos estudantes e profissionais a escrever melhor, mais rápido e com mais confiança. 
              Especializados em TCCs, dissertações e teses com metodologia própria.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transform hover:scale-110 transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transform hover:scale-110 transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transform hover:scale-110 transition-all">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transform hover:scale-110 transition-all">
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
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <div className="font-medium">Horário de atendimento</div>
                  <div className="text-sm">08:00 às 18:00</div>
                  <div className="text-sm">Segunda à sexta</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <div className="font-medium">Telefone:</div>
                  <div className="text-sm">(61) 99298-0561</div>
                  <div className="text-sm">(61) 98315-1509</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <div className="font-medium">Email:</div>
                  <div className="text-sm">contato@escritacomciencia.com.br</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <div className="font-medium">Local:</div>
                  <div className="text-sm">Impact Hub Brasília</div>
                  <div className="text-sm">Edifício Íon, ala amarela</div>
                  <div className="text-sm">SGAN Q 601 BL H – Asa Norte</div>
                  <div className="text-sm">Brasília – DF, CEP 70830-018</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Escrita com Ciência. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            CNPJ: 49.674.067/0001-09
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
