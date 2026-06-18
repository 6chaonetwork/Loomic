import { BRAND_NAME } from "@/components/brand/constants";

export function LandingPrerenderFallback() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute -top-24 right-0 h-[38rem] w-[38rem] rounded-full bg-[oklch(0.90_0.17_115)] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[26rem] w-[26rem] rounded-full bg-[oklch(0.556_0_0)] blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <span className="rounded-full border border-border bg-muted/60 px-4 py-1.5 text-sm text-muted-foreground">
          AI Visual Creation Studio
        </span>
        <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
          让好画面，不可错过
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {BRAND_NAME} 正在加载完整交互体验。当前预渲染壳用于保证构建稳定，并为浏览器端动画页面提供可用首屏。
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/login"
            className="rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground"
          >
            开始创作
          </a>
          <a
            href="/pricing"
            className="rounded-full border border-border px-8 py-3 text-base font-medium text-foreground"
          >
            查看定价
          </a>
        </div>
      </section>
    </main>
  );
}
