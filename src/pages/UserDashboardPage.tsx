import React, { useEffect, useMemo, useState } from 'react';
import { API_BASE_URL } from '../config/api';

import {
  Activity,
  AlarmClock,
  BarChart3,
  Bot,
  Camera,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  FileText,
  HeartHandshake,
  Home,
  Languages,
  LineChart,
  LogOut,
  MessageCircle,
  Mic,
  Moon,
  Play,
  Save,
  Settings,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Upload,
  UserRound,
  Video,
  Volume2,
  X,
  Utensils,
  Droplets,
  Dumbbell,
} from 'lucide-react';

import { UserProfile, WellnessUpdate } from '../types';
import UserAIAssistantPage from './UserAIAssistantPage';

type UserTab =
  | 'Daily Updates'
  | 'Alarm'
  | 'Video Sensor'
  | 'Profile'
  | 'AI Assistant'
  | 'Chat with Doctor'
  | 'Progress'
  | 'Settings';

type Language = 'English' | 'Telugu' | 'Hindi';
type Theme = 'dark' | 'light';

interface Props {
  currentUser: UserProfile;
  wellnessUpdates: WellnessUpdate[];
  onSubmitWellnessUpdate: (update: WellnessUpdate) => void;
  onLogout: () => void;
}

/* -------------------------------------------------------
   TRANSLATIONS
------------------------------------------------------- */

