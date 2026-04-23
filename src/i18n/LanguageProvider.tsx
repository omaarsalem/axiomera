import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type Lang } from "@/i18n";

const LANG_RE = /^\/(ar|en)(?=\/|$)/;

const detectLangFromPath = (pathname: string): Lang => {
  const m = pathname.match(LANG_RE);
  if (m && (SUPPORTED_LANGS as readonly string[]).includes(m[1])) return m[1] as Lang;
  return "en";
};

/**
 * Reads locale from the URL prefix, syncs i18next + <html lang/dir>.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const lang = detectLangFromPath(location.pathname);

  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang, i18n]);

  return <>{children}</>;
};

export const useLang = (): Lang => {
  const location = useLocation();
  return detectLangFromPath(location.pathname);
};

/** Build a path with the current locale prefix. "/services" -> "/ar/services". */
export const useLocalePath = () => {
  const lang = useLang();
  return (path: string) => {
    if (lang === "en") return path;
    if (path === "/") return `/${lang}`;
    return `/${lang}${path.startsWith("/") ? path : `/${path}`}`;
  };
};

/** Switch language while preserving the rest of the URL. */
export const useSwitchLang = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const current = useLang();
  return (target: Lang) => {
    if (target === current) return;
    const stripped = location.pathname.replace(LANG_RE, "") || "/";
    const next = target === "en" ? stripped : `/${target}${stripped === "/" ? "" : stripped}`;
    navigate(next + location.search + location.hash);
  };
};
