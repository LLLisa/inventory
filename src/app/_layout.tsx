import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Colors } from '@/constants/theme';
import { InventoryProvider } from '@/store/inventory';

export default function RootLayout() {
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