const translations = {
  English: {
    dailyUpdates: 'Daily Updates',
    alarm: 'Alarm',
    videoSensor: 'Video Sensor',
    profile: 'Profile',
    aiAssistant: 'AI Assistant',
    chatDoctor: 'Chat with Doctor',
    progress: 'My Progress',
    settings: 'Settings',
    logout: 'Logout',

    userPortal: 'User Portal',
    personalDashboard: 'Personal dashboard',
    personalWelfarePortal: 'Personal Welfare Portal',
    welcome: 'Welcome',

    wellnessScore: 'Wellness Score',
    personalIndicator: 'Personal indicator',
    latestStress: 'Latest Stress',
    latestFatigue: 'Latest Fatigue',

    dailyWellnessUpdate: 'Daily Wellness Update',
    recordWellness:
      'Record food, hydration, sleep, activity, mood and recovery.',

    bodyWeight: 'Body Weight (kg)',
    waterIntake: 'Water Intake (litres)',
    mealsFood: 'Meals / Food',
    sleepDuration: 'Sleep Duration (hours)',
    sleepQuality: 'Sleep Quality',
    exercise: 'Exercise / Physical Activity',
    stressLevel: 'Stress Level',
    fatigueLevel: 'Fatigue Level',
    mood: 'Mood',
    energyLevel: 'Energy Level',
    restRecovery: 'Rest / Recovery',
    personalNotes: 'Personal Notes',

    optional: 'Optional',
    waterExample: 'e.g. 2.5',
    mealsPlaceholder: 'Briefly record your meals today',
    sleepExample: 'e.g. 7.5',
    exercisePlaceholder: 'Walking, gym, sports, rest day...',
    recoveryPlaceholder: 'Good rest, stretching, recovery day...',
    notesPlaceholder: 'Anything else you want to record?',

    poor: 'Poor',
    fair: 'Fair',
    good: 'Good',
    excellent: 'Excellent',
    okay: 'Okay',
    low: 'Low',

    submitDailyUpdate: 'Submit Daily Update',
    updateSubmitted:
      'Daily wellness update submitted successfully.',

    dailyAlarm: 'Daily Alarm',
    alarmDescription:
      'Set a reminder for your wellness check-in.',
    alarmTime: 'Alarm time',
    reminderLabel: 'Reminder label',
    dailyWellnessCheck: 'Daily wellness check-in',
    enableReminder: 'Enable daily reminder',
    reminderSet: 'Reminder set for',
    alarmDisabled: 'Alarm is currently disabled.',

    videoDescription:
      'Upload a short face video to the deployed welfare server. Authorized welfare employees can view submitted videos in Personnel. Any biometric or health-related inference should be handled by a validated, consented analysis service.',
    uploading: 'Uploading...',
    chooseVideo: 'Choose video',
    videoFormats: 'MP4, WebM or MOV • maximum 15 MB',
    previouslyUploaded: 'Previously uploaded videos',
    noVideos: 'No uploaded videos yet.',
    analysis: 'Analysis',
    videoUploaded:
      'Video uploaded successfully. Authorized employees can now view it in Personnel.',
    chooseVideoFile: 'Please choose a video file.',
    shortVideo: 'Please upload a short video under 15 MB.',
    uploadServer: 'Uploading video to the deployed welfare server...',

    profileTitle: 'Profile',
    fullName: 'Full Name',
    email: 'Email',
    unit: 'Unit',
    personnelId: 'Personnel ID',
    saveProfile: 'Save Profile',
    profileSaved: 'Profile changes saved for this session.',

    doctorChat: 'Chat with Doctor',
    doctorAvailable: 'Doctor availability: Available',
    doctorAvailability:
      'Availability is shown by the welfare support team.',
    doctorPlaceholder: 'Write your message...',
    sendDoctor: 'Send to Doctor',
    messageSent: 'Message sent',

    progressTitle: 'My Daily Progress',
    progressDescription:
      'Review your recent stress, fatigue and energy records.',
    graph: 'Graph',
    chart: 'Chart',
    noProgress:
      'Submit daily updates to build your progress history.',
    stress: 'Stress',
    fatigue: 'Fatigue',
    energy: 'Energy',
    notifications: 'Notifications',
    latestSubmission:
      'Your latest wellness submission is available for review.',
    alarmNotification:
      'Use the Alarm option to schedule your daily check-in.',

    settingsTitle: 'Settings',
    language: 'Language',
    notificationSettings: 'Notifications',
    wellnessReminders: 'Wellness reminders and updates',
    voiceResponses: 'Voice responses',
    allowVoice: 'Allow AI Assistant to speak responses',
    voiceEnabled: 'Voice responses are enabled.',

    mobileMenu: 'User Menu',

    sessionExpired:
      'Your login session has expired. Please log in again.',
    failedWellness:
      'Failed to save wellness update.',
    failedVideo:
      'Video upload failed.',
    couldNotReadVideo:
      'Could not read the video file.',
    welcomeText: 'Welcome',
  },

  Telugu: {
    dailyUpdates: 'రోజువారీ అప్డేట్స్',
    alarm: 'అలారం',
    videoSensor: 'వీడియో సెన్సర్',
    profile: 'ప్రొఫైల్',
    aiAssistant: 'AI అసిస్టెంట్',
    chatDoctor: 'డాక్టర్‌తో చాట్',
    progress: 'నా పురోగతి',
    settings: 'సెట్టింగ్స్',
    logout: 'లాగ్ అవుట్',

    userPortal: 'యూజర్ పోర్టల్',
    personalDashboard: 'వ్యక్తిగత డ్యాష్‌బోర్డ్',
    personalWelfarePortal: 'వ్యక్తిగత వెల్ఫేర్ పోర్టల్',
    welcome: 'స్వాగతం',

    wellnessScore: 'వెల్నెస్ స్కోర్',
    personalIndicator: 'వ్యక్తిగత సూచిక',
    latestStress: 'తాజా ఒత్తిడి',
    latestFatigue: 'తాజా అలసట',

    dailyWellnessUpdate: 'రోజువారీ వెల్నెస్ అప్డేట్',
    recordWellness:
      'ఆహారం, నీరు, నిద్ర, వ్యాయామం, మూడ్ మరియు రికవరీని నమోదు చేయండి.',

    bodyWeight: 'శరీర బరువు (కిలోలు)',
    waterIntake: 'నీటి వినియోగం (లీటర్లు)',
    mealsFood: 'భోజనం / ఆహారం',
    sleepDuration: 'నిద్ర సమయం (గంటలు)',
    sleepQuality: 'నిద్ర నాణ్యత',
    exercise: 'వ్యాయామం / శారీరక కార్యకలాపం',
    stressLevel: 'ఒత్తిడి స్థాయి',
    fatigueLevel: 'అలసట స్థాయి',
    mood: 'మూడ్',
    energyLevel: 'శక్తి స్థాయి',
    restRecovery: 'విశ్రాంతి / రికవరీ',
    personalNotes: 'వ్యక్తిగత నోట్స్',

    optional: 'ఐచ్ఛికం',
    waterExample: 'ఉదా: 2.5',
    mealsPlaceholder: 'ఈరోజు మీరు తిన్న ఆహారాన్ని నమోదు చేయండి',
    sleepExample: 'ఉదా: 7.5',
    exercisePlaceholder: 'వాకింగ్, జిమ్, స్పోర్ట్స్, రెస్ట్ డే...',
    recoveryPlaceholder: 'మంచి విశ్రాంతి, స్ట్రెచింగ్, రికవరీ డే...',
    notesPlaceholder: 'మీరు నమోదు చేయాలనుకున్న ఇతర విషయాలు...',

    poor: 'చెడు',
    fair: 'సగటు',
    good: 'మంచి',
    excellent: 'అద్భుతం',
    okay: 'పర్వాలేదు',
    low: 'తక్కువ',

    submitDailyUpdate: 'రోజువారీ అప్డేట్ సమర్పించండి',
    updateSubmitted:
      'రోజువారీ వెల్నెస్ అప్డేట్ విజయవంతంగా సమర్పించబడింది.',

    dailyAlarm: 'రోజువారీ అలారం',
    alarmDescription:
      'మీ వెల్నెస్ చెక్-ఇన్ కోసం రిమైండర్ సెట్ చేయండి.',
    alarmTime: 'అలారం సమయం',
    reminderLabel: 'రిమైండర్ పేరు',
    dailyWellnessCheck: 'రోజువారీ వెల్నెస్ చెక్-ఇన్',
    enableReminder: 'రోజువారీ రిమైండర్‌ను ప్రారంభించండి',
    reminderSet: 'రిమైండర్ సెట్ చేయబడింది',
    alarmDisabled: 'అలారం ప్రస్తుతం నిలిపివేయబడింది.',


    videoDescription:
      'చిన్న ఫేస్ వీడియోను వెల్ఫేర్ సర్వర్‌కు అప్లోడ్ చేయండి. అనుమతించబడిన వెల్ఫేర్ ఉద్యోగులు Personnel విభాగంలో వీడియోలను చూడగలరు.',
    uploading: 'అప్లోడ్ అవుతోంది...',
    chooseVideo: 'వీడియో ఎంచుకోండి',
    videoFormats: 'MP4, WebM లేదా MOV • గరిష్టంగా 15 MB',
    previouslyUploaded: 'ఇంతకు ముందు అప్లోడ్ చేసిన వీడియోలు',
    noVideos: 'ఇంకా వీడియోలు అప్లోడ్ చేయలేదు.',
    analysis: 'విశ్లేషణ',
    videoUploaded:
      'వీడియో విజయవంతంగా అప్లోడ్ చేయబడింది. అనుమతించబడిన ఉద్యోగులు ఇప్పుడు దాన్ని చూడగలరు.',
    chooseVideoFile: 'దయచేసి ఒక వీడియో ఫైల్ ఎంచుకోండి.',
    shortVideo: 'దయచేసి 15 MB కంటే తక్కువ చిన్న వీడియోను అప్లోడ్ చేయండి.',
    uploadServer: 'వీడియో వెల్ఫేర్ సర్వర్‌కు అప్లోడ్ అవుతోంది...',

    profileTitle: 'ప్రొఫైల్',
    fullName: 'పూర్తి పేరు',
    email: 'ఈమెయిల్',
    unit: 'యూనిట్',
    personnelId: 'పర్సనల్ ID',
    saveProfile: 'ప్రొఫైల్ సేవ్ చేయండి',
    profileSaved: 'ఈ సెషన్ కోసం ప్రొఫైల్ మార్పులు సేవ్ చేయబడ్డాయి.',

    doctorChat: 'డాక్టర్‌తో చాట్',
    doctorAvailable: 'డాక్టర్ అందుబాటులో ఉన్నారు',
    doctorAvailability:
      'అందుబాటును వెల్ఫేర్ సపోర్ట్ టీమ్ చూపిస్తుంది.',
    doctorPlaceholder: 'మీ సందేశాన్ని రాయండి...',
    sendDoctor: 'డాక్టర్‌కు పంపండి',
    messageSent: 'సందేశం పంపబడింది',

    progressTitle: 'నా రోజువారీ పురోగతి',
    progressDescription:
      'మీ తాజా ఒత్తిడి, అలసట మరియు శక్తి రికార్డులను చూడండి.',
    graph: 'గ్రాఫ్',
    chart: 'చార్ట్',
    noProgress:
      'మీ పురోగతి చరిత్రను రూపొందించడానికి రోజువారీ అప్డేట్స్ సమర్పించండి.',
    stress: 'ఒత్తిడి',
    fatigue: 'అలసట',
    energy: 'శక్తి',
    notifications: 'నోటిఫికేషన్లు',
    latestSubmission:
      'మీ తాజా వెల్నెస్ సమర్పణ సమీక్షకు అందుబాటులో ఉంది.',
    alarmNotification:
      'మీ రోజువారీ చెక్-ఇన్‌ను షెడ్యూల్ చేయడానికి అలారం ఎంపికను ఉపయోగించండి.',

    settingsTitle: 'సెట్టింగ్స్',
    language: 'భాష',
    notificationSettings: 'నోటిఫికేషన్లు',
    wellnessReminders: 'వెల్నెస్ రిమైండర్లు మరియు అప్డేట్స్',
    voiceResponses: 'వాయిస్ స్పందనలు',
    allowVoice: 'AI అసిస్టెంట్ స్పందనలను మాట్లాడటానికి అనుమతించండి',
    voiceEnabled: 'వాయిస్ స్పందనలు ప్రారంభించబడ్డాయి.',

    mobileMenu: 'యూజర్ మెనూ',

    sessionExpired:
      'మీ లాగిన్ సెషన్ ముగిసింది. దయచేసి మళ్లీ లాగిన్ చేయండి.',
    failedWellness:
      'వెల్నెస్ అప్డేట్ సేవ్ చేయడం విఫలమైంది.',
    failedVideo:
      'వీడియో అప్లోడ్ విఫలమైంది.',
    couldNotReadVideo:
      'వీడియో ఫైల్‌ను చదవలేకపోయాము.',
    welcomeText: 'స్వాగతం',
  },

  Hindi: {
    dailyUpdates: 'दैनिक अपडेट',
    alarm: 'अलार्म',
    videoSensor: 'वीडियो सेंसर',
    profile: 'प्रोफ़ाइल',
    aiAssistant: 'AI असिस्टेंट',
    chatDoctor: 'डॉक्टर से चैट',
    progress: 'मेरी प्रगति',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',

    userPortal: 'यूज़र पोर्टल',
    personalDashboard: 'व्यक्तिगत डैशबोर्ड',
    personalWelfarePortal: 'व्यक्तिगत वेलफेयर पोर्टल',
    welcome: 'स्वागत है',

    wellnessScore: 'वेलनेस स्कोर',
    personalIndicator: 'व्यक्तिगत संकेतक',
    latestStress: 'नवीनतम तनाव',
    latestFatigue: 'नवीनतम थकान',

    dailyWellnessUpdate: 'दैनिक वेलनेस अपडेट',
    recordWellness:
      'भोजन, पानी, नींद, गतिविधि, मूड और रिकवरी रिकॉर्ड करें।',

    bodyWeight: 'शरीर का वजन (किग्रा)',
    waterIntake: 'पानी का सेवन (लीटर)',
    mealsFood: 'भोजन / खाना',
    sleepDuration: 'नींद की अवधि (घंटे)',
    sleepQuality: 'नींद की गुणवत्ता',
    exercise: 'व्यायाम / शारीरिक गतिविधि',
    stressLevel: 'तनाव स्तर',
    fatigueLevel: 'थकान स्तर',
    mood: 'मूड',
    energyLevel: 'ऊर्जा स्तर',
    restRecovery: 'आराम / रिकवरी',
    personalNotes: 'व्यक्तिगत नोट्स',

    optional: 'वैकल्पिक',
    waterExample: 'उदा: 2.5',
    mealsPlaceholder: 'आज आपने क्या खाया उसे दर्ज करें',
    sleepExample: 'उदा: 7.5',
    exercisePlaceholder: 'वॉकिंग, जिम, खेल, आराम का दिन...',
    recoveryPlaceholder: 'अच्छा आराम, स्ट्रेचिंग, रिकवरी डे...',
    notesPlaceholder: 'कुछ और जिसे आप रिकॉर्ड करना चाहते हैं...',

    poor: 'खराब',
    fair: 'सामान्य',
    good: 'अच्छा',
    excellent: 'उत्कृष्ट',
    okay: 'ठीक',
    low: 'कम',

    submitDailyUpdate: 'दैनिक अपडेट जमा करें',
    updateSubmitted:
      'दैनिक वेलनेस अपडेट सफलतापूर्वक जमा किया गया।',

    dailyAlarm: 'दैनिक अलार्म',
    alarmDescription:
      'अपने वेलनेस चेक-इन के लिए रिमाइंडर सेट करें।',
    alarmTime: 'अलार्म समय',
    reminderLabel: 'रिमाइंडर नाम',
    dailyWellnessCheck: 'दैनिक वेलनेस चेक-इन',
    enableReminder: 'दैनिक रिमाइंडर सक्षम करें',
    reminderSet: 'रिमाइंडर सेट किया गया',
    alarmDisabled: 'अलार्म वर्तमान में बंद है।',

    videoDescription:
      'एक छोटा फेस वीडियो वेलफेयर सर्वर पर अपलोड करें। अधिकृत वेलफेयर कर्मचारी Personnel में वीडियो देख सकते हैं।',
    uploading: 'अपलोड हो रहा है...',
    chooseVideo: 'वीडियो चुनें',
    videoFormats: 'MP4, WebM या MOV • अधिकतम 15 MB',
    previouslyUploaded: 'पहले अपलोड किए गए वीडियो',
    noVideos: 'अभी तक कोई वीडियो अपलोड नहीं किया गया है।',
    analysis: 'विश्लेषण',
    videoUploaded:
      'वीडियो सफलतापूर्वक अपलोड हो गया। अधिकृत कर्मचारी इसे अब देख सकते हैं।',
    chooseVideoFile: 'कृपया एक वीडियो फ़ाइल चुनें।',
    shortVideo: 'कृपया 15 MB से कम का छोटा वीडियो अपलोड करें।',
    uploadServer: 'वीडियो वेलफेयर सर्वर पर अपलोड हो रहा है...',

    profileTitle: 'प्रोफ़ाइल',
    fullName: 'पूरा नाम',
    email: 'ईमेल',
    unit: 'यूनिट',
    personnelId: 'पर्सनल ID',
    saveProfile: 'प्रोफ़ाइल सेव करें',
    profileSaved:
      'इस सेशन के लिए प्रोफ़ाइल बदलाव सेव किए गए हैं।',

    doctorChat: 'डॉक्टर से चैट',
    doctorAvailable: 'डॉक्टर उपलब्ध हैं',
    doctorAvailability:
      'उपलब्धता वेलफेयर सपोर्ट टीम द्वारा दिखाई जाती है।',
    doctorPlaceholder: 'अपना संदेश लिखें...',
    sendDoctor: 'डॉक्टर को भेजें',
    messageSent: 'संदेश भेजा गया',

    progressTitle: 'मेरी दैनिक प्रगति',
    progressDescription:
      'अपने हाल के तनाव, थकान और ऊर्जा रिकॉर्ड देखें।',
    graph: 'ग्राफ',
    chart: 'चार्ट',
    noProgress:
      'अपनी प्रगति का इतिहास बनाने के लिए दैनिक अपडेट जमा करें।',
    stress: 'तनाव',
    fatigue: 'थकान',
    energy: 'ऊर्जा',
    notifications: 'नोटिफिकेशन',
    latestSubmission:
      'आपका नवीनतम वेलनेस सबमिशन समीक्षा के लिए उपलब्ध है।',
    alarmNotification:
      'दैनिक चेक-इन शेड्यूल करने के लिए अलार्म विकल्प का उपयोग करें।',

    settingsTitle: 'सेटिंग्स',
    language: 'भाषा',
    notificationSettings: 'नोटिफिकेशन',
    wellnessReminders: 'वेलनेस रिमाइंडर और अपडेट',
    voiceResponses: 'वॉइस प्रतिक्रियाएं',
    allowVoice: 'AI असिस्टेंट को प्रतिक्रियाएं बोलने की अनुमति दें',
    voiceEnabled: 'वॉइस प्रतिक्रियाएं सक्षम हैं।',

    mobileMenu: 'यूज़र मेन्यू',

    sessionExpired:
      'आपका लॉगिन सेशन समाप्त हो गया है। कृपया फिर से लॉगिन करें।',
    failedWellness:
      'वेलनेस अपडेट सेव नहीं हो सका।',
    failedVideo:
      'वीडियो अपलोड विफल हुआ।',
    couldNotReadVideo:
      'वीडियो फ़ाइल पढ़ी नहीं जा सकी।',
    welcomeText: 'स्वागत है',
  },
} as const;

