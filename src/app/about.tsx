import { Linking, StyleSheet, Text, View } from 'react-native';

import Screen from '@/components/Screen';
import Seo from '@/components/Seo';
import { Colors, Spacing } from '@/constants/theme';

function ExternalLink({ url, children }: { url: string; children: string }) {
  return (
    <Text
      style={styles.link}
      accessibilityRole="link"
      onPress={() => Linking.openURL(url)}>
      {children}
    </Text>
  );
}

export default function AboutScreen() {
  return (
    <Screen>
      <Seo
        path="/about"
        title="About"
        description="About the NA Daily Inventory app — a private, open-source daily 10th-step tool for Narcotics Anonymous members. Your responses are never saved to any server."
      />

      <Text
        style={styles.h1}
        role="heading"
        aria-level={1}>
        About this application
      </Text>

      <View style={styles.body}>
        <Text style={styles.p}>
          This app was developed as a way of making a daily inventory more convenient and accessible
          for members of Narcotics Anonymous. The content for the inventory was taken from the NA
          informational Pamphlet #9, &quot;Living the Program&quot;. A physical copy of this IP is
          available from <ExternalLink url="https://www.na.org">the NA website</ExternalLink> or{' '}
          <ExternalLink url="https://www.na.org/meetingsearch/">
            find an NA meeting near you.
          </ExternalLink>
        </Text>
        <Text style={styles.p}>
          In the spirit of anonymity, none of your responses or personal information are ever sent
          to a server. On the web, nothing is stored at all; the mobile app can optionally keep
          entries on your own device. Either way, you can download a PDF of your responses on the
          last page.
        </Text>
        <Text style={styles.p}>
          All of the textual content in this application, aside from this page, is copyright
          Narcotics Anonymous World Services, Inc.
        </Text>
        <Text style={styles.p}>
          Aside from the text content, the code itself is free and open-source, available{' '}
          <ExternalLink url="https://github.com/LLLisa/inventory">here</ExternalLink> under an MIT
          license. Please use it and all of the content here in any way that will be helpful.
        </Text>
        <Text style={styles.p}>
          This application was created by an individual without express permission from NA World
          Services. Nothing in this app, except what is explicitly marked as copyrighted material,
          is officially endorsed by Narcotics Anonymous or NA World Services.
        </Text>
        <Text style={styles.closing}>Keep Coming Back</Text>
      </View>
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
  body: {
    marginTop: Spacing.md,
  },
  p: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  link: {
    color: Colors.blue,
    textDecorationLine: 'underline',
  },
  closing: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});
