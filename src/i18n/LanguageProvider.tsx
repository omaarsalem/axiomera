import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type Lang } from "@/i18n";

const isLang = (v: string | undefined): v is Lang =>
  !!v && (SUPPORTED_LANGS as readonly string[]).includes(v);

/**
 * Reads :lang from the URL, syncs i18next + <html lang/dir>, and exposes a
 * helper to switch language while preserving the rest of the path.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const next: Lang = isLang(lang) ? lang : "en";
    if (i18n.language !== next) i18n.changeLanguage(next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
  }, [lang, i18n, location.pathname]);

  return <>{children}</>;
};

export const useLang = () => {
  const { lang } = useParams<{ lang?: string }>();
  return isLang(lang) ? lang : "en";
};

/** Build a path with the current locale prefix (e.g. "/services" -> "/ar/services"). */
export const useLocalePath = () => {
  const lang = useLang();
  return (path: string) => {
    if (lang === "en") return path;
    if (path === "/") return `/${lang}`;
    return `/${lang}${path.startsWith("/") ? path : `/${path}`}`;
  };
};

/** Switch the active language while keeping the rest of the URL. */
export const useSwitchLang = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const current = useLang();
  return (target: Lang) => {
    if (target === current) return;
    const stripped = location.pathname.replace(/^\/(en|ar)(?=\/|$)/, "") || "/";
    const next = target === "en" ? stripped : `/${target}${stripped === "/" ? "" : stripped}`;
    navigate(next + location.search + location.hash);
  };
};
