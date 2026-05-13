# CheckYourself Design System

A warm, crystal-themed visual identity applied across all 8 screens. Parchment surfaces, amethyst CTAs, cocoa cards — no Spotify green anywhere.

## Tokens

All tokens live in [`constants/theme.ts`](../constants/theme.ts). **Never use hardcoded hex values in screen files** — always import from there.

### Surfaces

| Token | Hex | Use |
|---|---|---|
| `parchment` | `#f4e6d2` | Primary screen background |
| `parchmentSoft` | `#ebd9bd` | Secondary buttons (Log Out, Back chip), empty CTA state |
| `parchmentDeep` | `#e0c8a8` | Dividers, borders on parchment |
| `cocoa` | `#6b5048` | Cards — playlist rows, option cards |
| `cocoaDeep` | `#4d3934` | Emotion badge background |

### CTAs & Accents

| Token | Hex | Use |
|---|---|---|
| `amethyst` | `#9b7cc4` | Primary CTA background |
| `amethystPress` | `#8366ad` | Pressed state |
| `tigerEye` | `#c8924a` | Chevron arrows on cocoa cards |
| `tigerEyeOnLight` | `#a37535` | Tiger's-eye accent on parchment backgrounds |

### Text

| Token | Hex | Use |
|---|---|---|
| `onParchment` | `#3d2e2a` | Primary text on parchment |
| `onParchment2` | `#5e4943` | Secondary text |
| `onParchment3` | `#6b5048` | Tertiary / muted text |
| `onParchment4` | `#8a6f64` | Hint text |
| `onParchmentDis` | `#a08b80` | Disabled text |
| `onCocoa` | `#f4e6d2` | Primary text inside cocoa cards |
| `onCocoa2` | `#d9c4ad` | Secondary text inside cocoa cards |
| `onAmethyst` | `#f7efe2` | Text on amethyst CTA buttons |

### Mood Cell Colors (78-emotion grid)

| Token | Hex | Crystal | Mood |
|---|---|---|---|
| `moodCharged` | `#c5615a` | Garnet | Enraged → Peeved |
| `moodEnergized` | `#d8a25a` | Tiger's Eye | Joyful → Blissful |
| `moodCalm` | `#b8a47e` | Honey Clay | Blessed → Serene |
| `moodLow` | `#9985b8` | Amethyst | Disgusted → Tired |

Cell text always uses `onMood` (`#2a2128`).

### Affirmation Slide Backgrounds

| Token | Hex |
|---|---|
| `sulkAmethyst` | `#3d2c4e` |
| `sulkRose` | `#4d2e30` |
| `sulkSage` | `#3a3528` |

### Radii

| Token | px | Used for |
|---|---|---|
| `sm` | 8 | Mood cells |
| `md` | 14 | Rectangle buttons (Check In, Log Out) |
| `lg` | 16 | Cards, emotion badge |
| `xl` | 20 | Option cards (Music / Affirmations) |
| `pill` | 999 | Continue with Spotify, Open in Spotify, Back chip |

### Spacing

4-pt scale: `spacing[1]` = 4px … `spacing[9]` = 48px. Default screen padding is 24px horizontal; the checkin grid uses 12px.

---

## Typography

Fonts are loaded once in [`app/_layout.tsx`](../app/_layout.tsx) via `expo-font` + `@expo-google-fonts`. The layout holds the splash screen until all fonts are ready.

| `fontFamily` string | Weight | Used for |
|---|---|---|
| `Caveat_700Bold` | 700 | Wordmark on splash + login card |
| `Nunito_300Light` | 300 | Greeting "Hi," on home |
| `Nunito_400Regular` | 400 | Body copy, descriptions, prompt text |
| `Nunito_600SemiBold` | 600 | Eyebrows ("YOU FEEL", "Playlist"), taglines |
| `Nunito_700Bold` | 700 | Buttons, track titles, nav headers |
| `Nunito_800ExtraBold` | 800 | Headings, emotion name, card titles |
| `CormorantGaramond_400Regular_Italic` | 400i | Affirmation quote text + decorative quote mark |
| `JetBrainsMono_400Regular` | 400 | Track numbers in music screen |

To add a new font variant, import it from the relevant `@expo-google-fonts/*` package and register it in the `useFonts` call in `_layout.tsx`.

---

## Component Patterns

### Primary CTA (pill)
```tsx
<TouchableOpacity style={styles.cta} activeOpacity={0.8}>
  <Text style={styles.ctaText}>Label</Text>
</TouchableOpacity>

cta: {
  backgroundColor: colors.amethyst,
  paddingVertical: 15,
  paddingHorizontal: 36,
  borderRadius: radii.pill,
  alignItems: 'center',
},
ctaText: {
  fontFamily: 'Nunito_700Bold',
  fontSize: 15,
  color: colors.onAmethyst,
  letterSpacing: 0.45,
},
```

### Rectangle Button (Check In / Log Out)
```tsx
// Primary
{ backgroundColor: colors.amethyst, paddingVertical: 16, borderRadius: radii.md }
// Secondary
{ backgroundColor: colors.parchmentSoft, paddingVertical: 12, borderRadius: radii.md }
```

### Cocoa Card
```tsx
{
  backgroundColor: colors.cocoa,
  borderRadius: radii.xl,   // option cards
  // or radii.lg            // playlist rows
  padding: 22,
}
// Title: Nunito_800ExtraBold, colors.onCocoa
// Body:  Nunito_400Regular,   colors.onCocoa2
```

### Emotion Badge
```tsx
{
  backgroundColor: colors.cocoaDeep,
  borderRadius: radii.lg,
  paddingVertical: 18,
  paddingHorizontal: 22,
  alignItems: 'center',
}
// Eyebrow: Nunito_600SemiBold 11px uppercase, colors.onCocoa2, letterSpacing 2.75
// Value:   Nunito_800ExtraBold 30px, colors.onCocoa
```

### Section Divider
```tsx
{ borderBottomWidth: 1, borderBottomColor: colors.parchmentDeep }
```

---

## Press / Interaction States

| Element | `activeOpacity` | Disabled |
|---|---|---|
| Pill CTAs | `0.8` | `opacity: 0.7` |
| Rectangle buttons | `0.85` | background → `parchmentSoft`, text → `onParchmentDis` |
| Cards (option, playlist) | `0.85` | — |

No spring animations, bounces, or parallax — the system is intentionally near-still. The only motion is the mood cell `scale(1.05)` snap on selection (no transition) and the native stack push/pop.

---

## Extending the System

- **New color** — add to `constants/theme.ts`, never inline
- **New screen** — start from parchment background, use `onParchment` for primary text, reach for cocoa cards when you need a raised surface
- **New button variant** — use an existing `radii` token; match weight/size to the closest existing button role above
- **New font use** — check the typography table first; only add a new `fontFamily` string if no existing weight fits

---

## Brand Assets

Watercolor / sketch mood-board imagery lives in [`assets/brand/`](../assets/brand/). These are for marketing and onboarding surfaces only — the production app chrome stays asset-free.
