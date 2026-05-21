import * as React from 'react';
import { ReactNode } from 'react';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input as BaseInput } from '@/components/ui/input';

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export default function Input({ label, error, icon, className, id, name, ...props }: InputProps) {
  return (
    <Field data-invalid={!!error} className="mb-4">
      {label && (
        <FieldLabel htmlFor={id || name} className="text-slate-700 dark:text-slate-300 font-medium text-sm">
          {label}
        </FieldLabel>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3.5 text-muted-foreground/75 pointer-events-none">
            {icon}
          </span>
        )}
        <BaseInput
          {...props}
          id={id || name}
          name={name}
          className={`${icon ? 'pl-11' : ''} h-12 rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 placeholder:text-muted-foreground/60 transition-all text-base md:text-sm ${className || ''}`}
        />
      </div>
      {error && <FieldError className="mt-1">{error}</FieldError>}
    </Field>
  );
}
