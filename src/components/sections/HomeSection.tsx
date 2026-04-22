import Icon from "@/components/ui/icon";

type Section = "home" | "agreement" | "signature" | "contacts";

const LAWS = [
  { code: "149-ФЗ", title: "Об информации, информационных технологиях и о защите информации" },
  { code: "152-ФЗ", title: "О персональных данных" },
  { code: "63-ФЗ", title: "Об электронной подписи" },
  { code: "ГК РФ ст. 438", title: "Акцепт оферты" },
  { code: "ГК РФ ст. 428", title: "Договор присоединения" },
];

interface HomeSectionProps {
  navigate: (s: Section) => void;
  logoUrl: string;
}

export default function HomeSection({ navigate, logoUrl }: HomeSectionProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero with background image */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${logoUrl})` }}
        />
        <div className="absolute inset-0 bg-[#0D0B14]/75" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-px bg-[#e879c0]" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#e879c0]">Правовой портал</span>
            </div>
            <h1 className="font-cormorant text-6xl md:text-8xl font-semibold leading-none mb-6 tracking-tight text-white">
              Согласие<br />
              <em className="not-italic text-[#c084d8]">с правилами</em>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-xl mb-12">
              Ознакомьтесь с пользовательским соглашением компании и подпишите его электронной подписью в соответствии с законодательством Российской Федерации.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("agreement")}
                className="flex items-center gap-2 bg-white text-[#1A1A18] px-6 py-3 hover:bg-white/90 transition-colors text-sm font-medium"
              >
                Читать соглашение
                <Icon name="ArrowRight" size={16} />
              </button>
              <button
                onClick={() => navigate("signature")}
                className="flex items-center gap-2 border border-white/40 text-white px-6 py-3 hover:bg-white/10 transition-colors text-sm"
              >
                <Icon name="PenLine" size={16} />
                Подписать сейчас
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-[#E8E8E4]" />
      </div>

      {/* Laws */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-px bg-[#1A1A18]" />
          <span className="text-xs tracking-[0.2em] uppercase text-[#6B6B68]">Правовая база</span>
        </div>
        <h2 className="font-cormorant text-4xl font-semibold mb-12">Законодательство РФ</h2>
        <div className="grid md:grid-cols-1 gap-0 border-t border-[#E8E8E4]">
          {LAWS.map((law, i) => (
            <div
              key={i}
              className="flex items-start gap-6 py-6 border-b border-[#E8E8E4] group hover:bg-[#F4F4F0] px-4 -mx-4 transition-colors"
            >
              <span className="font-cormorant text-2xl font-semibold text-[#C8C8C4] w-32 shrink-0 group-hover:text-[#6B6B68] transition-colors">
                {law.code}
              </span>
              <span className="text-[#4A4A47] text-sm leading-relaxed pt-1">{law.title}</span>
              <Icon name="ExternalLink" size={14} className="text-[#C8C8C4] ml-auto shrink-0 mt-1 group-hover:text-[#6B6B68] transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="bg-[#1A1A18] text-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-px bg-[#6B6B68]" />
            <span className="text-xs tracking-[0.2em] uppercase text-[#6B6B68]">Как это работает</span>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { n: "01", icon: "FileText" as const, title: "Читайте", desc: "Ознакомьтесь с полным текстом пользовательского соглашения" },
              { n: "02", icon: "CheckSquare" as const, title: "Соглашайтесь", desc: "Подтвердите принятие каждого раздела документа" },
              { n: "03", icon: "ShieldCheck" as const, title: "Подписывайте", desc: "Поставьте электронную подпись — юридически значимый акцепт оферты" },
            ].map((step) => (
              <div key={step.n}>
                <div className="text-[#6B6B68] font-cormorant text-5xl font-semibold mb-6">{step.n}</div>
                <Icon name={step.icon} size={24} className="text-[#FAFAF8] mb-4" />
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-[#9A9A97] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
