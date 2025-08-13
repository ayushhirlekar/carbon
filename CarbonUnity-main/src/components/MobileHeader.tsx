import { Mic, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { ChatbotDrawer } from "@/components/ChatbotDrawer";

export function MobileHeader() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec: any = new SR();
    rec.lang = i18n.language || 'en-IN';
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (event: any) => {
      const text = String(event.results?.[0]?.[0]?.transcript || '').toLowerCase();
      const map: Record<string, string> = {
        home: '/home', 'होम': '/home', 'मुख्यपृष्ठ': '/home',
        upload: '/upload', 'अपलोड': '/upload', 'फोटो': '/upload', 'फोटो अपलोड': '/upload',
        services: '/services', 'सेवाएँ': '/services', 'सेवा': '/services',
        payouts: '/payouts', 'भुगतान': '/payouts', 'पेमेंट': '/payouts',
        support: '/support', 'सहायता': '/support', 'मदत': '/support',
      };
      const matched = Object.keys(map).find(k => text.includes(k));
      if (matched) {
        navigate(map[matched]);
        toast({ title: '✓', description: `Navigating to ${map[matched]}` });
      } else {
        toast({ title: 'Sorry', description: 'Could not recognize a command.' });
      }
      setListening(false);
    };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
  }, [i18n.language, navigate, toast]);

  const handleMic = () => {
    if (!recognitionRef.current) {
      toast({ title: 'Unavailable', description: 'Voice not supported on this device.' });
      return;
    }
    setListening(true);
    recognitionRef.current!.start();
  };

  useEffect(() => {
    document.title = `${t('appName')} – Carbon Credits for Farmers`;
  }, [t]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <h1 className="text-lg font-semibold">{t('appName')}</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setChatOpen(true)} aria-label="Open chatbot" className="rounded-full p-2 text-foreground hover:text-primary">
            <MessageCircle className="h-6 w-6" />
          </button>
          <button onClick={handleMic} aria-pressed={listening} aria-label="Voice command" className="rounded-full p-2 text-foreground hover:text-primary">
            <Mic className={`h-6 w-6 ${listening ? 'animate-pulse' : ''}`} />
          </button>
        </div>
      </div>
      <ChatbotDrawer open={chatOpen} onOpenChange={setChatOpen} />
    </header>
  );
}
