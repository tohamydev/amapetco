import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Search, X, ShieldCheck, Flame, HardHat, HeartPulse, Zap } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import hero from "@/assets/hero.jpg";
import { VIDEOS } from "@/lib/videos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "فيديوهات السلامة والصحة المهنية | الأمل للبترول" },
      { name: "description", content: "شاهد فيديوهات التوعية بالسلامة والصحة المهنية لشركة الأمل للبترول AMAPETCO." },
      { property: "og:title", content: "فيديوهات السلامة والصحة المهنية | الأمل للبترول" },
      { property: "og:description", content: "مكتبة فيديوهات التوعية بالسلامة لشركة الأمل للبترول." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const AR: Record<string, string> = {
  PPE: "معدات الوقاية", "Permit to Work": "تصريح العمل", H2S: "غاز H2S", "Confined Space": "الأماكن المغلقة",
  "Working at Height": "العمل على الارتفاعات", "Fire Safety": "مكافحة الحريق", "Hot Work": "الأعمال الساخنة",
  LOTO: "عزل الطاقة", "Process Safety": "سلامة العمليات", "Emergency Response": "الطوارئ والإسعافات",
  "Driving Safety": "سلامة القيادة", "Lifting Operations": "الرفع الآمن", "Environmental Spills": "التسربات البيئية",
};
const CATS = [
  { id: "all", label: "الكل", icon: ShieldCheck },
  ...Array.from(new Set(VIDEOS.map((v) => v.cat))).map((c) => ({
    id: c, label: AR[c] ?? c,
    icon: c === "Fire Safety" || c === "Hot Work" ? Flame : c === "Emergency Response" ? HeartPulse : c === "LOTO" ? Zap : HardHat,
  })),
];

function Index() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const list = VIDEOS.filter((v) => (cat === "all" || v.cat === cat) && (v.title + v.topic).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <img src={logo.url} alt="شعار الأمل للبترول" className="h-12 w-auto shrink-0" />
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-extrabold">الأمل للبترول</p>
              <p className="truncate text-xs text-muted-foreground">إدارة السلامة والصحة المهنية</p>
            </div>
          </div>
          <a href="#videos" className="shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">الفيديوهات</a>
        </div>
      </header>

      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="عمال في موقع حفر" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-40 text-ink-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-flame px-4 py-1 text-sm font-semibold text-flame-foreground">
            <ShieldCheck className="h-4 w-4" /> السلامة أولاً
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            مكتبة فيديوهات السلامة والصحة المهنية
          </h1>
          <p className="mt-4 max-w-xl text-lg opacity-85">تدريب وتوعية مستمرة لكل العاملين — لأن عودتك سالماً هي أولويتنا.</p>
        </div>
      </section>

      <main id="videos" className="mx-auto max-w-7xl px-5 py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-extrabold">الفيديوهات <span className="text-base font-semibold text-muted-foreground">({list.length})</span></h2>
          <div className="relative sm:w-80">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث عن فيديو..."
              className="w-full rounded-full border bg-card py-2.5 pl-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div className="mt-5 -mx-5 overflow-x-auto px-5 pb-2 [scrollbar-width:thin]">
          <div className="flex w-max gap-2">
            {CATS.map((c) => {
              const n = c.id === "all" ? VIDEOS.length : VIDEOS.filter((v) => v.cat === c.id).length;
              const on = cat === c.id;
              return (
                <button key={c.id} onClick={() => setCat(c.id)}
                  className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border py-1.5 pl-1.5 pr-3.5 text-sm font-semibold transition ${on ? "border-primary bg-primary text-primary-foreground shadow-card" : "bg-card hover:border-primary/40 hover:bg-secondary"}`}>
                  <c.icon className="h-4 w-4 shrink-0" />
                  {c.label}
                  <span className={`grid min-w-6 place-items-center rounded-full px-1.5 text-xs ${on ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"}`}>{n}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => (
            <button key={v.id} onClick={() => setOpen(v.id)} className="group overflow-hidden rounded-2xl border bg-card text-right transition hover:-translate-y-1 hover:shadow-card">
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 grid place-items-center bg-ink/30 opacity-0 transition group-hover:opacity-100">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-flame text-flame-foreground"><Play className="h-6 w-6 fill-current" /></span>
                </div>
                <span className="absolute bottom-2 left-2 rounded-md bg-ink/80 px-2 py-0.5 text-xs text-ink-foreground">{v.lang === "Arabic" ? "عربي" : "English"}</span>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-accent-foreground">{CATS.find((c) => c.id === v.cat)?.label}</p>
                <h3 className="mt-1 text-lg font-bold">{v.title}</h3>
              </div>
            </button>
          ))}
          {list.length === 0 && <p className="col-span-full py-16 text-center text-muted-foreground">لا توجد نتائج.</p>}
        </div>
      </main>

      <footer className="bg-ink py-8 text-center text-sm text-ink-foreground/80">
        © {new Date().getFullYear()} شركة الأمل للبترول AMAPETCO — إدارة الاتصالات وتكنولوجيا المعلومات
      </footer>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/85 p-4" onClick={() => setOpen(null)}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} className="absolute -top-12 left-0 rounded-full bg-card p-2" aria-label="إغلاق"><X className="h-5 w-5" /></button>
            <div className="aspect-video overflow-hidden rounded-2xl bg-ink">
              <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${open}?autoplay=1`} title="video" allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
