import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "David | Astromar Logistics",
  robots: { index: false, follow: false },
};

const PHONE_DISPLAY = "+91 99402 11014";
const PHONE_TEL = "+919940211014";
const ADDRESS =
  "NO.922, 1st Floor, H Block, 17th Main Road, Anna Nagar, Chennai - 600 040, Tamil Nadu, India";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=NO.922%2C+H+Block%2C+17th+Main+Road%2C+Anna+Nagar%2C+Chennai+600040";

const panel =
  "rounded-[18px] border border-white/25 bg-white/10 px-4 py-2";
const label = "text-[11px] uppercase tracking-[.2em] text-[#7DB4F5] pt-4 pb-1 font-semibold";
const btn =
  "flex min-h-[52px] items-center justify-center rounded-[14px] border border-white/40 bg-white/10 px-5 text-[15px] font-semibold text-white";

export default function ProfilePage() {
  return (
    <main
      className="min-h-screen px-4 pb-10 pt-9 text-white"
      style={{
        background: "linear-gradient(180deg,#1F4C96 0%,#142F63 45%,#08122A 100%)",
        backgroundColor: "#08122A",
      }}
    >
      <div className="mx-auto flex max-w-[420px] flex-col gap-5">
        <section className="flex flex-col items-center gap-1.5 text-center">
          <div className="h-[132px] w-[132px] rounded-full">
            <Image
              src="/david.jpg"
              alt="David"
              width={126}
              height={126}
              priority
              className="h-full w-full rounded-full border-[3px] border-white object-cover object-[50%_30%]"
            />
          </div>
          <h1 className="mt-3.5 text-[32px] font-bold leading-tight text-white">David</h1>
          <div className="text-xs font-semibold uppercase tracking-[.16em] text-white/90">
            Astromar Logistics Pvt. Ltd
          </div>
          <p className="text-[13px] text-white/90">Global logistics · International trade</p>
        </section>

        <section className="grid gap-2.5">
          <a
            href="/David-Astromar.vcf"
            download
            className="flex min-h-[52px] items-center justify-center rounded-[14px] bg-white px-5 text-[15px] font-bold text-[#08122A]"
          >
            Save to Contacts
          </a>
          <a href="/Astromar-Company-Profile.pdf" target="_blank" rel="noopener" className={btn}>
            Company Profile (PDF)
          </a>
        </section>

        <section className={panel}>
          <h2 className={label}>Address</h2>
          <p className="py-3">{ADDRESS}</p>
          <a
            href={MAPS}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 inline-block text-sm font-semibold text-[#7DB4F5]"
          >
            Open in Google Maps →
          </a>
        </section>

        <section className={panel}>
          <h2 className={label}>Contact</h2>
          <div className="space-y-3 py-3">
            <div>
              <small className="block text-[11px] uppercase tracking-widest text-white/70">Phone</small>
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            </div>
            <div>
              <small className="block text-[11px] uppercase tracking-widest text-white/70">Email</small>
              <a href="mailto:david@astromarfreezone.com" className="block">david@astromarfreezone.com</a>
              <a href="mailto:sales@astromarfreezone.com" className="block">sales@astromarfreezone.com</a>
            </div>
          </div>
        </section>

        <section className={panel}>
          <h2 className={label}>Website</h2>
          <div className="flex items-center justify-between gap-3 py-3">
            <span className="min-w-0 break-words">www.astromarfreezone.com</span>
            <a
              href="https://www.astromarfreezone.com"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 font-semibold text-[#7DB4F5]"
            >
              Visit →
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
