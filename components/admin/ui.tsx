import React, { useEffect, useRef, useState } from 'react';
import { X, Upload, Loader2, Trash2 } from 'lucide-react';
import { api } from '../../lib/market';

export const inputCls =
  'w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:border-ngo-orange focus:ring-2 focus:ring-orange-100 outline-none';

export const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({ label, hint, children }) => (
  <label className="block">
    <span className="block text-xs font-bold text-gray-700 mb-1">{label}</span>
    {children}
    {hint && <span className="block text-xs text-gray-400 mt-1">{hint}</span>}
  </label>
);

export const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label?: string; disabled?: boolean }> = ({
  checked, onChange, label, disabled,
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors disabled:opacity-50 ${checked ? 'bg-ngo-teal' : 'bg-gray-300'}`}
  >
    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
  </button>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger'; busy?: boolean }> = ({
  variant = 'primary', busy, className = '', children, disabled, ...rest
}) => {
  const styles = {
    primary: 'bg-ngo-maroon text-white hover:bg-red-900',
    secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50',
    danger: 'bg-white text-red-600 border border-red-200 hover:bg-red-50',
  }[variant];
  return (
    <button
      {...rest}
      disabled={disabled || busy}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 ${styles} ${className}`}
    >
      {busy && <Loader2 size={15} className="animate-spin" />}
      {children}
    </button>
  );
};

export const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode; footer?: React.ReactNode }> = ({
  title, onClose, children, footer,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center bg-black/40 p-0 sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl shadow-xl flex flex-col max-h-screen sm:max-h-[90vh]" role="dialog" aria-modal="true" aria-label={title}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700" aria-label="Close"><X size={20} /></button>
        </div>
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-gray-100 flex flex-wrap items-center gap-3">{footer}</div>}
      </div>
    </div>
  );
};

/** Resize in the browser (max 1000px, JPEG) so uploads stay small, then store via the API. */
async function uploadImage(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1000 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
  const { url } = await api<{ url: string }>('/cms/images', {
    method: 'POST',
    body: { content_type: 'image/jpeg', data_base64: dataUrl.split(',')[1] },
  });
  return url;
}

export const ImageInput: React.FC<{ value: string | null; onChange: (url: string | null) => void; round?: boolean }> = ({ value, onChange, round }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const pick = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      onChange(await uploadImage(file));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = '';
    }
  };
  return (
    <div className="flex items-center gap-4">
      <div className={`w-20 h-20 bg-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center ${round ? 'rounded-full' : 'rounded-xl'}`}>
        {busy ? <Loader2 className="animate-spin text-gray-400" /> : value ? <img src={value} alt="" className="w-full h-full object-cover" /> : <Upload className="text-gray-300" />}
      </div>
      <div className="flex flex-wrap gap-2">
        <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
        <Button type="button" variant="secondary" onClick={() => ref.current?.click()} busy={busy}>
          <Upload size={15} /> {value ? 'Replace photo' : 'Upload photo'}
        </Button>
        {value && (
          <Button type="button" variant="danger" onClick={() => onChange(null)}>
            <Trash2 size={15} /> Remove
          </Button>
        )}
        {error && <p className="w-full text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export const ErrorNote: React.FC<{ message: string }> = ({ message }) =>
  message ? <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{message}</p> : null;
