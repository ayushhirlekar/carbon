import MobileLayout from "@/layouts/MobileLayout";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Payouts() {
  const { t } = useTranslation();
  const { toast } = useToast();
  useEffect(() => { document.title = `${t('payouts.title')} | ${t('appName')}`; }, [t]);

  return (
    <MobileLayout>
      <h1 className="text-lg font-semibold mb-4">{t('payouts.title')}</h1>

      <Card>
        <CardContent className="pt-4 text-sm">
          <div className="flex items-center justify-between mb-2">
            <span>Last month</span>
            <span className="font-semibold text-primary">₹ 2,450</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total to date</span>
            <span className="font-semibold">₹ 12,900</span>
          </div>
        </CardContent>
      </Card>

      <Button className="mt-4 w-full" onClick={() => toast({ title: 'UPI', description: 'Payout request submitted (demo).' })}>
        {t('payouts.request')}
      </Button>
    </MobileLayout>
  );
}