/* -------------------------------------------------------
   NAVIGATION
------------------------------------------------------- */
const THEME_STYLES = `
  /* =================================
     USER LIGHT THEME
     WHITE + ORANGE
  ================================= */

  .welfare-dashboard.theme-light {
    background: #fffaf5 !important;
    color: #3b2a20 !important;
  }

  /* Header */
  .welfare-dashboard.theme-light header {
    background: #ffffff !important;
    border-color: #fed7aa !important;
  }

  .welfare-dashboard.theme-light header h1,
  .welfare-dashboard.theme-light header h2,
  .welfare-dashboard.theme-light header h3 {
    color: #9a3412 !important;
  }

  .welfare-dashboard.theme-light header p {
    color: #ea580c !important;
  }

  /* Sidebar */
  .welfare-dashboard.theme-light aside {
    background: #ffffff !important;
    border-color: #fed7aa !important;
  }

  .welfare-dashboard.theme-light aside p,
  .welfare-dashboard.theme-light aside span {
    color: #7c2d12 !important;
  }

  /* Sidebar buttons */
  .welfare-dashboard.theme-light aside button {
    color: #7c2d12 !important;
    background: transparent !important;
    border-color: transparent !important;
  }

  /* Selected sidebar option */
  .welfare-dashboard.theme-light aside button[class*="bg-cyan-500"] {
    background: #f97316 !important;
    color: #ffffff !important;
    border-color: #f97316 !important;
    box-shadow: 0 4px 14px rgba(249, 115, 22, 0.20);
  }

  .welfare-dashboard.theme-light aside button[class*="bg-cyan-500"] svg {
    color: #ffffff !important;
  }

  /* Sidebar hover */
  .welfare-dashboard.theme-light aside button:hover {
    background: #fff1e6 !important;
    color: #c2410c !important;
  }

  /* Cards */
  .welfare-dashboard.theme-light .rounded-2xl {
    background: #ffffff !important;
    border-color: #fed7aa !important;
    box-shadow: 0 4px 18px rgba(124, 45, 18, 0.06);
  }

  /* Headings */
  .welfare-dashboard.theme-light h1,
  .welfare-dashboard.theme-light h2,
  .welfare-dashboard.theme-light h3,
  .welfare-dashboard.theme-light h4 {
    color: #9a3412 !important;
  }

  /* Normal text */
  .welfare-dashboard.theme-light .text-slate-100,
  .welfare-dashboard.theme-light .text-slate-200,
  .welfare-dashboard.theme-light .text-slate-300 {
    color: #4a382f !important;
  }

  .welfare-dashboard.theme-light .text-slate-400,
  .welfare-dashboard.theme-light .text-slate-500 {
    color: #806b5d !important;
  }

  /* Orange highlights */
  .welfare-dashboard.theme-light .text-cyan-300,
  .welfare-dashboard.theme-light .text-cyan-400,
  .welfare-dashboard.theme-light .text-emerald-300,
  .welfare-dashboard.theme-light .text-emerald-400 {
    color: #ea580c !important;
  }

  /* Orange backgrounds */
  .welfare-dashboard.theme-light .bg-cyan-500,
  .welfare-dashboard.theme-light .bg-emerald-500 {
    background: #f97316 !important;
  }

  /* Orange borders */
  .welfare-dashboard.theme-light .border-cyan-400,
  .welfare-dashboard.theme-light .border-cyan-500,
  .welfare-dashboard.theme-light .border-emerald-500 {
    border-color: #f97316 !important;
  }

  /* Inputs */
  .welfare-dashboard.theme-light input,
  .welfare-dashboard.theme-light textarea,
  .welfare-dashboard.theme-light select {
    background: #ffffff !important;
    color: #3b2a20 !important;
    border-color: #fdba74 !important;
  }

  .welfare-dashboard.theme-light input:focus,
  .welfare-dashboard.theme-light textarea:focus,
  .welfare-dashboard.theme-light select:focus {
    border-color: #f97316 !important;
    outline-color: #f97316 !important;
    box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.12);
  }

  .welfare-dashboard.theme-light input::placeholder,
  .welfare-dashboard.theme-light textarea::placeholder {
    color: #a88976 !important;
  }

  /* General borders */
  .welfare-dashboard.theme-light .border-slate-800,
  .welfare-dashboard.theme-light .border-slate-700 {
    border-color: #fed7aa !important;
  }

  /* Soft orange areas */
  .welfare-dashboard.theme-light .bg-emerald-500\\/5,
  .welfare-dashboard.theme-light .bg-cyan-500\\/10,
  .welfare-dashboard.theme-light .bg-cyan-500\\/20 {
    background: #fff7ed !important;
  }

  /* Buttons */
  .welfare-dashboard.theme-light button {
    border-color: #fdba74;
  }

  /* Primary orange buttons */
  .welfare-dashboard.theme-light button.bg-cyan-500 {
    background: #f97316 !important;
    color: #ffffff !important;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.20);
  }

  .welfare-dashboard.theme-light button.bg-cyan-500:hover {
    background: #ea580c !important;
  }

  /* Theme option */
  .welfare-dashboard.theme-light .theme-option.active {
    background: #f97316 !important;
    color: #ffffff !important;
    border-color: #f97316 !important;
  }

  /* Links */
  .welfare-dashboard.theme-light a {
    color: #c2410c !important;
  }

  .welfare-dashboard.theme-light a:hover {
    color: #ea580c !important;
  }

  /* Orange icons */
  .welfare-dashboard.theme-light svg.text-cyan-400,
  .welfare-dashboard.theme-light svg.text-emerald-400 {
    color: #f97316 !important;
  }
`;
const nav: {
  id: UserTab;
  key: keyof typeof translations.English;
  icon: React.ElementType;
}[] = [
  { id: 'Daily Updates', key: 'dailyUpdates', icon: Home },
  { id: 'Alarm', key: 'alarm', icon: AlarmClock },
  { id: 'Video Sensor', key: 'videoSensor', icon: Video },
  { id: 'Profile', key: 'profile', icon: UserRound },
  { id: 'AI Assistant', key: 'aiAssistant', icon: Bot },
  { id: 'Chat with Doctor', key: 'chatDoctor', icon: Stethoscope },
  { id: 'Progress', key: 'progress', icon: BarChart3 },
  { id: 'Settings', key: 'settings', icon: Settings },
];

