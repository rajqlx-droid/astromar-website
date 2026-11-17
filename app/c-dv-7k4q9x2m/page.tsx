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
  "rounded-2xl border border-white/20 bg-[rgba(18,24,32,.38)] px-4 py-2 shadow-[0_0_28px_rgba(108,189,194,.16)] backdrop-blur";
const label = "text-[11px] uppercase tracking-[.2em] text-[#6CBDC2] pt-4 pb-1 font-semibold";
const btn =
  "flex min-h-[52px] items-center justify-center rounded-[14px] border border-white/20 bg-[rgba(18,24,32,.6)] px-5 text-[15px] font-semibold text-white";

export default function ProfilePage() {
  return (
    <main
      className="min-h-screen px-4 pb-10 pt-9 text-[#EAF1FF]"
      style={{
        background:
          "radial-gradient(75% 26% at 50% 9%,rgba(200,252,255,.95) 0%,rgba(170,245,250,.45) 45%,rgba(170,245,250,0) 100%),linear-gradient(180deg,#6CBDC2 0%,#6CBDC2 10%,#66AAB0 22%,#5E9097 30%,#56747D 38%,#4E5D67 46%,#4B525C 54%,#4B525C 100%)",
        backgroundColor: "#4B525C",
      }}
    >
      <div className="mx-auto flex max-w-[420px] flex-col gap-5">
        <section className="flex flex-col items-center gap-1.5 text-center">
          <div className="h-[132px] w-[132px] rounded-full bg-white/80 p-[3px] shadow-[0_0_0_7px_rgba(255,255,255,.14),0_0_48px_6px_rgba(170,248,252,.85)]">
            <Image
              src="/david.jpg"
              alt="David"
              width={126}
              height={126}
              priority
              className="h-full w-full rounded-full border-[3px] border-white object-cover object-[50%_30%]"
            />
          </div>
          <h1 className="mt-3.5 text-[32px] font-bold leading-tight text-[#0A2A44]">David</h1>
          <div className="text-xs font-semibold uppercase tracking-[.16em] text-[#08283B]">
            Astromar Logistics Pvt. Ltd
          </div>
          <p className="text-[13px] text-[#08283B]">Global logistics · International trade</p>
        </section>

        <section className="grid gap-2.5">
          <a
            href="/David-Astromar.vcf"
            download
            className="flex min-h-[52px] items-center justify-center rounded-[14px] bg-[#0E3550] px-5 text-[15px] font-semibold text-white shadow-[0_0_26px_rgba(160,245,250,.7)]"
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
            className="mb-3 inline-block text-sm font-semibold text-[#6CBDC2]"
          >
            Open in Google Maps →
          </a>
        </section>

        <section className={panel}>
          <h2 className={label}>Contact</h2>
          <div className="space-y-3 py-3">
            <div>
              <small className="block text-[11px] uppercase tracking-widest text-[#9FB3D1]">Phone</small>
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            </div>
            <div>
              <small className="block text-[11px] uppercase tracking-widest text-[#9FB3D1]">Email</small>
              <a href="mailto:david@astromarfreezone.com" className="block">david@astromarfreezone.com</a>
              <a href="mailto:sales@astromarfreezone.com" className="block">sales@astromarfreezone.com</a>
            </div>
          </div>
        </section>

        <section className={panel}>
          <h2 className={label}>Website</h2>
          <p className="py-3">www.astromarfreezone.com</p>
        </section>

        <a href="https://www.astromarfreezone.com" className={btn}>
          Visit Website →
        </a>
      </div>
    </main>
  );
}
