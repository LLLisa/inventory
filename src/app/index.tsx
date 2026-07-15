import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { MetaLink } from '@/components/MenuLink';
import Screen from '@/components/Screen';
import Seo, { SITE_NAME, SITE_URL } from '@/components/Seo';
import { Colors, Spacing } from '@/constants/theme';
import { STORAGE_ENABLED } from '@/services/storage';

// react-native-web adds `hovered` to the Pressable state (not in core RN types).
type PressState = { pressed: boolean; hovered?: boolean };

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

interface MenuCardProps {
  href: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  emphasized?: boolean;
}

function MenuCard({ href, title, description, icon, emphasized }: MenuCardProps) {
  return (
    <Link href={href as never} asChild>
      <Pressable
        accessibilityRole="link"
        style={(s) => {
          const { pressed, hovered } = s as PressState;
          const active = pressed || hovered;
          return [
            styles.card,
            emphasized ? styles.cardEmph : styles.cardPlain,
            active && (emphasized ? styles.cardEmphActive : styles.cardPlainActive),
          ];
        }}>
        <View style={[styles.iconWrap, emphasized ? styles.iconWrapEmph : styles.iconWrapPlain]}>
          <Ionicons name={icon} size={22} color={emphasized ? Colors.textWhite : Colors.blue} />
        </View>
        <View style={styles.cardText}>
          <Text style={[styles.cardTitle, emphasized && styles.cardTitleEmph]}>{title}</Text>
          <Text style={[styles.cardDesc, emphasized && styles.cardDescEmph]}>{description}</Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={emphasized ? 'rgba(255,255,255,0.85)' : Colors.borderGray}
        />
      </Pressable>
    </Link>
  );
}

function StoreBadge({ store }: { store: 'ios' | 'android' }) {
  const isIos = store === 'ios';
  return (
    <View style={styles.badge} accessibilityRole="button" accessibilityLabel={isIos ? 'App Store (coming soon)' : 'Google Play (coming soon)'}>
      <Ionicons name={isIos ? 'logo-apple' : 'logo-google-playstore'} size={26} color={Colors.textWhite} />
      <View>
        <Text style={styles.badgeSmall}>{isIos ? 'Download on the' : 'Get it on'}</Text>
        <Text style={styles.badgeBig}>{isIos ? 'App Store' : 'Google Play'}</Text>
      </View>
    </View>
  );
}

export default function MenuScreen() {
  return (
    <Screen>
      <Seo
        path="/"
        title="NA Daily Inventory — A Private 10th Step Tool for Narcotics Anonymous"
        description="Work a daily 10th step inventory from NA IP #9 'Living the Program'. Free, anonymous, and private — nothing you write is ever sent to a server. Read Step Ten from the Basic Text and It Works: How & Why."
        jsonLd={jsonLd}
      />

      <View style={styles.hero}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="NA Daily Inventory logo"
        />
        <Text style={styles.tagline}>
          A private, anonymous daily tenth-step inventory for members of Narcotics Anonymous.
        </Text>
      </View>

      <View style={styles.group}>
        <MenuCard
          href="/inventory/0"
          emphasized
          icon="create-outline"
          title="Begin Inventory"
          description="Start a daily tenth-step inventory using NA IP #9"
        />
        <MenuCard
          href="/basic-text"
          icon="book-outline"
          title="Step Ten — Basic Text"
          description="Read Step 10 from the Basic Text, Sixth Edition"
        />
        <MenuCard
          href="/it-works"
          icon="library-outline"
          title="Step Ten — It Works: How & Why"
          description="Read Step 10 from It Works: How & Why"
        />
      </View>

      <View style={styles.metaRow}>
        <MetaLink title="Find a Meeting" icon="location-outline" url="https://www.na.org/meetingsearch/" />
        <MetaLink title="Visit NA.org" icon="globe-outline" url="https://www.na.org" />
        {STORAGE_ENABLED ? (
          <MetaLink title="My History" icon="time-outline" href="/history" />
        ) : null}
        <MetaLink title="About" icon="information-circle-outline" href="/about" />
      </View>

      {Platform.OS === 'web' ? (
        <View style={styles.stores}>
          <Text style={styles.storesHeading}>Get the mobile app</Text>
          <View style={styles.storeRow}>
            <StoreBadge store="ios" />
            <StoreBadge store="android" />
          </View>
          <Text style={styles.storesNote}>Coming soon to the App Store and Google Play.</Text>
        </View>
      ) : null}
    </Screen>
  );
}

const cardShadow = Platform.select({
  web: { boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  default: {
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
});

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  logo: {
    width: 84,
    height: 84,
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.textMuted,
    textAlign: 'center',
    maxWidth: 420,
  },
  group: {
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: 14,
    ...cardShadow,
  },
  cardPlain: {
    backgroundColor: Colors.bgWhite,
    borderWidth: 1,
    borderColor: Colors.borderGray,
  },
  cardPlainActive: {
    borderColor: Colors.blue,
  },
  cardEmph: {
    backgroundColor: Colors.blue,
  },
  cardEmphActive: {
    backgroundColor: Colors.lightBlue,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapPlain: {
    backgroundColor: '#e8eafe',
  },
  iconWrapEmph: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.blue,
  },
  cardTitleEmph: {
    color: Colors.textWhite,
  },
  cardDesc: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  cardDescEmph: {
    color: 'rgba(255,255,255,0.9)',
  },
  metaRow: {
    marginTop: Spacing.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: Spacing.sm,
  },
  stores: {
    marginTop: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  storesHeading: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  storeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: '#000000',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 10,
    minWidth: 168,
  },
  badgeSmall: {
    color: Colors.textWhite,
    fontSize: 10,
  },
  badgeBig: {
    color: Colors.textWhite,
    fontSize: 17,
    fontWeight: '600',
    marginTop: -1,
  },
  storesNote: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});
