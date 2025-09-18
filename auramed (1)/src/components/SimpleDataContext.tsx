import { createContext, useContext, useState, ReactNode } from 'react';

interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: string;
  dob: string;
  village: string;
  district: string;
  symptoms: string[];
  daysOfSymptoms: number;
  primaryWaterSource?: string;
  timestamp: Date;
}

interface WaterQualityData {
  id: string;
  location: string;
  village: string;
  district: string;
  state?: string;
  temperature?: number;
  turbidity?: number;
  tdsValue: number;
  phLevel: number;
  bacteriaCount: number;
  timestamp: Date;
}

interface CommunityMember {
  id: string;
  name: string;
  role: 'asha' | 'doctor' | 'clinic';
  village: string;
  district: string;
  casesUpdated: number;
  timestamp: Date;
}

type Language = 'english' | 'hindi' | 'assamese' | 'bengali';

interface Translations {
  [key: string]: {
    english: string;
    hindi: string;
    assamese: string;
    bengali: string;
  };
}

const translations: Translations = {
  // Header translations
  'header.home': {
    english: 'Home',
    hindi: 'होम',
    assamese: 'হোম',
    bengali: 'হোম'
  },
  'header.dashboard': {
    english: 'Dashboard',
    hindi: 'डैशबोर्ड',
    assamese: 'ডেশবোৰ্ড',
    bengali: 'ড্যাশবোর্ড'
  },
  'header.community': {
    english: 'Community',
    hindi: 'समुदाय',
    assamese: 'সমুদায়',
    bengali: 'কমিউনিটি'
  },
  'header.alerts': {
    english: 'Alerts',
    hindi: 'अलर्ट',
    assamese: 'সতর্কতা',
    bengali: 'সতর্কতা'
  },
  'header.chatbot': {
    english: 'Chatbot',
    hindi: 'चैटबॉट',
    assamese: 'চেটবট',
    bengali: 'চ্যাটবট'
  },
  
  // Hero Section
  'hero.badge': {
    english: 'Advanced Health Monitoring',
    hindi: 'उन्नत स्वास्थ्य निगरानी',
    assamese: 'উন্নত স্বাস্থ্য নিৰীক্ষণ',
    bengali: 'উন্নত স্বাস্থ্য পর্যবেক্ষণ'
  },
  'hero.title1': {
    english: 'Smart Health',
    hindi: 'स्मार्ट स्वास्थ्य',
    assamese: 'স্মাৰ্ট স্বাস্থ্য',
    bengali: 'স্মার্ট স্বাস্থ্য'
  },
  'hero.title2': {
    english: 'Monitoring',
    hindi: 'निगरानी',
    assamese: 'নিৰীক্ষণ',
    bengali: 'পর্যবেক্ষণ'
  },
  'hero.title3': {
    english: 'in Rural Northeast India',
    hindi: 'ग्रामीण पूर्वोत्तर भारत में',
    assamese: 'গ্ৰাম্য উত্তৰ-পূৱ ভাৰতত',
    bengali: 'গ্রামীণ উত্তর-পূর্ব ভারতে'
  },
  'hero.description': {
    english: 'Predict, detect, and monitor waterborne diseases using advanced AI technology. Our platform helps healthcare workers in rural Northeast India identify disease patterns, track outbreaks, and provide timely interventions to save lives.',
    hindi: 'उन्नत एआई तकनीक का उपयोग करके जल-जनित रोगों की भविष्यवाणी, पहचान और निगरानी करें। हमारा प्लेटफॉर्म ग्रामीण पूर्वोत्तर भारत में स्वास्थ्यकर्मियों को रोग पैटर्न की पहचान, प्रकोप को ट्रैक करने और जीवन बचाने के लिए समय पर हस्तक्षेप प्रदान करने में मदद करता है।',
    assamese: 'উন্নত এআই প্ৰযুক্তি ব্যৱহাৰ কৰি পানীবাহিত ৰোগৰ পূৰ্বানুমান, চিনাক্তকৰণ আৰু নিৰীক্ষণ কৰক। আমাৰ প্লেটফৰ্মে গ্ৰাম্য উত্তৰ-পূৱ ভাৰতৰ স্বাস্থ্যকৰ্মীসকলক ৰোগৰ আৰ্হি চিনাক্ত কৰাত, প্ৰাদুৰ্ভাৱ ট্ৰেক কৰাত আৰু জীৱন ৰক্ষাৰ বাবে সময়মতে হস্তক্ষেপ প্ৰদান কৰাত সহায় কৰে।',
    bengali: 'উন্নত এআই প্রযুক্তি ব্যবহার করে জলবাহিত রোগের ভবিষ্যদ্বাণী, সনাক্তকরণ এবং পর্যবেক্ষণ করুন। আমাদের প্ল্যাটফর্ম গ্রামীণ উত্তর-পূর্ব ভারতের স্বাস্থ্যকর্মীদের রোগের ধরন চিহ্নিত করতে, প্রাদুর্ভাব ট্র্যাক করতে এবং জীবন বাঁচানোর জন্য সময়মত হস্তক্ষেপ প্রদান করতে সহায়তা করে।'
  },
  'hero.start_data_entry': {
    english: 'Start Data Entry',
    hindi: 'डेटा प्रविष्टि शुरू करें',
    assamese: 'তথ্য প্ৰবিষ্টি আৰম্ভ কৰক',
    bengali: 'ডেটা এন্ট্রি শুরু করুন'
  },
  'hero.get_educated': {
    english: 'Get Educated',
    hindi: 'शिक्षित हों',
    assamese: 'শিক্ষিত হওক',
    bengali: 'শিক্ষিত হন'
  },

  // Dashboard
  'dashboard.title': {
    english: 'Real-time Health Analytics',
    hindi: 'रीयल-टाइम स्वास्थ्य एनालिटिक्स',
    assamese: 'ৰিয়েল-টাইম স্বাস্থ্য বিশ্লেষণ',
    bengali: 'রিয়েল-টাইম স্বাস্থ্য বিশ্লেষণ'
  },

  // Community
  'community.title': {
    english: 'Community Health Contributors',
    hindi: 'सामुदायिक स्वास्थ्य योगदानकर्ता',
    assamese: 'সমুদায়িক স্বাস্থ্য অৱদানকাৰী',
    bengali: 'কমিউনিটি স্বাস্থ্য অবদানকারী'
  },

  // Alerts
  'alerts.badge': {
    english: 'Disease Surveillance',
    hindi: 'रोग निगरानी',
    assamese: 'ৰোগ নিৰীক্ষণ',
    bengali: 'রোগ নজরদারি'
  },
  'alerts.title': {
    english: 'Health Alerts & Notifications',
    hindi: 'स्वास्थ्य अलर्ट और सूचनाएं',
    assamese: 'স্বাস্থ্য সতর্কতা আৰু জাননী',
    bengali: 'স্বাস্থ্য সতর্কতা ও বিজ্ঞপ্তি'
  },
  'alerts.subtitle': {
    english: 'Real-time disease outbreak monitoring and alert system for Northeast India',
    hindi: 'पूर्वोत्तर भारत के लिए रीयल-टाइम रोग प्रकोप निगरानी और चेतावनी प्रणाली',
    assamese: 'উত্তৰ-পূৱ ভাৰতৰ বাবে ৰিয়েল-টাইম ৰোগ প্ৰাদুৰ্ভাৱ নিৰীক্ষণ আৰু সতর্কতা ব্যৱস্থা',
    bengali: 'উত্তর-পূর্ব ভারতের জন্য রিয়েল-টাইম রোগ প্রাদুৰ্ভাব পর্যবেক্ষণ ও সতর্কতা ব্যবস্থা'
  },
  'alerts.total_cases': {
    english: 'Total Cases',
    hindi: 'कुल मामले',
    assamese: 'মুঠ কেছ',
    bengali: 'মোট মামলা'
  },
  'alerts.districts': {
    english: 'Districts',
    hindi: 'जिले',
    assamese: 'জিলা',
    bengali: 'জেলা'
  },
  'alerts.cases': {
    english: 'cases',
    hindi: 'मामले',
    assamese: 'কেছ',
    bengali: 'মামলা'
  },
  'alerts.map.title': {
    english: 'Disease Risk Map',
    hindi: 'रोग जोखिम मानचित्र',
    assamese: 'ৰোগৰ বিপদৰ মানচিত্ৰ',
    bengali: 'রোগের ঝুঁকির মানচিত্র'
  },
  'alerts.risk.critical': {
    english: 'Critical Risk',
    hindi: 'गंभीर जोखिम',
    assamese: 'গুৰুতৰ বিপদ',
    bengali: 'গুরুতর ঝুঁকি'
  },
  'alerts.risk.high': {
    english: 'High Risk',
    hindi: 'उच्च जोखिम',
    assamese: 'উচ্চ বিপদ',
    bengali: 'উচ্চ ঝুঁকি'
  },
  'alerts.risk.moderate': {
    english: 'Moderate Risk',
    hindi: 'मध्यम जोखिम',
    assamese: 'মধ্যম বিপদ',
    bengali: 'মাঝারি ঝুঁকি'
  },
  'alerts.risk.low': {
    english: 'Low Risk',
    hindi: 'कम जोखिम',
    assamese: 'কম বিপদ',
    bengali: 'কম ঝুঁকি'
  },
  'alerts.district_status': {
    english: 'District Status',
    hindi: 'जिला स्थिति',
    assamese: 'জিলাৰ অৱস্থা',
    bengali: 'জেলার অবস্থা'
  },
  'alerts.sms.red': {
    english: 'Send SMS to Red Alert Zones',
    hindi: 'रेड अलर्ट जोन को SMS भेजें',
    assamese: 'ৰেড এলাৰ্ট অঞ্চলত SMS পঠিয়াওক',
    bengali: 'লাল সতর্ক এলাকায় SMS পাঠান'
  },
  'alerts.sms.orange': {
    english: 'Send SMS to Orange Alert Zones',
    hindi: 'ऑरेंज अलर्ट जोन को SMS भेजें',
    assamese: 'কমলা এলাৰ্ট অঞ্চলত SMS পঠিয়াওক',
    bengali: 'কমলা সতর্ক এলাকায় SMS পাঠান'
  },

  // Disease Prevention
  'prevention.title': {
    english: 'Disease Prevention & Education',
    hindi: 'रोग निवारण और शिक्षा',
    assamese: 'ৰোগ প্ৰতিৰোধ আৰু শিক্ষা',
    bengali: 'রোগ প্রতিরোধ ও শিক্ষা'
  },

  // Chatbot
  'chatbot.title': {
    english: 'AI Health Assistant',
    hindi: 'एआई स्वास्थ्य सहायक',
    assamese: 'এআই স্বাস্থ্য সহায়ক',
    bengali: 'এআই স্বাস্থ্য সহায়ক'
  },
  'chatbot.badge': {
    english: 'AI-Powered Support',
    hindi: 'एआई-संचालित सहायता',
    assamese: 'এআই-চালিত সহায়তা',
    bengali: 'এআই-চালিত সহায়তা'
  },
  'chatbot.subtitle': {
    english: 'Get instant health guidance and disease information',
    hindi: 'तुरंत स्वास्थ्य मार्गदर्शन और रोग की जानकारी प्राप्त करें',
    assamese: 'তাৎক্ষণিক স্বাস্থ্য নিৰ্দেশনা আৰু ৰোগৰ তথ্য লাভ কৰক',
    bengali: 'তাৎক্ষণিক স্বাস্থ্য নির্দেশনা এবং রোগের তথ্য পান'
  },
  'chatbot.placeholder': {
    english: 'Ask about symptoms, diseases, or health concerns...',
    hindi: 'लक्षण, रोग, या स्वास्थ्य चिंताओं के बारे में पूछें...',
    assamese: 'লক্ষণ, ৰোগ, বা স্বাস্থ্য চিন্তাৰ বিষয়ে সুধিব...',
    bengali: 'লক্ষণ, রোগ, বা স্বাস্থ্য উদ্বেগ সম্পর্কে জিজ্ঞাসা করুন...'
  },
  'chatbot.send': {
    english: 'Send Message',
    hindi: 'संदेश भेजें',
    assamese: 'বাৰ্তা পঠিয়াওক',
    bengali: 'বার্তা পাঠান'
  },

  // Dashboard expanded
  'dashboard.badge': {
    english: 'Health Analytics',
    hindi: 'स्वास्थ्य विश्लेषण',
    assamese: 'স্বাস্থ্য বিশ্লেষণ',
    bengali: 'স্বাস্থ্য বিশ্লেষণ'
  },
  'dashboard.subtitle': {
    english: 'Comprehensive health monitoring and disease tracking dashboard',
    hindi: 'व्यापक स्वास्थ्य निगरानी और रोग ट्रैकिंग डैशबोर्ड',
    assamese: 'বিস্তৃত স্বাস্থ্য নিৰীক্ষণ আৰু ৰোগ ট্ৰেকিং ডেশ্বব',
    bengali: 'ব্যাপক স্বাস্থ্য পর্যবেক্ষণ এবং রোগ ট্র্যাকিং ড্যাশবোর্ড'
  },
  'dashboard.patients': {
    english: 'Total Patients',
    hindi: 'कुल मरीज',
    assamese: 'মুঠ ৰোগী',
    bengali: 'মোট রোগী'
  },
  'dashboard.watersamples': {
    english: 'Water Samples',
    hindi: 'पानी के नमूने',
    assamese: 'পানীৰ নমুনা',
    bengali: 'পানির নমুনা'
  },
  'dashboard.contributors': {
    english: 'Active Contributors',
    hindi: 'सक्रिय योगदानकर्ता',
    assamese: 'সক্ৰিয় অৱদানকাৰী',
    bengali: 'সক্রিয় অবদানকারী'
  },
  'dashboard.alerts': {
    english: 'Active Alerts',
    hindi: 'सक्रिय अलर्ट',
    assamese: 'সক্ৰিয় সতর্কতা',
    bengali: 'সক্রিয় সতর্কতা'
  },
  'dashboard.waterquality': {
    english: 'Water Quality Distribution',
    hindi: 'जल गुणवत्ता वितरण',
    assamese: 'পানীৰ গুণগত বিতৰণ',
    bengali: 'পানির গুণমান বিতরণ'
  },
  'dashboard.diseasetrends': {
    english: 'Disease Trends',
    hindi: 'रोग के रुझान',
    assamese: 'ৰোগৰ প্ৰৱণতা',
    bengali: 'রোগের প্রবণতা'
  },
  'dashboard.monthly': {
    english: 'Monthly Disease Rate',
    hindi: 'मासिक रोग दर',
    assamese: 'মাহিলী ৰোগৰ হাৰ',
    bengali: 'মাসিক রোগের হার'
  },
  
  // Community expanded
  'community.badge': {
    english: 'Community Network',
    hindi: 'सामुदायिक नेटवर्क',
    assamese: 'সমুদায়িক নেটৱৰ্ক',
    bengali: 'কমিউনিটি নেটওয়ার্ক'
  },
  'community.subtitle': {
    english: 'Healthcare workers contributing to disease monitoring and prevention',
    hindi: 'रोग निगरानी और रोकथाम में योगदान देने वाले स्वास्थ्यकर्मी',
    assamese: 'ৰোগ নিৰীক্ষণ আৰু প্ৰতিৰোধত অৱদান আগবঢ়োৱা স্বাস্থ্যকৰ্মী',
    bengali: 'রোগ পর্যবেক্ষণ ও প্রতিরোধে অবদানকারী স্বাস্থ্যকর্মী'
  },
};

