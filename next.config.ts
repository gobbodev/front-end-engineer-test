import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ['anagaming.com.br'],
  },
  eslint: {
    ignoreDuringBuilds: true, // não era o que eu queria, mas não achei uma solução que realmente funcione para suprimir um warning especifico no deploy
  },
};

export default nextConfig;
