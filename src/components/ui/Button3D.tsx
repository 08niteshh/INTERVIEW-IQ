import React from 'react';

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glow' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
}

export const Button3D: React.FC<Button3DProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-2xl gap-2',
    lg: 'px-7 py-3.5 text-base rounded-2xl gap-2.5 font-bold',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/30 active:scale-[0.98] transition-all duration-200',
    secondary:
      'glass-pill text-slate-200 hover:text-white hover:bg-white/10 active:scale-[0.98] transition-all duration-200',
    glow:
      'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 hover:opacity-95 text-white shadow-lg shadow-fuchsia-500/30 border border-fuchsia-400/30 active:scale-[0.98] transition-all duration-200',
    danger:
      'bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white shadow-lg shadow-rose-500/25 border border-rose-400/30 active:scale-[0.98] transition-all duration-200',
    ghost:
      'text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200',
  };

  return (
    <button
      className={`inline-flex items-center justify-center font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};
