import { useEffect, useRef } from 'react';

interface KeyboardNavigationOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  enabled?: boolean;
}

export function useKeyboardNavigation({
  onEscape,
  onEnter,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  enabled = true
}: KeyboardNavigationOptions) {
  const handlers = useRef({ onEscape, onEnter, onArrowUp, onArrowDown, onArrowLeft, onArrowRight });

  useEffect(() => {
    handlers.current = { onEscape, onEnter, onArrowUp, onArrowDown, onArrowLeft, onArrowRight };
  }, [onEscape, onEnter, onArrowUp, onArrowDown, onArrowLeft, onArrowRight]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          handlers.current.onEscape?.();
          break;
        case 'Enter':
          handlers.current.onEnter?.();
          break;
        case 'ArrowUp':
          handlers.current.onArrowUp?.();
          break;
        case 'ArrowDown':
          handlers.current.onArrowDown?.();
          break;
        case 'ArrowLeft':
          handlers.current.onArrowLeft?.();
          break;
        case 'ArrowRight':
          handlers.current.onArrowRight?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);
}

export function useFocusTrap(containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    return () => container.removeEventListener('keydown', handleTabKey);
  }, [containerRef]);
}

export function useAriaAnnouncer() {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const element = document.createElement('div');
    element.setAttribute('role', 'status');
    element.setAttribute('aria-live', priority);
    element.className = 'sr-only';
    element.textContent = message;
    document.body.appendChild(element);

    setTimeout(() => {
      document.body.removeChild(element);
    }, 1000);
  };

  return { announce };
} 