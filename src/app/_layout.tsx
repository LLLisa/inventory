import * as NavigationBar from 'expo-navigation-bar';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Colors } from '@/constants/theme';
import { InventoryProvider } from '@/store/inventory';

export default function RootLayout() {
  // Match the Android system navigation bar to the footer: brand blue with light
  // icons. Under edge-to-edge the background call is a no-op (the footer already
  // draws blue behind the transparent bar); the light button style still applies.
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    (async () => {
      try {
        await NavigationBar.setButtonStyleAsync('light');
        await NavigationBar.setBackgroundColorAsync(Colors.blue);
      } catch {
        // Unsupported on this Android version/config; the footer supplies the color.
      }
    })();
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <InventoryProvider>
          <View style={styles.root}>
            <Header />
            <View style={styles.body}>
              <Slot />
            </View>
            <Footer />
          </View>
        </InventoryProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bgOffWhite,
  },
  body: {
    flex: 1,
  },
});
