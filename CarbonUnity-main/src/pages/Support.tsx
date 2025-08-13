import MobileLayout from "@/layouts/MobileLayout";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Support() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `${t('support.title')} | ${t('appName')}`; }, [t]);

  return (
    <MobileLayout>
      <h1 className="text-lg font-semibold mb-4">{t('support.title')}</h1>
      <div className="space-y-3">
        <a href="tel:+911800000000" className="block w-full text-center rounded-md border px-4 py-3 bg-primary text-primary-foreground">{t('support.call')}</a>
        <div className="rounded-md border p-4">
          <p className="text-sm text-muted-foreground">{t('common.comingSoon')}: {t('support.board')}</p>
        </div>
      </div>
    </MobileLayout>
  );
}
