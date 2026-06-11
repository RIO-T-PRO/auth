const AuthVisual = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-surface-container-low flex items-center justify-center">
      {/* ambient glow */}
      <div className="absolute h-150 w-150 rounded-full bg-primary/10 blur-3xl" />
      {/* floating card mock */}
      <div className="relative z-10 w-[80%] max-w-md space-y-4 rounded-2xl border border-outline-variant bg-surface p-6 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.08)]">
        <div className="h-4 w-24 rounded-full bg-surface-container-highest" />
        <div className="h-8 w-full rounded-md bg-surface-container-high" />
        <div className="h-8 w-3/4 rounded-md bg-surface-container" />
        <div className="h-32 w-full rounded-lg bg-surface-container-low" />

        <div className="flex gap-3">
          <div className="h-10 flex-1 rounded-md bg-surface-container" />
          <div className="h-10 flex-1 rounded-md bg-surface-container-high" />
        </div>
      </div>
      0{/* subtle brand mark */}
      <div className="absolute bottom-10 text-sm text-on-surface-variant">
        Aura SaaS • Secure Workspace
      </div>
    </div>
  );
};

export default AuthVisual;
