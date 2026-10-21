/**
 * Generative deep-space ambient audio using Web Audio API.
 * Synthesizes a soothing, low-frequency cosmic drone with celestial harmonic overtone swells.
 * 100% self-contained: requires zero external audio files.
 */
class CosmicAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;

    const now = this.ctx.currentTime;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.22, now + 3);
    this.masterGain.connect(this.ctx.destination);

    // Warm Low-Pass Filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(180, now);
    this.filter.Q.setValueAtTime(3.5, now);
    this.filter.connect(this.masterGain);

    // LFO to gently sweep the filter
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.08, now); // ~12 second swell cycle
    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(70, now);
    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.filter.frequency);
    this.lfo.start();

    // Fundamental Drone 1 (55 Hz - A1)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(55, now);
    this.droneOsc1.connect(this.filter);
    this.droneOsc1.start();

    // Drone 2 (Harmonic fifth: 82.4 Hz - E2)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(82.4, now);
    this.droneOsc2.connect(this.filter);
    this.droneOsc2.start();

    // Sub Bass (27.5 Hz - A0)
    this.subOsc = this.ctx.createOscillator();
    this.subOsc.type = 'sine';
    this.subOsc.frequency.setValueAtTime(27.5, now);
    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.35, now);
    this.subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    this.subOsc.start();

    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.isPlaying || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    setTimeout(() => {
      try {
        this.droneOsc1?.stop();
        this.droneOsc2?.stop();
        this.subOsc?.stop();
        this.lfo?.stop();
        this.droneOsc1?.disconnect();
        this.droneOsc2?.disconnect();
        this.subOsc?.disconnect();
        this.lfo?.disconnect();
        this.masterGain?.disconnect();
      } catch {
        // cleanup safe
      }
      this.isPlaying = false;
    }, 1300);
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const cosmicAudio = new CosmicAudioEngine();
