# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This App Does

CheckYourself is a React Native wellness app. Users log in with Spotify (OAuth2 PKCE), select an emotion from a grid of 78 options, then choose between a curated Spotify playlist or a swipeable affirmation carousel.

## Commands

```bash
npm install          # install dependencies

npm run ios          # run on iOS simulator
npm run android      # run on Android emulator
npm run web          # run in browser

npx expo run:ios     # native build (required when touching native modules)
npx expo run:android

npm run ios:clean    # clear cache and run on iOS
```

There is no test runner configured.

## Architecture

**Routing:** File-based via `expo-router`. Every file in `app/` is a screen. Navigation is stack-based; `_layout.tsx` defines the stack and global header styles. Data flows between screens as route params (e.g. `emotion` string passed from checkin → relief → downstream screens).

**Auth flow:** `app/index.tsx` (splash) checks `AsyncStorage` for a valid `spotify_token` + `spotify_token_expiry` on mount and immediately redirects to `/home` or `/login`. Login uses OAuth2 PKCE via `expo-auth-session`. Tokens (`spotify_token`, `spotify_token_expiry`, `spotify_refresh_token`) are stored in `AsyncStorage`. A 401 from the Spotify API triggers `AsyncStorage.multiRemove` and redirect to `/login`.

**Screen flow:**
```
index (auth check) → login (OAuth) → home → checkin → relief → wellness → music
                                                              ↘ sulk (affirmations)
```

**Constants layer** — all static data and config lives in `constants/`:
- `theme.ts` — single source of truth for all colors, radii, and spacing. **Always import from here; never use hardcoded hex values.**
- `spotify.ts` — client ID, OAuth scopes, discovery endpoints
- `emotions.ts` — 78 emotions with mood color assignments (`red`, `yellow`, `green`, `blue`)
- `playlists.ts` — 4 curated Spotify playlist definitions
- `affirmations.ts` — motivational quotes for the sulk carousel

**Spotify integration:** The app calls the Spotify Web API directly (no backend). `music.tsx` fetches tracks for a playlist using the stored bearer token. Opening a playlist tries a `spotify://` deep link first, falling back to the `external_urls.spotify` web URL.

## Design System

Full spec and `/checkyourself-design` skill live in `.claude/`. Living reference: [`docs/design-system.md`](docs/design-system.md).

All styling uses `constants/theme.ts`. **Never use hardcoded hex values — always import from there.**

**Parchment surfaces (primary):**
- `colors.parchment` (`#f4e6d2`) — primary background
- `colors.parchmentSoft` (`#ebd9bd`) — secondary buttons (Log Out, Back chip)
- `colors.parchmentDeep` (`#e0c8a8`) — dividers on parchment

**Cocoa cards (on parchment):**
- `colors.cocoa` (`#6b5048`) — option cards, playlist rows
- `colors.cocoaDeep` (`#4d3934`) — emotion badge background

**CTAs:** `colors.amethyst` (primary), `colors.tigerEye` (accent/chevron on dark)

**Text on parchment:** `colors.onParchment` → `onParchment4` (dark → hint), `colors.onParchmentDis` (disabled)

**Text on cocoa cards:** `colors.onCocoa` (primary), `colors.onCocoa2` (secondary)

**Text on amethyst CTA:** `colors.onAmethyst`

**Mood cells:** `colors.moodCharged / moodEnergized / moodCalm / moodLow` with `colors.onMood` as text

**Radii:** `radii.sm / md / lg / xl / pill` | **Spacing:** `spacing[4]` = 16px, etc.

The palette is warm parchment surfaces with amethyst CTAs. Do not use Spotify green anywhere in the UI.

## Typography

Custom fonts are loaded in `app/_layout.tsx` via `expo-font` + `@expo-google-fonts` packages. Font family names to use in `StyleSheet`:

| Family | Weights available | Use for |
|---|---|---|
| `Caveat_700Bold` | 700 | Wordmark / splash display |
| `Nunito_300Light` | 300 | Greeting "Hi," |
| `Nunito_400Regular` | 400 | Body text, descriptions |
| `Nunito_600SemiBold` | 600 | Eyebrows, taglines |
| `Nunito_700Bold` | 700 | Buttons, track titles, headers |
| `Nunito_800ExtraBold` | 800 | Headings, emotion text, card titles |
| `CormorantGaramond_400Regular_Italic` | 400 italic | Affirmation quotes |
| `JetBrainsMono_400Regular` | 400 | Track numbers |

`_layout.tsx` holds the splash until all fonts are loaded (shows an amethyst spinner on parchment).

## Native Build Notes

The app uses `expo-dev-client`, so prefer `npx expo run:ios` / `npx expo run:android` over Expo Go when working with native modules. The deep link scheme `check-yourself-login` must be registered in `app.json` and in the Spotify Developer Dashboard redirect URIs for auth to work.
