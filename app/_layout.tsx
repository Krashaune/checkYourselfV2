import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1a1a2e' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#1a1a2e' },
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ title: 'Home', headerLeft: () => null }} />
        <Stack.Screen name="checkin" options={{ title: 'How are you feeling?' }} />
        <Stack.Screen name="relief" options={{ title: 'Relief Options' }} />
        <Stack.Screen name="wellness" options={{ title: 'Choose Your Vibe' }} />
        <Stack.Screen name="sulk" options={{ title: 'Take a Moment' }} />
        <Stack.Screen name="music" options={{ title: 'Your Playlist' }} />
      </Stack>
    </>
  );
}
