export interface BaseQuote {
  id: string;
  text: string;
  category: QuoteCategory;
}

export interface NAQuote extends BaseQuote {
  source: 'na-book';
  chapter: string;
  page: number;
  tradition?: number;
  step?: number;
}

export interface RecoveryQuote extends BaseQuote {
  source: 'recovery';
  author: string;
  authorTitle?: string;
  year?: number;
}

export type Quote = NAQuote | RecoveryQuote;

export type QuoteCategory = 
  | 'recovery'
  | 'hope'
  | 'unity'
  | 'service'
  | 'spirituality'
  | 'surrender'
  | 'acceptance'
  | 'willingness'
  | 'gratitude'
  | 'daily-mantras'
  | 'helping-others';

export interface QuoteDatabase {
  naQuotes: NAQuote[];
  recoveryQuotes: RecoveryQuote[];
  getRandomQuote: (params?: {
    source?: 'na-book' | 'recovery';
    category?: QuoteCategory;
  }) => Quote;
  getQuotesByCategory: (category: QuoteCategory) => Quote[];
  searchQuotes: (searchTerm: string) => Quote[];
}