import React from 'react';
import princessLogoImg from '../assets/images/princess_official_logo_1791668953742.jpg';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const dimensionClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20',
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Circular Crimson Medallion Logo */}
      <div className={`relative ${dimensionClasses} rounded-full overflow-hidden shrink-0 shadow-md ring-2 ring-[#d4af37] bg-[#9e161c]`}>
        <img
          src={princessLogoImg}
          alt="Princess African Hair Braiding Official Logo"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== '/assets/images/princess_official_logo_1791668953742.jpg') {
              target.src = '/assets/images/princess_official_logo_1791668953742.jpg';
            }
          }}
          className="w-full h-full object-cover rounded-full scale-102"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left justify-center">
          <span className="font-serif font-bold text-lg sm:text-xl tracking-wider text-[#221417] group-hover:text-[#8e273e] transition-colors leading-tight">
            PRINCESS
          </span>
          <span className="text-[9.5px] sm:text-[10px] tracking-widest text-[#8e273e] uppercase font-bold">
            African Hair Braiding
          </span>
        </div>
      )}
    </div>
  );
};
