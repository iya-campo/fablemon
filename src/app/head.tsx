import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Fablemon",
  description: "A web-based monster-collector adventure inspired by classic creature-training games",
};

export default function Head() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{metadata.title?.toString()}</title>
      <meta name="description" content={metadata.description?.toString()} />
    </>
  );
}