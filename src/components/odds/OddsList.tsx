'use client'

import { useEffect, useState } from 'react';

import { MdKeyboardArrowDown } from 'react-icons/md';

import { CATEGORY_TOURNAMENT_GROUPS, useCategoriesStore } from '@/stores/categories/useCategoriesStore';

import { getOdds } from '@/services/api/odds-feed/odds/getOdds';
import { useOddsStore } from '@/stores/odds/useOddsStore';

import { OddCard } from './OddCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

import { ServiceResponse } from '@/types/services';
import { Odds } from '@/types/odds';

// simplicado para economizar creditos da api, então não teremos uma implementação de pegar todas as odds p/esporte, focaremos em grupos de torneios especificos
export function OddsList() {
  const { selectedCategory } = useCategoriesStore();

  const [currentTournamentId, setCurrentTournamentId] = useState<number>(CATEGORY_TOURNAMENT_GROUPS[selectedCategory][0].tournaments[0].id);

  const groups = CATEGORY_TOURNAMENT_GROUPS[selectedCategory] || [];
  const [groupIndex, setGroupIndex] = useState(0);
  const [tournamentIndex, setTournamentIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setGroupIndex(0);
      setTournamentIndex(0);
      setDropdownOpen(false);
      if (groups.length) {
        setCurrentTournamentId(groups[0].tournaments[0].id);
      }
    }
  }, [selectedCategory, groups]);

  useEffect(() => {
    if (groups.length) {
      setCurrentTournamentId(groups[groupIndex].tournaments[0].id);
      setTournamentIndex(0);
      setDropdownOpen(false);
    }
  }, [groupIndex, groups]);

  const loading = useOddsStore(state => state.loading);
  const error = useOddsStore(state => state.error);
  const cachedEntry = useOddsStore(state => state.getCachedOdds(currentTournamentId));
  const setLoading = useOddsStore(state => state.setLoading);
  const setError = useOddsStore(state => state.setError);
  // da pra melhorar cacheando na rota do next tbm, mudando o getOdds para ser executado lá
  const setCachedOdds = useOddsStore(state => state.setCachedOdds);

  useEffect(() => {
    if (cachedEntry) return;
    setLoading(true);
    getOdds(currentTournamentId)
      .then((response: ServiceResponse<Odds>) => {
        if (response.data) setCachedOdds(currentTournamentId, response.data);
        if (response.error) setError(response.error);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [currentTournamentId, cachedEntry]);

  const events = cachedEntry?.sportTournamentGroups.events ?? [];

  return (
    <div className="space-y-4">
      <div className='flex items-center justify-between'>
        <h2 className="text-2xl font-bold mb-4">Odds Disponíveis</h2>

        <div className='flex items-center space-x-2'>
          <p className="text-xs text-gray-400">Odds reais dos próximos 7 dias</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          {groups.map((group, idx) => (
            <button
              key={group.name}
              onClick={() => { setGroupIndex(idx); setDropdownOpen(false); }}
              className={`px-4 py-2 rounded-full font-medium ${idx === groupIndex ? 'bg-myorange text-branco' : 'bg-myorange-white text-myblack hover:bg-gray-300'}`}
            >
              {group.name}
            </button>
          ))}
        </div>
        <div className="relative text-myblack font-medium">
          <button
            onClick={() => setDropdownOpen(o => !o)}
            className="px-4 py-3 bg-white border rounded-full flex items-center justify-between w-40"
          >
            {groups[groupIndex]?.tournaments[tournamentIndex]?.name || 'Selecione'}
            <MdKeyboardArrowDown />
          </button>
          {dropdownOpen && (
            <ul className="absolute right-0 mt-1 w-40 bg-white border rounded-md shadow-lg z-10" onMouseLeave={() => setDropdownOpen(false)}>
              {groups[groupIndex]?.tournaments.map((t, i) => (
                <li
                  key={t.id}
                  onClick={() => { setTournamentIndex(i); setCurrentTournamentId(t.id); setDropdownOpen(false); }}
                  className={`px-3 py-2 hover:bg-myorange-white cursor-pointer ${i === tournamentIndex ? 'bg-gray-200' : ''}`}
                >
                  {t.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-vermelho/10 text-vermelho p-4 rounded-md">
            <p>Erro ao carregar odds: {error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-400">Nenhuma odd disponível para esta categoria.</p>
          </div>
        ) : (
          events.map((odd, index) => <OddCard key={index + odd.homeTeam} {...odd} tournamentId={currentTournamentId} idx={index} />)
        )}
      </div>
    </div>
  );
}
