import { generateMeditation, MeditationPrompt } from './openai';
import { meditationStorage, StoredMeditation } from './meditation-storage';
import { debug } from './debug';

export class MeditationService {
  static async getOrGenerateMeditation(quote: string, theme: string): Promise<string | null> {
    try {
      // Check for cached meditation
      const stored = meditationStorage.get();
      if (stored && meditationStorage.isValid(stored)) {
        debug.log('MeditationService', 'Using cached meditation');
        return stored.text;
      }

      // Generate new meditation
      debug.log('MeditationService', 'Generating new meditation');
      const prompt: MeditationPrompt = {
        quote,
        theme,
        context: "This meditation is for someone in recovery, focusing on mindfulness and personal growth."
      };

      const meditation = await generateMeditation(prompt);
      
      if (meditation) {
        const storedMeditation: StoredMeditation = {
          text: meditation,
          generatedAt: new Date().toISOString(),
          quote,
          theme
        };
        
        meditationStorage.save(storedMeditation);
        return meditation;
      }

      return null;
    } catch (err) {
      debug.error('MeditationService', 'Error in getOrGenerateMeditation', err);
      return null;
    }
  }

  static async regenerateMeditation(): Promise<void> {
    try {
      const stored = meditationStorage.get();
      if (!stored) {
        debug.error('MeditationService', 'No stored meditation found to regenerate');
        return;
      }

      debug.log('MeditationService', 'Regenerating meditation');
      const prompt: MeditationPrompt = {
        quote: stored.quote,
        theme: stored.theme,
        context: "This meditation is for someone in recovery, focusing on mindfulness and personal growth."
      };

      const meditation = await generateMeditation(prompt);
      
      if (meditation) {
        const storedMeditation: StoredMeditation = {
          text: meditation,
          generatedAt: new Date().toISOString(),
          quote: stored.quote,
          theme: stored.theme
        };
        
        meditationStorage.save(storedMeditation);
      }
    } catch (err) {
      debug.error('MeditationService', 'Error regenerating meditation', err);
    }
  }
}