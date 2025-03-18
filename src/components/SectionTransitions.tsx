interface TransitionProps {
  className?: string;
}

export function DiagonalTransition({ className = "" }: TransitionProps) {
  return <div className={`section-transition-diagonal ${className}`}></div>;
}

export function DiagonalTransitionReverse({ className = "" }: TransitionProps) {
  return <div className={`section-transition-diagonal-reverse ${className}`}></div>;
}

export function WaveTransition({ className = "" }: TransitionProps) {
  return <div className={`section-transition-wave ${className}`}></div>;
}

export function WaveTransitionReverse({ className = "" }: TransitionProps) {
  return <div className={`section-transition-wave-reverse ${className}`}></div>;
}

export function BarsTransition({ className = "" }: TransitionProps) {
  return <div className={`section-transition-bars ${className}`}></div>;
}

export function WeightsTransition({ className = "" }: TransitionProps) {
  return (
    <div className={`section-transition-weights ${className}`}>
      <div className="weight-disc"></div>
      <div className="weight-disc"></div>
    </div>
  );
}

export function HexagonsTransition({ className = "" }: TransitionProps) {
  return (
    <div className={`section-transition-hex ${className}`}>
      <div className="hexagon"></div>
      <div className="hexagon"></div>
      <div className="hexagon"></div>
      <div className="hexagon"></div>
      <div className="hexagon"></div>
    </div>
  );
}

export function PulseTransition({ className = "" }: TransitionProps) {
  return (
    <div className={`section-transition-pulse ${className}`}>
      <div className="pulse-circle"></div>
      <div className="pulse-circle"></div>
      <div className="pulse-circle"></div>
    </div>
  );
}

export function IntensityTransition({ className = "" }: TransitionProps) {
  return (
    <div className={`section-transition-intensity ${className}`}>
      <div className="intensity-bar"></div>
    </div>
  );
}

export function CrossTransition({ className = "" }: TransitionProps) {
  return <div className={`section-transition-cross ${className}`}></div>;
} 