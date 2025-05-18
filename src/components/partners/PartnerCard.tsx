import Image from 'next/image';
import Link from 'next/link';

import { LuSquareArrowOutUpRight } from 'react-icons/lu';

import type { PartnersTransformedItem } from '@/types/partners';

import { Card, CardContent } from '../ui/Card';

export function PartnerCard({ img, rating, url }: PartnersTransformedItem) {
  return (
    <Card className="transition-colors mb-4 hover:bg-preto border-l-4 border-laranja-escuro hover:text-myorange">
      <CardContent className="p-0">
        <Link href={url} target="_blank">
          <div className="p-3 flex items-center justify-between ">
            <div className="flex flex-col items-center">
              <Image src={img.src} alt={img.alt} width={110} height={30} className="mr-3 rounded" />
            </div>
            <div className="!text-gray-400">{rating.toFixed(1)} ⭐</div>

            <LuSquareArrowOutUpRight className="w-6 h-6" />
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}