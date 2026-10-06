import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Play, Search, X, ShieldCheck, Check, Lock, Star, Trophy, Map, LayoutGrid, Flame, HardHat, HeartPulse, Zap } from "lucide-react";
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

const KEY = "amapetco-progress";
type Progress = { done: string[]; xp: number; streak: number; last: string };
const EMPTY: Progress = { done: [], xp: 0, streak: 0, last: "" };
const UNITS = CATS.filter((c) => c.id !== "all").map((c) => ({ ...c, items: VIDEOS.filter((v) => v.cat === c.id) }));
const ORDER = UNITS.flatMap((u) => u.items.map((v) => v.id));
const OFFSETS = [0, 48, 72, 48, 0, -48, -72, -48];

function Index() {
  const [tab, setTab] = useState<"path" | "lib">("path");
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [p, setP] = useState<Progress>(EMPTY);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) setP(JSON.parse(s)); } catch {}
  }, []);

  const save = (n: Progress) => { setP(n); localStorage.setItem(KEY, JSON.stringify(n)); };
  const complete = (id: string) => {
    if (p.done.includes(id)) return setOpen(null);
    const today = new Date().toDateString();
    const y = new Date(Date.now() - 864e5).toDateString();
    const streak = p.last === today ? p.streak : p.last === y ? p.streak + 1 : 1;
    save({ done: [...p.done, id], xp: p.xp + 10, streak, last: today });
    setOpen(null); setToast(true); setTimeout(() => setToast(false), 2200);
  };

  const currentId = ORDER.find((id) => !p.done.includes(id));
  const pct = Math.round((p.done.length / ORDER.length) * 100);
  const list = VIDEOS.filter((v) => (cat === "all" || v.cat === cat) && (v.title + v.topic).toLowerCase().includes(q.toLowerCase()));
  const cur = VIDEOS.find((v) => v.id === open);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <img src={logo.url} alt="شعار الأمل للبترول" className="h-12 w-auto shrink-0" />
            <div className="hidden min-w-0 sm:block">
              <p className="truncate font-display text-lg font-extrabold">الأمل للبترول</p>
              <p className="truncate text-xs text-muted-foreground">مكتبة السلامة والصحة المهنية</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-sm font-bold">
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-accent-foreground"><Flame className="h-4 w-4" />{p.streak}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-secondary-foreground"><Star className="h-4 w-4" />{p.xp} XP</span>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="عمال في موقع حفر" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-28 text-ink-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-flame px-4 py-1 text-sm font-semibold text-flame-foreground">
            <ShieldCheck className="h-4 w-4" /> شركة الأمل للبترول · AMAPETCO
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">مكتبة الأمل للبترول للسلامة والصحة المهنية</h1>
          <p className="mt-3 max-w-xl text-lg opacity-85">في شركة الأمل للبترول، سلامة العاملين هي أساس كل إنجاز. برنامج تدريبي متكامل لرفع الوعي وحماية فريقنا في مواقع العمل.</p>
          <div className="mt-6 max-w-md">
            <div className="mb-2 flex justify-between text-sm font-semibold"><span>تقدمك</span><span>{p.done.length}/{ORDER.length} · {pct}%</span></div>
            <div className="h-3 overflow-hidden rounded-full bg-ink-foreground/20"><div className="h-full rounded-full bg-flame transition-all duration-700" style={{ width: `${pct}%` }} /></div>
          </div>
          {currentId && (
            <button onClick={() => setOpen(currentId)} className="mt-6 inline-flex items-center gap-2 rounded-2xl border-b-4 border-primary/60 bg-primary px-6 py-3 font-bold text-primary-foreground transition active:translate-y-0.5 active:border-b-2">
              <Play className="h-5 w-5 fill-current" /> {p.done.length ? "كمّل الدرس التالي" : "ابدأ أول درس"}
            </button>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <div className="mx-auto mb-8 flex w-fit gap-1 rounded-full border bg-card p-1">
          {([["path", "مسار التعلم", Map], ["lib", "المكتبة", LayoutGrid]] as const).map(([id, l, I]) => (
            <button key={id} onClick={() => setTab(id)} className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition ${tab === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <I className="h-4 w-4" />{l}
            </button>
          ))}
        </div>

        {tab === "path" ? (
          <div className="mx-auto max-w-xl space-y-10">
            {UNITS.map((u, ui) => {
              const doneN = u.items.filter((v) => p.done.includes(v.id)).length;
              return (
                <section key={u.id}>
                  <div className="flex items-center justify-between rounded-2xl border-b-4 border-primary/60 bg-primary p-4 text-primary-foreground">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold opacity-80">الوحدة {ui + 1}</p>
                      <h2 className="truncate text-xl font-extrabold">{u.label}</h2>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary-foreground/20 px-3 py-1 text-sm font-bold">{doneN}/{u.items.length}</span>
                  </div>
                  <div className="mt-6 flex flex-col items-center gap-5">
                    {u.items.map((v, i) => {
                      const done = p.done.includes(v.id);
                      const isCur = v.id === currentId;
                      const locked = !done && !isCur;
                      const off = OFFSETS[(ORDER.indexOf(v.id)) % OFFSETS.length];
                      return (
                        <div key={v.id} className="group relative flex flex-col items-center" style={{ transform: `translateX(${off}px)` }}>
                          {isCur && <span className="mb-2 animate-bounce rounded-xl border bg-card px-3 py-1 text-xs font-bold text-primary shadow-card">ابدأ هنا</span>}
                          <button disabled={locked} onClick={() => setOpen(v.id)} aria-label={v.title}
                            className={`grid h-20 w-20 place-items-center rounded-full border-b-[6px] transition active:translate-y-1 active:border-b-2 ${done ? "border-primary/60 bg-primary text-primary-foreground" : isCur ? "border-flame/60 bg-flame text-flame-foreground ring-8 ring-flame/20" : "cursor-not-allowed border-border bg-muted text-muted-foreground"}`}>
                            {done ? <Check className="h-9 w-9" strokeWidth={3} /> : locked ? <Lock className="h-7 w-7" /> : <Star className="h-9 w-9 fill-current" />}
                          </button>
                          <p className="mt-2 max-w-48 text-center text-xs font-semibold text-muted-foreground">{v.topic}</p>
                          {i === u.items.length - 1 && doneN === u.items.length && <Trophy className="mt-3 h-8 w-8 text-flame" />}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-extrabold">كل الفيديوهات <span className="text-base font-semibold text-muted-foreground">({list.length})</span></h2>
              <div className="relative sm:w-80">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث عن فيديو..." className="w-full rounded-full border bg-card py-2.5 pl-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div className="-mx-5 mt-5 overflow-x-auto px-5 pb-2">
              <div className="flex w-max gap-2">
                {CATS.map((c) => {
                  const on = cat === c.id;
                  return (
                    <button key={c.id} onClick={() => setCat(c.id)} className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${on ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"}`}>
                      <c.icon className="h-4 w-4" />{c.label}
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
                    {p.done.includes(v.id) && <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-5 w-5" /></span>}
                    <span className="absolute bottom-2 left-2 rounded-md bg-ink/80 px-2 py-0.5 text-xs text-ink-foreground">{v.lang === "Arabic" ? "عربي" : "English"}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-accent-foreground">{v.topic}</p>
                    <h3 className="mt-1 text-lg font-bold" dir="auto">{v.title}</h3>
                  </div>
                </button>
              ))}
              {list.length === 0 && <p className="col-span-full py-16 text-center text-muted-foreground">لا توجد نتائج.</p>}
            </div>
          </>
        )}
      </main>

      <footer className="bg-ink py-8 text-center text-sm text-ink-foreground/80">
        © {new Date().getFullYear()} شركة الأمل للبترول AMAPETCO — إدارة الاتصالات وتكنولوجيا المعلومات
      </footer>

      {cur && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/90 p-4" onClick={() => setOpen(null)}>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-3 text-ink-foreground">
              <div className="min-w-0"><p className="text-xs opacity-70">{cur.topic}</p><h3 className="truncate text-lg font-bold" dir="auto">{cur.title}</h3></div>
              <button onClick={() => setOpen(null)} className="shrink-0 rounded-full bg-card p-2 text-foreground" aria-label="إغلاق"><X className="h-5 w-5" /></button>
            </div>
            <div className="aspect-video overflow-hidden rounded-2xl bg-ink">
              <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${cur.id}?autoplay=1`} title={cur.title} allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
            </div>
            <button onClick={() => complete(cur.id)} className="mt-4 w-full rounded-2xl border-b-4 border-primary/60 bg-primary py-4 text-lg font-extrabold text-primary-foreground transition active:translate-y-0.5 active:border-b-2">
              {p.done.includes(cur.id) ? "تم إكمال الدرس ✓" : "أكملت الدرس  +10 XP"}
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 rounded-2xl bg-flame px-6 py-3 font-bold text-flame-foreground shadow-card">
          أحسنت! +10 XP 🎉
        </div>
      )}
    </div>
  );
}
