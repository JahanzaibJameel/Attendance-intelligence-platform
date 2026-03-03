import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ModernCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  gradient?: string;
  hover?: boolean;
  glass?: boolean;
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  title,
  description,
  icon,
  gradient = 'from-purple-500 to-pink-500',
  hover = true,
  glass = false,
  className = '',
  onClick,
  size = 'md',
  animated = true
}) => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const baseClasses = `
    relative overflow-hidden rounded-2xl transition-all duration-300
    ${sizeClasses[size]}
    ${glass ? 'glass-modern' : 'bg-white dark:bg-gray-800'}
    ${hover ? 'hover:shadow-xl hover:scale-105 cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  const cardContent = (
    <div className={baseClasses} onClick={onClick}>
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
      
      {/* Glass effect overlay */}
      {glass && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      )}
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {/* Header with icon */}
        {(title || icon) && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {icon && (
                <div className={`p-2 rounded-xl bg-gradient-to-r ${gradient} text-white shadow-lg`}>
                  {icon}
                </div>
              )}
              {title && (
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {title}
                </h3>
              )}
            </div>
            <Sparkles className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
        
        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {description}
          </p>
        )}
        
        {/* Main content */}
        <div className="relative">
          {children}
        </div>
        
        {/* Hover indicator */}
        {hover && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight className="w-4 h-4 text-purple-500" />
          </div>
        )}
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          scale: 1.02, 
          boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)" 
        }}
        transition={{ duration: 0.3 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default ModernCard;
