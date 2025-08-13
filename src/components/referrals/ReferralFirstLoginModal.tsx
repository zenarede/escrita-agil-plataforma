
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useReferrals } from "@/hooks/useReferrals";
import { useToast } from "@/components/ui/use-toast";

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ReferralFirstLoginModal = () => {
  const { user, loading } = useAuth();
  const { referral, submitReferral, refresh } = useReferrals();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [askingEmail, setAskingEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const dismissed = useMemo(
    () => localStorage.getItem("referralPromptDismissed") === "1",
    []
  );

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    // Exibe se o usuário ainda não tem referral e nunca dispensou este prompt
    if (!referral && !dismissed) {
      setOpen(true);
    }
  }, [user?.id, loading, referral, dismissed]);

  const handleNo = () => {
    localStorage.setItem("referralPromptDismissed", "1");
    setOpen(false);
  };

  const handleYes = () => {
    setAskingEmail(true);
  };

  const handleSubmit = async () => {
    if (!EMAIL_REGEX.test(email.trim())) {
      toast({
        title: "E-mail inválido",
        description: "Digite um e-mail válido de quem te indicou.",
        variant: "destructive",
      });
      return;
    }

    if (email.trim().toLowerCase() === (user?.email || "").toLowerCase()) {
      toast({
        title: "Auto-indicação não permitida",
        description: "O e-mail do indicador não pode ser o seu próprio.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      await submitReferral(email);
      toast({
        title: "Indicação registrada!",
        description: "Contaremos sua ativação quando você concluir o quiz.",
      });
      localStorage.setItem("referralPromptDismissed", "1");
      setOpen(false);
    } catch (err: any) {
      // Mensagens comuns: duplicidade, auto-indicação, etc.
      toast({
        title: "Não foi possível registrar",
        description: err?.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
      await refresh();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Alguém te indicou a Escrita com Ciência?</DialogTitle>
        </DialogHeader>

        {!askingEmail ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Se sim, informe o e-mail de quem te indicou para que ele(a) ganhe prêmios quando você ativar sua conta.
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleNo}>
                Não
              </Button>
              <Button onClick={handleYes}>
                Sim
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="text-sm font-medium">E-mail de quem te indicou</label>
            <Input
              type="email"
              placeholder="nome@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setAskingEmail(false)}>
                Voltar
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
