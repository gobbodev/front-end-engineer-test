export type PartnersResponse = PartnersResponseItem[];
export interface PartnersResponseItem {
  id: number;
  name: string;
  logo: string;
  url: string;
}

export type PartnersTransformed = PartnersTransformedItem[];
export interface PartnersTransformedItem {
  id: number;
  name: string;
  img: {
    src: string;
    alt: string;
  };
  url: string;
  rating: number;
}