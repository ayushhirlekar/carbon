import MobileLayout from "@/layouts/MobileLayout";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${t('home.title')} | ${t('appName')}`;
  }, [t]);

  return (
    <MobileLayout>
      <section>
        <h1 className="sr-only">CarbonUnity – Dashboard</h1>
        <Card className="shadow-sm" aria-labelledby="soc-heading">
          <CardContent className="pt-4">
            <h2 id="soc-heading" className="text-sm font-medium mb-2">{t('home.socEstimate')}</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Progress value={62} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">62%</div>
                <div className="text-xs text-muted-foreground">SOC</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-medium mb-3">{t('home.quick')}</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" className="h-20" onClick={() => navigate('/upload')}>{t('home.uploadPhoto')}</Button>
          <Button variant="secondary" className="h-20" onClick={() => navigate('/payouts')}>{t('home.viewPayouts')}</Button>
          <Button className="col-span-2 h-16" onClick={() => navigate('/services')}>{t('home.soilReport')}</Button>
        </div>
      </section>
    </MobileLayout>
  );
}
