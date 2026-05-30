'use client';

import { motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-vivid-red hover:bg-dark-red text-white border-2 border-vivid-red hover:border-dark-red',
  secondary: 'bg-jet-black dark:bg-charcoal hover:bg-charcoal dark:hover:bg-jet-black text-white border-2 border-jet-black dark:border-charcoal hover:border-charcoal dark:hover:border-jet-black',
  ghost:     'bg-transparent border-2 border-vivid-red text-vivid-red hover:bg-vivid-red hover:text-white',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
      className={[
        'rounded-btn font-dmsans font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...(props as object)}
    >
      {children}
    </motion.button>
  );
}
