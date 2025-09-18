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

interface PatientDraft {
  id: string;
  name: string;
  age: string;
  gender: string;
  dob: string;
  village: string;
  district: string;
  symptoms: string[];
  daysOfSymptoms: string;
  primaryWaterSource: string;
  timestamp: Date;
}

interface WaterQualityDraft {
  id: string;
  location: string;
  village: string;
  district: string;
  state: string;
  temperature: string;
  pH: string;
  turbidity: string;
  tds: string;
  sourceType: string;
  quality: string;
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
  'hero.stats.multilanguage': {
    english: 'Multilanguage',
    hindi: 'बहुभाषी',
    assamese: 'বহুভাষিক',
    bengali: 'বহুভাষিক'
  },
  'hero.stats.support': {
    english: 'Support',
    hindi: 'समर्थन',
    assamese: 'সমৰ্থন',
    bengali: 'সহায়তা'
  },
  'hero.stats.works': {
    english: 'Works',
    hindi: 'काम करता है',
    assamese: 'কাম কৰে',
    bengali: 'কাজ করে'
  },
  'hero.stats.offline': {
    english: 'When Offline',
    hindi: 'ऑफ़लाइन होने पर',
    assamese: 'অফলাইন থাকোঁতে',
    bengali: 'অফলাইন থাকাকালীন'
  },
  'hero.stats.ai': {
    english: 'AI',
    hindi: 'एआई',
    assamese: 'এআই',
    bengali: 'এআই'
  },
  'hero.stats.chatbot': {
    english: 'Chatbot',
    hindi: 'चैटबॉट',
    assamese: 'চেটবট',
    bengali: 'চ্যাটবট'
  },
  'hero.stats.sms': {
    english: 'SMS',
    hindi: 'एसएमएस',
    assamese: 'এসএমএস',
    bengali: 'এসএমএস'
  },
  'hero.stats.notification': {
    english: 'Notification',
    hindi: 'सूचना',
    assamese: 'জাননী',
    bengali: 'বিজ্ঞপ্তি'
  },

  // Data Entry translations
  'dataentry.badge': {
    english: 'Data Collection System',
    hindi: 'डेटा संग्रह प्रणाली',
    assamese: 'তথ্য সংগ্ৰহ ব্যৱস্থা',
    bengali: 'ডেটা সংগ্রহ ব্যবস্থা'
  },
  'dataentry.title': {
    english: 'Comprehensive Data Entry',
    hindi: 'व्यापक डेटा प्रविष्टि',
    assamese: 'বিস্তৃত তথ্য প্ৰবিষ্টি',
    bengali: 'ব্যাপক ডেটা এন্ট্রি'
  },
  'dataentry.subtitle': {
    english: 'for Disease Monitoring',
    hindi: 'रोग निगरानी के लिए',
    assamese: 'ৰোগ নিৰীক্ষণৰ বাবে',
    bengali: 'রোগ পর্যবেক্ষণের জন্য'
  },
  'dataentry.description': {
    english: 'Collect patient and environmental data to help our AI system predict and detect waterborne disease outbreaks in rural Northeast India.',
    hindi: 'ग्रामीण पूर्वोत्तर भारत में जल-जनित रोग के प्रकोप की भविष्यवाणी और पहचान करने में हमारी एआई प्रणाली की मदद के लिए रोगी और पर्यावरणीय डेटा एकत्र करें।',
    assamese: 'গ্ৰাম্য উত্তৰ-পূৱ ভাৰতত পানীবাহিত ৰোগৰ প্ৰাদুৰ্ভাৱৰ পূৰ্বানুমান আৰু চিনাক্তকৰণত আমাৰ এআই ব্যৱস্থাক সহায় কৰিবলৈ ৰোগী আৰু পৰিৱেশৰ তথ্য সংগ্ৰহ কৰক।',
    bengali: 'গ্রামীণ উত্তর-পূর্ব ভারতে জলবাহিত রোগের প্রাদুর্ভাবের ভবিষ্যদ্বাণী এবং সনাক্তকরণে আমাদের এআই সিস্টেমকে সাহায্য করার জন্য রোগী এবং পরিবেশগত ডেটা সংগ্রহ করুন।'
  },
  'dataentry.patient': {
    english: 'Patient Data Entry',
    hindi: 'रोगी डेटा प्रविष्टि',
    assamese: 'ৰোগীৰ তথ্য প্ৰবিষ্টি',
    bengali: 'রোগীর ডেটা এন্ট্রি'
  },
  'dataentry.waterquality': {
    english: 'Water Quality Analysis',
    hindi: 'जल गुणवत्ता विश्लेषण',
    assamese: 'পানীৰ গুণাগুণ বিশ্লেষণ',
    bengali: 'পানির গুণমান বিশ্লেষণ'
  },
  'dataentry.patient.title': {
    english: 'Patient Information & Symptoms',
    hindi: 'रोगी की जानकारी और लक्षण',
    assamese: 'ৰোগীৰ তথ্য আৰু লক্ষণ',
    bengali: 'রোগীর তথ্য ও লক্ষণ'
  },
  'dataentry.patient.description': {
    english: 'Enter patient details and symptoms to help identify potential waterborne diseases',
    hindi: 'संभावित जल-जनित रोगों की पहचान करने में मदद के लिए रोगी का विवरण और लक्षण दर्ज करें',
    assamese: 'সম্ভাৱ্য পানীবাহিত ৰোগ চিনাক্ত কৰাত সহায়ৰ বাবে ৰোগীৰ বিৱৰণ আৰু লক্ষণ প্ৰবিষ্ট কৰক',
    bengali: 'সম্ভাব্য জলবাহিত রোগ সনাক্ত করতে সাহায্য করার জন্য রোগীর বিবরণ এবং লক্ষণ প্রবেশ করান'
  },
  'dataentry.water.title': {
    english: 'Water Quality Analysis & Testing',
    hindi: 'जल गुणवत्ता विश्लेषण और परीक्षण',
    assamese: 'পানীৰ গুণগত বিশ্লেষণ আৰু পৰীক্ষা',
    bengali: 'পানির গুণমান বিশ্লেষণ ও পরীক্ষা'
  },
  'dataentry.water.description': {
    english: 'Comprehensive water quality testing and analysis to detect contamination and disease risks',
    hindi: 'संदूषण और रोग के जोखिमों का पता लगाने के लिए व्यापक जल गुणवत्ता परीक्षण और विश्लेषण',
    assamese: 'দূষণ আৰু ৰোগৰ বিপদ চিনাক্ত কৰিবলৈ বিস্তৃত পানীৰ গুণগত পৰীক্ষা আৰু বিশ্লেষণ',
    bengali: 'দূষণ এবং রোগের ঝুঁকি সনাক্ত করার জন্য ব্যাপক পানির গুণমান পরীক্ষা এবং বিশ্লেষণ'
  },

