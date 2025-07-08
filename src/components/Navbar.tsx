
import { useState } from 'react';
import { Menu, X, BookOpen, User, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Início', path: '/' },
    { name: 'Institucional', path: '/institucional' },
    { name: 'Cursos', path: '/cursos' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-700" />
              <span className="text-xl font-bold text-gray-900">Escrita com Ciência</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-700 hover:text-blue-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/dashboard">
                  <User className="h-4 w-4 mr-2" />
                  Área do Aluno
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/dashboard">Área do Aluno</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
