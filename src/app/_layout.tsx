import * as NavigationBar from 'expo-navigation-bar';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AppState, Platform, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Colors } from '@/constants/theme';
import { InventoryProvider } from '@/store/inventory';

export default function RootLayout() {
  // Match the Android system navigation bar to the footer: brand blue with light
  // icons. In a production build the light icon style is also set natively via
  // app.json (androidNavigationBar.barStyle) so it is correct from the first
  // frame; this runtime call covers Expo Go and re-asserts on resume. Under
  // edge-to-edge the background call is a no-op (the footer draws blue behind the
  // transparent bar); the light button style still applies.
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const apply = () => {
      NavigationBar.setButtonStyleAsync('light').catch(() => {});
      NavigationBar.setBackgroundColorAsync(Colors.blue).catch(() => {});
    };
    apply();
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') apply();
    });
    return () => sub.remove();
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