/* -------------------------------------------------------
   CARD
------------------------------------------------------- */

function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/70 ${className}`}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------
   MAIN DASHBOARD
------------------------------------------------------- */

export function UserDashboardPage({
  currentUser,
  wellnessUpdates,
  onSubmitWellnessUpdate,
  onLogout,
}: Props) {
  const [activeTab, setActiveTab] =
    useState<UserTab>('Daily Updates');

  const [mobileNav, setMobileNav] = useState(false);

  const [form, setForm] = useState({
    bodyWeight: '',
    waterIntake: '',
    meals: '',
    sleepHours: '',
    sleepQuality:
      'Good' as WellnessUpdate['sleepQuality'],
    exercise: '',
    stressLevel: 5,
    fatigueLevel: 5,
    mood: 'Good' as WellnessUpdate['mood'],
    energyLevel: 5,
    restRecovery: '',
    notes: '',
  });

  const [alarmTime, setAlarmTime] = useState('07:00');

  const [alarmLabel, setAlarmLabel] = useState(
    'Daily wellness check-in'
  );

  const [alarmEnabled, setAlarmEnabled] = useState(false);

  const [videoName, setVideoName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoMessage, setVideoMessage] = useState('');

  const [myVideos, setMyVideos] = useState<
    Array<{
      id: string;
      fileName: string;
      mimeType: string;
      dataUrl: string;
      analysisStatus: string;
      createdAt: string;
    }>
  >([]);

  const [profile, setProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
    unit: currentUser.unit,
  });

  const [savedProfile, setSavedProfile] =
    useState(profile);

  const [chartMode, setChartMode] = useState<
    'graph' | 'chart'
  >('graph');

  /* ---------------------------------------------------
     LANGUAGE
  --------------------------------------------------- */

  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage =
      localStorage.getItem('welfare_language');

    if (
      savedLanguage === 'Telugu' ||
      savedLanguage === 'Hindi' ||
      savedLanguage === 'English'
    ) {
      return savedLanguage;
    }

    return 'English';
  });
  const [theme, setTheme] = useState<Theme>(() => {
  const savedTheme = localStorage.getItem('welfare_theme');
  return savedTheme === 'light' ? 'light' : 'dark';
});

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem(
      'welfare_language',
      language
    );
  }, [language]);
  useEffect(() => {
  localStorage.setItem('welfare_theme', theme);
}, [theme]);

  const [notifications, setNotifications] =
    useState(true);

  const [doctorMessage, setDoctorMessage] =
    useState('');

  const [sentDoctorMessage, setSentDoctorMessage] =
    useState('');

  /* ---------------------------------------------------
     DATA
  --------------------------------------------------- */

  const latestUpdate = wellnessUpdates.find(
    (u) => u.personnelId === currentUser.id
  );

  const myUpdates = wellnessUpdates
    .filter((u) => u.personnelId === currentUser.id)
    .slice(0, 7)
    .reverse();

  const wellnessScore = useMemo(() => {
    if (!latestUpdate) return 82;

    return Math.max(
      0,
      Math.min(
        100,
        Math.round(
          ((100 - latestUpdate.stressLevel * 10) +
            (100 - latestUpdate.fatigueLevel * 10) +
            latestUpdate.energyLevel * 10) /
            3
        )
      )
    );
  }, [latestUpdate]);

  const updateField = (
    field: keyof typeof form,
    value: string | number
  ) =>
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

  /* ---------------------------------------------------
     WELLNESS SUBMIT
  --------------------------------------------------- */

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const update: WellnessUpdate = {
      id: `WU-${Date.now()}`,
      personnelId: currentUser.id,
      date: new Date().toISOString(),

      bodyWeight: form.bodyWeight
        ? Number(form.bodyWeight)
        : undefined,

      waterIntake: form.waterIntake
        ? Number(form.waterIntake)
        : undefined,

      meals: form.meals,

      sleepHours:
        Number(form.sleepHours) || 0,

      sleepQuality: form.sleepQuality,

      exercise: form.exercise,

      stressLevel: form.stressLevel,

      fatigueLevel: form.fatigueLevel,

      mood: form.mood,

      energyLevel: form.energyLevel,

      restRecovery: form.restRecovery,

      notes: form.notes,

      aiRisk:
        form.stressLevel >= 8 ||
        form.fatigueLevel >= 8
          ? 'High'
          : form.stressLevel >= 6 ||
            form.fatigueLevel >= 6
          ? 'Moderate'
          : 'Low',

      aiConfidence: 80,

      humanVerification: 'Pending',

      notificationStatus: 'Not Sent',
    };

    try {
      const token =
        localStorage.getItem('welfare_token');

      if (!token) {
        throw new Error(t.sessionExpired);
      }

      const response = await fetch(
        `${API_BASE_URL}/api/wellness`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(update),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || t.failedWellness
        );
      }

      onSubmitWellnessUpdate(update);

      setForm({
        bodyWeight: '',
        waterIntake: '',
        meals: '',
        sleepHours: '',
        sleepQuality: 'Good',
        exercise: '',
        stressLevel: 5,
        fatigueLevel: 5,
        mood: 'Good',
        energyLevel: 5,
        restRecovery: '',
        notes: '',
      });

      alert(t.updateSubmitted);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : t.failedWellness
      );
    }
  };
/* ---------------------------------------------------
   LOAD WELLNESS HISTORY
--------------------------------------------------- */

useEffect(() => {
  const loadWellnessHistory = async () => {
    const token = localStorage.getItem('welfare_token');

    if (!token) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/wellness/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        }
      );

      if (!response.ok) return;

      const data = await response.json();

      if (Array.isArray(data)) {
        data.forEach((item) => {
          onSubmitWellnessUpdate({
            ...item,
            id: String(item.id),
          });
        });
      }
    } catch {
      // Keep dashboard usable if history cannot be loaded.
    }
  };

  loadWellnessHistory();
}, [currentUser.id]);
  /* ---------------------------------------------------
     LOAD VIDEOS
  --------------------------------------------------- */

  useEffect(() => {
    const loadMyVideos = async () => {
      const token =
        localStorage.getItem('welfare_token');

      if (!token) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/wellness/videos/mine`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: 'no-store',
          }
        );

        if (!response.ok) return;

        const data = await response.json();

        if (Array.isArray(data)) {
          setMyVideos(data);
        }
      } catch {
        // Keep dashboard usable.
      }
    };

    loadMyVideos();
  }, [currentUser.id]);

  /* ---------------------------------------------------
     VIDEO
  --------------------------------------------------- */

  const handleVideo = async (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setVideoMessage(t.chooseVideoFile);
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setVideoMessage(t.shortVideo);
      return;
    }

    setVideoName(file.name);

    setVideoMessage(t.uploadServer);

    setVideoUploading(true);

    const localUrl =
      URL.createObjectURL(file);

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setVideoUrl(localUrl);

    try {
      const token =
        localStorage.getItem('welfare_token');

      if (!token) {
        throw new Error(t.sessionExpired);
      }

      const dataUrl =
        await new Promise<string>(
          (resolve, reject) => {
            const reader =
              new FileReader();

            reader.onload = () =>
              resolve(
                String(reader.result)
              );

            reader.onerror = () =>
              reject(
                new Error(t.couldNotReadVideo)
              );

            reader.readAsDataURL(file);
          }
        );

      const response = await fetch(
        `${API_BASE_URL}/api/wellness/videos`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            fileName: file.name,
            mimeType: file.type,
            dataUrl,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || t.failedVideo
        );
      }

      const uploaded = {
        id: String(data.id),
        fileName: file.name,
        mimeType: file.type,
        dataUrl,
        analysisStatus:
          data.analysisStatus ||
          'Pending',
        createdAt:
          new Date().toISOString(),
      };

      setMyVideos(
        (previous) =>
          [
            uploaded,
            ...previous.filter(
              (item) =>
                item.id !== uploaded.id
            ),
          ].slice(0, 10)
      );

      setVideoMessage(
        t.videoUploaded
      );
    } catch (error) {
      setVideoMessage(
        error instanceof Error
          ? error.message
          : t.failedVideo
      );
    } finally {
      setVideoUploading(false);
    }
  };

  /* ---------------------------------------------------
     VOICE
  --------------------------------------------------- */

  const speak = (text: string) => {
    const synth =
      window.speechSynthesis;

    if (synth) {
      synth.cancel();

      synth.speak(
        new SpeechSynthesisUtterance(
          text
        )
      );
    }
  };

  /* ---------------------------------------------------
     DAILY UPDATES
  --------------------------------------------------- */

  const renderDailyUpdates = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-5">
          <p className="text-xs text-slate-400">
            {t.wellnessScore}
          </p>

          <p className="text-3xl font-bold mt-2">
            {wellnessScore}
          </p>

          <p className="text-xs text-emerald-400 mt-1">
            {t.personalIndicator}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-slate-400">
            {t.latestStress}
          </p>

          <p className="text-3xl font-bold mt-2">
            {latestUpdate
              ? `${latestUpdate.stressLevel}/10`
              : '—'}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs text-slate-400">
            {t.latestFatigue}
          </p>

          <p className="text-3xl font-bold mt-2">
            {latestUpdate
              ? `${latestUpdate.fatigueLevel}/10`
              : '—'}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle2 className="w-5 h-5 text-cyan-400" />

          <div>
            <h2 className="font-bold text-white">
              {t.dailyWellnessUpdate}
            </h2>

            <p className="text-xs text-slate-400">
              {t.recordWellness}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <Field label={t.bodyWeight}>
            <input
              type="number"
              step="0.1"
              value={form.bodyWeight}
              onChange={(e) =>
                updateField(
                  'bodyWeight',
                  e.target.value
                )
              }
              placeholder={t.optional}
              className="input"
            />
          </Field>

          <Field label={t.waterIntake}>
            <div className="relative">
              <Droplets className="icon" />

              <input
                type="number"
                step="0.1"
                value={form.waterIntake}
                onChange={(e) =>
                  updateField(
                    'waterIntake',
                    e.target.value
                  )
                }
                placeholder={t.waterExample}
                className="input pl-10"
              />
            </div>
          </Field>

          <Field
            label={t.mealsFood}
            full
          >
            <div className="relative">
              <Utensils className="icon" />

              <textarea
                value={form.meals}
                onChange={(e) =>
                  updateField(
                    'meals',
                    e.target.value
                  )
                }
                rows={3}
                placeholder={
                  t.mealsPlaceholder
                }
                className="input pl-10 resize-none"
              />
            </div>
          </Field>

          <Field
            label={t.sleepDuration}
          >
            <input
              required
              type="number"
              min="0"
              max="24"
              step="0.1"
              value={form.sleepHours}
              onChange={(e) =>
                updateField(
                  'sleepHours',
                  e.target.value
                )
              }
              placeholder={t.sleepExample}
              className="input"
            />
          </Field>

          <Field
            label={t.sleepQuality}
          >
            <select
              value={form.sleepQuality}
              onChange={(e) =>
                updateField(
                  'sleepQuality',
                  e.target.value
                )
              }
              className="input"
            >
              <option value="Poor">
                {t.poor}
              </option>

              <option value="Fair">
                {t.fair}
              </option>

              <option value="Good">
                {t.good}
              </option>

              <option value="Excellent">
                {t.excellent}
              </option>
            </select>
          </Field>

          <Field
            label={t.exercise}
            full
          >
            <div className="relative">
              <Dumbbell className="icon" />

              <input
                value={form.exercise}
                onChange={(e) =>
                  updateField(
                    'exercise',
                    e.target.value
                  )
                }
                placeholder={
                  t.exercisePlaceholder
                }
                className="input pl-10"
              />
            </div>
          </Field>

          <RangeField
            label={t.stressLevel}
            value={form.stressLevel}
            onChange={(v) =>
              updateField(
                'stressLevel',
                v
              )
            }
            tone="violet"
          />

          <RangeField
            label={t.fatigueLevel}
            value={form.fatigueLevel}
            onChange={(v) =>
              updateField(
                'fatigueLevel',
                v
              )
            }
            tone="amber"
          />

          <Field label={t.mood}>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  'Excellent',
                  'Good',
                  'Okay',
                  'Low',
                ] as WellnessUpdate['mood'][]
              ).map((m) => {
                const moodText =
                  m === 'Excellent'
                    ? t.excellent
                    : m === 'Good'
                    ? t.good
                    : m === 'Okay'
                    ? t.okay
                    : t.low;

                return (
                  <button
                    type="button"
                    key={m}
                    onClick={() =>
                      updateField(
                        'mood',
                        m
                      )
                    }
                    className={`rounded-xl border px-3 py-2 text-sm ${
                      form.mood === m
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                        : 'border-slate-700 text-slate-400'
                    }`}
                  >
                    {moodText}
                  </button>
                );
              })}
            </div>
          </Field>

          <RangeField
            label={t.energyLevel}
            value={form.energyLevel}
            onChange={(v) =>
              updateField(
                'energyLevel',
                v
              )
            }
            tone="emerald"
          />

          <Field
            label={t.restRecovery}
            full
          >
            <input
              value={form.restRecovery}
              onChange={(e) =>
                updateField(
                  'restRecovery',
                  e.target.value
                )
              }
              placeholder={
                t.recoveryPlaceholder
              }
              className="input"
            />
          </Field>

          <Field
            label={t.personalNotes}
            full
          >
            <textarea
              value={form.notes}
              onChange={(e) =>
                updateField(
                  'notes',
                  e.target.value
                )
              }
              rows={3}
              className="input resize-none"
              placeholder={
                t.notesPlaceholder
              }
            />
          </Field>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3"
            >
              {t.submitDailyUpdate}
            </button>
          </div>
        </form>
      </Card>
    </>
  );

  /* ---------------------------------------------------
     PROGRESS
  --------------------------------------------------- */

  const renderProgress = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="font-bold text-white text-xl">
              {t.progressTitle}
            </h2>

            <p className="text-sm text-slate-400">
              {t.progressDescription}
            </p>
          </div>

          <div className="flex rounded-xl border border-slate-700 overflow-hidden">
            <button
              onClick={() =>
                setChartMode('graph')
              }
              className={`px-4 py-2 text-sm ${
                chartMode === 'graph'
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'text-slate-400'
              }`}
            >
              <LineChart className="w-4 h-4 inline mr-2" />
              {t.graph}
            </button>

            <button
              onClick={() =>
                setChartMode('chart')
              }
              className={`px-4 py-2 text-sm ${
                chartMode === 'chart'
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'text-slate-400'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              {t.chart}
            </button>
          </div>
        </div>

        {myUpdates.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            {t.noProgress}
          </div>
        ) : chartMode === 'graph' ? (
          <div className="mt-8 h-72 flex items-end gap-3 border-b border-l border-slate-700 p-4">
            {myUpdates.map((u) => (
              <div
                key={u.id}
                className="flex-1 h-full flex items-end gap-1"
              >
                <div
                  title={`${t.stress} ${u.stressLevel}/10`}
                  className="w-1/3 bg-violet-400/70 rounded-t"
                  style={{
                    height: `${u.stressLevel * 10}%`,
                  }}
                />

                <div
                  title={`${t.fatigue} ${u.fatigueLevel}/10`}
                  className="w-1/3 bg-amber-400/70 rounded-t"
                  style={{
                    height: `${u.fatigueLevel * 10}%`,
                  }}
                />

                <div
                  title={`${t.energy} ${u.energyLevel}/10`}
                  className="w-1/3 bg-emerald-400/70 rounded-t"
                  style={{
                    height: `${u.energyLevel * 10}%`,
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {myUpdates.map((u) => (
              <div
                key={u.id}
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <span className="text-xs text-slate-500">
                    {t.stress}
                  </span>

                  <div className="h-2 bg-slate-800 rounded mt-1">
                    <div
                      className="h-2 bg-violet-400 rounded"
                      style={{
                        width: `${u.stressLevel * 10}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-500">
                    {t.fatigue}
                  </span>

                  <div className="h-2 bg-slate-800 rounded mt-1">
                    <div
                      className="h-2 bg-amber-400 rounded"
                      style={{
                        width: `${u.fatigueLevel * 10}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-500">
                    {t.energy}
                  </span>

                  <div className="h-2 bg-slate-800 rounded mt-1">
                    <div
                      className="h-2 bg-emerald-400 rounded"
                      style={{
                        width: `${u.energyLevel * 10}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="font-bold mb-4">
          {t.notifications}
        </h3>

        <div className="space-y-3">
          <div className="rounded-xl border border-slate-800 p-4 text-sm text-slate-300">
            {t.latestSubmission}
          </div>

          <div className="rounded-xl border border-slate-800 p-4 text-sm text-slate-300">
            {t.alarmNotification}
          </div>
        </div>
      </Card>
    </div>
  );

  /* ---------------------------------------------------
     CONTENT
  --------------------------------------------------- */

  const renderContent = () => {
    switch (activeTab) {
      case 'Daily Updates':
        return renderDailyUpdates();

      case 'Alarm':
        return (
          <Card className="p-6 max-w-2xl">
            <h2 className="text-xl font-bold">
              {t.dailyAlarm}
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              {t.alarmDescription}
            </p>

            <div className="mt-6 space-y-4">
              <Field label={t.alarmTime}>
                <input
                  type="time"
                  value={alarmTime}
                  onChange={(e) =>
                    setAlarmTime(
                      e.target.value
                    )
                  }
                  className="input"
                />
              </Field>

              <Field label={t.reminderLabel}>
                <input
                  value={alarmLabel}
                  onChange={(e) =>
                    setAlarmLabel(
                      e.target.value
                    )
                  }
                  className="input"
                />
              </Field>

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={alarmEnabled}
                  onChange={(e) =>
                    setAlarmEnabled(
                      e.target.checked
                    )
                  }
                />

                {t.enableReminder}
              </label>

              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm text-slate-300">
                {alarmEnabled
                  ? `${t.reminderSet} ${alarmTime}: ${alarmLabel}`
                  : t.alarmDisabled}
              </div>
            </div>
          </Card>
        );

      case 'Video Sensor':
        return (
          <Card className="p-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Video className="text-cyan-400" />
              {t.videoSensor}
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              {t.videoDescription}
            </p>

            <label className="mt-6 block rounded-2xl border-2 border-dashed border-slate-700 hover:border-cyan-500/50 p-10 text-center cursor-pointer">
              <Upload className="mx-auto w-8 h-8 text-cyan-400 mb-3" />

              <span className="font-semibold">
                {videoUploading
                  ? t.uploading
                  : t.chooseVideo}
              </span>

              <span className="block text-xs text-slate-500 mt-1">
                {t.videoFormats}
              </span>

              <input
                type="file"
                accept="video/*"
                className="hidden"
                disabled={videoUploading}
                onChange={(e) =>
                  handleVideo(
                    e.target.files?.[0]
                  )
                }
              />
            </label>

            {videoMessage && (
              <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm text-cyan-200">
                {videoMessage}
              </div>
            )}

            {videoUrl && (
              <div className="mt-5">
                <video
                  controls
                  src={videoUrl}
                  className="w-full max-w-2xl rounded-xl border border-slate-700"
                />

                <p className="text-xs text-slate-400 mt-2">
                  {videoName}
                </p>
              </div>
            )}

            <div className="mt-6 space-y-3">
              <h3 className="font-semibold">
                {t.previouslyUploaded}
              </h3>

              {myVideos.length === 0 ? (
                <p className="text-sm text-slate-500">
                  {t.noVideos}
                </p>
              ) : (
                myVideos.map((video) => (
                  <div
                    key={video.id}
                    className="rounded-xl border border-slate-800 p-3"
                  >
                    <video
                      controls
                      src={video.dataUrl}
                      className="w-full rounded-lg max-h-72"
                    />

                    <div className="mt-2 flex items-center justify-between gap-3 text-xs">
                      <span className="text-slate-300 truncate">
                        {video.fileName}
                      </span>

                      <span className="text-amber-300">
                        {t.analysis}:{' '}
                        {video.analysisStatus}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        );

      case 'Profile':
        return (
          <Card className="p-6 max-w-2xl">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CircleUserRound className="text-cyan-400" />
              {t.profileTitle}
            </h2>

            <div className="mt-6 space-y-4">
              <Field label={t.fullName}>
                <input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      name: e.target.value,
                    })
                  }
                  className="input"
                />
              </Field>

              <Field label={t.email}>
                <input
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      email: e.target.value,
                    })
                  }
                  className="input"
                />
              </Field>

              <Field label={t.unit}>
                <input
                  value={profile.unit}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      unit: e.target.value,
                    })
                  }
                  className="input"
                />
              </Field>

              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm">
                {t.personnelId}:{' '}
                <b>{currentUser.id}</b>
              </div>

              <button
                onClick={() =>
                  setSavedProfile(profile)
                }
                className="rounded-xl bg-cyan-500 text-slate-950 font-bold px-5 py-3 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {t.saveProfile}
              </button>

              {savedProfile.name ===
                profile.name && (
                <p className="text-xs text-emerald-400">
                  {t.profileSaved}
                </p>
              )}
            </div>
          </Card>
        );

      case 'AI Assistant':
        return (
          <UserAIAssistantPage
            currentUserName={
              currentUser.name
            }
            onBack={() =>
              setActiveTab(
                'Daily Updates'
              )
            }
          />
        );

      case 'Chat with Doctor':
        return (
          <Card className="p-6 max-w-3xl">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Stethoscope className="text-emerald-400" />
              {t.doctorChat}
            </h2>

            <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <b className="text-emerald-300">
                {t.doctorAvailable}
              </b>

              <p className="text-xs text-slate-400 mt-1">
                {t.doctorAvailability}
              </p>
            </div>

            <textarea
              value={doctorMessage}
              onChange={(e) =>
                setDoctorMessage(
                  e.target.value
                )
              }
              rows={6}
              placeholder={
                t.doctorPlaceholder
              }
              className="input mt-5 resize-none"
            />

            <button
              onClick={() => {
                setSentDoctorMessage(
                  doctorMessage
                );

                setDoctorMessage('');
              }}
              className="mt-4 rounded-xl bg-cyan-500 text-slate-950 font-bold px-5 py-3 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              {t.sendDoctor}
            </button>

            {sentDoctorMessage && (
              <div className="mt-4 rounded-xl border border-slate-800 p-4 text-sm text-slate-300">
                {t.messageSent}:{' '}
                {sentDoctorMessage}
              </div>
            )}
          </Card>
        );

      case 'Progress':
        return renderProgress();

      case 'Settings':
        return (
          <Card className="p-6 max-w-2xl">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Settings className="text-cyan-400" />
              {t.settingsTitle}
            </h2>

            <div className="mt-6 space-y-5">
              <Field label={t.language}>
                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(
                      e.target.value as Language
                    )
                  }
                  className="input"
                >
                  <option value="English">
                    English
                  </option>

                  <option value="Telugu">
                    తెలుగు
                  </option>

                  <option value="Hindi">
                    हिन्दी
                  </option>
                </select>
              </Field>

              <label className="flex items-center justify-between rounded-xl border border-slate-800 p-4">
                <span>
                  <b>
                    {t.notificationSettings}
                  </b>

                  <span className="block text-xs text-slate-500">
                    {t.wellnessReminders}
                  </span>
                </span>

                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) =>
                    setNotifications(
                      e.target.checked
                    )
                  }
                />
              </label>
                <div className="rounded-xl border border-slate-800 p-4">
  <div className="flex items-center justify-between gap-4">
    <div>
      <b>Theme</b>
      <span className="block text-xs text-slate-500">
        Choose how the dashboard looks
      </span>
    </div>

    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`rounded-lg px-3 py-2 text-sm border ${
          theme === 'dark'
            ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
            : 'border-slate-700 text-slate-400'
        }`}
      >
        🌙 Dark
      </button>

      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`rounded-lg px-3 py-2 text-sm border ${
          theme === 'light'
            ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
            : 'border-slate-700 text-slate-400'
        }`}
      >
        ☀️ Light
      </button>
    </div>
  </div>
