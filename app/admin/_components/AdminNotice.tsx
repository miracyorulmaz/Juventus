export default function AdminNotice({ saved, error }: { saved?: string; error?: string }) {
  if (error) {
    return <p role="alert" className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-200">{error}</p>;
  }
  if (saved) {
    return <p role="status" className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">Değişiklikler kaydedildi.</p>;
  }
  return null;
}
