import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Caveat_700Bold,
} from '@expo-google-fonts/caveat';
import {
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import {
  CormorantGaramond_400Regular_Italic,
} from '@expo-google-fonts/cormorant-garamond';
import {
  JetBrainsMono_400Regular,
} from '@expo-google-fonts/jetbrains-mono';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../constants/theme';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Caveat_700Bold,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    CormorantGaramond_400Regular_Italic,
    JetBrainsMono_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.parchment, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.amethyst} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.parchment },
          headerTintColor: colors.onParchment,
          headerTitleStyle: {
            fontFamily: 'Nunito_700Bold',
            fontSize: 14,
            color: colors.onParchment,
          },
          contentStyle: { backgroundColor: colors.parchment },
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="checkin" options={{ title: 'How are you feeling?' }} />
        <Stack.Screen name="relief" options={{ title: 'Relief Options' }} />
        <Stack.Screen name="wellness" options={{ title: 'Choose Your Vibe' }} />
        <Stack.Screen name="sulk" options={{ title: 'Take a Moment' }} />
        <Stack.Screen name="music" options={{ title: 'Your Playlist' }} />
      </Stack>
    </>
  );
}
