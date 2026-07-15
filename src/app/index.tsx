import { StyleSheet, Text, View } from 'react-native';

import { MetaLink, PrimaryLink } from '@/components/MenuLink';
import Screen from '@/components/Screen';
import Seo, { SITE_NAME, SITE_URL } from '@/components/Seo';
import { Colors, Spacing } from '@/constants/theme';
import { STORAGE_ENABLED } from '@/services/storage';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'A private, anonymous daily 10th-step inventory tool for members of Narcotics Anonymous, based on IP #9 "Living the Program".',
};

export default function MenuScreen() {
  return (
    <Screen>
      <Seo
        path="/"
        title="NA Daily Inventory — A Private 10th Step Tool for Narcotics Anonymous"
        description="Work a daily 10th step inventory from NA IP #9 'Living the Program'. Free, anonymous, and private — nothing you write is ever sent to a server. Read Step Ten from the Basic Text and It Works: How & Why."
        jsonLd={jsonLd}
      />

      <View style={styles.intro}>
        <Text style={styles.lede}>
          A private, anonymous daily inventory for members of Narcotics Anonymous.
        </Text>
      </View>

      <View style={styles.group}>
        <PrimaryLink
          href="/inventory/0"
          title="Begin Inventory"
          description="Begin a tenth step inventory using the NA IP no. 9"
        />
        <PrimaryLink
          href="/basic-text"
          title="From our Basic Text"
          description="Read Step 10 from the Basic Text of Narcotics Anonymous, Sixth Edition"
        />
        <PrimaryLink
          href="/it-works"
          title="From It Works: How & Why"
          description="Read Step 10 from It Works: How & Why — The 12 Steps and 12 Traditions of Narcotics Anonymous"
        />
      </View>

      <View style={styles.metaRow}>
        <MetaLink title="Find a Meeting" icon="location-outline" url="https://www.na.org/meetingsearch/" />
        <MetaLink title="Visit NA.org" icon="globe-outline" url="https://www.na.org" />
        {STORAGE_ENABLED ? (
          <MetaLink title="My History" icon="time-outline" href="/history" />
        ) : null}
        <MetaLink title="About" icon="information-circle-outline" href="/about" />
        <MetaLink title="Install on Phone" icon="phone-portrait-outline" href="/install" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  lede: {
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  group: {
    marginTop: Spacing.sm,
  },
  metaRow: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: Spacing.sm,
  },
});
