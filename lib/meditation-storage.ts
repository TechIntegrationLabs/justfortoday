import { debug } from './debug';

export interface StoredMeditation {
  text: string;
  generatedAt: string;
  quote: string;
  theme: string;
}

const MEDITATION_STORAGE_KEY = 'daily-meditation';

export const meditationStorage = {
  getDailyKey: () => {
    const today = new Date();
    return `${MEDITATION_STORAGE_KEY}-${today.toISOString().split('T')[0]}`;
  },

  save: (meditation: StoredMeditation) => {
    try {
      const key = meditationStorage.getDailyKey();
      localStorage.setItem(key, JSON.stringify(meditation));
      debug.log('MeditationStorage', 'Saved meditation', { key });
    } catch (err) {
      debug.error('MeditationStorage', 'Error saving meditation', err);
    }
  },

  get: (): StoredMeditation | null => {
    try {
      const key = meditationStorage.getDailyKey();
      const stored = localStorage.getItem(key);
      if (!stored) return null;
      
      const meditation = JSON.parse(stored) as StoredMeditation;
      debug.log('MeditationStorage', 'Retrieved meditation', { key });
      return meditation;
    } catch (err) {
      debug.error('MeditationStorage', 'Error retrieving meditation', err);
      return null;
    }
  },

  isValid: (meditation: StoredMeditation): boolean => {
    const generatedDate = new Date(meditation.generatedAt);
    const today = new Date();
    return generatedDate.toDateString() === today.toDateString();
  }
};