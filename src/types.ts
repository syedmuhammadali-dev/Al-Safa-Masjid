export type Language = 'en' | 'ur';

export interface PrayerTime {
  name: string;
  urduName: string;
  time: string;
  iqamah: string;
}

export interface DailyTracker {
  [date: string]: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
    tahajjud: boolean;
  };
}

export interface CommunityEvent {
  id: string;
  title: string;
  titleUrdu: string;
  category: 'lecture' | 'workshop' | 'ramadan' | 'youth' | 'sisters';
  date: string;
  dateUrdu: string;
  time: string;
  timeUrdu: string;
  location: string;
  locationUrdu: string;
  description: string;
  descriptionUrdu: string;
  imgUrl: string;
}

export interface ServiceBooking {
  id: string;
  type: 'madrasa' | 'counseling' | 'youth';
  date: string;
  status: 'confirmed' | 'pending';
  details: any;
}

export interface StudentReport {
  id: string;
  name: string;
  nameUrdu: string;
  class: string;
  attendance: string;
  progress: string;
  progressUrdu: string;
  grades: {
    quran: string;
    tajweed: string;
    islamicStudies: string;
  };
  teacherFeedback: string;
  teacherFeedbackUrdu: string;
}
