import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GrainOverlay from "./GrainOverlay";
import BackToTop from "./BackToTop";
import CookieConsent from "./CookieConsent";

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <GrainOverlay />
    <Navbar />
    <main className="pt-16">
      {children}
    </main>
    <Footer />
    <BackToTop />
    <CookieConsent />
  </>
);

export default Layout;
