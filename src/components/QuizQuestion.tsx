import { Card, CardContent } from '@/components/ui/card';
import { QuizQuestion as QuizQuestionType } from '@/hooks/useQuizData';

interface QuizQuestionProps {
  question: QuizQuestionType;
  value: number | null;
  onChange: (value: number) => void;
}

export function QuizQuestion({ question, value, onChange }: QuizQuestionProps) {
  const options = [
    { value: 1, emoji: '😞', label: 'Discordo totalmente' },
    { value: 2, emoji: '😐', label: 'Discordo parcialmente' },
    { value: 3, emoji: '🤔', label: 'Neutro' },
    { value: 4, emoji: '😊', label: 'Concordo parcialmente' },
    { value: 5, emoji: '😍', label: 'Concordo totalmente' }
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {question.pergunta_numero}. {question.texto}
          </h3>
        </div>
        
        <div className="grid grid-cols-5 gap-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`
                flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200
                ${value === option.value 
                  ? 'border-primary bg-primary/10 shadow-md scale-105' 
                  : 'border-border hover:border-primary/50 hover:bg-accent'
                }
              `}
            >
              <span className="text-2xl mb-1">{option.emoji}</span>
              <span className="text-xs text-center font-medium text-muted-foreground">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}