</div>
              <label className="flex items-center justify-between rounded-xl border border-slate-800 p-4">
                <span>
                  <b>
                    {t.voiceResponses}
                  </b>

                  <span className="block text-xs text-slate-500">
                    {t.allowVoice}
                  </span>
                </span>

                <button
                  onClick={() =>
                    speak(
                      t.voiceEnabled
                    )
                  }
                  className="p-2 rounded-lg border border-slate-700"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </label>
            </div>
          </Card>
        );
    }
  };

  /* ---------------------------------------------------
     MAIN LAYOUT
  --------------------------------------------------- */

  return (
    <div
  className={`welfare-dashboard min-h-screen bg-[#070b14] text-slate-100 flex ${
    theme === 'light' ? 'theme-light' : 'theme-dark'
  }`}
>
      {/* DESKTOP SIDEBAR */}
<style>{THEME_STYLES}</style>
      <aside className="hidden md:flex w-72 flex-col border-r border-slate-800 bg-slate-950/90 p-4 sticky top-0 h-screen">
        <div className="flex items-center gap-3 px-3 py-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
          </div>

          <div>
            <p className="font-bold">
              Welfare Intelligence
            </p>

            <p className="text-[10px] text-cyan-400 uppercase tracking-widest">
              {t.userPortal}
            </p>
          </div>
        </div>

        <div className="px-3 py-5">
          <p className="text-xs text-slate-500 uppercase">
            {t.personalDashboard}
          </p>

          <p className="font-semibold mt-1 truncate">
            {currentUser.name}
          </p>

          <p className="text-xs text-slate-500">
            {currentUser.id}
          </p>
        </div>

        <nav className="space-y-1 flex-1">
          {nav.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() =>
                  setActiveTab(item.id)
                }
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition ${
                  activeTab === item.id
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />

                <span>
                  {t[item.key]}
                </span>

                <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
              </button>
            );
          })}
        </nav>

        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-rose-300 hover:bg-rose-500/10"
        >
          <LogOut className="w-4 h-4" />

          {t.logout}
        </button>
      </aside>

      {/* MAIN */}

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-[#070b14]/90 backdrop-blur border-b border-slate-800 px-4 md:px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-cyan-400 uppercase tracking-widest">
              {t.personalWelfarePortal}
            </p>

            <h1 className="text-xl md:text-2xl font-bold mt-1">
              {t[nav.find((item) => item.id === activeTab)?.key || 'dailyUpdates']}
            </h1>
          </div>

          <button
            className="md:hidden p-2 rounded-lg border border-slate-700"
            onClick={() =>
              setMobileNav(true)
            }
          >
            <Settings className="w-5 h-5" />
          </button>
        </header>

        {/* MOBILE MENU */}

        {mobileNav && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 p-5">
            <div className="flex justify-between items-center mb-6">
              <b>{t.mobileMenu}</b>

              <button
                onClick={() =>
                  setMobileNav(false)
                }
              >
                <X />
              </button>
            </div>

            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileNav(false);
                }}
                className="w-full text-left p-3 border-b border-slate-800"
              >
                {t[item.key]}
              </button>
            ))}

            <button
              onClick={onLogout}
              className="w-full text-left p-3 text-rose-300"
            >
              {t.logout}
            </button>
          </div>
        )}

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="mb-6">
            <p className="text-sm text-slate-400">
              {t.welcome},{' '}
              <span className="text-white font-semibold">
                {currentUser.name}
              </span>{' '}
              · {currentUser.unit}
            </p>
          </div>

          {renderContent()}
        </div>
      </main>

      <style>{`
        .input {
          width: 100%;
          border-radius: .75rem;
          border: 1px solid rgb(51 65 85);
          background: rgba(2,6,23,.65);
          padding: .75rem 1rem;
          color: white;
          outline: none;
        }

        .input:focus {
          border-color: rgb(6 182 212);
        }

        .icon {
          position: absolute;
          left: .75rem;
          top: .9rem;
          width: 1rem;
          height: 1rem;
          color: rgb(34 211 238);
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------
   FIELD
------------------------------------------------------- */

function Field({
  label,
  children,
  full = false,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div
      className={
        full ? 'md:col-span-2' : ''
      }
    >
      <label className="block text-xs text-slate-400 mb-2">
        {label}
      </label>

      {children}
    </div>
  );
}

/* -------------------------------------------------------
   RANGE FIELD
------------------------------------------------------- */

function RangeField({
  label,
  value,
  onChange,
  tone,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  tone: string;
}) {
  return (
    <Field
      label={`${label} — ${value}/10`}
    >
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        className={`w-full accent-${tone}-500`}
      />
    </Field>
  );
}