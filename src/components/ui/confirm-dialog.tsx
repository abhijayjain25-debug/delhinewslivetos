import { ReactNode } from "react";
import { AlertTriangle, X } from "lucide-react";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "destructive",
  onConfirm,
  onCancel,
  busy = false,
}: {
  open: boolean;
  title: string;
  description: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
  busy?: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-rise">
      <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-float">
        <div className="flex items-center justify-between pb-3 border-b">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-crimson/10 text-crimson">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-xl font-bold">{title}</h3>
          </div>
          <button onClick={onCancel} disabled={busy} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="py-4 text-sm text-muted-foreground leading-relaxed">
          {description}
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={`rounded-lg px-5 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-50 ${
              variant === "destructive" ? "bg-crimson hover:bg-crimson/90" : "bg-primary hover:bg-primary/90"
            }`}
          >
            {busy ? "Processing…" : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
