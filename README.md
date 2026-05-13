# CheckYourself

A React Native wellness app that helps you check in with your emotions and provides curated Spotify music — or affirmations — to match how you're feeling.

## What It Does

CheckYourself guides you through a simple flow:

1. **Check In** — Select from 78 emotions organized across four mood categories (charged, energized, calm, low)
2. **Choose Your Relief** — Pick between music or affirmations
3. **Music path** — Browse four curated Spotify playlists and open directly in Spotify
4. **Affirmations path** — Swipe through a carousel of motivational quotes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Expo](https://expo.dev) ~55 / React Native 0.83 |
| Routing | [expo-router](https://expo.github.io/router) (file-based) |
| Auth | OAuth2 PKCE via `expo-auth-session` |
| Storage | `@react-native-async-storage/async-storage` |
| Fonts | `expo-font` + `@expo-google-fonts` (Caveat, Nunito, Cormorant Garamond, JetBrains Mono) |
| Language | TypeScript (strict) |
| Platform | iOS & Android |

---

## Prerequisites

- [Node.js](https://nodejs.org) 18+
- A [Spotify Developer](https://developer.spotify.com/dashboard) account with an app registered
- iOS Simulator / Android Emulator, or a physical device

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
# Expo Dev Client (recommended)
npx expo run:ios
npx expo run:android

# Quick start via Expo
npm run ios
npm run android

# Clear cache
npm run ios:clean
```

---

## Project Structure

```
checkYourselfV2/
├── app/
│   ├── _layout.tsx       # Root layout — font loading, stack config, header theme
│   ├── index.tsx         # Splash — checks auth token, redirects to home or login
│   ├── login.tsx         # Spotify OAuth2 PKCE login
│   ├── home.tsx          # Home dashboard with user greeting
│   ├── checkin.tsx       # 78-emotion grid (4 cols, mood-colored cells)
│   ├── relief.tsx        # Music vs. Affirmations choice
│   ├── wellness.tsx      # Playlist picker
│   ├── music.tsx         # Spotify playlist track list + deep link to app
│   └── sulk.tsx          # Swipeable affirmation carousel
├── constants/
│   ├── theme.ts          # Single source of truth: colors, radii, spacing
│   ├── spotify.ts        # Client ID, OAuth scopes, discovery endpoints
│   ├── emotions.ts       # 78 emotions with mood color assignments
│   ├── playlists.ts      # 4 curated Spotify playlist definitions
│   └── affirmations.ts   # Motivational quotes for the carousel
├── assets/
│   ├── brand/            # Mood-board imagery (marketing use only)
│   ├── purple-crystal.png
│   ├── splash.png
│   └── icon.png
├── docs/
│   └── design-system.md  # Token reference, typography, component patterns
├── app.json
├── CLAUDE.md             # AI assistant instructions
└── package.json
```

---

## Design System

The app uses a warm **crystal-themed** palette — parchment surfaces, amethyst CTAs, cocoa cards. Full spec and Claude design skill are in `.claude/`.

**Key surface tokens** (all in `constants/theme.ts`):

| Token | Hex | Used for |
|---|---|---|
| `parchment` | `#f4e6d2` | Primary background |
| `parchmentSoft` | `#ebd9bd` | Secondary buttons, back chip |
| `parchmentDeep` | `#e0c8a8` | Dividers |
| `cocoa` | `#6b5048` | Cards (playlist rows, option cards) |
| `cocoaDeep` | `#4d3934` | Emotion badge |
| `amethyst` | `#9b7cc4` | Primary CTA |

**Typography** — loaded via `expo-font` in `_layout.tsx`:

| Font | Use |
|---|---|
| Caveat 700 | Wordmark / splash display |
| Nunito 300–800 | All UI text |
| Cormorant Garamond italic | Affirmation quotes |
| JetBrains Mono | Track numbers |

---

## Authentication

Login uses **OAuth2 with PKCE** — the recommended flow for mobile apps without a backend secret.

- Tokens are persisted in `AsyncStorage` with expiry timestamps
- A 401 response anywhere in the app triggers automatic logout and redirect to login
- Redirect URI scheme: `check-yourself-login://auth`

**Required Spotify OAuth scopes:**

| Scope | Purpose |
|---|---|
| `user-read-email` | Display user's name |
| `user-read-private` | Access account details |
| `playlist-read-private` | Read private playlists |
| `streaming` | Enable in-app playback |
| `user-read-playback-state` | Read current playback state |

---

## Emotion Categories

78 emotions grouped into four mood quadrants, each with a crystal-themed color:

| Category | Color | Hex | Examples |
|---|---|---|---|
| Charged | Garnet | `#c5615a` | Enraged, Frightened, Nervous |
| Energized | Tiger's Eye | `#d8a25a` | Joyful, Motivated, Inspired |
| Calm | Honey Clay | `#b8a47e` | Calm, Grateful, Serene |
| Low | Amethyst | `#9985b8` | Tired, Alone, Drained |

---

## Playlists

Four curated Spotify playlists embedded in the app. Tapping one deep-links into Spotify (falls back to the web URL if the app isn't installed).

| Playlist | Vibe |
|---|---|
| 🌊 Relax | Wind down and decompress |
| ✨ Uplift | Boost your mood |
| ☀️ Happy | Feel-good energy |
| 🧘 Meditate | Calm and center yourself |

---

## Development Notes

- Use `npx expo run:ios` / `npx expo run:android` (not Expo Go) — the app uses `expo-dev-client` for custom native modules
- All styling uses `constants/theme.ts` — never use hardcoded hex values in screens
- Navigation is stack-based; emotion data is passed as route params between screens
- Fonts are loaded in `_layout.tsx` before any screen renders; adding a new font variant means registering it there
- The full design spec and `/checkyourself-design` Claude skill live in `.claude/` — invoke the skill in any Claude Code session for design system context