  // Form fields
  'form.name': {
    english: 'Full Name',
    hindi: 'पूरा नाम',
    assamese: 'সম্পূৰ্ণ নাম',
    bengali: 'সম্পূর্ণ নাম'
  },
  'form.age': {
    english: 'Age',
    hindi: 'आयु',
    assamese: 'বয়স',
    bengali: 'বয়স'
  },
  'form.gender': {
    english: 'Gender',
    hindi: 'लिंग',
    assamese: 'লিংগ',
    bengali: 'লিঙ্গ'
  },
  'form.dob': {
    english: 'Date of Birth',
    hindi: 'जन्म तिथि',
    assamese: 'জন্ম তাৰিখ',
    bengali: 'জন্ম তারিখ'
  },
  'form.village': {
    english: 'Village/Location',
    hindi: 'गांव/स्थान',
    assamese: 'গাঁও/স্থান',
    bengali: 'গ্রাম/অবস্থান'
  },
  'form.district': {
    english: 'District',
    hindi: 'जिला',
    assamese: 'জিলা',
    bengali: 'জেলা'
  },
  'form.symptoms': {
    english: 'Symptoms Observed',
    hindi: 'देखे गए लक्षण',
    assamese: 'দেখা পোৱা লক্ষণ',
    bengali: 'পর্যবেক্ষিত লক্ষণ'
  },
  'form.days': {
    english: 'Number of Days with Symptoms',
    hindi: 'लक्षणों के साथ दिनों की संख्या',
    assamese: 'লক্ষণৰ সৈতে দিনৰ সংখ্যা',
    bengali: 'লক্ষণ সহ দিনের সংখ্যা'
  },
  'form.watersource': {
    english: 'Primary Water Source',
    hindi: 'प्राथमिक जल स्रोत',
    assamese: 'প্ৰাথমিক পানীৰ উৎস',
    bengali: 'প্রাথমিক পানির উৎস'
  },
  'form.male': {
    english: 'Male',
    hindi: 'पुरुष',
    assamese: 'পুৰুষ',
    bengali: 'পুরুষ'
  },
  'form.female': {
    english: 'Female',
    hindi: 'महिला',
    assamese: 'মহিলা',
    bengali: 'মহিলা'
  },
  'form.other': {
    english: 'Other',
    hindi: 'अन्य',
    assamese: 'অন্য',
    bengali: 'অন্যান্য'
  },

  // Buttons
  'button.submit': {
    english: 'Submit Patient Data',
    hindi: 'रोगी डेटा जमा करें',
    assamese: 'ৰোগীৰ তথ্য জমা দিয়ক',
    bengali: 'রোগীর ডেটা জমা দিন'
  },
  'button.draft': {
    english: 'Save as Draft',
    hindi: 'मसौदे के रूप में सहेजें',
    assamese: 'খসড়া হিচাপে সাঁচি ৰাখক',
    bengali: 'খসড়া হিসাবে সংরক্ষণ করুন'
  },
  'button.viewdrafts': {
    english: 'View Drafts',
    hindi: 'मसौदे देखें',
    assamese: 'খসড়া চাওক',
    bengali: 'খসড়া দেখুন'
  },
  'button.submitwater': {
    english: 'Submit Environmental Data',
    hindi: 'पर्यावरणीय डेटा जमा करें',
    assamese: 'পৰিৱেশৰ তথ্য জমা দিয়ক',
    bengali: 'পরিবেশগত ডেটা জমা দিন'
  },

