# CheckYourself

A React Native wellness app that helps you check in with your emotions and provides curated Spotify music — or affirmations — to match how you're feeling.

## What It Does

CheckYourself guides you through a simple flow:

1. **Check In** — Select from 78 emotions organized across four mood categories (charged, positive, calm, low)
2. **Choose Your Relief** — Pick between music or affirmations
3. **Music path** — Browse four curated Spotify playlists (Relax, Uplift, Happy, Meditate) and play directly in Spotify
4. **Affirmations path** — Swipe through a carousel of motivational quotes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Expo](https://expo.dev) ~55 / React Native 0.83 |
| Routing | [expo-router](https://expo.github.io/router) (file-based) |
| Auth | OAuth2 PKCE via `expo-auth-session` |
| Storage | `@react-native-async-storage/async-storage` |
| Language | TypeScript (strict) |
| Platform | iOS & Android |

---

## Prerequisites

- [Node.js](https://nodejs.org) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- A [Spotify Developer](https://developer.spotify.com/dashboard) account with an app registered
- iOS Simulator / Android Emulator, or a physical device with the Expo Go app

---

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd checkYourselfV2
npm install
```

### 2. Configure Spotify credentials

Open [constants/spotify.ts](constants/spotify.ts) and update the client ID:

```ts
export const SPOTIFY_CLIENT_ID = 'your_client_id_here';
```

In your Spotify Developer Dashboard, add the following redirect URI:

```
check-yourself-login://auth
```

### 3. Run the app

```bash
# iOS
npm run ios

# Android
npm run android

# Expo Dev Client (recommended for custom native builds)
npx expo run:ios
npx expo run:android
```

---

## Project Structure

```
checkYourselfV2/
├── app/
│   ├── _layout.tsx       # Root navigation layout
│   ├── index.tsx         # Splash screen — checks auth token validity
│   ├── login.tsx         # Spotify OAuth login
│   ├── home.tsx          # Home dashboard with user greeting
│   ├── checkin.tsx       # Emotion selection grid (78 emotions × 4 colors)
│   ├── relief.tsx        # Music vs. Affirmations choice
│   ├── wellness.tsx      # Playlist picker
│   ├── music.tsx         # Spotify playlist tracks display
│   └── sulk.tsx          # Affirmation carousel
├── constants/
│   ├── spotify.ts        # Spotify client ID, OAuth scopes, discovery endpoints
│   ├── emotions.ts       # 78 emotions organized by color/mood category
│   ├── playlists.ts      # 4 curated Spotify playlist definitions
│   └── affirmations.ts   # Motivational quotes
├── assets/               # App icons and splash images
├── app.json              # Expo app config
├── package.json
└── tsconfig.json
```

---

## Authentication

Login uses **OAuth2 with PKCE** (Proof Key for Code Exchange) — the recommended flow for mobile apps without a backend secret.

- Tokens are persisted in `AsyncStorage` with expiry timestamps
- Refresh tokens are stored and used to silently re-authenticate
- A 401 response anywhere in the app triggers automatic logout and redirect to login
- Redirect URI scheme: `check-yourself-login://auth`

**Required Spotify OAuth scopes:**

| Scope | Purpose |
|---|---|
| `user-read-email` | Display user's name/email |
| `user-read-private` | Access account details |
| `playlist-read-private` | Read private playlists |
| `streaming` | Enable in-app playback |
| `user-read-playback-state` | Read current playback state |

---

## Emotion Categories

Emotions are grouped into four color-coded categories:

| Color | Mood | Count | Examples |
|---|---|---|---|
| 🔴 Red | Charged / Negative | 16 | Enraged, Frightened, Nervous, Worried |
| 🟡 Yellow | Positive / Energized | 15 | Joyful, Excited, Motivated, Inspired |
| 🟢 Green | Calm / Content | 17 | Calm, Grateful, Serene, Peaceful |
| 🔵 Blue | Low / Melancholy | 16 | Sad, Tired, Alone, Drained |

---

## Playlists

Four curated Spotify playlists are embedded in the app:

| Playlist | Vibe |
|---|---|
| 🌊 Relax | Wind down and decompress |
| ✨ Uplift | Boost your mood |
| ☀️ Happy | Feel-good energy |
| 🧘 Meditate | Calm and center yourself |

Tapping a playlist deep-links into the Spotify app for playback.

---

## App Config

Key values in [app.json](app.json):

- **Name:** CheckYourself
- **Bundle ID:** `com.kiera.checkyourself` (iOS & Android)
- **Deep link scheme:** `check-yourself-login`
- **Orientation:** Portrait only
- **Theme:** Dark (`#1a1a2e` background)

---

## Development Notes

- The app uses `expo-dev-client` for custom native builds — use `npx expo run:ios` / `npx expo run:android` rather than Expo Go when working with native modules
- All screens follow a consistent dark theme with Spotify green (`#1DB954`) as the primary accent
- Navigation is stack-based via `expo-router`; emotion data is passed as route params between screens
