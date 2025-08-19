import { useCallback } from "react";

export function useCardStyles(selectedIndex: number) {
  const getCardStyles = useCallback(
    (index: number) => {
      const relativeIndex = index - selectedIndex;

      if (relativeIndex < 0)
        return { transform: `translateX(-100%) scale(0.9)`, opacity: 0, zIndex: 0 };

      if (relativeIndex === 0)
        return {
          transform: `translateX(0px) scale(1.25)`,
          opacity: 1,
          zIndex: 50,
          border: "4px solid #FFEDD6",
          padding: "0.5rem",
        };

      return {
        transform: `translateX(${relativeIndex * 160}px) scale(0.9)`,
        opacity: 1,
        zIndex: 10,
      };
    },
    [selectedIndex]
  );

  return getCardStyles;
}
