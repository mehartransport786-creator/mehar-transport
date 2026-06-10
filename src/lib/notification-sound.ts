/**
 * Notification sound using Web Audio API.
 * Generates a subtle, professional chime — no external audio file needed.
 */

let audioContext: AudioContext | null = null;
let soundEnabled = true;

// Load user preference
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('mehar_notification_sound');
  if (stored !== null) soundEnabled = stored === 'true';
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function toggleSound(enabled?: boolean): boolean {
  soundEnabled = enabled !== undefined ? enabled : !soundEnabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('mehar_notification_sound', String(soundEnabled));
  }
  return soundEnabled;
}

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
}

export function playNotificationSound(type: 'standard' | 'vip' | 'urgent' = 'standard') {
  if (!soundEnabled || typeof window === 'undefined') return;

  try {
    const ctx = getAudioContext();

    // Resume if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Create oscillator for the chime
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Different tones for different priorities
    const freqs = {
      standard: [523.25, 659.25],  // C5, E5 — pleasant major third
      vip:      [659.25, 783.99],  // E5, G5 — brighter
      urgent:   [783.99, 987.77],  // G5, B5 — attention-grabbing
    };

    const [f1, f2] = freqs[type];

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(f1, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(f2, now);
    
    // Volume envelope — gentle fade in and out
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.15);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.5);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);

    // Second chime for VIP/urgent
    if (type === 'vip' || type === 'urgent') {
      const osc3 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc3.connect(gain2);
      gain2.connect(ctx.destination);
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(f2 * 1.25, now + 0.3);
      gain2.gain.setValueAtTime(0, now + 0.3);
      gain2.gain.linearRampToValueAtTime(0.12, now + 0.35);
      gain2.gain.linearRampToValueAtTime(0, now + 0.7);
      osc3.start(now + 0.3);
      osc3.stop(now + 0.7);
    }
  } catch {
    // Gracefully fail if audio context is not available
  }
}
