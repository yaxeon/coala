import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(
  initialTime: number,
  isActive: boolean,
  onExpire?: () => void,
) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const onExpireRef = useRef(onExpire);
  const expiredRef = useRef(false);

  onExpireRef.current = onExpire;

  useEffect(() => {
    setTimeLeft(initialTime);
    expiredRef.current = false;
  }, [initialTime]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const id = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isActive && !expiredRef.current) {
      expiredRef.current = true;
      onExpireRef.current?.();
    }
  }, [timeLeft, isActive]);

  const reset = useCallback((time: number) => {
    setTimeLeft(time);
    expiredRef.current = false;
  }, []);

  return {
    timeLeft,
    reset,
    isWarning: timeLeft <= 10 && timeLeft > 5,
    isCritical: timeLeft <= 5 && timeLeft > 0,
  };
}
