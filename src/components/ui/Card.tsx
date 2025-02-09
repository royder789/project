import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function Card({
  title,
  description,
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-white shadow-sm',
        className
      )}
      {...props}
    >
      {(title || description) && (
        <div className="p-6 pb-4">
          {title && (
            <h3 className="text-lg font-medium">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}
      <div className="p-6 pt-0">{children}</div>
    </div>
  );
}