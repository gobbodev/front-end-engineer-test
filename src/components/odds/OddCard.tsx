import { FiClock, FiInfo } from 'react-icons/fi';
import { Card, CardContent } from '../ui/Card';
import { OddButton } from './OddButton';
import Link from 'next/link';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';

export function OddCard({
  homeTeam,
  awayTeam,
  competition,
  odds,
  date,
  tournamentId,
  idx,
}: {
  homeTeam: string;
  awayTeam: string;
  competition: string;
  odds: { home: number | null; draw: number | null; away: number | null };
  date: string;
  tournamentId: number;
  idx: number;
}) {
  const dateObj = new Date(date);
  const dateString = dateObj.toLocaleDateString('pt-BR');
  const timeString = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <Card className="mb-4 hover:bg-preto border-l-4 border-laranja-escuro">
      <CardContent className="p-0 ">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-xs text-gray-400 mr-2 flex items-center">
              <FiClock className="mr-1" size={12} />
              {dateString} {timeString}
            </div>
            <div className="text-xs bg-laranja-escuro px-2 py-1 rounded">
              {competition}
            </div>
          </div>
          <Link className="gap-1.5 transition-colors flex items-center text-gray-400 hover:text-myorange-white" href={`/odd?tid=${tournamentId}&idx=${idx}`} >
            Ver detalhes
            <LuSquareArrowOutUpRight />
          </Link>
        </div>

        <div className="p-3 border-t border-gray-800 flex justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <span className="font-medium">{homeTeam}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">{awayTeam}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <OddButton value={odds.home} label="1" />
            {odds.draw !== null && (
              <OddButton value={odds.draw} label="X" />
            )}
            <OddButton value={odds.away} label="2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}