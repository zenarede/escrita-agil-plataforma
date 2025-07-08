
import { Clock, Users, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CourseCardProps {
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  price: string;
  category: string;
  image?: string;
}

const CourseCard = ({ 
  title, 
  description, 
  instructor, 
  duration, 
  students, 
  rating, 
  price, 
  category,
  image 
}: CourseCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <CardHeader className="p-0">
        <div className="aspect-video bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center relative">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <BookOpen className="h-12 w-12 text-white" />
          )}
          <Badge className="absolute top-4 right-4 bg-blue-700">
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="font-medium">{instructor}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{rating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{students} alunos</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-2xl font-bold text-blue-700">{price}</p>
          <p className="text-xs text-gray-500">ou 12x sem juros</p>
        </div>
        <Button className="bg-blue-700 hover:bg-blue-800">
          Inscrever-se
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
