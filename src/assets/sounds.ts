
// Array of obnoxious sound effects
const soundEffects = [
  'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3', // Cartoon fail sound
  'https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3', // Error alert
  'https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3', // Retro arcade game jump
  'https://assets.mixkit.co/active_storage/sfx/2064/2064-preview.mp3', // Monkey chimp laugh
  'https://assets.mixkit.co/active_storage/sfx/1618/1618-preview.mp3', // Classic alarm
  'https://assets.mixkit.co/active_storage/sfx/1647/1647-preview.mp3', // Alert notification
  'https://assets.mixkit.co/active_storage/sfx/2894/2894-preview.mp3', // Angry cat meow
  'https://assets.mixkit.co/active_storage/sfx/186/186-preview.mp3', // Wrong answer buzzer
];

// Preload all sounds
const preloadedSounds: HTMLAudioElement[] = soundEffects.map(url => {
  const audio = new Audio(url);
  audio.volume = 0.7; // Slightly reduced volume for sanity
  return audio;
});

export const playRandomSound = () => {
  // Get a random sound from the preloaded sounds
  const randomIndex = Math.floor(Math.random() * preloadedSounds.length);
  
  try {
    // Stop any currently playing sounds
    preloadedSounds.forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
    
    // Play the new random sound
    const sound = preloadedSounds[randomIndex];
    sound.play().catch(e => console.log('Audio play failed', e));
  } catch (error) {
    console.error('Failed to play sound', error);
  }
};

export const playTypingSound = () => {
  // Always use index 2 for typing sounds (the jump sound)
  try {
    const typingSound = preloadedSounds[2];
    typingSound.currentTime = 0;
    typingSound.play().catch(e => console.log('Audio play failed', e));
  } catch (error) {
    console.error('Failed to play typing sound', error);
  }
};
