export const animateVideoPlayback = (video: HTMLVideoElement | null) => {
  if (!video) return;

  let rafId: number;

  const totalDuration = 8;

  const updatePlaybackRate = () => {
    if (!video) return;

    const t = video.currentTime;

    let rate = 1;

    if (t < 5) {
      // Aceleración suave: de 0.9x a 2x
      rate = 0.9 + (1.6 * (t / 5)) ** 1.5;
    } else if (t < 15) {
      // Velocidad constante alta
      rate = 2;
    } else if (t <= totalDuration) {
      // Desaceleración suave: de 2x a 0.5x
      const progress = (t - 15) / 5;
      rate = 2 - (1.5 * progress ** 1.5);
    } else {
      // Mantener mínimo
      rate = 0.5;
    }

    video.playbackRate = rate;

    rafId = requestAnimationFrame(updatePlaybackRate);
  };

  rafId = requestAnimationFrame(updatePlaybackRate);

  return () => {
    cancelAnimationFrame(rafId);
  };
};
