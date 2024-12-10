import OpenAI from 'openai';
import { REFLECTION_PROMPT } from './prompts';

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  console.warn('OpenAI API key is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface MeditationPrompt {
  quote: string;
  theme: string;
  context: string;
}

export async function generateMeditation(prompt: MeditationPrompt) {
  if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    console.error('OpenAI API key is not set');
    return null;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: REFLECTION_PROMPT.system
        },
        {
          role: "user",
          content: REFLECTION_PROMPT.user(prompt.theme, prompt.quote, prompt.context)
        }
      ],
      temperature: 0.7,
      max_tokens: 350
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating reflection:', error);
    return null;
  }
}