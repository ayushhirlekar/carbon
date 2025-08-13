import MobileLayout from "@/layouts/MobileLayout";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CloudSun, Droplets, ThermometerSun } from "lucide-react";
import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface DayForecast {
  date: string;
  label: string;
  tMax: number;
  tMin: number;
  precip: number;
}

export default function Services() {
  const { t } = useTranslation();
  const [forecast, setForecast] = useState<DayForecast[] | null>(null);

  useEffect(() => {
    document.title = `${t('services.title')} | ${t('appName')}`;
  }, [t]);

  useEffect(() => {
    const fetchForecast = async (lat: number, lon: number) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=5`;
        const res = await fetch(url);
        const data = await res.json();
        const days: DayForecast[] = data.daily.time.map((d: string, i: number) => {
          const label = new Date(d).toLocaleDateString(undefined, { weekday: 'short' });
          return {
            date: d,
            label,
            tMax: Math.round(data.daily.temperature_2m_max[i]),
            tMin: Math.round(data.daily.temperature_2m_min[i]),
            precip: Number(data.daily.precipitation_sum[i]?.toFixed(1) || 0),
          } as DayForecast;
        });
        setForecast(days);
      } catch (e) {
        console.error(e);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchForecast(pos.coords.latitude, pos.coords.longitude),
        () => fetchForecast(28.6139, 77.2090) // New Delhi fallback
      );
    } else {
      fetchForecast(28.6139, 77.2090);
    }
  }, []);

  return (
    <MobileLayout>
      <h1 className="text-lg font-semibold mb-4">{t('services.title')}</h1>

      <div className="space-y-4">
        {/* Weather Forecast */}
        <Card className="hover-scale">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <CloudSun className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="font-medium">{t('services.weather')}</h2>
            </div>
            {!forecast ? (
              <p className="text-sm text-muted-foreground">Fetching local forecast…</p>
            ) : (
              <div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="rounded-md bg-primary/5 p-3">
                    <div className="text-xs text-muted-foreground">Max</div>
                    <div className="text-lg font-semibold text-primary flex items-center gap-1"><ThermometerSun className="h-4 w-4" />{forecast[0].tMax}°</div>
                  </div>
                  <div className="rounded-md bg-primary/5 p-3">
                    <div className="text-xs text-muted-foreground">Min</div>
                    <div className="text-lg font-semibold text-primary flex items-center gap-1"><ThermometerSun className="h-4 w-4" />{forecast[0].tMin}°</div>
                  </div>
                  <div className="rounded-md bg-accent/10 p-3">
                    <div className="text-xs text-muted-foreground">Rain</div>
                    <div className="text-lg font-semibold text-foreground flex items-center gap-1"><Droplets className="h-4 w-4 text-accent" />{forecast[0].precip} mm</div>
                  </div>
                </div>
                <div className="h-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forecast} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                      <YAxis hide domain={[0, (dataMax: number) => Math.max(40, dataMax + 5)]} />
                      <Tooltip cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1 }} />
                      <Area type="monotone" dataKey="tMax" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#temp)" name="Max °C" />
                      <Area type="monotone" dataKey="tMin" stroke="hsl(var(--accent))" fillOpacity={0.15} name="Min °C" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pest Detection Prototype */}
        <Card className="hover-scale">
          <CardContent className="pt-4">
            <h2 className="font-medium">{t('services.pest')}</h2>
            <input type="file" accept="image/*" className="mt-2" />
            <p className="text-sm text-muted-foreground mt-2">{t('common.comingSoon')}</p>
          </CardContent>
        </Card>

        {/* Regenerative Tips */}
        <Card className="hover-scale">
          <CardContent className="pt-4">
            <h2 className="font-medium">{t('services.tips')}</h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
              <li>Use cover crops to reduce erosion and increase SOC.</li>
              <li>Apply compost and biochar for soil health.</li>
              <li>No/low till practices preserve soil structure.</li>
              <li>Mulch crop residues to retain soil moisture.</li>
              <li>Adopt drip irrigation to save water and energy.</li>
              <li>Rotate crops and intercrop to improve biodiversity.</li>
              <li>Plant shelterbelts/trees for wind protection and carbon.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