interface DataContextType {
  // Data
  patientData: PatientData[];
  waterQualityData: WaterQualityData[];
  communityMembers: CommunityMember[];
  
  // Language
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  translate: (key: string) => string;
  
  // Data management functions
  addPatientData: (data: PatientData) => void;
  addWaterQualityData: (data: WaterQualityData) => void;
  addCommunityMember: (member: CommunityMember) => void;
  
  // Chart data function
  getChartData: () => {
    waterQuality: { name: string; value: number; color: string }[];
    patientDisease: { disease: string; cases: number }[];
    diseaseRate: { month: string; rate: number }[];
  };
  
  // District functions for Alerts
  getDistrictCases: () => { [district: string]: number };
  getDistrictRiskLevel: (cases: number) => 'critical' | 'high' | 'moderate' | 'low';
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [patientData, setPatientData] = useState<PatientData[]>([]);
  const [waterQualityData, setWaterQualityData] = useState<WaterQualityData[]>([]);
  const [communityMembers, setCommunityMembers] = useState<CommunityMember[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');

  const translate = (key: string): string => {
    return translations[key]?.[currentLanguage] || key;
  };

  const addPatientData = (data: PatientData) => {
    setPatientData(prev => [...prev, data]);
  };

  const addWaterQualityData = (data: WaterQualityData) => {
    setWaterQualityData(prev => [...prev, data]);
  };

  const addCommunityMember = (member: CommunityMember) => {
    setCommunityMembers(prev => [...prev, member]);
  };

  const getChartData = () => {
    return {
      waterQuality: [
        { name: 'Excellent', value: 0, color: '#22c55e' },
        { name: 'Good', value: 0, color: '#3b82f6' },
        { name: 'Fair', value: 0, color: '#f59e0b' },
        { name: 'Poor', value: 0, color: '#ef4444' }
      ],
      patientDisease: [
        { disease: 'Cholera', cases: 0 },
        { disease: 'Typhoid', cases: 0 },
        { disease: 'Hepatitis', cases: 0 },
        { disease: 'Diarrhea', cases: 0 }
      ],
      diseaseRate: [
        { month: 'Jan', rate: 0 },
        { month: 'Feb', rate: 0 },
        { month: 'Mar', rate: 0 },
        { month: 'Apr', rate: 0 },
        { month: 'May', rate: 0 },
        { month: 'Jun', rate: 0 }
      ]
    };
  };

  const getDistrictCases = () => {
    // Count cases by district from patient data
    const districtCounts: { [district: string]: number } = {};
    patientData.forEach(patient => {
      const district = patient.district.toLowerCase();
      districtCounts[district] = (districtCounts[district] || 0) + 1;
    });
    return districtCounts;
  };

  const getDistrictRiskLevel = (cases: number): 'critical' | 'high' | 'moderate' | 'low' => {
    if (cases > 20) return 'critical';
    if (cases > 10) return 'high';
    if (cases > 5) return 'moderate';
    return 'low';
  };

  const value: DataContextType = {
    patientData,
    waterQualityData,
    communityMembers,
    currentLanguage,
    setCurrentLanguage,
    translate,
    addPatientData,
    addWaterQualityData,
    addCommunityMember,
    getChartData,
    getDistrictCases,
    getDistrictRiskLevel
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}