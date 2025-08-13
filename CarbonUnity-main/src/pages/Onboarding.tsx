import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [lang, setLang] = useState(i18n.language || 'en');
  const [form, setForm] = useState({ phone: '', name: '', village: '', land: '' });

  useEffect(() => {
    document.title = `${t('onboarding.title')} | ${t('appName')}`;
  }, [t]);

  const save = () => {
    if (!form.phone) return;
    localStorage.setItem('cu_profile', JSON.stringify({ ...form, lang }));
    i18n.changeLanguage(lang);
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">{t('onboarding.title')}</h1>
        <p className="text-muted-foreground">{t('onboarding.subtitle')}</p>

        <label className="text-sm font-medium">{t('onboarding.language')}</label>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="w-full rounded-md border bg-background p-2"
          aria-label={t('onboarding.language')}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="mr">मराठी</option>
        </select>

        <label className="text-sm font-medium">{t('onboarding.phone')}</label>
        <Input inputMode="tel" placeholder="99999 99999" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Button variant="secondary">{t('onboarding.getOtp')}</Button>

        <label className="text-sm font-medium">{t('onboarding.name')}</label>
        <Input placeholder="" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <label className="text-sm font-medium">{t('onboarding.village')}</label>
        <Input placeholder="" value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} />

        <label className="text-sm font-medium">{t('onboarding.landSize')}</label>
        <Input inputMode="decimal" placeholder="" value={form.land} onChange={(e) => setForm({ ...form, land: e.target.value })} />

        <Button className="w-full" onClick={save}>{t('onboarding.continue')}</Button>
        <p className="text-xs text-muted-foreground">OTP/auth will be enabled after backend setup.</p>
      </div>
    </div>
  );
}
