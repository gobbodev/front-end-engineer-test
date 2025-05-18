import { create } from 'zustand';
import { FaFutbol, FaBasketballBall, FaHockeyPuck, FaFistRaised } from 'react-icons/fa';
import { GiTennisBall, GiBaseballBat, GiVolleyballBall } from 'react-icons/gi';
import { Category, CategoryStore } from '@/types/categories';
import { CategoryTournamentGroups } from '@/types/categories/tournaments/group';

const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: 'Futebol', slug: 'football', icon: FaFutbol },
  { id: 2, name: 'Tênis', slug: 'tennis', icon: GiTennisBall },
  { id: 3, name: 'Basquete', slug: 'basketball', icon: FaBasketballBall },
  { id: 4, name: 'Hockey', slug: 'hockey', icon: FaHockeyPuck },
  { id: 5, name: 'Beisebol', slug: 'baseball', icon: GiBaseballBat },
  { id: 6, name: 'Vôlei', slug: 'volleyball', icon: GiVolleyballBall },
  { id: 8, name: 'MMA', slug: 'mma', icon: FaFistRaised },
];
export type CategorySlugs = typeof DEFAULT_CATEGORIES[number]['slug'];

export const useCategoriesStore = create<CategoryStore>((set) => ({
  categories: DEFAULT_CATEGORIES,
  selectedCategory: DEFAULT_CATEGORIES[0].slug,

  selectCategory: (categoryId) => {
    set({ selectedCategory: categoryId });
  },
}));

// isso deveria vir do back e ser cacheado. 
// No back esses grupos de torneios principais provavelmente seriam baseados em estaticas em tempo real ou algo assim, 
// então lá, o back leria essas estaticas periodicamente e devolveria para a gente os grupos de torneios principais do momento
export const CATEGORY_TOURNAMENT_GROUPS: CategoryTournamentGroups = {
  'football': [
    {
      name: 'Principais',
      tournaments: [
        { id: 11300, name: 'Serie A Betano' },
        { id: 11303, name: "Copa Betano do Brasil" },
        { id: 11302, name: "Pernambucano 3" },
        { id: 302, name: "Bulgarian Cup" },
        { id: 398, name: "1st Division Denmark" }
      ]
    },
    {
      name: 'Outros',
      tournaments: [
        { id: 538, name: "Ligue 1" },
        { id: 837, name: "Liga Premier Serie A" },
        { id: 183, name: "Pro League U21" }
      ]
    },
  ],

  'tennis': [
    {
      name: 'Principais',
      tournaments: [
        { id: 3629, name: "WTA Strasbourg" },
        { id: 3712, name: "WTA Strasbourg Doubles" }
      ]
    },
    {
      name: 'Outros',
      tournaments: [
        { id: 3405, name: "Bordeaux Challenger Men Doubles" },
        { id: 3630, name: "Bordeaux Challenger Men" },
        { id: 13361, name: "Bordeaux Challenger Men 2025" }
      ]
    },
  ],
  'basketball': [
    {
      name: 'Principais',
      tournaments: [
        { id: 9538, name: "NBA" },
        { id: 9539, name: "NBA In-Season Tournament" },
        { id: 9540, name: "NBA Orlando Summer League" },
        { id: 9543, name: "NBA Salt Lake City Summer League" }
      ]
    },
    {
      name: 'Outros',
      tournaments: [
        { id: 9242, name: "LNB" },
        { id: 9243, name: "LNB 2" }
      ]
    }
  ],

  'hockey': [
    {
      name: 'Principais',
      tournaments: [
        { id: 9662, name: "AIHL" },
        { id: 9793, name: "MHL" },
        { id: 9844, name: "NHL" }
      ]
    },
    {
      name: 'Outros',
      tournaments: [{ id: 9859, name: "World Championship" }]
    },
  ],
  'baseball': [
    {
      name: 'Principais',
      tournaments: [
        { id: 9922, name: "LPB" },
        { id: 9944, name: "LMB" },
        { id: 9941, name: "NPB" },
        { id: 9959, name: "MLB" }
      ]
    },
    {
      name: 'Outros',
      tournaments: [
        { id: 9959, name: "IL" },
        { id: 9962, name: "IL 2" }
      ]
    },
  ],
  'volleyball': [
    {
      name: 'Principais',
      tournaments: [
        { id: 12992, name: "AVC Champions League" },
        { id: 10079, name: "Champions League" },
        { id: 10188, name: "LNSV Women" }
      ]
    },
    {
      name: 'Outros',
      tournaments: [{ id: 12992, name: "IL" }]
    },
  ],
  'mma': [
    {
      name: 'Principais',
      tournaments: [
        { id: 10837, name: "Featherweight - UFC Men" },
        { id: 10841, name: "Light Heavyweight - UFC Men" },
        { id: 10847, name: "Welterweight - UFC Men" },
        { id: 10787, name: "Lightweight - Oktagon Men" },
        { id: 10775, name: "Lightweight - Oktagon Men" }
      ]
    },
    {
      name: 'Outros',
      tournaments: [{ id: 10775, name: "Lightweight - Oktagon Men" }]
    },
  ]
}