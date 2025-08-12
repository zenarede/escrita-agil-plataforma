
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useReferrals } from "@/hooks/useReferrals";
import { useAuth } from "@/contexts/AuthContext";
import { Trophy, Users, Crown } from "lucide-react";
import { useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";

export const MyReferralsCard = () => {
  const { user } = useAuth();
  const { counts, tier, rewards, loading, refresh } = useReferrals();
  const { toast } = useToast();

  // Notificação simples de novos prêmios (baseado em localStorage)
  const knownIdsKey = "knownReferralRewardIds";
  const known = useMemo<string[]>(
    () => JSON.parse(localStorage.getItem(knownIdsKey) || "[]"),
    [rewards.length]
  );

  const currentIds = useMemo(() => rewards.map((r) => r.id), [rewards]);
  const newOnes = useMemo(
    () => currentIds.filter((id) => !known.includes(id)),
    [currentIds, known]
  );

  if (newOnes.length > 0) {
    localStorage.setItem(knownIdsKey, JSON.stringify(currentIds));
    const latest = rewards.find((r) => r.id === newOnes[newOnes.length - 1]);
    if (latest) {
      const label =
        latest.reward === "videos_badge"
          ? "Vídeos + Badge"
          : latest.reward === "comunidade_wpp"
          ? "Comunidade WhatsApp"
          : "Mentoria";
      toast({
        title: "🎉 Novo prêmio conquistado!",
        description: `Você ganhou: ${label}`,
      });
    }
  }

  const tierLabel =
    tier?.tier === "mentoria"
      ? "Mentoria"
      : tier?.tier === "comunidade_wpp"
      ? "Comunidade WhatsApp"
      : tier?.tier === "videos_badge"
      ? "Vídeos + Badge"
      : "Nenhum";

  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Minhas Indicações
          <Badge className="ml-auto" variant="secondary">
            {loading ? "..." : `${counts?.activated_count ?? 0} ativações`}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Peça para digitarem seu e-mail no primeiro login.
        </div>

        <div className="flex items-center gap-3">
          <Crown className="h-5 w-5 text-yellow-500" />
          <div>
            <div className="text-sm font-medium">Seu Tier</div>
            <div className="text-sm">{tierLabel}</div>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Prêmios</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Badge variant={rewards.some(r=>r.reward==='videos_badge') ? "default" : "secondary"}>
              <Trophy className="h-4 w-4 mr-1" />
              1 ativação: Vídeos + Badge
            </Badge>
            <Badge variant={rewards.some(r=>r.reward==='comunidade_wpp') ? "default" : "secondary"}>
              <Users className="h-4 w-4 mr-1" />
              10 ativações: Comunidade
            </Badge>
            <Badge variant={rewards.some(r=>r.reward==='mentoria') ? "default" : "secondary"}>
              🎓
              <span className="ml-1">20 ativações: Mentoria</span>
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => refresh()}>
            Atualizar
          </Button>
          {/* Locais para links de settings do projeto */}
          {rewards.some(r=>r.reward==='comunidade_wpp') && (
            <Button asChild>
              <a href="https://wa.me/" target="_blank" rel="noreferrer">
                Entrar na Comunidade
              </a>
            </Button>
          )}
          {rewards.some(r=>r.reward==='mentoria') && (
            <Button asChild variant="secondary">
              <a href="https://cal.com/" target="_blank" rel="noreferrer">
                Agendar Mentoria
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
