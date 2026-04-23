import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GrainOverlay from "./GrainOverlay";
import BackToTop from "./BackToTop";
import CookieConsent from "./CookieConsent";

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <a href="#main" className="skip-to-content">Skip to content</a>
    <GrainOverlay />
    <Navbar />
    <main id="main" className="pt-16" tabIndex={-1}>
      {children}
    </main>
    <Footer />
    <BackToTop />
    <CookieConsent />
  </>
);

export default Layout;
