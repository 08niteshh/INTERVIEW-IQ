import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Ring, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { AvatarState } from '../../types';

interface AIAvatar3DProps {
  state: AvatarState;
  audioVolume?: number; // 0 - 100
}

export const AIAvatar3D: React.FC<AIAvatar3DProps> = ({ state, audioVolume = 0 }) => {
  const headRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Colors based on Avatar State
  const getColor = () => {
    switch (state) {
      case 'SPEAKING':
        return { primary: '#06b6d4', secondary: '#3b82f6', glow: '#60a5fa' }; // Cyan & Blue
      case 'LISTENING':
        return { primary: '#38bdf8', secondary: '#0284c7', glow: '#7dd3fc' }; // Neon Cyan Audio Pulse
      case 'THINKING':
        return { primary: '#a855f7', secondary: '#ec4899', glow: '#d8b4fe' }; // Purple & Pink Neural
      case 'EVALUATING':
        return { primary: '#10b981', secondary: '#059669', glow: '#34d399' }; // Emerald Scanning
      default:
        return { primary: '#0ea5e9', secondary: '#6366f1', glow: '#38bdf8' }; // Idle Sky Blue
    }
  };

  const colors = getColor();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const volumeFactor = Math.min(1.5, Math.max(0, audioVolume / 60));

    // Dynamic rotation of holographic rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4;
      ring1Ref.current.rotation.y = t * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.5;
      ring2Ref.current.rotation.z = t * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -t * 0.3;
      ring3Ref.current.rotation.z = -t * 0.4;
    }

    // Core pulsing based on state & speech
    if (coreRef.current) {
      if (state === 'SPEAKING') {
        const pulse = 1 + Math.sin(t * 12) * 0.15;
        coreRef.current.scale.set(pulse, pulse, pulse);
      } else if (state === 'LISTENING') {
        const pulse = 1 + volumeFactor * 0.3;
        coreRef.current.scale.set(pulse, pulse, pulse);
      } else if (state === 'THINKING') {
        const pulse = 1 + Math.sin(t * 6) * 0.08;
        coreRef.current.scale.set(pulse, pulse, pulse);
      } else {
        const pulse = 1 + Math.sin(t * 2) * 0.04;
        coreRef.current.scale.set(pulse, pulse, pulse);
      }
    }

    // Particles rotation
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.1;
      particlesRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group position={[0, 0, 0]}>
        
        {/* Central Holographic AI Core */}
        <Sphere ref={coreRef} args={[0.9, 64, 64]}>
          <MeshDistortMaterial
            color={colors.primary}
            emissive={colors.secondary}
            emissiveIntensity={state === 'SPEAKING' || state === 'LISTENING' ? 0.9 : 0.4}
            distort={state === 'SPEAKING' ? 0.4 : state === 'THINKING' ? 0.5 : 0.2}
            speed={state === 'THINKING' ? 4 : 2}
            roughness={0.1}
            metalness={0.9}
            wireframe={state === 'THINKING' || state === 'EVALUATING'}
          />
        </Sphere>

        {/* Inner Luminous Orb */}
        <Sphere args={[0.55, 32, 32]}>
          <meshBasicMaterial color={colors.glow} wireframe={false} />
        </Sphere>

        {/* Orbiting Holographic Data Ring 1 */}
        <Torus ref={ring1Ref} args={[1.35, 0.02, 16, 100]}>
          <meshStandardMaterial color={colors.primary} emissive={colors.primary} emissiveIntensity={0.8} />
        </Torus>

        {/* Orbiting Holographic Data Ring 2 */}
        <Torus ref={ring2Ref} args={[1.6, 0.015, 16, 100]}>
          <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={0.6} />
        </Torus>

        {/* Orbiting Holographic Data Ring 3 (Outer Horizon) */}
        <Torus ref={ring3Ref} args={[1.85, 0.01, 16, 100]}>
          <meshStandardMaterial color={colors.glow} emissive={colors.glow} emissiveIntensity={0.4} />
        </Torus>

        {/* Holographic Target Crosshairs / Nodes */}
        {[-1.3, 1.3].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <Sphere args={[0.04, 16, 16]}>
              <meshBasicMaterial color="#38bdf8" />
            </Sphere>
          </group>
        ))}

      </group>
    </Float>
  );
};
