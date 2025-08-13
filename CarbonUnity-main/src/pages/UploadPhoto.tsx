import MobileLayout from "@/layouts/MobileLayout";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UploadPhoto() {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    document.title = `${t('home.uploadPhoto')} | ${t('appName')}`;
  }, [t]);

  const onFile = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setDate(new Date().toLocaleString());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => setCoords(pos.coords));
    }
  };

  return (
    <MobileLayout>
      <h1 className="text-lg font-semibold mb-2">{t('home.uploadPhoto')}</h1>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="mb-3"
        onChange={(e) => onFile(e.target.files?.[0] as File)}
      />

      {preview && (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <img src={preview} alt="Field photo preview" loading="lazy" className="w-full h-auto" />
            <div className="p-4 text-sm">
              <p><strong>Date:</strong> {date}</p>
              {coords && (
                <p><strong>GPS:</strong> {coords.latitude.toFixed(5)}, {coords.longitude.toFixed(5)}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-4">
        <Button className="w-full">Save (Local)</Button>
      </div>
    </MobileLayout>
  );
}
