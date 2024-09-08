'use client'
import { useState, useEffect, useRef } from 'react';

export function usePreventLineBreak() {
  const [isOverflow, setIsOverflow] = useState(false);
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const { scrollWidth, clientWidth } = ref.current;
        setIsOverflow(scrollWidth > clientWidth);
      }
    };

    // Add ResizeObserver to check for overflow
    const observer = new ResizeObserver(handleResize);
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isOverflow };
}