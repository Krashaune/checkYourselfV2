import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { router } from 'expo-router';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SPOTIFY_CLIENT_ID, SPOTIFY_DISCOVERY, SPOTIFY_SCOPES } from '../constants/spotify';
import { colors, radii } from '../constants/theme';

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
    } catch {
      // token exchange failed
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.crystalArea}>
        <Image
          source={require('../assets/purple-crystal.png')}
          style={{ width: 480, height: 500 }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.headline}>{'Feel it.\nName it.\nGet Support.'}</Text>

        <TouchableOpacity
          style={[styles.loginButton, !request && styles.buttonDisabled]}
          onPress={() => promptAsync()}
          disabled={!request}
          activeOpacity={0.8}
        >
          {!request ? (
            <ActivityIndicator color={colors.onAmethyst} />
          ) : (
            <View style={styles.loginButtonInner}>
              <Text style={styles.loginButtonText}>Continue with </Text>
              <SpotifyLogo />
              <Text style={styles.loginButtonText}> Spotify</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SpotifyLogo() {
  return (
    <View style={styles.spotifyCircle}>
      <View style={styles.spotifyBar1} />
      <View style={styles.spotifyBar2} />
      <View style={styles.spotifyBar3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  crystalArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.cocoaDeep,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 36,
    paddingBottom: 52,
    paddingHorizontal: 36,
    gap: 32,
  },
  headline: {
    fontFamily: 'Caveat_700Bold',
    fontSize: 46,
    color: colors.onCocoa,
    lineHeight: 56,
    letterSpacing: 0.92,
  },
  loginButton: {
    backgroundColor: colors.amethyst,
    paddingVertical: 15,
    paddingHorizontal: 28,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loginButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  loginButtonText: {
    fontFamily: 'Nunito_700Bold',
    color: colors.onAmethyst,
    fontSize: 15,
    letterSpacing: 0.45,
  },
  spotifyCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.onAmethyst,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: 4,
  },
  spotifyBar1: {
    width: '100%',
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.amethyst,
  },
  spotifyBar2: {
    width: '80%',
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.amethyst,
  },
  spotifyBar3: {
    width: '60%',
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.amethyst,
  },
});
