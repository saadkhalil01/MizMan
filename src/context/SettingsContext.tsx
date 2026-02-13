import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Nationality = 'Pakistan' | 'India' | 'USA' | 'Dubai';

export const NATIONALITIES: { label: string; value: Nationality; currency: string; symbol: string; flag: string }[] = [
  { label: 'Pakistan', value: 'Pakistan', currency: 'PKR', symbol: 'PKR', flag: '🇵🇰' },
  { label: 'India', value: 'India', currency: 'INR', symbol: '₹', flag: '🇮🇳' },
  { label: 'USA', value: 'USA', currency: 'USD', symbol: '$', flag: '🇺🇸' },
  { label: 'Dubai', value: 'Dubai', currency: 'AED', symbol: 'د.إ', flag: '🇦🇪' },
];

interface SettingsContextType {
  nationality: Nationality;
  setNationality: (nationality: Nationality) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const NATIONALITY_STORAGE_KEY = '@mizman_nationality';

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nationality, setNationalityState] = useState<Nationality>('USA');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedNationality = await AsyncStorage.getItem(NATIONALITY_STORAGE_KEY);
      if (savedNationality) {
        setNationalityState(savedNationality as Nationality);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const setNationality = async (newNationality: Nationality) => {
    setNationalityState(newNationality);
    try {
      await AsyncStorage.setItem(NATIONALITY_STORAGE_KEY, newNationality);
    } catch (error) {
      console.error('Error saving nationality:', error);
    }
  };

  return (
    <SettingsContext.Provider value={{ nationality, setNationality }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
