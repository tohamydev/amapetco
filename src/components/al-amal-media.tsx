import { FileText, ExternalLink, Download, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import video from "@/assets/al-amal-media.mp4.asset.json";
import guide from "@/assets/safety-a-to-z.pdf.asset.json";
import videoCover from "@/assets/amal-video-cover.jpg.asset.json";
import guideCover from "@/assets/safety-cover.jpg.asset.json";
import reportingVideo from "@/assets/reporting-safety.mp4.asset.json";
import reportingCover from "@/assets/reporting-safety-cover.jpg.asset.json";
import incidentVideo from "@/assets/incident-awareness.mp4.asset.json";
import incidentCover from "@/assets/incident-awareness-cover.jpg.asset.json";
import coolingVideo from "@/assets/air-conditioner-safety.mp4.asset.json";
import coolingCover from "@/assets/air-conditioner-safety-cover.jpg.asset.json";
import androidImage from "@/assets/android-security.jpeg.asset.json";
import newsImage from "@/assets/al-amal-news.jpeg.asset.json";
import pressureImage from "@/assets/reporting-pressure.jpeg.asset.json";
import heightImage from "@/assets/reporting-height.jpeg.asset.json";
import hazardsImage from "@/assets/reporting-hazards.jpeg.asset.json";

const companyVideos = [
  { asset: video, cover: videoCover, title: "سلامة العمليات" },
  { asset: reportingVideo, cover: reportingCover, title: "الإبلاغ عن المخاطر" },
  { asset: incidentVideo, cover: incidentCover, title: "التوعية بالحوادث والإصابات" },
  { asset: coolingVideo, cover: coolingCover, title: "السلامة عند استخدام المكيفات" },
];

const companyImages = [
  { asset: hazardsImage, title: "بلاغك يفرق — الإبلاغ عن المخاطر" },
  { asset: heightImage, title: "بلاغك يفرق — العمل على الارتفاعات" },
  { asset: pressureImage, title: "بلاغك يفرق — مراقبة الضغط" },
  { asset: androidImage, title: "حماية التطبيقات المالية على أندرويد" },
  { asset: newsImage, title: "الأمل للبترول في الأخبار" },
];

export function AlAmalMedia() {
  return (
    <section aria-labelledby="media-title">
      <div className="mb-6 flex items-center gap-3">
        <Pin className="h-5 w-5 text-primary" />
        <h2 id="media-title" className="text-2xl font-extrabold" dir="ltr">Al Amal Media</h2>
      </div>
      <div className="grid items-start gap-8 md:grid-cols-2">
        {companyVideos.map((item) => (
        <article key={item.asset.asset_id} className="overflow-hidden rounded-lg border bg-card">
          <video controls playsInline preload="metadata" poster={item.cover.url} className="h-[480px] max-h-[65vh] w-full bg-ink object-contain" aria-label={`فيديو ${item.title}`}>
            <source src={item.asset.url} type="video/mp4" />
            <a href={item.asset.url}>مشاهدة الفيديو</a>
          </video>
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div><p className="text-xs font-semibold text-muted-foreground">فيديو · عربي</p><h3 className="mt-1 text-xl font-bold">{item.title}</h3></div>
            <Button asChild variant="outline" size="sm"><a href={item.asset.url} download={item.asset.original_filename}><Download />تحميل</a></Button>
          </div>
        </article>
        ))}
        <article className="overflow-hidden rounded-lg border bg-card">
          <a href={guide.url} target="_blank" rel="noopener noreferrer" aria-label="فتح دليل A–Z of Safety">
            <img src={guideCover.url} alt="غلاف دليل A–Z of Safety" className="aspect-square max-h-[480px] w-full object-contain bg-muted" />
          </a>
          <div className="p-5">
            <p className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"><FileText className="h-4 w-4" />PDF · 27 صفحة · English</p>
            <h3 className="mt-1 text-xl font-bold" dir="ltr">A–Z of Safety</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild><a href={guide.url} target="_blank" rel="noopener noreferrer"><ExternalLink />فتح الدليل</a></Button>
              <Button asChild variant="outline"><a href={guide.url} download="HSE_from_A_to_Z.pdf"><Download />تحميل</a></Button>
            </div>
          </div>
        </article>
      </div>
      <h3 className="mb-6 mt-10 text-2xl font-extrabold">الصور والتوعية</h3>
      <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {companyImages.map((item) => (
          <article key={item.asset.asset_id} className="overflow-hidden rounded-lg border bg-card">
            <a href={item.asset.url} target="_blank" rel="noopener noreferrer" aria-label={`فتح ${item.title}`}>
              <img src={item.asset.url} alt={item.title} loading="lazy" className="aspect-[3/4] w-full bg-muted object-contain" />
            </a>
            <div className="p-4">
              <h4 className="text-lg font-bold">{item.title}</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm"><a href={item.asset.url} target="_blank" rel="noopener noreferrer"><ExternalLink />عرض الصورة</a></Button>
                <Button asChild variant="outline" size="sm"><a href={item.asset.url} download={item.asset.original_filename}><Download />تحميل</a></Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}