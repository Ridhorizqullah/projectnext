import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { Button as BaseButton } from '@/components/ui/button';

interface ButtonProps extends React.ComponentProps<"button"> {
  text: string;
  loading?: boolean;
}

export default function Button({ text, loading, className, disabled, ...props }: ButtonProps) {
  return (
    <BaseButton
      {...props}
      disabled={disabled || loading}
      className={`w-full h-12 bg-[#222] hover:bg-[#111] text-white font-medium rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.99] dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 text-base flex items-center justify-center gap-2 ${className || ''}`}
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Sending...
        </>
      ) : (
        text
      )}
    </BaseButton>
  );
}
