'use client'

import { useEffect, useState } from 'react';
import type { ServiceResponse } from '@/types/services';
import type { PartnersTransformed } from '@/types/partners';
import { PartnerCard } from './PartnerCard';

export function PartnerList() {
  const [partners, setPartners] = useState<PartnersTransformed>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const res = await fetch('/api/partners');
        const json: ServiceResponse<PartnersTransformed> = await res.json();
        if (!res.ok) {
          throw new Error(json.error || 'Falha ao buscar parceiros');
        }
        setPartners(json.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-laranja-escuro" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-vermelho/10 text-vermelho p-4 rounded-md">
        <p>Erro ao carregar parceiros: {error}</p>
      </div>
    );
  }

  if (partners.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-400">Nenhum parceiro disponível.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Parceiros</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} {...partner} />
        ))}
      </div>
    </div>
  );
}