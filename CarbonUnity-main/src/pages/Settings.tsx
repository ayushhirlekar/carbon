import MobileLayout from "@/layouts/MobileLayout";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'en');

  useEffect(() => { document.title = `${t('settings.title')} | ${t('appName')}`; }, [t]);

  const save = () => {
    i18n.changeLanguage(lang);
    const p = localStorage.getItem('cu_profile');
    if (p) {
      const prof = JSON.parse(p);
      localStorage.setItem('cu_profile', JSON.stringify({ ...prof, lang }));
    }
  };

  return (
    <MobileLayout>
      <h1 className="text-lg font-semibold mb-4">{t('settings.title')}</h1>
      <section className="mb-6">
        <label className="text-sm font-medium">{t('settings.language')}</label>
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full rounded-md border bg-background p-2 mb-3">
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="mr">मराठी</option>
        </select>
        <button onClick={save} className="rounded-md bg-primary px-4 py-2 text-primary-foreground">{t('common.save')}</button>
      </section>

      <section className="mb-6">
        <div className="text-sm font-medium mb-2">Gemini API key (prototype)</div>
        <input
          type="password"
          placeholder="AIzaSyB33tRDH8HGPO3jaMp3Opok_hayF3EG7i8"
          defaultValue={typeof window !== 'undefined' ? localStorage.getItem('geminiApiKey') || '' : ''}
          onBlur={(e) => {
            localStorage.setItem('geminiApiKey', e.target.value.trim());
          }}
          className="w-full rounded-md border bg-background p-2 mb-2"
        />
        <p className="text-xs text-muted-foreground">
          Stored locally in your browser for now. For production, use Supabase Secrets and an Edge Function.
        </p>
      </section>

      <div className="mt-6">
        <a href="/about" className="block rounded-md border p-4 hover-scale">
          <div className="text-sm font-medium">{t('about.title', { defaultValue: 'About CarbonUnity' })}</div>
          <p className="text-xs text-muted-foreground mt-1">{t('about.goal', { defaultValue: 'Our Goal' })}: {t('about.desc', { defaultValue: 'Empower smallholder farmers with fair carbon credits.' })}</p>
        </a>
      </div>
    </MobileLayout>
  );
}
