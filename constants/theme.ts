// CheckYourself Design System — crystal palette, parchment surfaces
// Warm smoky-quartz surfaces, amethyst CTAs. No Spotify green.

export const colors = {
  // Light surfaces (parchment mode — primary)
  parchment:        '#f4e6d2', // primary background
  parchmentSoft:    '#ebd9bd', // raised parchment — Log Out btn, Back chip
  parchmentDeep:    '#e0c8a8', // divider on parchment
  sand:             '#f4e6d2', // alias for parchment (legacy screens)

  // Cocoa cards (mid-tone surfaces on parchment)
  cocoa:            '#6b5048', // option card, playlist row
  cocoaSoft:        '#8a6f64', // hover / softer card
  cocoaDeep:        '#4d3934', // deepest cocoa — emotion badge

  // Legacy dark surfaces (login card, overlays)
  clay:             '#2a2128',
  clayDeep:         '#1d1719',
  clayCard:         '#3a2f33',
  clayLine:         '#4a3d40',

  // Crystal CTAs
  amethyst:         '#9b7cc4', // primary CTA
  amethystPress:    '#8366ad',
  roseQuartz:       '#e6b8b0', // soft accent
  roseQuartzCta:    '#d99b94', // secondary CTA
  tigerEye:         '#c8924a', // accent / chevron on dark
  tigerEyeOnLight:  '#a37535', // chevron on parchment
  citrine:          '#e8c87a',
  moonstone:        '#d8d1e0',

  // Text on parchment
  onParchment:      '#3d2e2a', // primary
  onParchment2:     '#5e4943', // secondary
  onParchment3:     '#6b5048', // tertiary / muted
  onParchment4:     '#8a6f64', // hint
  onParchmentDis:   '#a08b80', // disabled

  // Text inside cocoa cards
  onCocoa:          '#f4e6d2', // primary
  onCocoa2:         '#d9c4ad', // secondary

  // Text on amethyst CTA
  onAmethyst:       '#f7efe2',

  // Legacy foreground tokens (used on dark clay surfaces)
  fg1: '#f7efe2',
  fg2: '#d9cfc1',
  fg3: '#b3a89a',
  fg4: '#8b8077',
  fg5: '#5e544d',
  fg6: '#4a3d40',
  fg7: '#362b2e',

  // Mood quadrant (78-emotion grid)
  moodCharged:   '#c5615a', // garnet — charged (red)
  moodEnergized: '#d8a25a', // tiger's eye — energized (yellow)
  moodCalm:      '#b8a47e', // warm honey — calm (green)
  moodLow:       '#9985b8', // amethyst — low (blue)
  onMood:        '#2a2128', // text on mood cells

  // Affirmation slide backgrounds
  sulkAmethyst: '#3d2c4e',
  sulkRose:     '#4d2e30',
  sulkSage:     '#3a3528',

  // Semantic
  error:   '#c5615a',
  warn:    '#c8924a',
  success: '#b8a47e',
  info:    '#9b7cc4',
} as const;

export const radii = {
  sm:   8,
  md:   14,
  lg:   16,
  xl:   20,
  pill: 999,
} as const;

export const spacing = {
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  7:  32,
  8:  40,
  9:  48,
} as const;
