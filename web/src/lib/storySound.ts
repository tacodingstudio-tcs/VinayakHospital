// Synthesised score for the story (Web Audio): nothing to download, nothing to license.
// Each chapter has its own melody, tempo and instrument, over a warm pad and a soft reverb.
type Inst = "box" | "pluck" | "kalimba";
type Piece = { root: number; pent: number[]; melody: number[]; bpm: number; inst: Inst; gain: number; chord: number[] };

const MAJ = [0, 2, 4, 7, 9];

// One lullaby, one voice, from the first heartbeat to the family. Only the soft harmony underneath changes per chapter.
// Melody values are pentatonic degrees of F major (0-4 first octave, 5-9 second); -1 is a rest.
const THEME = { root: 174.6, pent: MAJ, bpm: 76, inst: "box" as Inst, melody: [5, 7, 9, 7, 5, 4, 5, 2, 4, 5, 7, 5, 4, 2, 4, 0] };
const HARMONY: number[][] = [
  [73.4, 110, 146.8, 174.6],  // 0 pregnancy: D minor, hushed
  [87.3, 130.8, 174.6, 220],  // 1 birth: F major, warm
  [130.8, 196, 261.6, 329.6], // 2 newborn: C major, soft
  [87.3, 130.8, 174.6, 220],  // 3 childhood: F major, bright
  [110, 164.8, 220, 261.6],   // 4 her turn: A minor, tender
  [87.3, 130.8, 196, 261.6],  // 5 together: F with a lifted top, resolved
];
const LEVEL = [0.55, 0.75, 0.8, 0.75, 0.7, 0.8]; // melody loudness per chapter (quieter at night)
const PIECES: Piece[] = HARMONY.map((chord, i) => ({ ...THEME, gain: LEVEL[i], chord }));
const BIRD_GAIN = [0, 0, 0.2, 0.7, 0.5, 0.12];
const BEAT_GAIN = [1, 0.35, 0, 0, 0, 0];
const CRICKET = [0.5, 0.18, 0, 0, 0, 0.25];

const freqOf = (p: Piece, deg: number) => p.root * Math.pow(2, (p.pent[((deg % 5) + 5) % 5] + 12 * Math.floor(deg / 5)) / 12);

export class StorySound {
  private ctx?: AudioContext;
  private master?: GainNode;
  private dry?: GainNode;
  private wet?: ConvolverNode;
  private pad: OscillatorNode[] = [];
  private cricketGain?: GainNode;
  private timers: number[] = [];
  private chapter = 0;
  private step = 0;
  private running = false;
  on = false;
  private visible = () => { if (!this.ctx) return; if (document.hidden) void this.ctx.suspend(); else if (this.on) void this.ctx.resume(); };

  async enable() {
    if (!this.ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AC();
      this.build();
      document.addEventListener("visibilitychange", this.visible);
    }
    await this.ctx.resume();
    this.on = true;
    this.fade(0.8);
    this.setChapter(this.chapter);
    this.start();
  }

  disable() {
    this.on = false;
    this.fade(0);
    this.stop();
    window.setTimeout(() => { if (!this.on) void this.ctx?.suspend(); }, 800);
  }

  setActive(active: boolean) { if (this.ctx && this.on) this.fade(active ? 0.8 : 0); }

  setChapter(i: number) {
    this.chapter = i; this.step = 0;
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.pad.forEach((o, k) => o.frequency.setTargetAtTime(PIECES[i].chord[k], t, 1.4));
    this.cricketGain?.gain.setTargetAtTime(CRICKET[i] * 0.02, t, 1.5);
  }

  dispose() {
    this.stop();
    document.removeEventListener("visibilitychange", this.visible);
    void this.ctx?.close();
    this.ctx = undefined;
  }

