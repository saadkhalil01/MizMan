export interface StreakData {
    current: number;
    longest: number;
    lastUpdated: Date;
}

export interface NamazData {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
    date: string;
}

export interface QuranData {
    pagesRead: number;
    lastRead: Date;
}

export interface SpiritModule {
    namaz: NamazData[];
    quran: QuranData;
    streak: StreakData;
}

export interface BodyModule {
    workoutsCompleted: number;
    lastWorkout: Date;
    streak: StreakData;
}

export interface MindModule {
    screenTimeMinutes: number;
    focusScore: number; // 0-100
    date: string;
}

export interface Investment {
    id: string;
    name: string;
    type: 'stocks' | 'mutual-funds' | 'pension' | 'crypto';
    currentValue: number;
    lastUpdated: Date;
}

export interface WealthModule {
    investments: Investment[];
    totalValue: number;
    lastUpdated: Date;
}

export interface MasterScore {
    overall: number; // 0-100
    spirit: number;
    body: number;
    mind: number;
    wealth: number;
}

export type RootStackParamList = {
    MainTabs: undefined;
    SpiritDetail: undefined;
    BodyDetail: undefined;
    MindDetail: undefined;
    WealthDetail: undefined;
};

export type TabParamList = {
    Dashboard: undefined;
    Spirit: undefined;
    Body: undefined;
    Mind: undefined;
    Wealth: undefined;
};
