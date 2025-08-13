import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      appName: 'CarbonUnity',
      nav: { home: 'Home', upload: 'Upload', services: 'Services', payouts: 'Payouts', support: 'Support' },
      onboarding: {
        title: 'Welcome to CarbonUnity',
        subtitle: 'Farmer-first app for carbon credits',
        language: 'Choose Language',
        phone: 'Phone Number',
        getOtp: 'Get OTP',
        name: 'Full Name',
        village: 'Village',
        landSize: 'Land Size (acres)',
        continue: 'Continue',
      },
      home: {
        title: 'Dashboard',
        socEstimate: 'Estimated Soil Organic Carbon',
        quick: 'Quick Actions',
        uploadPhoto: 'Upload Field Photo',
        viewPayouts: 'View Payouts',
        soilReport: 'Soil Report',
      },
      services: {
        title: 'Services',
        weather: 'Weather Forecast',
        pest: 'Pest Detection (Upload Crop Image)',
        tips: 'Regenerative Tips',
      },
      payouts: {
        title: 'Payouts & History',
        request: 'Request UPI Payout',
      },
      support: {
        title: 'Support & Community',
        call: 'Call Helpline',
        board: 'Discussion Board',
      },
      settings: { title: 'Settings', language: 'Language' },
      about: { title: 'About CarbonUnity', goal: 'Our Goal', desc: 'CarbonUnity helps smallholder farmers earn from carbon credits through regenerative practices and fair, transparent payouts.' },
      common: { comingSoon: 'Under development', changeLanguage: 'Change Language', save: 'Save' },
    },
  },
  hi: {
    translation: {
      appName: 'कार्बनयूनिटी',
      nav: { home: 'होम', upload: 'अपलोड', services: 'सेवाएँ', payouts: 'भुगतान', support: 'सहायता' },
      onboarding: {
        title: 'कार्बनयूनिटी में आपका स्वागत है',
        subtitle: 'कार्बन क्रेडिट के लिए किसान-प्रथम ऐप',
        language: 'भाषा चुनें',
        phone: 'फोन नंबर',
        getOtp: 'ओटीपी प्राप्त करें',
        name: 'पूरा नाम',
        village: 'गांव',
        landSize: 'भूमि आकार (बीघा/एकड़)',
        continue: 'जारी रखें',
      },
      home: {
        title: 'डैशबोर्ड',
        socEstimate: 'अनुमानित मृदा कार्बन',
        quick: 'त्वरित कार्य',
        uploadPhoto: 'फोटो अपलोड करें',
        viewPayouts: 'भुगतान देखें',
        soilReport: 'मिट्टी रिपोर्ट',
      },
      services: { title: 'सेवाएँ', weather: 'मौसम पूर्वानुमान', pest: 'कीट पहचान (फसल फोटो)', tips: 'पुनर्योजी टिप्स' },
      payouts: { title: 'भुगतान व इतिहास', request: 'यूपीआई भुगतान अनुरोध' },
      support: { title: 'सहायता व समुदाय', call: 'हेल्पलाइन कॉल करें', board: 'चर्चा मंच' },
      settings: { title: 'सेटिंग्स', language: 'भाषा' },
      common: { comingSoon: 'विकासाधीन', changeLanguage: 'भाषा बदलें', save: 'सहेजें' },
    },
  },
  mr: {
    translation: {
      appName: 'कार्बनयुनिटी',
      nav: { home: 'मुख्यपृष्ठ', upload: 'अपलोड', services: 'सेवा', payouts: 'पेमेंट', support: 'मदत' },
      onboarding: {
        title: 'कार्बनयुनिटी मध्ये स्वागत',
        subtitle: 'कार्बन क्रेडिटसाठी शेतकरी-प्रथम अ‍ॅप',
        language: 'भाषा निवडा',
        phone: 'फोन नंबर',
        getOtp: 'OTP मिळवा',
        name: 'नाव',
        village: 'गाव',
        landSize: 'जमिनीचा आकार (एकर)',
        continue: 'पुढे चला',
      },
      home: {
        title: 'डॅशबोर्ड',
        socEstimate: 'अनुमानित मृदा कार्बन',
        quick: 'जलद बटण',
        uploadPhoto: 'शेती फोटो अपलोड',
        viewPayouts: 'पेमेंट पाहा',
        soilReport: 'माती अहवाल',
      },
      services: { title: 'सेवा', weather: 'हवामान अंदाज', pest: 'कीड ओळख (पीक फोटो)', tips: 'पुनरुत्थान शेती टिप्स' },
      payouts: { title: 'पेमेंट व इतिहास', request: 'UPI पेमेंट विनंती' },
      support: { title: 'मदत व समुदाय', call: 'हेल्पलाइनला कॉल करा', board: 'चर्चा फलक' },
      settings: { title: 'सेटिंग्स', language: 'भाषा' },
      common: { comingSoon: 'विकासाधीन', changeLanguage: 'भाषा बदला', save: 'सेव्ह' },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
  });

export default i18n;
