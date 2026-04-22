import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "agreement" | "signature" | "contacts";

interface SignatureSectionProps {
  navigate: (s: Section) => void;
  dateStr: string;
  timeStr: string;
}

export default function SignatureSection({ navigate, dateStr, timeStr }: SignatureSectionProps) {
  const [form, setForm] = useState({ fullName: "", discord: "", agreed1: false, agreed2: false, agreed3: false });
  const [signed, setSigned] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canSign =
    form.fullName.trim().length >= 2 &&
    form.discord.trim().length >= 2 &&
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

  return (
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
              <label className="block text-xs tracking-[0.15em] uppercase text-[#6B6B68] mb-2">Имя *</label>
              <input
                type="text"
                placeholder="Иван"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full border border-[#E8E8E4] bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors placeholder-[#C8C8C4]"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-[#6B6B68] mb-2">Ссылка на Discord *</label>
              <input
                type="text"
                placeholder="https://discord.com/users/..."
                value={form.discord}
                onChange={(e) => setForm({ ...form, discord: e.target.value })}
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
              Электронная подпись принята.
            </p>

            <div className="border-t border-[#E8E8E4] pt-8 space-y-3 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B6B68]">Подписант</span>
                <span className="font-medium">{form.fullName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B6B68]">Discord</span>
                <span>{form.discord}</span>
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
  );
}