import Head from 'expo-router/head';

export const SITE_URL = 'https://nadailyinventory.com';
export const SITE_NAME = 'NA Daily Inventory';

interface SeoProps {
  title: string;
  description: string;
  /** Route path beginning with "/" — used to build the canonical URL. */
  path: string;
  /** Optional JSON-LD structured data object. */
  jsonLd?: Record<string, unknown>;
}

/**
 * Per-route web metadata. Renders real <head> tags during static export so each
 * page is independently indexable. No-op on native.
 */
export default function Seo({ title, description, path, jsonLd }: SeoProps) {
  const canonical = `${SITE_URL}${path === '/' ? '' : path}`;
  const fullTitle = path === '/' ? title : `${title} · ${SITE_NAME}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Head>
  );
}
