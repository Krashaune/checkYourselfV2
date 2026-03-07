export interface Playlist {
  id: string;
  label: string;
  description: string;
  emoji: string;
}

export const playlists: Playlist[] = [
  {
    id: '3zzUUYkIdkNRrjmNGR3iLD',
    label: 'Relax',
    description: 'Wind down and breathe',
    emoji: '🌊',
  },
  {
    id: '4HrGgQJO9FUoqhsHthx42l',
    label: 'Uplift',
    description: 'Lift your spirits',
    emoji: '✨',
  },
  {
    id: '4GaJ65U4qkE7qKJEDrnv0W',
    label: 'Happy',
    description: 'Good vibes only',
    emoji: '☀️',
  },
  {
    id: '37i9dQZF1DX7gIoKXt0gmx',
    label: 'Meditate',
    description: 'Find your center',
    emoji: '🧘',
  },
];
