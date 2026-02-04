'use client';

export default function OfflinePage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <i className="ri-wifi-off-line text-6xl text-primary"></i>
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-4">
                    Anda Sedang Offline
                </h1>
                <p className="text-foreground-muted mb-6">
                    Sepertinya Anda tidak terhubung ke internet. Jangan khawatir, surah yang
                    sudah pernah Anda baca sebelumnya masih tersedia secara offline.
                </p>
                <div className="space-y-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="btn btn-primary w-full"
                    >
                        <i className="ri-refresh-line"></i>
                        Coba Lagi
                    </button>
                    <a
                        href="/"
                        className="btn btn-secondary w-full inline-flex items-center justify-center"
                    >
                        <i className="ri-home-line"></i>
                        Ke Beranda
                    </a>
                </div>
                <p className="text-xs text-foreground-muted mt-8">
                    💡 Tips: Buka surah saat online agar tersimpan untuk dibaca offline
                </p>
            </div>
        </div>
    );
}
