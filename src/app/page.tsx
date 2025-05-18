'use server'

import { BannerHome } from "@/components/banners/BannerHome";
import { OddsList } from "@/components/odds/OddsList";
import { PartnerList } from "@/components/partners/PartnerList";
import { SessionAuth } from "@/components/providers/SessionAuth";


export default async function Home() {
  return (

    <SessionAuth>
      <div className="container mx-auto">
        <BannerHome />
        <PartnerList />
        {/* Conteúdo Principal*/}
        <OddsList />
      </div>
    </SessionAuth>

  );
}
