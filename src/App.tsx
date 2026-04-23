import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Services from "./pages/Services.tsx";
import Fellowship from "./pages/Fellowship.tsx";
import Contact from "./pages/Contact.tsx";
import Hub from "./pages/Hub.tsx";
import HannaPath from "./pages/HannaPath.tsx";
import Paths from "./pages/Paths.tsx";
import LearningPath from "./pages/LearningPath.tsx";
import HubProfile from "./pages/HubProfile.tsx";
import HubAdmin from "./pages/HubAdmin.tsx";
import Work from "./pages/Work.tsx";
import About from "./pages/About.tsx";
import FAQ from "./pages/FAQ.tsx";
import Careers from "./pages/Careers.tsx";
import Insights from "./pages/Insights.tsx";
import InsightPost from "./pages/InsightPost.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import NotFound from "./pages/NotFound.tsx";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/fellowship" element={<Fellowship />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightPost />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/hub/paths" element={<Paths />} />
            <Route path="/hub/paths/:slug" element={<LearningPath />} />
            <Route path="/hub/hanna" element={<HannaPath />} />
            <Route path="/hub/profile" element={<HubProfile />} />
            <Route path="/hub/admin" element={<HubAdmin />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
