import { StyleSheet, Text, View } from 'react-native';

import CopyrightNote from '@/components/CopyrightNote';
import Screen from '@/components/Screen';
import Seo, { SITE_URL } from '@/components/Seo';
import { Colors, Spacing } from '@/constants/theme';
import { type Reading } from '@/data/readings';

interface ReadingViewProps {
  reading: Reading;
  description: string;
}

/** Renders a read-only Step Ten passage as semantic paragraphs with SEO + JSON-LD. */
export default function ReadingView({ reading, description }: ReadingViewProps) {
  const path = `/${reading.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${reading.title} — ${reading.source}`,
    articleSection: 'Step Ten',
    isPartOf: reading.source,
    url: `${SITE_URL}${path}`,
    publisher: {
      '@type': 'Organization',
      name: 'Narcotics Anonymous World Services, Inc.',
    },
    description,
  };

  return (
    <Screen>
      <Seo path={path} title={`Step Ten — ${reading.source}`} description={description} jsonLd={jsonLd} />

      <Text
        style={styles.h1}
        role="heading"
        aria-level={1}>
        {reading.title}
      </Text>
      <Text style={styles.source}>{reading.source}</Text>
      <Text style={styles.epigraph}>{reading.epigraph}</Text>

      <View style={styles.article}>
        {reading.paragraphs.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}
      </View>

      <Text style={styles.pageRef}>{reading.pageReference}</Text>
      <CopyrightNote text={reading.copyright} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  source: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  epigraph: {
    fontSize: 17,
    fontStyle: 'italic',
    color: Colors.text,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  article: {
    marginTop: Spacing.lg,
  },
  paragraph: {
    fontSize: 17,
    lineHeight: 26,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  pageRef: {
    fontSize: 13,
    fontStyle: 'italic',
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});
