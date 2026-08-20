import { TEAM_ROW_1, TEAM_ROW_2, type TeamMember } from "@/data/about/team";

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="relative h-[260px] w-[220px] shrink-0 overflow-hidden rounded-3xl sm:h-[300px] sm:w-[260px]">
      {/* eslint-disable-next-line @next/next/no-img-element -- декоративная фото-заглушка из Figma, не next/image-кандидат (бесконечная лента, десятки повторов) */}
      <img src="/images/about/team/photo-fill.png" alt="" className="absolute inset-0 size-full object-cover" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, transparent 49.9%, ${member.tint} 100%)` }}
      />
      <div className="absolute bottom-0 left-0 flex flex-col gap-2.5 p-5">
        <p className="font-sans text-base font-semibold text-white">{member.role}</p>
        <p className="font-body text-base text-white/80">{member.name}</p>
      </div>
    </div>
  );
}

function MarqueeRow({ members, direction }: { members: TeamMember[]; direction: "left" | "right" }) {
  const track = [...members, ...members];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-3 ${
          direction === "left" ? "animate-[marquee-left_36s_linear_infinite]" : "animate-[marquee-right_40s_linear_infinite]"
        } hover:[animation-play-state:paused]`}
      >
        {track.map((member, i) => (
          <MemberCard key={i} member={member} />
        ))}
      </div>
    </div>
  );
}

// Figma id=180:1047 (заголовок) + 569:2828 (сетка-заглушка). По ТЗ: 2 ряда фото,
// бесконечная автопрокрутка в противоположных направлениях, пауза при hover
// (референс: ykt.ru/about). В Figma сетка — одна и та же фото-заглушка, продублированная
// с чередованием тонов; тут та же заглушка зациклена в настоящую ленту.
export default function TeamMarquee() {
  return (
    <section className="flex flex-col gap-12 bg-white py-16 sm:py-[120px]">
      <div className="mx-auto w-full max-w-[1260px] px-6 sm:px-[90px]">
        <h2 className="font-sans text-3xl font-medium text-[#1E2F35] sm:text-5xl">
          Наша команда — <span className="text-brand-red">15+ экспертов</span>
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        <MarqueeRow members={TEAM_ROW_1} direction="left" />
        <MarqueeRow members={TEAM_ROW_2} direction="right" />
      </div>
    </section>
  );
}
