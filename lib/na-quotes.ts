export interface Quote {
  text: string;
  chapter: string;
  page: number;
  category: 'recovery' | 'hope' | 'unity' | 'service' | 'spirituality';
}

export const naQuotes: Quote[] = [
  {
    text: "Unity is a practice, and as the principle of unity grows among us, our differences lessen in importance.",
    chapter: "Tradition One",
    page: 61,
    category: 'unity'
  },
  {
    text: "The therapeutic value of one addict helping another is without parallel.",
    chapter: "Why Are We Here?",
    page: 18,
    category: 'service'
  },
  {
    text: "Recovery begins with surrender. From that surrender, hope is born.",
    chapter: "How It Works",
    page: 22,
    category: 'hope'
  },
  {
    text: "When we admit our powerlessness and our inability to manage our own lives, we open the door to recovery.",
    chapter: "Step One",
    page: 21,
    category: 'recovery'
  },
  {
    text: "Through our faith in a Higher Power, we begin to develop a relationship with that Power.",
    chapter: "Step Two",
    page: 25,
    category: 'spirituality'
  },
  {
    text: "Just for today, we need not think about what might happen tomorrow. We are trying only to deal with today.",
    chapter: "Just For Today",
    page: 90,
    category: 'recovery'
  }
];

export function getRandomQuote(category?: Quote['category']): Quote {
  const filteredQuotes = category 
    ? naQuotes.filter(quote => quote.category === category)
    : naQuotes;
  
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  return filteredQuotes[randomIndex];
}

export function getQuotesByCategory(category: Quote['category']): Quote[] {
  return naQuotes.filter(quote => quote.category === category);
}