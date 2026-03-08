import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { router } from 'expo-router';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SPOTIFY_CLIENT_ID, SPOTIFY_DISCOVERY, SPOTIFY_SCOPES } from '../constants/spotify';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const redirectUri = AuthSession.makeRedirectUri({ scheme: 'check-yourself-login', path: 'auth' });

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: SPOTIFY_CLIENT_ID,
      scopes: SPOTIFY_SCOPES,
      redirectUri,
      usePKCE: true,
    },
    SPOTIFY_DISCOVERY,
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      exchangeCodeForToken(code);
    } else if (response?.type === 'error') {
      // OAuth error — response.error contains details
    }
  }, [response]);

  async function exchangeCodeForToken(code: string) {
    if (!request?.codeVerifier) return;

    try {
      const tokenResponse = await fetch(SPOTIFY_DISCOVERY.tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          client_id: SPOTIFY_CLIENT_ID,
          code_verifier: request.codeVerifier,
        }).toString(),
      });

      const data = await tokenResponse.json();

      if (data.access_token) {
        const expiry = Date.now() + data.expires_in * 1000;
        await AsyncStorage.setItem('spotify_token', data.access_token);
        await AsyncStorage.setItem('spotify_token_expiry', expiry.toString());
        if (data.refresh_token) {
          await AsyncStorage.setItem('spotify_refresh_token', data.refresh_token);
        }
        router.replace('/home');
      }
    } catch (err) {
      // token exchange failed
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CheckYourself</Text>
        <Text style={styles.subtitle}>check in with yourself</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.prompt}>
          Connect your Spotify account to get personalized music for your mood.
        </Text>

        <TouchableOpacity
          style={[styles.spotifyButton, !request && styles.buttonDisabled]}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          {!request ? (
            <ActivityIndicator color="#000000" />
          ) : (
            <Text style={styles.spotifyButtonText}>Login with Spotify</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 32,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 13,
    color: '#aaaaaa',
    marginTop: 8,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prompt: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 50,
    alignItems: 'center',
    minWidth: 220,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  spotifyButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
