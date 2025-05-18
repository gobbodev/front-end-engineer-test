import { PartnersTransformed, PartnersResponse } from "@/types/partners";


export function transformPartners(partners: PartnersResponse): PartnersTransformed {
  return partners.map((partner) => ({
    id: partner.id,
    name: partner.name,
    img: {
      src: partner.logo,
      alt: `Logo da casa ${partner.name}`
    },
    url: partner.url,
    rating: partner.name === 'Cassino' ? 5 : 4.8
  }
  ));
}
