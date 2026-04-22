import Icon from "@/components/ui/icon";

type Section = "home" | "agreement" | "signature";

const LAWS = [
  { code: "149-ФЗ", title: "Об информации, информационных технологиях и о защите информации" },
  { code: "152-ФЗ", title: "О персональных данных" },
  { code: "63-ФЗ", title: "Об электронной подписи" },
  { code: "ГК РФ ст. 438", title: "Акцепт оферты" },
  { code: "ГК РФ ст. 428", title: "Договор присоединения" },
];

const AGREEMENT_SECTIONS = [
  {
    num: "1",
    title: "Предмет соглашения",
    text: "Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между Компанией и физическим лицом (далее — «Пользователь»), использующим услуги Компании. Соглашение является публичной офертой в соответствии со ст. 437 Гражданского кодекса Российской Федерации.",
  },
  {
    num: "2",
    title: "Персональные данные",
    text: "Компания обрабатывает персональные данные Пользователя в соответствии с Федеральным законом № 152-ФЗ «О персональных данных». Пользователь даёт согласие на обработку персональных данных, указанных при регистрации, в целях исполнения настоящего Соглашения.",
  },
  {
    num: "3",
    title: "Электронная подпись",
    text: "Принятие условий настоящего Соглашения путём проставления электронной подписи (простой электронной подписи) признаётся равнозначным собственноручной подписи в соответствии с Федеральным законом № 63-ФЗ «Об электронной подписи».",
  },
  {
    num: "4",
    title: "Права и обязанности сторон",
    text: "Пользователь вправе получать услуги Компании в полном объёме, предусмотренном настоящим Соглашением. Компания вправе изменять условия Соглашения с уведомлением Пользователя не менее чем за 14 (четырнадцать) календарных дней.",
  },
  {
    num: "5",
    title: "Ответственность сторон",
    text: "Стороны несут ответственность за неисполнение или ненадлежащее исполнение обязательств в соответствии с законодательством Российской Федерации. Компания не несёт ответственности за действия третьих лиц, повлёкших нарушение прав Пользователя.",
  },
  {
    num: "6",
    title: "Заключительные положения",
    text: "Настоящее Соглашение вступает в силу с момента его акцепта Пользователем. К отношениям Сторон применяется законодательство Российской Федерации. Споры разрешаются в судебном порядке по месту нахождения Компании.",
  },
];

interface AgreementSectionProps {
  navigate: (s: Section) => void;
  dateStr: string;
}

export default function AgreementSection({ navigate, dateStr }: AgreementSectionProps) {
  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => navigate("home")} className="text-xs text-[#6B6B68] hover:text-[#1A1A18] transition-colors tracking-wide">
          Главная
        </button>
        <Icon name="ChevronRight" size={12} className="text-[#C8C8C4]" />
        <span className="text-xs tracking-wide">Соглашение</span>
      </div>

      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-px bg-[#1A1A18]" />
          <span className="text-xs tracking-[0.2em] uppercase text-[#6B6B68]">Документ</span>
        </div>
        <h1 className="font-cormorant text-5xl font-semibold mb-2 tracking-tight">Пользовательское соглашение</h1>
        <p className="text-sm text-[#6B6B68] mb-12">Редакция от {dateStr} · Вступает в силу с момента акцепта</p>

        <div className="flex flex-wrap gap-2 mb-12">
          {LAWS.map((l) => (
            <span
              key={l.code}
              className="text-xs border border-[#E8E8E4] text-[#6B6B68] px-3 py-1 hover:border-[#1A1A18] hover:text-[#1A1A18] transition-colors cursor-default"
            >
              {l.code}
            </span>
          ))}
        </div>

        <div className="space-y-0 border-t border-[#E8E8E4]">
          {AGREEMENT_SECTIONS.map((s) => (
            <div key={s.num} className="py-8 border-b border-[#E8E8E4]">
              <div className="flex items-start gap-6">
                <span className="font-cormorant text-3xl text-[#C8C8C4] font-semibold w-8 shrink-0 mt-1">{s.num}</span>
                <div>
                  <h3 className="font-medium mb-3 text-base">{s.title}</h3>
                  <p className="text-[#4A4A47] text-sm leading-[1.8]">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex gap-4">
          <button
            onClick={() => navigate("signature")}
            className="flex items-center gap-2 bg-[#1A1A18] text-[#FAFAF8] px-6 py-3 hover:bg-[#333330] transition-colors text-sm"
          >
            <Icon name="PenLine" size={16} />
            Перейти к подписанию
          </button>

        </div>
      </div>
    </div>
  );
}