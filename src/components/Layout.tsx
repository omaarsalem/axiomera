import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GrainOverlay from "./GrainOverlay";

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <GrainOverlay />
    <Navbar />
    <main className="pt-16">
      {children}
    </main>
    <Footer />
  </>
);

export default Layout;
