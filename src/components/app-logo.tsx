import { Coffee } from 'lucide-react';

export default function DummyLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-8">
      <div className="bg-blue-500 text-white p-3 rounded-xl shadow-sm">
        <Coffee className="h-8 w-8" />
      </div>
      <span className="font-bold text-xl text-slate-800 dark:text-slate-100">Cafetaria</span>
    </div>
  );
}
