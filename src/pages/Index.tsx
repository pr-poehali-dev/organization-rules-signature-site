import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "agreement" | "signature" | "contacts";

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

const LOGO_URL = "https://cdn.poehali.dev/projects/80a58ff0-ba56-4df0-a182-6eba4774b946/bucket/fafb2052-8765-455e-a4b3-3ccf609fb0be.png";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", agreed1: false, agreed2: false, agreed3: false });
  const [signed, setSigned] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navigate = (s: Section) => {
    setActiveSection(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canSign =
    form.fullName.trim().length >= 3 &&
    form.email.includes("@") &&
    form.agreed1 &&
    form.agreed2 &&
    form.agreed3;

  const handleSign = () => {
    if (!canSign) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSigned(true);
    }, 1800);
  };

  const handleContact = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSent(true);
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-golos text-[#1A1A18]">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#E8E8E4]" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("home")} className="flex items-center gap-3 group">
            <img src={LOGO_URL} alt="Lost Signal Cinema Studio" className="h-8 w-auto" />
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {(
              [
                ["home", "Главная"],
                ["agreement", "Соглашение"],
                ["signature", "Подписание"],
                ["contacts", "Контакты"],
              ] as [Section, string][]
            ).map(([s, label]) => (
              <button
                key={s}
                onClick={() => navigate(s)}
                className={`text-sm tracking-wide transition-all duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:h-px after:bg-[#1A1A18] after:transition-all after:duration-200 ${
                  activeSection === s
                    ? "after:w-full font-medium"
                    : "after:w-0 hover:after:w-full text-[#6B6B68]"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => navigate("signature")}
            className="hidden md:flex items-center gap-2 bg-[#1A1A18] text-[#FAFAF8] text-sm px-4 py-2 hover:bg-[#333330] transition-colors"
          >
            <Icon name="PenLine" size={14} />
            Подписать
          </button>
        </div>
      </header>

      <main>
        {/* HOME */}
        {activeSection === "home" && (
          <div className="animate-fade-in">
            {/* Hero with background image */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${LOGO_URL})` }}
              />
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-[#0D0B14]/75" />

              {/* Content */}
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
                    { n: "01", icon: "FileText", title: "Читайте", desc: "Ознакомьтесь с полным текстом пользовательского соглашения" },
                    { n: "02", icon: "CheckSquare", title: "Соглашайтесь", desc: "Подтвердите принятие каждого раздела документа" },
                    { n: "03", icon: "ShieldCheck", title: "Подписывайте", desc: "Поставьте электронную подпись — юридически значимый акцепт оферты" },
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
        )}

        {/* AGREEMENT */}
        {activeSection === "agreement" && (
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
                <button
                  onClick={() => navigate("contacts")}
                  className="flex items-center gap-2 border border-[#E8E8E4] text-[#6B6B68] px-6 py-3 hover:border-[#1A1A18] hover:text-[#1A1A18] transition-colors text-sm"
                >
                  Задать вопрос
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SIGNATURE */}
        {activeSection === "signature" && (
          <div className="animate-fade-in max-w-6xl mx-auto px-6 py-16">
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => navigate("home")} className="text-xs text-[#6B6B68] hover:text-[#1A1A18] transition-colors tracking-wide">
                Главная
              </button>
              <Icon name="ChevronRight" size={12} className="text-[#C8C8C4]" />
              <span className="text-xs tracking-wide">Электронная подпись</span>
            </div>

            {!signed ? (
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#1A1A18]" />
                  <span className="text-xs tracking-[0.2em] uppercase text-[#6B6B68]">Подписание</span>
                </div>
                <h1 className="font-cormorant text-5xl font-semibold mb-2 tracking-tight">Электронная подпись</h1>
                <p className="text-sm text-[#6B6B68] mb-10">Заполните форму для акцепта оферты в соответствии с 63-ФЗ</p>

                <div className="space-y-6 mb-10">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-[#6B6B68] mb-2">Фамилия Имя Отчество *</label>
                    <input
                      type="text"
                      placeholder="Иванов Иван Иванович"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full border border-[#E8E8E4] bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors placeholder-[#C8C8C4]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-[#6B6B68] mb-2">Электронная почта *</label>
                    <input
                      type="email"
                      placeholder="ivan@example.ru"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-[#E8E8E4] bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors placeholder-[#C8C8C4]"
                    />
                  </div>
                </div>

                <div className="space-y-4 mb-10 border-t border-[#E8E8E4] pt-8">
                  <p className="text-xs tracking-[0.15em] uppercase text-[#6B6B68] mb-4">Подтверждения</p>
                  {[
                    { key: "agreed1", text: "Я прочитал(а) и принимаю условия Пользовательского соглашения компании в полном объёме" },
                    { key: "agreed2", text: "Я даю согласие на обработку моих персональных данных в соответствии с 152-ФЗ" },
                    { key: "agreed3", text: "Я понимаю, что проставление электронной подписи имеет юридическую силу согласно 63-ФЗ" },
                  ].map(({ key, text }) => (
                    <label key={key} className="flex items-start gap-4 cursor-pointer group">
                      <div
                        onClick={() => setForm({ ...form, [key]: !form[key as keyof typeof form] })}
                        className={`w-5 h-5 border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                          form[key as keyof typeof form]
                            ? "bg-[#1A1A18] border-[#1A1A18]"
                            : "border-[#C8C8C4] group-hover:border-[#1A1A18]"
                        }`}
                      >
                        {form[key as keyof typeof form] && <Icon name="Check" size={12} className="text-[#FAFAF8]" />}
                      </div>
                      <span className="text-sm text-[#4A4A47] leading-relaxed">{text}</span>
                    </label>
                  ))}
                </div>

                <div className="bg-[#F4F4F0] border border-[#E8E8E4] p-4 mb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="Info" size={14} className="text-[#6B6B68]" />
                    <span className="text-xs font-medium">Юридическое уведомление</span>
                  </div>
                  <p className="text-xs text-[#6B6B68] leading-relaxed">
                    Нажатие кнопки «Подписать» является акцептом оферты по смыслу ст. 438 ГК РФ и признаётся простой электронной подписью согласно ч. 2 ст. 5 Федерального закона № 63-ФЗ.
                  </p>
                </div>

                <button
                  onClick={handleSign}
                  disabled={!canSign || submitting}
                  className={`w-full flex items-center justify-center gap-3 py-4 text-sm font-medium transition-all ${
                    canSign
                      ? "bg-[#1A1A18] text-[#FAFAF8] hover:bg-[#333330]"
                      : "bg-[#E8E8E4] text-[#C8C8C4] cursor-not-allowed"
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border border-[#FAFAF8] border-t-transparent rounded-full animate-spin" />
                      Обрабатываем подпись...
                    </>
                  ) : (
                    <>
                      <Icon name="PenLine" size={16} />
                      Подписать соглашение
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="max-w-2xl animate-fade-in">
                <div className="border border-[#E8E8E4] p-12 text-center">
                  <div className="w-16 h-16 bg-[#1A1A18] flex items-center justify-center mx-auto mb-6">
                    <Icon name="CheckCheck" size={28} className="text-[#FAFAF8]" />
                  </div>
                  <h2 className="font-cormorant text-4xl font-semibold mb-3">Соглашение подписано</h2>
                  <p className="text-[#6B6B68] text-sm mb-8 leading-relaxed">
                    Электронная подпись принята. Уведомление направлено на {form.email}
                  </p>

                  <div className="border-t border-[#E8E8E4] pt-8 space-y-3 text-left">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B68]">Подписант</span>
                      <span className="font-medium">{form.fullName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B68]">Email</span>
                      <span>{form.email}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B68]">Дата</span>
                      <span>{dateStr}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B68]">Время</span>
                      <span>{timeStr} МСК</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B68]">Правовая основа</span>
                      <span>63-ФЗ, ГК РФ ст. 438</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate("home")}
                  className="mt-6 flex items-center gap-2 text-sm text-[#6B6B68] hover:text-[#1A1A18] transition-colors"
                >
                  <Icon name="ArrowLeft" size={14} />
                  Вернуться на главную
                </button>
              </div>
            )}
          </div>
        )}

        {/* CONTACTS */}
        {activeSection === "contacts" && (
          <div className="animate-fade-in max-w-6xl mx-auto px-6 py-16">
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => navigate("home")} className="text-xs text-[#6B6B68] hover:text-[#1A1A18] transition-colors tracking-wide">
                Главная
              </button>
              <Icon name="ChevronRight" size={12} className="text-[#C8C8C4]" />
              <span className="text-xs tracking-wide">Контакты</span>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[#1A1A18]" />
                  <span className="text-xs tracking-[0.2em] uppercase text-[#6B6B68]">Поддержка</span>
                </div>
                <h1 className="font-cormorant text-5xl font-semibold mb-4 tracking-tight">
                  Связаться<br />с нами
                </h1>
                <p className="text-sm text-[#6B6B68] leading-relaxed mb-10">
                  Если у вас есть вопросы по пользовательскому соглашению, электронной подписи или документам — напишите нам.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: "Mail" as const, label: "Электронная почта", value: "legal@company.ru" },
                    { icon: "Phone" as const, label: "Телефон поддержки", value: "+7 (800) 000-00-00" },
                    { icon: "MapPin" as const, label: "Юридический адрес", value: "г. Москва, ул. Примерная, д. 1" },
                    { icon: "Clock" as const, label: "Время работы", value: "Пн–Пт, 09:00–18:00 МСК" },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-9 h-9 border border-[#E8E8E4] flex items-center justify-center shrink-0">
                        <Icon name={icon} size={16} className="text-[#6B6B68]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#6B6B68] mb-0.5">{label}</p>
                        <p className="text-sm font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {!contactSent ? (
                  <div className="border border-[#E8E8E4] p-8">
                    <h2 className="font-cormorant text-2xl font-semibold mb-6">Написать сообщение</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs tracking-[0.15em] uppercase text-[#6B6B68] mb-2">Ваше имя</label>
                        <input
                          type="text"
                          placeholder="Иван Иванов"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full border border-[#E8E8E4] bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors placeholder-[#C8C8C4]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.15em] uppercase text-[#6B6B68] mb-2">Email</label>
                        <input
                          type="email"
                          placeholder="ivan@example.ru"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full border border-[#E8E8E4] bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors placeholder-[#C8C8C4]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.15em] uppercase text-[#6B6B68] mb-2">Сообщение</label>
                        <textarea
                          placeholder="Опишите ваш вопрос..."
                          rows={5}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full border border-[#E8E8E4] bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors placeholder-[#C8C8C4] resize-none"
                        />
                      </div>
                      <button
                        onClick={handleContact}
                        disabled={!contactForm.name || !contactForm.email || !contactForm.message}
                        className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                          contactForm.name && contactForm.email && contactForm.message
                            ? "bg-[#1A1A18] text-[#FAFAF8] hover:bg-[#333330]"
                            : "bg-[#E8E8E4] text-[#C8C8C4] cursor-not-allowed"
                        }`}
                      >
                        <Icon name="Send" size={14} />
                        Отправить сообщение
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border border-[#E8E8E4] p-8 text-center animate-fade-in">
                    <div className="w-12 h-12 bg-[#1A1A18] flex items-center justify-center mx-auto mb-4">
                      <Icon name="CheckCheck" size={20} className="text-[#FAFAF8]" />
                    </div>
                    <h3 className="font-cormorant text-2xl font-semibold mb-2">Сообщение отправлено</h3>
                    <p className="text-sm text-[#6B6B68]">Мы ответим на {contactForm.email} в течение рабочего дня</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8E8E4] mt-20">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <img src={LOGO_URL} alt="Lost Signal Cinema Studio" className="h-7 w-auto mb-2" />
            <p className="text-xs text-[#9A9A97]">© {now.getFullYear()} Компания. Все права защищены.</p>
          </div>
          <div className="flex gap-6 text-xs text-[#6B6B68]">
            <button onClick={() => navigate("agreement")} className="hover:text-[#1A1A18] transition-colors">Соглашение</button>
            <button onClick={() => navigate("signature")} className="hover:text-[#1A1A18] transition-colors">Подписание</button>
            <button onClick={() => navigate("contacts")} className="hover:text-[#1A1A18] transition-colors">Контакты</button>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#9A9A97]">
            <Icon name="ShieldCheck" size={13} />
            <span>Защищено 63-ФЗ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}