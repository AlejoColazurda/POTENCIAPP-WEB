import React from 'react';

/**
 * Local rewrite of ReactBits ShinyText: the stock version drove the shine with
 * motion's useAnimationFrame — a JS callback every frame, forever, even
 * offscreen. Same look as a pure CSS keyframe (`shiny-sweep` in globals.css),
 * which the compositor runs off the main thread. Same props surface.
 */
interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  /** Seconds per sweep. */
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120
}) => {
  const style: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: disabled ? undefined : `shiny-sweep ${speed}s linear infinite`
  };

  return (
    <span className={`inline-block ${className}`} style={style}>
      {text}
    </span>
  );
};

export default ShinyText;