  private fade(v: number) {
    if (!this.ctx || !this.master) return;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.4);
  }

  private build() {
    const ctx = this.ctx!;
    this.master = ctx.createGain(); this.master.gain.value = 0; this.master.connect(ctx.destination);
    this.dry = ctx.createGain(); this.dry.gain.value = 0.9; this.dry.connect(this.master);
    // Reverb: a generated, softly decaying noise impulse.
    const len = Math.floor(ctx.sampleRate * 2.6);
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    this.wet = ctx.createConvolver(); this.wet.buffer = ir;
    const wg = ctx.createGain(); wg.gain.value = 0.55; this.wet.connect(wg); wg.connect(this.master);

    // Warm pad: slow triangle/sine voices through a low-pass.
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 800;
    const pg = ctx.createGain(); pg.gain.value = 0.06; lp.connect(pg); pg.connect(this.dry); pg.connect(this.wet);
    this.pad = PIECES[0].chord.map((f, k) => { const o = ctx.createOscillator(); o.type = k % 2 ? "triangle" : "sine"; o.frequency.value = f; o.detune.value = (k - 1.5) * 5; o.connect(lp); o.start(); return o; });

    // Night crickets: a high tone chopped by a fast LFO.
    const cr = ctx.createOscillator(); cr.type = "sine"; cr.frequency.value = 4300;
    const am = ctx.createGain(); am.gain.value = 0;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 13; const lg = ctx.createGain(); lg.gain.value = 1; lfo.connect(lg); lg.connect(am.gain);
    this.cricketGain = ctx.createGain(); this.cricketGain.gain.value = 0;
    cr.connect(am); am.connect(this.cricketGain); this.cricketGain.connect(this.dry);
    cr.start(); lfo.start();
  }

  private note(freq: number, t: number, inst: Inst, gain: number) {
    const ctx = this.ctx!;
    const parts: [number, number, OscillatorType][] =
      inst === "box" ? [[1, 1, "sine"], [2, 0.3, "sine"], [3, 0.1, "sine"]] :
      inst === "kalimba" ? [[1, 1, "sine"], [4.1, 0.18, "sine"]] :
      [[1, 1, "triangle"], [2, 0.18, "sine"]];
    const dur = inst === "pluck" ? 0.9 : inst === "kalimba" ? 1.1 : 1.8;
    parts.forEach(([m, g, type]) => {
      const o = ctx.createOscillator(); const e = ctx.createGain();
      o.type = type; o.frequency.value = freq * m;
      e.gain.setValueAtTime(0.0001, t);
      e.gain.exponentialRampToValueAtTime(gain * g * 0.2, t + (inst === "pluck" ? 0.012 : 0.004));
      e.gain.exponentialRampToValueAtTime(0.0001, t + dur / m ** 0.3);
      o.connect(e); e.connect(this.dry!); e.connect(this.wet!);
      o.start(t); o.stop(t + dur + 0.1);
    });
  }

  private thump(f0: number, t: number, gain: number, dur: number) {
    const ctx = this.ctx!; const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f0 * 0.5, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.dry!); o.start(t); o.stop(t + dur + 0.05);
  }


  // ---- Cues: sounds fired by the animation they belong to, so what you hear is what you see ----
  private noise?: AudioBuffer;
  private tap(t: number, g: number) {
    const ctx = this.ctx!;
    if (!this.noise) { this.noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.08), ctx.sampleRate); const d = this.noise.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length); }
    const src = ctx.createBufferSource(); src.buffer = this.noise;
    const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 600;
    const e = ctx.createGain(); e.gain.value = 0.35 * g;
    src.connect(f); f.connect(e); e.connect(this.dry!); src.start(t);
  }
  private glide(t: number, f0: number, f1: number, dur: number, g: number, type: OscillatorType = "sine") {
    const ctx = this.ctx!; const o = ctx.createOscillator(); const e = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    e.gain.setValueAtTime(0.0001, t); e.gain.exponentialRampToValueAtTime(g, t + dur * 0.15); e.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(e); e.connect(this.dry!); e.connect(this.wet!); o.start(t); o.stop(t + dur + 0.05);
  }
  private whoosh(t: number) {
    const ctx = this.ctx!;
    const len = Math.floor(ctx.sampleRate * 0.9); const buf = ctx.createBuffer(1, len, ctx.sampleRate); const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / len);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 0.8; bp.frequency.setValueAtTime(300, t); bp.frequency.exponentialRampToValueAtTime(2400, t + 0.8);
    const e = ctx.createGain(); e.gain.value = 0.16;
    src.connect(bp); bp.connect(e); e.connect(this.dry!); e.connect(this.wet!); src.start(t);
  }

  cue(name: string) {
    if (!this.ctx || !this.on) return;
    const t = this.ctx.currentTime;
    const p = PIECES[this.chapter];
    switch (name) {
      case "lub": { const k = BEAT_GAIN[this.chapter]; if (!k) return; this.thump(82, t + 0.15, 0.6 * k, 0.16); this.thump(70, t + 0.46, 0.8 * k, 0.18); break; }
      case "step": this.tap(t + 0.02, 0.9); this.tap(t + 0.47, 0.75); break;
      case "hop": this.glide(t + 0.14, 240, 560, 0.24, 0.12); this.tap(t + 1.42, 1.1); break;
      case "kick": if (this.chapter === 0) this.glide(t + 2.6, 220, 120, 0.2, 0.1); else this.glide(t + 2.6, 460, 640, 0.3, 0.07); break;
      case "open": this.note(freqOf(p, 9), t + 4.5, "box", 0.7); this.glide(t + 4.6, 500, 700, 0.35, 0.06); break;
      case "swing": this.note(freqOf(p, 7 + Math.floor(Math.random() * 4)), t, "kalimba", 0.6); break;
      case "heart": if (Math.random() < 0.5) this.note(freqOf(p, 10 + Math.floor(Math.random() * 3)), t, "box", 0.22); break;
      case "tear": this.glide(t + 0.62, 1500, 650, 0.12, 0.08); break;
      case "chapter": this.whoosh(t); [0, 2, 4].forEach((d, i) => this.note(freqOf(p, 7 + d), t + 0.18 + i * 0.13, "box", 0.5)); break;
    }
  }

  private bird() {
    const k = BIRD_GAIN[this.chapter]; if (!k || !this.ctx) return;
    const base = 2300 + Math.random() * 1400; const n = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      const ctx = this.ctx; const t = ctx.currentTime + 0.02 + i * 0.11;
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(base, t); o.frequency.exponentialRampToValueAtTime(base * 1.35, t + 0.08);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05 * k, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      o.connect(g); g.connect(this.dry!); g.connect(this.wet!); o.start(t); o.stop(t + 0.12);
    }
  }

  private tick = () => {
    if (!this.on || !this.ctx) return;
    const p = PIECES[this.chapter];
    const d = p.melody[this.step++ % p.melody.length];
    if (d >= 0) this.note(freqOf(p, d), this.ctx.currentTime + 0.03, p.inst, p.gain);
    // Half-time bass on every fourth step gives the chapter a pulse.
    if (this.step % 4 === 1) this.note(p.chord[0] * 0.5, this.ctx.currentTime + 0.03, "box", p.gain * 0.6);
    this.timers.push(window.setTimeout(this.tick, (60 / p.bpm / 2) * 1000));
  };

  private start() {
    if (this.running) return;
    this.running = true;
    this.timers.push(window.setTimeout(this.tick, 300));
    const chirp = () => { this.bird(); this.timers.push(window.setTimeout(chirp, 900 + Math.random() * 1800)); };
    this.timers.push(window.setTimeout(chirp, 1200));
  }

  private stop() {
    this.timers.forEach((t) => { window.clearInterval(t); window.clearTimeout(t); });
    this.timers = []; this.running = false;
  }
}
