
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, loading } = useAuth();

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Institucional', href: '/institucional' },
    { name: 'Cursos', href: '/cursos' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contato', href: '/contato' },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-700" />
              <span className="text-xl font-bold text-gray-900">Escrita com Ciência</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-700 hover:text-blue-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-4">
                    <Link to="/dashboard">
                      <Button variant="outline" size="sm">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button onClick={handleSignOut} variant="outline" size="sm">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                  </div>
                ) : (
                  <Link to="/login">
                    <Button className="bg-blue-700 hover:bg-blue-800">
                      Entrar
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {!loading && (
              <div className="border-t pt-3 mt-3">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-4 w-4 inline mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Sair
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md mx-3"
                    onClick={() => setIsOpen(false)}
                  >
                    Entrar
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
