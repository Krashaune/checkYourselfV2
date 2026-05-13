export type EmotionColor = 'red' | 'yellow' | 'green' | 'blue';

export interface Emotion {
  label: string;
  color: EmotionColor;
}

const red: EmotionColor = 'red';
const yellow: EmotionColor = 'yellow';
const green: EmotionColor = 'green';
const blue: EmotionColor = 'blue';

export const emotions: Emotion[] = [
  { label: 'Enraged', color: red },
  { label: 'Furious', color: red },
  { label: 'Frustrated', color: red },
  { label: 'Shocked', color: red },
  { label: 'Livid', color: red },
  { label: 'Frightened', color: red },
  { label: 'Nervous', color: red },
  { label: 'Restless', color: red },
  { label: 'Fuming', color: red },
  { label: 'Apprehensive', color: red },
  { label: 'Worried', color: red },
  { label: 'Annoyed', color: red },
  { label: 'Repulsed', color: red },
  { label: 'Troubled', color: red },
  { label: 'Uneasy', color: red },
  { label: 'Peeved', color: red },
  { label: 'Surprised', color: yellow },
  { label: 'Upbeat', color: yellow },
  { label: 'Motivated', color: yellow },
  { label: 'Ecstatic', color: yellow },
  { label: 'Hyper', color: yellow },
  { label: 'Cheerful', color: yellow },
  { label: 'Inspired', color: yellow },
  { label: 'Elated', color: yellow },
  { label: 'Energized', color: yellow },
  { label: 'Lively', color: yellow },
  { label: 'Optimistic', color: yellow },
  { label: 'Thrilled', color: yellow },
  { label: 'Pleasant', color: yellow },
  { label: 'Joyful', color: yellow },
  { label: 'Proud', color: yellow },
  { label: 'Blissful', color: yellow },
  { label: 'Blessed', color: green },
  { label: 'At Ease', color: green },
  { label: 'Content', color: green },
  { label: 'Fulfilled', color: green },
  { label: 'Humble', color: green },
  { label: 'Secure', color: green },
  { label: 'Chill', color: green },
  { label: 'Grateful', color: green },
  { label: 'Calm', color: green },
  { label: 'Satisfied', color: green },
  { label: 'Relaxed', color: green },
  { label: 'Carefree', color: green },
  { label: 'Relieved', color: green },
  { label: 'Restful', color: green },
  { label: 'Tranquil', color: green },
  { label: 'Serene', color: green },
  { label: 'Disgusted', color: blue },
  { label: 'Disappointed', color: blue },
  { label: 'Glum', color: blue },
  { label: 'Ashamed', color: blue },
  { label: 'Mortified', color: blue },
  { label: 'Alienated', color: blue },
  { label: 'Mopey', color: blue },
  { label: 'Apathetic', color: blue },
  { label: 'Embarrassed', color: blue },
  { label: 'Excluded', color: blue },
  { label: 'Timid', color: blue },
  { label: 'Drained', color: blue },
  { label: 'Alone', color: blue },
  { label: 'Down', color: blue },
  { label: 'Bored', color: blue },
  { label: 'Tired', color: blue },
];

export const emotionCellColors: Record<EmotionColor, string> = {
  red:    '#c5615a', // garnet — charged
  yellow: '#d8a25a', // tiger's eye — energized
  green:  '#b8a47e', // warm honey — calm
  blue:   '#9985b8', // amethyst — low
};
