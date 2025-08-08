import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'slide-in-left' | 'slide-in-right' | 'scale-in';
  delay?: number;
  className?: string;
}

const ScrollAnimatedSection: React.FC<ScrollAnimatedSectionProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all duration-1000',
        !isVisible && 'opacity-0 translate-y-8',
        isVisible && {
          'animate-fade-up': animation === 'fade-up',
          'animate-slide-in-left': animation === 'slide-in-left',
          'animate-slide-in-right': animation === 'slide-in-right',
          'animate-scale-in': animation === 'scale-in',
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollAnimatedSection;