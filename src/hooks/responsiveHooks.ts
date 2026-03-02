import { useResponsive } from './useResponsive';
import type { Breakpoint } from '../types/responsive';

// Responsive utility hooks
export const useBreakpoint = (): Breakpoint => {
  const { breakpoint } = useResponsive();
  return breakpoint;
};

export const useIsMobile = (): boolean => {
  const { isMobile } = useResponsive();
  return isMobile;
};

export const useIsTablet = (): boolean => {
  const { isTablet } = useResponsive();
  return isTablet;
};

export const useIsDesktop = (): boolean => {
  const { isDesktop } = useResponsive();
  return isDesktop;
};
