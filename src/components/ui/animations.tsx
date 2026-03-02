import { motion, MotionProps } from 'framer-motion';
import React, { ReactNode } from 'react';
import {
  fadeInVariants,
  slideUpVariants,
  slideInVariants,
  scaleVariants,
  staggerContainer,
  staggerItem
} from './animation-variants';

// Animated wrapper components
interface AnimatedFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedFade: React.FC<AnimatedFadeProps> = ({ 
  children, 
  className, 
  delay = 0 
}) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    variants={fadeInVariants}
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

interface AnimatedSlideUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedSlideUp: React.FC<AnimatedSlideUpProps> = ({ 
  children, 
  className, 
  delay = 0 
}) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    variants={slideUpVariants}
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

interface AnimatedSlideInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedSlideIn: React.FC<AnimatedSlideInProps> = ({ 
  children, 
  className, 
  delay = 0 
}) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    variants={slideInVariants}
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

interface AnimatedScaleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedScale: React.FC<AnimatedScaleProps> = ({ 
  children, 
  className, 
  delay = 0 
}) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    variants={scaleVariants}
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

// Animated list component
interface AnimatedListProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({ 
  children, 
  className 
}) => (
  <motion.div
    className={className}
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
  >
    {React.Children.map(children, (child, index) => (
      <motion.div key={index} variants={staggerItem}>
        {child}
      </motion.div>
    ))}
  </motion.div>
);

// Page transition wrapper
interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className 
}) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={slideUpVariants}
  >
    {children}
  </motion.div>
);

// Hover animation wrapper
interface HoverAnimationProps extends MotionProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
}

export const HoverAnimation: React.FC<HoverAnimationProps> = ({ 
  children, 
  className,
  hoverScale = 1.02,
  ...motionProps
}) => (
  <motion.div
    className={className}
    whileHover={{ scale: hoverScale, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
    {...motionProps}
  >
    {children}
  </motion.div>
);

// Card animation wrapper
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className, 
  delay = 0 
}) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    variants={scaleVariants}
    transition={{ delay, duration: 0.3 }}
    whileHover={{ 
      y: -4, 
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.2 }
    }}
  >
    {children}
  </motion.div>
);
