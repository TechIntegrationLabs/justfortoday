import { Quote, QuoteCategory, QuoteDatabase } from './types/quotes';
import { naQuotes } from './data/na-quotes';
import { recoveryQuotes } from './data/recovery-quotes';

class QuotesDB implements QuoteDatabase {
  naQuotes = naQuotes;
  recoveryQuotes = recoveryQuotes;

  getRandomQuote(params?: {
    source?: 'na-book' | 'recovery';
    category?: QuoteCategory;
  }): Quote {
    let quotes: Quote[] = [...this.naQuotes, ...this.recoveryQuotes];

    if (params?.source === 'na-book') {
      quotes = this.naQuotes;
    } else if (params?.source === 'recovery') {
      quotes = this.recoveryQuotes;
    }

    if (params?.category) {
      quotes = quotes.filter(quote => quote.category === params.category);
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  getQuotesByCategory(category: QuoteCategory): Quote[] {
    return [...this.naQuotes, ...this.recoveryQuotes]
      .filter(quote => quote.category === category);
  }

  searchQuotes(searchTerm: string): Quote[] {
    const term = searchTerm.toLowerCase();
    return [...this.naQuotes, ...this.recoveryQuotes]
      .filter(quote => {
        const matchesText = quote.text.toLowerCase().includes(term);
        if (quote.source === 'recovery') {
          return matchesText || quote.author.toLowerCase().includes(term);
        }
        return matchesText || quote.chapter.toLowerCase().includes(term);
      });
  }
}

export const quotesDatabase = new QuotesDB();