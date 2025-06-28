import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import bgImage from './components/images/react.jpg';

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      background: `url(${bgImage}) center center / cover no-repeat fixed`,
      pointerEvents: 'none',
    }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        options={{
          fullScreen: { enable: false },
          background: { color: 'transparent' },
          fpsLimit: 60,
          particles: {
            number: { value: 45, density: { enable: true, area: 900 } },
            color: { value: '#cccccc' },
            links: {
              enable: true,
              color: '#cccccc',
              opacity: 0.25,
              width: 1.2,
              distance: 150,
            },
            move: {
              enable: true,
              speed: 1.2,
              direction: 'none',
              outModes: { default: 'out' },
            },
            opacity: { value: 0.5 },
            shape: { type: 'circle' },
            size: { value: 3, random: true },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'grab' },
              onClick: { enable: false },
              resize: true,
            },
            modes: {
              grab: { distance: 140, links: { opacity: 0.4 } },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
} 