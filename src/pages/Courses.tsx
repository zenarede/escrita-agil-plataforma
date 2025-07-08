
import { useState } from 'react';
import { Search, Filter, Target, Briefcase, GraduationCap, Building } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CourseCard from '@/components/CourseCard';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'Todos os Cursos', icon: null },
    { id: 'technology', name: 'Tecnologia', icon: Target },
    { id: 'finance', name: 'Financeiro', icon: Briefcase },
    { id: 'education', name: 'Educação', icon: GraduationCap },
    { id: 'construction', name: 'Construção Civil', icon: Building },
  ];

  const courses = [
    {
      title: 'TCC em 30 Dias - Método Ágil',
      description: 'Aprenda a estruturar e escrever seu TCC de forma eficiente e rápida com nossa metodologia exclusiva. Inclui templates, cronograma e mentorias.',
      instructor: 'Dr. Ana Silva',
      duration: '20h',
      students: 150,
      rating: 4.9,
      price: 'R$ 297',
      category: 'Geral',
      categoryId: 'all'
    },
    {
      title: 'Método RAC - Escrita Científica',
      description: 'Destrave sua escrita em menos de 6 horas com técnicas comprovadas de produtividade acadêmica e organização de ideias.',
      instructor: 'Prof. Carlos Santos',
      duration: '6h',
      students: 200,
      rating: 5.0,
      price: 'R$ 97',
      category: 'Bestseller',
      categoryId: 'all'
    },
    {
      title: 'Documentação Técnica para Devs',
      description: 'Aprenda a criar documentações técnicas claras, APIs, manuais de usuário e relatórios de projeto para o mercado tech.',
      instructor: 'Eng. Pedro Lima',
      duration: '12h',
      students: 85,
      rating: 4.7,
      price: 'R$ 197',
      category: 'Tecnologia',
      categoryId: 'technology'
    },
    {
      title: 'Relatórios Financeiros Eficazes',
      description: 'Elaboração de análises financeiras, relatórios de resultados e comunicação executiva para o setor financeiro.',
      instructor: 'Dra. Laura Costa',
      duration: '15h',
      students: 90,
      rating: 4.8,
      price: 'R$ 247',
      category: 'Financeiro',
      categoryId: 'finance'
    },
    {
      title: 'Metodologias de Ensino e Escrita',
      description: 'Desenvolvimento de materiais didáticos, planos de aula e comunicação acadêmica para educadores.',
      instructor: 'Prof. Marina Torres',
      duration: '18h',
      students: 120,
      rating: 4.9,
      price: 'R$ 197',
      category: 'Educação',
      categoryId: 'education'
    },
    {
      title: 'Projetos Executivos e Relatórios Técnicos',
      description: 'Elaboração de documentação técnica para construção civil, laudos, relatórios e projetos executivos.',
      instructor: 'Eng. Roberto Silva',
      duration: '16h',
      students: 70,
      rating: 4.6,
      price: 'R$ 227',
      category: 'Construção',
      categoryId: 'construction'
    },
    {
      title: 'Preparação para Mestrado',
      description: 'Guia completo para processo seletivo de mestrado, incluindo projeto de pesquisa, carta de motivação e currículo acadêmico.',
      instructor: 'Dra. Maria Oliveira',
      duration: '15h',
      students: 80,
      rating: 4.8,
      price: 'R$ 197',
      category: 'Acadêmico',
      categoryId: 'all'
    },
    {
      title: 'Escrita para Publicações Científicas',
      description: 'Como escrever artigos científicos, submeter para revistas e aumentar suas chances de publicação em periódicos de impacto.',
      instructor: 'Dr. João Mendes',
      duration: '22h',
      students: 60,
      rating: 4.9,
      price: 'R$ 347',
      category: 'Avançado',
      categoryId: 'all'
    },
    {
      title: 'Tese de Doutorado: Estrutura e Metodologia',
      description: 'Orientações completas para estruturação, escrita e defesa de tese de doutorado, com acompanhamento personalizado.',
      instructor: 'Dra. Isabel Ferreira',
      duration: '30h',
      students: 45,
      rating: 5.0,
      price: 'R$ 497',
      category: 'Avançado',
      categoryId: 'all'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
      case 'price-high':
        return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
      case 'rating':
        return b.rating - a.rating;
      case 'students':
        return b.students - a.students;
      default:
        return b.students - a.students; // popular = mais estudantes
    }
  });

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos Cursos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha entre mais de 20 cursos especializados e transforme sua escrita acadêmica e profissional
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Mais Popular</SelectItem>
                <SelectItem value="rating">Melhor Avaliação</SelectItem>
                <SelectItem value="price-low">Menor Preço</SelectItem>
                <SelectItem value="price-high">Maior Preço</SelectItem>
                <SelectItem value="students">Mais Estudantes</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('popular');
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </div>

        {/* Category Badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              className="cursor-pointer hover:bg-blue-100"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon && <category.icon className="h-3 w-3 mr-1" />}
              {category.name}
            </Badge>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {sortedCourses.length} de {courses.length} cursos
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedCourses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>

        {/* No Results */}
        {sortedCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum curso encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Ver Todos os Cursos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
