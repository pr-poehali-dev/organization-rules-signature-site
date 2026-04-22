import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "agreement" | "signature" | "contacts";

interface ContactsSectionProps {
  navigate: (s: Section) => void;
}

export default function ContactsSection({ navigate }: ContactsSectionProps) {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const handleContact = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSent(true);
  };

  return (
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
  );
}
