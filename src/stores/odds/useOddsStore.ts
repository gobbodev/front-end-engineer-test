import { create } from 'zustand';
import { OddsStore } from '@/types/odds';

export const useOddsStore = create<OddsStore>((set, get) => ({
  odds: {},
  loading: false,
  error: null,

  setCachedOdds: (categorySlug, odds) => {
    const cacheExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    set(state => ({
      odds: {
        ...state.odds,
        [categorySlug]: { ...odds, cacheExpiresAt }
      }
    }));
  },

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  getCachedOdds: (categorySlug) => {
    const entry = get().odds[categorySlug];
    if (!entry) return undefined;
    if (entry.cacheExpiresAt && new Date(entry.cacheExpiresAt) < new Date()) {
      set(state => {
        const { [categorySlug]: _, ...rest } = state.odds;
        return { odds: rest };
      });
      return undefined;
    }
    return entry;
  },
}));