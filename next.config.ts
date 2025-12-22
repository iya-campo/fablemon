import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'img.pokemondb.net', 
      'raw.githubusercontent.com',
      'archives.bulbagarden.net',
      'bulbapedia.bulbagarden.net',
    ],
  },
};

export default nextConfig;
