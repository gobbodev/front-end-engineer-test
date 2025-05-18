import { SessionAuth } from '@/components/providers/SessionAuth';
import OddDetailClient from '@/components/odds/OddDetailClient';

export default async function OddPage({ searchParams }: { searchParams: Promise<{ tid?: string; idx?: string }> }) {
  const sp = await searchParams;
  const tournamentId = sp.tid ? parseInt(sp.tid, 10) : undefined;
  const idx = sp.idx ? parseInt(sp.idx, 10) : undefined;
  return (
    <SessionAuth>
      <OddDetailClient tournamentId={tournamentId} idx={idx} />
    </SessionAuth>
  );
}