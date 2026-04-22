import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/layout/SiteHeader";
import HomeSection from "@/components/sections/HomeSection";
import AgreementSection from "@/components/sections/AgreementSection";
import SignatureSection from "@/components/sections/SignatureSection";
import ContactsSection from "@/components/sections/ContactsSection";

type Section = "home" | "agreement" | "signature" | "contacts";

const LOGO_URL = "https://cdn.poehali.dev/projects/80a58ff0-ba56-4df0-a182-6eba4774b946/bucket/fafb2052-8765-455e-a4b3-3ccf609fb0be.png";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navigate = (s: Section) => {
    setActiveSection(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-golos text-[#1A1A18]">
      <SiteHeader
        activeSection={activeSection}
        scrolled={scrolled}
        navigate={navigate}
        logoUrl={LOGO_URL}
      />

      <main>
        {activeSection === "home" && (
          <HomeSection navigate={navigate} logoUrl={LOGO_URL} />
        )}
        {activeSection === "agreement" && (
          <AgreementSection navigate={navigate} dateStr={dateStr} />
        )}
        {activeSection === "signature" && (
          <SignatureSection navigate={navigate} dateStr={dateStr} timeStr={timeStr} />
        )}
        {activeSection === "contacts" && (
          <ContactsSection navigate={navigate} />
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
