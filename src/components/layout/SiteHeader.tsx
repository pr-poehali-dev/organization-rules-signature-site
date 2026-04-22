import Icon from "@/components/ui/icon";

type Section = "home" | "agreement" | "signature";

interface SiteHeaderProps {
  activeSection: Section;
  scrolled: boolean;
  navigate: (s: Section) => void;
  logoUrl: string;
}

export default function SiteHeader({ activeSection, scrolled, navigate, logoUrl }: SiteHeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#E8E8E4]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => navigate("home")} className="flex items-center gap-3 group">
          <img src={logoUrl} alt="Lost Signal Cinema Studio" className="h-8 w-auto" />
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {(
            [
              ["home", "Главная"],
              ["agreement", "Соглашение"],
              ["signature", "Подписание"],
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
  );
}