import { useState, useEffect } from "react";

const useStartChildAnimation = ({
  parentAnimationStarted,
  delay = 100,
}: {
  parentAnimationStarted: boolean;
  delay?: number;
}): boolean => {
  const [open, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // !note: 130 is magic number to sync with <MainTemplate>
    // TODO figure out a better way?
    const timer = setTimeout(() => setIsOpen(true), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, parentAnimationStarted, setIsOpen]);
  return open;
};

export default useStartChildAnimation;
