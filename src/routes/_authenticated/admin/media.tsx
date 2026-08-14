import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload, Trash2, Copy, Check, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { logActivity } from "@/lib/activity-log";

export const Route = createFileRoute("/_authenticated/admin/media")({
  component: AdminMediaLibrary,
});

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif", "image/svg+xml"];
const MAX_SIZE_MB = 5;

function AdminMediaLibrary() {
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const { data: files = [], isLoading } = useQuery({
    queryKey: ["admin-media-files"],
    queryFn: async () => {
      const { data, error } = await supabase.storage.from("media").list("", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });
      if (error) throw error;
      return data ?? [];
    },
  });

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error(`Invalid file type (${file.type}). Please upload a JPEG, PNG, WebP, GIF, or SVG image.`);
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`File size exceeds ${MAX_SIZE_MB}MB limit (${(file.size / 1024 / 1024).toFixed(1)}MB).`);
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${ext}`;

      const { error } = await supabase.storage.from("media").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(path);
      toast.success("Image uploaded successfully!");
      await logActivity({
        action: "media.uploaded",
        entity_type: "media",
        entity_id: path,
        details: { filename: file.name, url: publicUrlData.publicUrl, size: file.size },
      });

      void qc.invalidateQueries({ queryKey: ["admin-media-files"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to upload image.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  const removeFile = useMutation({
    mutationFn: async (name: string) => {
      const { error } = await supabase.storage.from("media").remove([name]);
      if (error) throw error;
      await logActivity({
        action: "media.deleted",
        entity_type: "media",
        entity_id: name,
      });
    },
    onSuccess: () => {
      toast.success("Image deleted.");
      setDeleteTarget(null);
      void qc.invalidateQueries({ queryKey: ["admin-media-files"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  function copyToClipboard(url: string) {
    void navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success("Image URL copied to clipboard!");
    setTimeout(() => setCopiedUrl(null), 2500);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">Media Library</h1>
          <p className="text-sm text-muted-foreground">
            Upload and manage assets for articles, banners and site graphics.
          </p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-full bg-crimson px-5 py-2.5 text-sm font-semibold text-crimson-foreground shadow-sm hover:opacity-95">
          <Upload className="h-4 w-4" />
          <span>{uploading ? "Uploading…" : "Upload Image"}</span>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 animate-shimmer rounded-2xl bg-muted" />
          ))}
        </div>
      ) : files.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground/60" />
          <p className="mt-3 font-serif text-lg font-semibold">No media assets uploaded yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Upload images to use them across your articles and banners.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {files.map((f) => {
            const publicUrl = supabase.storage.from("media").getPublicUrl(f.name).data.publicUrl;
            return (
              <div key={f.name} className="group overflow-hidden rounded-2xl border bg-card shadow-rest transition-all hover:shadow-lift">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={publicUrl}
                    alt={f.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2">
                    <button
                      onClick={() => copyToClipboard(publicUrl)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white text-foreground shadow hover:bg-slate-100"
                      title="Copy Public URL"
                    >
                      {copiedUrl === publicUrl ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => setDeleteTarget(f.name)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-crimson text-white shadow hover:bg-crimson/90"
                      title="Delete Image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3.5">
                  <p className="truncate text-xs font-semibold text-foreground/90">{f.name}</p>
                  <p className="meta mt-1 text-muted-foreground">
                    {f.metadata?.size ? `${(f.metadata.size / 1024).toFixed(0)} KB` : "Image"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Image"
        description={`Are you sure you want to permanently delete "${deleteTarget}" from media storage? This action cannot be undone.`}
        confirmText="Delete Image"
        onConfirm={() => deleteTarget && removeFile.mutate(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        busy={removeFile.isPending}
      />
    </div>
  );
}
