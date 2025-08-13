import { useEffect, useMemo, useRef, useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, Mic, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export type ChatMessage = { role: "user" | "assistant"; content: string };

interface ChatbotDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatbotDrawer({ open, onOpenChange }: ChatbotDrawerProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Namaste! Ask me about weather, payouts, tips, or policies." },
  ]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize browser speech recognition for quick voice input (prototype)
  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec: any = new SR();
    rec.lang = "en-IN"; // will still pick up many Indic languages; can be enhanced per i18n.language
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (event: any) => {
      const text = String(event.results?.[0]?.[0]?.transcript || "");
      setInput((prev) => (prev ? prev + " " : "") + text);
      setListening(false);
    };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
  }, []);

  const apiKey = useMemo(() => localStorage.getItem("geminiApiKey") || "", [open]);

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt) return;
    setInput("");
    const nextMessages = [...messages, { role: "user", content: prompt } as ChatMessage];
    setMessages(nextMessages);

    // Allow sending messages even without API key
    if (!apiKey) {
      setMessages((m) => [...m, { role: "assistant", content: "I'm in demo mode without an API key. Please add your Gemini API key in Settings for full functionality." }]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const reply = await generateWithGemini(apiKey, nextMessages);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e: any) {
      toast({ title: "Error", description: e?.message || "Failed to get reply" });
    } finally {
      setLoading(false);
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      toast({ title: "Unavailable", description: "Voice not supported on this device." });
      return;
    }
    if (listening) {
      recognitionRef.current.stop();
    } else {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="pb-2">
          <DrawerTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" /> {t('chat.title', { defaultValue: 'Ask CarbonUnity' })}
          </DrawerTitle>
          <DrawerDescription>
            {t('chat.desc', { defaultValue: 'Chat or use voice. Great for weather, payouts, tips and more.' })}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 max-h-[55vh] overflow-y-auto space-y-3">
          {messages.map((m, idx) => (
            <div key={idx} className={`w-full flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-lg border p-3 text-sm shadow-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-xs text-muted-foreground">{t('common.loading', { defaultValue: 'Thinking…' })}</div>
          )}
          {/* API key warning message removed */}
        </div>

        <DrawerFooter className="gap-2 border-t pt-3">
          <div className="flex items-center gap-2">
            <button onClick={toggleMic} aria-pressed={listening} className={`rounded-md p-2 border ${listening ? 'animate-pulse' : ''}`}>
              <Mic className="h-5 w-5" />
            </button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
              placeholder={t('chat.placeholder', { defaultValue: 'Ask about weather, payouts, tips…' })}
            />
            <Button onClick={handleSend} disabled={loading} variant="default" aria-label="Send">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// Lightweight Gemini client for browser-only prototype
// IMPORTANT: For production, move calls to a Supabase Edge Function and load API key from Supabase Secrets.
async function generateWithGemini(apiKey: string, history: ChatMessage[]): Promise<string> {
  const model = "gemini-1.5-flash"; // fast and affordable for Q&A

  // Convert our history to Google content parts: user/assistant -> user/model
  const contents = history.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Gemini error: ${res.status}`);
  }

  const data = await res.json();
  const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't find an answer.";
  return output;
}