  // Water Quality form fields
  'water.village': {
    english: 'Village',
    hindi: 'गांव',
    assamese: 'গাঁও',
    bengali: 'গ্রাম'
  },
  'water.district': {
    english: 'District',
    hindi: 'जिला',
    assamese: 'জিলা',
    bengali: 'জেলা'
  },
  'water.state': {
    english: 'State',
    hindi: 'राज्य',
    assamese: 'ৰাজ্য',
    bengali: 'রাজ্য'
  },
  'water.location': {
    english: 'Water Source Location',
    hindi: 'जल स्रोत स्थान',
    assamese: 'পানীৰ উৎসৰ স্থান',
    bengali: 'পানির উৎসের অবস্থান'
  },
  'water.temperature': {
    english: 'Temperature (°C)',
    hindi: 'तापमान (°C)',
    assamese: 'তাপমাত্ৰা (°C)',
    bengali: 'তাপমাত্রা (°C)'
  },
  'water.tds': {
    english: 'TDS (ppm)',
    hindi: 'टीडीएस (ppm)',
    assamese: 'টিডিএস (ppm)',
    bengali: 'টিডিএস (পিপিএম)'
  },
  'water.ph': {
    english: 'pH Level',
    hindi: 'पीएच स्तर',
    assamese: 'পিএইচ স্তৰ',
    bengali: 'পিএইচ স্তর'
  },
  'water.turbidity': {
    english: 'Turbidity (NTU)',
    hindi: 'टर्बिडिटी (NTU)',
    assamese: 'টাৰ্বিডিটি (NTU)',
    bengali: 'টার্বিডিটি (এনটিইউ)'
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
  'alerts.title': {
    english: 'Health Alerts & Notifications',
    hindi: 'स्वास्थ्य अलर्ट और सूचनाएं',
    assamese: 'স্বাস্থ্য সতর্কতা আৰু জাননী',
    bengali: 'স্বাস্থ্য সতর্কতা ও বিজ্ঞপ্তি'
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
  'alerts.district_status': {
    english: 'District Status',
    hindi: 'जिला स्थिति',
    assamese: 'জিলাৰ অৱস্থা',
    bengali: 'জেলার অবস্থা'
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
    assamese: 'বিস্তৃত স্বাস্থ্য নিৰীক্ষণ আৰু ৰোগ ট্ৰেকিং ডেশ্বব'
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
  'community.joinnetwork': {
    english: 'Join Our Network',
    hindi: 'हमारे नेटवर्क में शामिल हों',
    assamese: 'আমাৰ নেটৱৰ্কত যোগদান কৰক',
    bengali: 'আমাদের নেটওয়ার্কে যোগ দিন'
  },
  'community.name': {
    english: 'Full Name',
    hindi: 'पूरा नाम',
    assamese: 'সম্পূৰ্ণ নাম',
    bengali: 'সম্পূর্ণ নাম'
  },
  'community.role': {
    english: 'Role',
    hindi: 'भूमिका',
    assamese: 'ভূমিকা',
    bengali: 'ভূমিকা'
  },
  'community.asha': {
    english: 'ASHA Worker',
    hindi: 'आशा कार्यकर्ता',
    assamese: 'আশা কৰ্মী',
    bengali: 'আশা কর্মী'
  },
  'community.doctor': {
    english: 'Doctor',
    hindi: 'डॉक्टर',
    assamese: 'ডাক্তৰ',
    bengali: 'ডাক্তার'
  },
  'community.clinic': {
    english: 'Medical Clinic',
    hindi: 'मेडिकल क्लिनिक',
    assamese: 'চিকিৎসা ক্লিনিক',
    bengali: 'মেডিকেল ক্লিনিক'
  },
  'community.cases': {
    english: 'Cases Reported',
    hindi: 'मामले रिपोर्ट किए गए',
    assamese: 'প্ৰতিবেদিত কে',
    bengali: 'রিপোর্ট করা মামলা'
  },
  'community.join': {
    english: 'Update Details',
    hindi: 'विवरण अपडेट करें',
    assamese: 'বিৱৰণ আপডেট কৰক',
    bengali: 'বিবরণ আপডেট করুন'
  },

  // Alerts expanded
  'alerts.badge': {
    english: 'Disease Surveillance',
    hindi: 'रोग निगरानी',
    assamese: 'ৰোগ নিৰীক্ষণ',
    bengali: 'রোগ নজরদারি'
  },
  'alerts.subtitle': {
    english: 'Real-time disease outbreak monitoring and alert system for Northeast India',
    hindi: 'पूर्वोत्तर भारत के लिए रीयल-टाइम रोग प्रकोप निगरानी और चेतावनी प्रणाली',
    assamese: 'উত্তৰ-পূৱ ভাৰতৰ বাবে ৰিয়েল-টাইম ৰোগ প্ৰাদুৰ্ভাৱ নিৰীক্ষণ আৰু সতর্কতা ব্যৱস্থা',
    bengali: 'উত্তর-পূর্ব ভারতের জন্য রিয়েল-টাইম রোগ প্রাদুৰ্ভাব পর্যবেক্ষণ ও সতর্কতা ব্যবস্থা'
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
  'alerts.cases': {
    english: 'cases',
    hindi: 'मामले',
    assamese: 'কে',
    bengali: 'মামলা'
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

  // Disease Prevention expanded
  'prevention.badge': {
    english: 'Health Education',
    hindi: 'स्वास्थ्य शिक्षा',
    assamese: 'স্বাস্থ্য শিক্ষা',
    bengali: 'স্বাস্থ্য শিক্ষা'
  },
  'prevention.subtitle': {
    english: 'Learn about waterborne diseases, prevention methods, and health practices',
    hindi: 'जल-जनित रोगों, रोकथाम के तरीकों और स्वास्थ्य प्रथाओं के बारे में जानें',
    assamese: 'পানীবাহিত ৰোগ, প্ৰতিৰোধৰ পদ্ধতি আৰু স্বাস্থ্য প্ৰথাৰ বিষয়ে জানক',
    bengali: 'জলবাহিত রোগ, প্রতিরোধের পদ্ধতি এবং স্বাস্থ্য অনুশীলন সম্পর্কে জানুন'
  },
  'prevention.cholera.title': {
    english: 'Cholera Prevention',
    hindi: 'हैजा की रोकथाम',
    assamese: 'কলেৰা প্ৰতিৰোধ',
    bengali: 'কলেরা প্রতিরোধ'
  },
  'prevention.cholera.desc': {
    english: 'Learn how to prevent cholera through proper sanitation and safe water practices.',
    hindi: 'उचित स्वच्छता और सुरक्षित पानी की प्रथाओं के माध्यम से हैजा को रोकना सीखें।',
    assamese: 'উচিত পৰিচ্ছন্নতা আৰু নিৰাপদ পানীৰ অনুশীলনৰ যোগেদি কলেৰা প্ৰতিৰোধ কৰা শিকক।',
    bengali: 'যথাযথ স্যানিটেশন এবং নিরাপদ পানির অনুশীলনের মাধ্যমে কলেরা প্রতিরোধ করা শিখুন।'
  },
  'prevention.typhoid.title': {
    english: 'Typhoid Prevention',
    hindi: 'टाइफाइड की रोकथाम',
    assamese: 'টাইফইড প্ৰতিৰোধ',
    bengali: 'টাইফয়েড প্রতিরোধ'
  },
  'prevention.typhoid.desc': {
    english: 'Understand typhoid transmission and prevention through vaccination and hygiene.',
    hindi: 'टीकाकरण और स्वच्छता के माध्यम से टाइफाइड के संचरण और रोकथाम को समझें।',
    assamese: 'টিকাকৰণ আৰু স্বচ্ছতাৰ যোগেদি টাইফইডৰ সংক্ৰমণ আৰু প্ৰতিৰোধ বুজক।',
    bengali: 'টিকাদান এবং স্বাস্থ্যবিধির মাধ্যমে টাইফয়েড সংক্রমণ ও প্রতিরোধ বুঝুন।'
  },
  'prevention.hepatitis.title': {
    english: 'Hepatitis Prevention',
    hindi: 'हेपेटाइटिस की रोकथाम',
    assamese: 'হেপাটাইটিস প্ৰতিৰোধ',
    bengali: 'হেপাটাইটিস প্রতিরোধ'
  },
  'prevention.hepatitis.desc': {
    english: 'Prevention strategies for hepatitis A and E through safe food and water practices.',
    hindi: 'सुरक्षित भोजन और पानी की प्रथाओं के माध्यम से हेपेटाइटिस ए और ई की रोकथाम की रणनीति।',
    assamese: 'নিৰাপদ খাদ্য আৰু পানীৰ অনুশীলনৰ যোগেদি হেপাটাইটিস এ আৰু ই প্ৰতিৰোধৰ কৌশল।',
    bengali: 'নিরাপদ খাদ্য ও পানির অনুশীলনের মাধ্যমে হেপাটাইটিস এ এবং ই প্রতিরোধের কৌশল।'
  },
  'prevention.diarrhea.title': {
    english: 'Diarrheal Disease Prevention',
    hindi: 'दस्त रोग की रोकथाम',
    assamese: 'ডায়েৰিয়া ৰোগ প্ৰতিৰোধ',
    bengali: 'ডায়রিয়াজনিত রোগ প্রতিরোধ'
  },
  'prevention.diarrhea.desc': {
    english: 'Essential practices to prevent diarrheal diseases and maintain intestinal health.',
    hindi: 'दस्त की बीमारियों को रोकने और आंत के स्वास्थ्य को बनाए रखने के लिए आवश्यक प্রथाएं।',
    assamese: 'ডায়েৰিয়া ৰোগ প্ৰতিৰোধ কৰিবলৈ আৰু আন্ত্ৰিক স্বাস্থ্য বজাই ৰাখিবলৈ প্ৰয়োজনীয় অনুশীলন।',
    bengali: 'ডায়রিয়াজনিত রোগ প্রতিরোধ এবং অন্ত্রের স্বাস্থ্য বজায় রাখার জন্য প্রয়োজনীয় অনুশীলন।'
  },
  'prevention.readmore': {
    english: 'Read More',
    hindi: 'और पढ़ें',
    assamese: 'অধিক পঢ়ক',
    bengali: 'আরও পড়ুন'
  },

  // Footer
  'footer.description': {
    english: 'Advancing healthcare through technology and community collaboration in Northeast India.',
    hindi: 'पूर्वोत्तर भारत में प्रौद्योगिकी और सामुदायिक सहयोग के माध्यम से स्वास्थ्य सेवा को आगे बढ़ाना।',
    assamese: 'উত্তৰ-পূৱ ভাৰতত প্ৰযুক্তি আৰু সমুদায়িক সহযোগিতাৰ যোগেদি স্বাস্থ্যসেৱা অগ্ৰগতি।',
    bengali: 'উত্তর-পূর্ব ভারতে প্রযুক্তি এবং কমিউনিটি সহযোগিতার মাধ্যমে স্বাস্থ্যসেবার অগ্রগতি।'
  },
  'footer.quicklinks': {
    english: 'Quick Links',
    hindi: 'त्वरित लिंक',
    assamese: 'দ্ৰুত লিংক',
    bengali: 'দ্রুত লিংক'
  },
  'footer.about': {
    english: 'About Us',
    hindi: 'हमारे बारे में',
    assamese: 'আমাৰ বিষয়ে',
    bengali: 'আমাদের সম্পর্কে'
  },
  'footer.contact': {
    english: 'Contact',
    hindi: 'संपर्क',
    assamese: 'যোগাযোগ',
    bengali: 'যোগাযোগ'
  },
  'footer.privacy': {
    english: 'Privacy Policy',
    hindi: 'गोपनीयता नीति',
    assamese: 'গোপনীয়তা নীতি',
    bengali: 'গোপনীয়তা নীতি'
  },
  'footer.terms': {
    english: 'Terms of Service',
    hindi: 'सेवा की शर्तें',
    assamese: 'সেৱাৰ চৰ্ত',
    bengali: 'সেবার শর্তাবলী'
  },
  'footer.rights': {
    english: 'All rights reserved.',
    hindi: 'सभी अधिकार सुरक्षित।',
    assamese: 'সকলো অধিকাৰ সুৰক্ষিত।',
    bengali: 'সমস্ত অধিকার সংরক্ষিত।'
  },

  // Symptoms
  'symptom.vomit': {
    english: 'Vomiting',
    hindi: 'उल्टी',
    assamese: 'বমি',
    bengali: 'বমি'
  },
  'symptom.fever': {
    english: 'Fever',
    hindi: 'बुखार',
    assamese: 'জ্বৰ',
    bengali: 'জ্বর'
  },
  'symptom.diarrhea': {
    english: 'Diarrhea',
    hindi: 'दस्त',
    assamese: 'ডায়েৰিয়া',
    bengali: 'ডায়রিয়া'
  },
  'symptom.nausea': {
    english: 'Nausea',
    hindi: 'मतली',
    assamese: 'বমিভাব',
    bengali: 'বমি ভাব'
  },
  'symptom.shortness_breath': {
    english: 'Shortness of Breath',
    hindi: 'सांस लेने में कठिनाई',
    assamese: 'শ্বাসকষ্ট',
    bengali: 'শ্বাসকষ্ট'
  },
  'symptom.stomach_pain': {
    english: 'Stomach Pain',
    hindi: 'पेट दर्द',
    assamese: 'পেটৰ বিষ',
    bengali: 'পেট ব্যথা'
  },
  'symptom.weight_loss': {
    english: 'Weight Loss',
    hindi: 'वजन कम होना',
    assamese: 'ওজন হ্ৰাস',
    bengali: 'ওজন হ্রাস'
  },

  // Water Sources
  'watersource.well': {
    english: 'Well Water',
    hindi: 'कुएं का पानी',
    assamese: 'নলনলৰ পানী',
    bengali: 'কূপের পানি'
  },
  'watersource.river': {
    english: 'River Water',
    hindi: 'नदी का पानी',
    assamese: 'নদীৰ পানী',
    bengali: 'নদীর পানি'
  },
  'watersource.pond': {
    english: 'Pond Water',
    hindi: 'तालाब का पानी',
    assamese: 'পুখুৰীৰ পানী',
    bengali: 'পুকুরের পানি'
  },
  'watersource.tap': {
    english: 'Tap Water',
    hindi: 'नल का पानी',
    assamese: 'নলৰ পানী',
    bengali: 'কলের পানি'
  },
  'watersource.tubewell': {
    english: 'Tube Well',
    hindi: 'ट्यूब वेल',
    assamese: 'টিউব ৱেল',
    bengali: 'নলকূপ'
  },

  // Enhanced Disease Prevention Translations
  'prevention.tips': {
    english: 'Prevention Tips',
    hindi: 'रोकथाम के सुझाव',
    assamese: 'প্ৰতিৰোধৰ টিপছ',
    bengali: 'প্রতিরোধের টিপস'
  },
  'prevention.general_health': {
    english: 'General Health Guidelines',
    hindi: 'सामान्य स्वास्थ्य दिशानिर्देश',
    assamese: 'সাধাৰণ স্বাস্থ্য নিৰ্দেশনা',
    bengali: 'সাধারণ স্বাস্থ্য নির্দেশিকা'
  },
  'prevention.water_safety': {
    english: 'Water Safety Guide',
    hindi: 'जल सुरक्षा गाइड',
    assamese: 'পানী সুৰক্ষা গাইড',
    bengali: 'পানি নিরাপত্তা গাইড'
  },
  'prevention.symptom_recognition': {
    english: 'Symptom Recognition',
    hindi: 'लक्षण पहचान',
    assamese: 'লক্ষণ চিনাক্তকৰণ',
    bengali: 'লক্ষণ চিহ্নিতকরণ'
  },
  'prevention.nutrition_recovery': {
    english: 'Nutrition & Recovery',
    hindi: 'पोषण और स्वास्थ्यलाभ',
    assamese: 'পুষ্টি আৰু আৰোগ্য',
    bengali: 'পুষ্টি ও পুনরুদ্ধার'
  },
  'prevention.emergency_contacts': {
    english: 'Emergency Contacts',
    hindi: 'आपातकालीन संपर्क',
    assamese: 'জৰুৰীকালীন যোগাযোগ',
    bengali: 'জরুরি যোগাযোগ'
  },

  // Disease Prevention Tips
  'prevention.cholera.tip1': {
    english: 'Drink only boiled or bottled water',
    hindi: 'केवल उबला हुआ या बोतलबंद पानी पिएं',
    assamese: 'কেৱল উতলা বা বটল পানী পান কৰক',
    bengali: 'শুধু ফুটানো বা বোতলজাত পানি পান করুন'
  },
  'prevention.cholera.tip2': {
    english: 'Wash hands frequently with soap',
    hindi: 'साबुन से बार-बार हाथ धोएं',
    assamese: 'চাবোনেৰে সঘনাই হাত ধুওক',
    bengali: 'সাবান দিয়ে ঘন ঘন হাত ধুয়ুন'
  },
  'prevention.cholera.tip3': {
    english: 'Eat freshly cooked, hot food',
    hindi: 'ताज़ा पका हुआ, गर्म खाना खाएं',
    assamese: 'সতেজ ৰন্ধা গৰম খাদ্য খাওক',
    bengali: 'তাজা রান্na করা গরম খাবার খান'
  },
  'prevention.cholera.tip4': {
    english: 'Avoid raw or undercooked seafood',
    hindi: 'कच्चा या अधपका समुद्री भोजन न खाएं',
    assamese: 'কেচা বা আধাসিদ্ধ সামুদ্ৰিক খাদ্য পৰিহাৰ কৰক',
    bengali: 'কাঁচা বা অর্ধসিদ্ধ সামুদ্রিক খাবার এড়িয়ে চলুন'
  },
  'prevention.cholera.tip5': {
    english: 'Use proper sanitation facilities',
    hindi: 'उचित स्वच्छता सुविधाओं का उपयोग करें',
    assamese: 'উচিত পৰিচ্ছন্নতা সুবিধা ব্যৱহাৰ কৰক',
    bengali: 'যথাযথ স্যানিটেশন সুবিধা ব্যবহার করুন'
  },

  'prevention.typhoid.tip1': {
    english: 'Get vaccinated against typhoid',
    hindi: 'टाइफाइड के खिलाफ टीकाकरण कराएं',
    assamese: 'টাইফইডৰ বিৰুদ্ধে টিকা লওক',
    bengali: 'টাইফয়েডের বিরুদ্ধে টিকা নিন'
  },
  'prevention.typhoid.tip2': {
    english: 'Practice good hand hygiene',
    hindi: 'अच्छी हाथ की सफाई का अभ्यास करें',
    assamese: 'ভাল হাতৰ স্বচ্ছতা অনুশীলন কৰক',
    bengali: 'ভাল হাতের স্বাস্থ্যবিধি অনুশীলন করুন'
  },
  'prevention.typhoid.tip3': {
    english: 'Drink safe, boiled water',
    hindi: 'सुरक्षित, उबला हुआ पानी पिएं',
    assamese: 'নিৰাপদ, উতলা পানী পান কৰক',
    bengali: 'নিরাপদ, ফুটানো পানি পান করুন'
  },
  'prevention.typhoid.tip4': {
    english: 'Avoid street vendor food',
    hindi: 'रेहड़ी-पटरी का खाना न खाएं',
    assamese: 'ৰাস্তাৰ খাদ্য পৰিহাৰ কৰক',
    bengali: 'রাস্তার খাবার এড়িয়ে চলুন'
  },
  'prevention.typhoid.tip5': {
    english: 'Wash fruits and vegetables thoroughly',
    hindi: 'फलों और सब्जियों को अच्छी तरह धोएं',
    assamese: 'ফল আৰু পাচলি ভালকৈ ধুওক',
    bengali: 'ফল ও সবজি ভালোভাবে ধুয়ুন'
  },

  'prevention.hepatitis.tip1': {
    english: 'Get hepatitis A vaccination',
    hindi: 'हेपेटाइटिस ए का टीकाकरण कराएं',
    assamese: 'হেপাটাইটিস এ টিকা লওক',
    bengali: 'হেপাটাইটিস এ টিকা নিন'
  },
  'prevention.hepatitis.tip2': {
    english: 'Maintain personal hygiene',
    hindi: 'व्यक्तगत स्वच्छता बनाए रखें',
    assamese: 'ব্যক্তিগত স্বচ্ছতা বজাই ৰাখক',
    bengali: 'ব্যক্তিগ��� স্বাস্থ্যবিধি বজায় রাখুন'
  },
  'prevention.hepatitis.tip3': {
    english: 'Avoid contaminated water',
    hindi: 'दूषित पानी से बचें',
    assamese: 'দূষিত পানী পৰিহাৰ কৰক',
    bengali: 'দূষিত পানি এড়িয়ে চলুন'
  },
  'prevention.hepatitis.tip4': {
    english: 'Practice safe food handling',
    hindi: 'सुरक्षित खाद्य संचालन का अभ्यास करें',
    assamese: 'নিৰাপদ খাদ্য পৰিচালনা অনুশীলন কৰক',
    bengali: 'নিরাপদ খাদ্য পরিচালনা অনুশীলন করুন'
  },
  'prevention.hepatitis.tip5': {
    english: 'Use clean cooking utensils',
    hindi: 'साफ खाना पकाने के बर्तन ब्यवहार करें',
    assamese: 'পৰিষ্কাৰ ৰন্ধন সামগ্ৰী ব্যৱহাৰ কৰক',
    bengali: 'পরিষ্কার রান্নার সামগ্রী ব্যবহার করুন'
  },

  'prevention.diarrhea.tip1': {
    english: 'Use oral rehydration therapy',
    hindi: 'ओरल रिहाइड्रेशन थेरापि का उपयोग करें',
    assamese: 'মুখৰ পুনৰজলয়ন চিকিৎসা ব্যৱহাৰ কৰক',
    bengali: 'ওরাল রিহাইড্রেশন থেরাপি ব্যবহার করুন'
  },
  'prevention.diarrhea.tip2': {
    english: 'Maintain proper hydration',
    hindi: 'उचित जलयोजन बनाए राखें',
    assamese: 'উচিত জলয়ন বজাই ৰাখক',
    bengali: 'যথাযথ জল সরবরাহ বজায় রাখুন'
  },
  'prevention.diarrhea.tip3': {
    english: 'Practice good sanitation',
    hindi: 'अच्छी स्वच्छता का अभ्यास करें',
    assamese: 'ভাল পৰিচ্ছন্নতা অনুশীলন কৰক',
    bengali: 'ভাল স্যানিটেশন অনুশীলন করুন'
  },
  'prevention.diarrhea.tip4': {
    english: 'Avoid contaminated food/water',
    hindi: 'दূषित खाबार/पानी से बचें',
    assamese: 'দূষিত খাদ্য/পানী পৰিহাৰ কৰক',
    bengali: 'দূষিত খাবার/পানি এড়িয়ে চলুন'
  },
  'prevention.diarrhea.tip5': {
    english: 'Seek medical care if severe',
    hindi: 'गुरूतर होने पर चिकित्सा सेवा लें',
    assamese: 'গুৰুতৰ হলে চিকিৎসা সেৱা লওক',
    bengali: 'গুরুতর হলে চিকিৎসা সেবা নিন'
  },

  // Placeholders
  'placeholder.name': {
    english: 'Enter patient full name',
    hindi: 'रोगी का पूरा नाम दर्ज करें',
    assamese: 'ৰোগীৰ সম্পূৰ্ণ নাম প্ৰবিষ্ট কৰক',
    bengali: 'রোগীর সম্পূর্ণ নাম প্রবেশ করান'
  },
  'placeholder.age': {
    english: 'Enter age',
    hindi: 'आयु दर्ज करें',
    assamese: 'বয়স প্ৰবিষ্ট কৰক',
    bengali: 'বয়স প্রবেশ করান'
  },
  'placeholder.village': {
    english: 'Enter village name',
    hindi: 'गांव का नाम दर्ज करें',
    assamese: 'গাঁওৰ নাম প্ৰবিষ্ট কৰক',
    bengali: 'গ্রামের নাম প্রবেশ করান'
  },
  'placeholder.days': {
    english: 'Enter number of days',
    hindi: 'दिनों की संख्या दर्ज करें',
    assamese: 'দিনৰ সংখ্যা প্ৰবিষ্ট কৰক',
    bengali: 'দিনের সংখ্যা প্রবেশ করান'
  },
  'placeholder.select_gender': {
    english: 'Select gender',
    hindi: 'लिंग चुनें',
    assamese: 'লিংগ নিৰ্বাচন কৰক',
    bengali: 'লিঙ্গ নির্বাচন করুন'
  },
  'placeholder.select_district': {
    english: 'Select district',
    hindi: 'जिला चुनें',
    assamese: 'জিলা নিৰ্বাচন কৰক',
    bengali: 'জেলা নির্বাচন করুন'
  },
  'placeholder.select_watersource': {
    english: 'Select water source',
    hindi: 'जल स्रोत चुनें',
    assamese: 'পানীৰ উৎস নিৰ্বাচন কৰক',
    bengali: 'পানির উৎস নির্বাচন করুন'
  },

  // Additional translations for missing fields
  'placeholder.enter_your_name': {
    english: 'Enter your name',
    hindi: 'अपना नाम दर्ज करें',
    assamese: 'আপোনাৰ নাম প্ৰবিষ্ট কৰক',
    bengali: 'আপনার নাম প্রবেশ করান'
  },
  'placeholder.select_role': {
    english: 'Select role',
    hindi: 'भूमिका चुनें',
    assamese: 'ভূমিকা নিৰ্বাচন কৰক',
    bengali: 'ভূমিকা নির্বাচন করুন'
  },
  'placeholder.village_name': {
    english: 'Village name',
    hindi: 'गांव का नाम',
    assamese: 'গাঁওৰ নাম',
    bengali: 'গ্রামের নাম'
  },
  'placeholder.number_of_cases': {
    english: 'Number of cases reported',
    hindi: 'रिपोर्ट किए गए मामलों की संख्या',
    assamese: 'প্ৰতিবেদিত কেছৰ সংখ্যা',
    bengali: 'রিপোর্ট করা মামলার সংখ্যা'
  },
  'placeholder.enter_district_name': {
    english: 'Enter district name',
    hindi: 'जिला का नाम दर्ज करें',
    assamese: 'জিলাৰ নাম প্ৰবিষ্ট কৰক',
    bengali: 'জেলার নাম প্রবেশ করান'
  },
  'placeholder.select_northeast_state': {
    english: 'Select Northeast state',
    hindi: 'पूर्वोत्तर राज्य चुनें',
    assamese: 'উত্তৰ-পূৱ ৰাজ্য নিৰ্বাচন কৰক',
    bengali: 'উত্তর-পূর্ব রাজ্য নির্বাচন করুন'
  },
  'placeholder.enter_location': {
    english: 'Enter water source location',
    hindi: 'जल स्रोत स्थान दर्ज करें',
    assamese: 'পানীৰ উৎসৰ স্থান প্ৰবিষ্ট কৰক',
    bengali: 'পানির উৎসের অবস্থান প্রবেশ করান'
  },
  'placeholder.select_source_type': {
    english: 'Select water source type',
    hindi: 'जल स्रोत प्रकार चुनें',
    assamese: 'পানীৰ উৎসৰ প্ৰকাৰ নিৰ্বাচন কৰক',
    bengali: 'পানির উৎসের ধরন নির্বাচন করুন'
  },
  'water.quality.measurements': {
    english: 'Quality Measurements',
    hindi: 'गुणवत्ता मापदंड',
    assamese: 'গুণগত পৰিমাপ',
    bengali: 'গুণমান পরিমাপ'
  },
  'water.source.type': {
    english: 'Water Source Type',
    hindi: 'जल स्रोत प्रकार',
    assamese: 'পানীৰ উৎসৰ প্ৰকাৰ',
    bengali: 'পানির উৎসের ধরন'
  },
  'watersource.deepwell': {
    english: 'Deep Well',
    hindi: 'गहरा कुआं',
    assamese: 'গভীৰ নলনল',
    bengali: 'গভীর কূপ'
  },
  'watersource.shallowwell': {
    english: 'Shallow Well',
    hindi: 'उथला कुआं',
    assamese: 'অগভীৰ নলনল',
    bengali: 'অগভীর কূপ'
  },
  'watersource.lake': {
    english: 'Lake',
    hindi: 'झील',
    assamese: 'হ্ৰদ',
    bengali: 'হ্রদ'
  },
  'watersource.spring': {
    english: 'Natural Spring',
    hindi: 'प्राकृतिक झरना',
    assamese: 'প্ৰাকৃতিক ঝৰণা',
    bengali: 'প্রাকৃতিক ঝরনা'
  },
  'watersource.municipal': {
    english: 'Municipal Tap',
    hindi: 'नगरपालिका नल',
    assamese: 'পৌৰসভাৰ নল',
    bengali: 'পৌরসভার কল'
  },
  
  // CSV Export
  'csv.export': {
    english: 'Export CSV',
    hindi: 'CSV निर्यात करें',
    assamese: 'CSV এক্সপোৰ্ট কৰক',
    bengali: 'CSV এক্সপোর্ট করুন'
  },
  'csv.patient_data': {
    english: 'Patient Data',
    hindi: 'रोगी डेटा',
    assamese: 'ৰোগীৰ তথ্য',
    bengali: 'রোগীর ডেটা'
  },
  'csv.water_data': {
    english: 'Water Quality Data',
    hindi: 'जल गुणवत्ता डेटा',
    assamese: 'পানীৰ গুণগত তথ্য',
    bengali: 'পানির গুণমান ডেটা'
  }
};

interface DataContextType {
  // Data
  patientData: PatientData[];
  waterQualityData: WaterQualityData[];
  communityMembers: CommunityMember[];
  patientDrafts: PatientDraft[];
  waterQualityDrafts: WaterQualityDraft[];
  
  // Language
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  translate: (key: string) => string;
  
  // Data management functions
  addPatientData: (data: PatientData) => void;
  addWaterQualityData: (data: WaterQualityData) => void;
  addCommunityMember: (member: CommunityMember) => void;
  
  // Draft management
  addPatientDraft: (draft: PatientDraft) => void;
  addWaterQualityDraft: (draft: WaterQualityDraft) => void;
  updatePatientDraft: (id: string, draft: PatientDraft) => void;
  updateWaterQualityDraft: (id: string, draft: WaterQualityDraft) => void;
  deletePatientDraft: (id: string) => void;
  deleteWaterQualityDraft: (id: string) => void;
  
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
  const [patientDrafts, setPatientDrafts] = useState<PatientDraft[]>([]);
  const [waterQualityDrafts, setWaterQualityDrafts] = useState<WaterQualityDraft[]>([]);
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

  const addPatientDraft = (draft: PatientDraft) => {
    setPatientDrafts(prev => [...prev, draft]);
  };

  const addWaterQualityDraft = (draft: WaterQualityDraft) => {
    setWaterQualityDrafts(prev => [...prev, draft]);
  };

  const updatePatientDraft = (id: string, draft: PatientDraft) => {
    setPatientDrafts(prev => prev.map(d => d.id === id ? draft : d));
  };

  const updateWaterQualityDraft = (id: string, draft: WaterQualityDraft) => {
    setWaterQualityDrafts(prev => prev.map(d => d.id === id ? draft : d));
  };

  const deletePatientDraft = (id: string) => {
    setPatientDrafts(prev => prev.filter(d => d.id !== id));
  };

  const deleteWaterQualityDraft = (id: string) => {
    setWaterQualityDrafts(prev => prev.filter(d => d.id !== id));
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
    patientDrafts,
    waterQualityDrafts,
    currentLanguage,
    setCurrentLanguage,
    translate,
    addPatientData,
    addWaterQualityData,
    addCommunityMember,
    addPatientDraft,
    addWaterQualityDraft,
    updatePatientDraft,
    updateWaterQualityDraft,
    deletePatientDraft,
    deleteWaterQualityDraft,
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