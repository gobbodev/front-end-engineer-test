'use client';
import React from 'react';
import { useOddsStore } from '@/stores/odds/useOddsStore';
import Link from 'next/link';
import { Odds } from '@/types/odds';

interface OddDetailProps {
  tournamentId?: number;
  idx?: number;
}

export default function OddDetailClient({ tournamentId, idx }: OddDetailProps) {
  if (!tournamentId || idx == null) {
    return <p className="p-4">Query inválida.</p>;
  }
  const entry: Odds | undefined = useOddsStore(state => state.getCachedOdds(tournamentId));
  const oddEvent = entry?.sportTournamentGroups.events[idx];
  if (!oddEvent) {
    return <p className="p-4">Odd não encontrada ou expirada.</p>;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Detalhes da Odd</h1>
      <p className="mb-1">Competição: {oddEvent.competition}</p>
      <p className="mb-1">{oddEvent.homeTeam} vs {oddEvent.awayTeam}</p>
      <p className="mb-1">Data: {oddEvent.date}</p>
      <p className="mb-1">
        Odds: Casa {oddEvent.odds.home?.toFixed(2) ?? '-'} / Empate {oddEvent.odds.draw?.toFixed(2) ?? '-'} / Fora {oddEvent.odds.away?.toFixed(2) ?? '-'}
      </p>
      <Link href="/" className="text-myorange mt-4 inline-block">Voltar</Link>
    </div>
  );
}
