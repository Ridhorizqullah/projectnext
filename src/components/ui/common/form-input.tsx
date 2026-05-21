import { FieldValues, Path, UseFormReturn, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';

export default function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = 'text',
  icon,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name} className="text-slate-700 dark:text-slate-300 font-medium text-sm">
            {label}
          </FieldLabel>
          <div className="relative flex items-center w-full">
            {icon && (
              <span className="absolute left-3.5 text-muted-foreground/75 pointer-events-none z-10">
                {icon}
              </span>
            )}
            {type === 'textarea' ? (
              <textarea
                {...field}
                id={field.name}
                placeholder={placeholder}
                autoComplete="off"
                className={`flex min-h-[80px] w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all ${
                  icon ? 'pl-11' : ''
                }`}
              />
            ) : (
              <Input
                {...field}
                id={field.name}
                type={type}
                placeholder={placeholder}
                autoComplete="off"
                className={`h-12 w-full rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 placeholder:text-muted-foreground/60 transition-all text-base md:text-sm ${
                  icon ? 'pl-11' : ''
                }`}
              />
            )}
          </div>
          {fieldState.invalid && (
            <FieldError className="mt-1">{fieldState.error?.message}</FieldError>
          )}
        </Field>
      )}
    />
  );
}