import MobileLayout from "@/layouts/MobileLayout";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sprout, ShieldCheck, Wallet } from "lucide-react";

export default function About() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('about.title', { defaultValue: 'About CarbonUnity' })} | ${t('appName')}`;
  }, [t]);

  return (
    <MobileLayout>
      <h1 className="text-lg font-semibold mb-4">{t('about.title', { defaultValue: 'About CarbonUnity' })}</h1>
      <p className="text-sm text-muted-foreground mb-4">
        {t('about.desc', { defaultValue: 'CarbonUnity exists to empower smallholder farmers to earn more from sustainable farming. We connect regenerative practices to carbon markets with fairness and transparency.' })}
      </p>

      <section className="rounded-lg p-4 bg-primary/5">
        <h2 className="text-sm font-medium mb-3">{t('about.goal', { defaultValue: 'Our Goal' })}</h2>
        <ol className="grid grid-cols-3 gap-3 text-center">
          <li className="rounded-md border p-3 bg-background">
            <Sprout className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
            <p className="mt-2 text-xs">Regenerative Practices</p>
          </li>
          <li className="rounded-md border p-3 bg-background">
            <ShieldCheck className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
            <p className="mt-2 text-xs">Verified Carbon Gains</p>
          </li>
          <li className="rounded-md border p-3 bg-background">
            <Wallet className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
            <p className="mt-2 text-xs">Fair, Fast Payouts</p>
          </li>
        </ol>
      </section>
    </MobileLayout>
  );
}
