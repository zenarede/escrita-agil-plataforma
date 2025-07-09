
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, GraduationCap, Briefcase, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const ProfileSetup = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    cpf: '',
    phone: '',
    study_interests: '',
    education_level: '',
    qualifications: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      // Pre-fill with user data
      setFormData(prev => ({
        ...prev,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
      }));

      // Check if profile already exists
      checkExistingProfile();
    }
  }, [user, loading, navigate]);

  const checkExistingProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data && !error) {
      // Profile exists, populate form
      setFormData({
        full_name: data.full_name || '',
        cpf: data.cpf || '',
        phone: data.phone || '',
        study_interests: data.study_interests?.join(', ') || '',
        education_level: data.education_level || '',
        qualifications: data.qualifications?.join(', ') || ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);

    const profileData = {
      id: user.id,
      full_name: formData.full_name,
      cpf: formData.cpf,
      email: user.email,
      phone: formData.phone,
      study_interests: formData.study_interests.split(',').map(s => s.trim()).filter(s => s),
      education_level: formData.education_level,
      qualifications: formData.qualifications.split(',').map(s => s.trim()).filter(s => s)
    };

    const { error } = await supabase
      .from('profiles')
      .upsert(profileData);

    if (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Erro ao salvar perfil",
        description: "Ocorreu um erro ao salvar suas informações. Tente novamente.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Perfil salvo com sucesso!",
        description: "Suas informações foram salvas. Redirecionando...",
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }

    setSaving(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl w-full">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">
              Complete seu Perfil
            </CardTitle>
            <p className="text-gray-600">
              Precisamos de algumas informações para personalizar sua experiência
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Nome Completo */}
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="full_name"
                    name="full_name"
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* CPF */}
              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">
                  CPF *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="cpf"
                    name="cpf"
                    type="text"
                    required
                    value={formData.cpf}
                    onChange={handleChange}
                    placeholder="000.000.000-00"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Telefone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Interesses de Estudo */}
              <div>
                <label htmlFor="study_interests" className="block text-sm font-medium text-gray-700 mb-2">
                  Interesses de Estudo *
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Textarea
                    id="study_interests"
                    name="study_interests"
                    required
                    value={formData.study_interests}
                    onChange={handleChange}
                    placeholder="Ex: TCC, Mestrado, Artigos Científicos (separe por vírgula)"
                    className="pl-10 min-h-[80px]"
                  />
                </div>
              </div>

              {/* Escolaridade */}
              <div>
                <label htmlFor="education_level" className="block text-sm font-medium text-gray-700 mb-2">
                  Escolaridade *
                </label>
                <Input
                  id="education_level"
                  name="education_level"
                  type="text"
                  required
                  value={formData.education_level}
                  onChange={handleChange}
                  placeholder="Ex: Graduação em Administração, Pós-graduação em Marketing"
                />
              </div>

              {/* Capacitações */}
              <div>
                <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-2">
                  Capacitações e Certificações
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Textarea
                    id="qualifications"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    placeholder="Ex: Gestão de Projetos, Excel Avançado, Inglês Fluente (separe por vírgula)"
                    className="pl-10 min-h-[80px]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-blue-700 hover:bg-blue-800" 
                size="lg"
                disabled={saving}
              >
                {saving ? 'Salvando...' : 'Salvar e Continuar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
