import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "@/components/layout/RootLayout";
import Index from "./pages/Index";
import Traveler from "./pages/Traveler";
import Consultant from "./pages/Consultant";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";
import Present from "./pages/Present";
import Album from "./pages/Album";
import Metrics from "./pages/Metrics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Index />} />
            <Route path="/traveler" element={<Traveler />} />
            <Route path="/consultant" element={<Consultant />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/album" element={<Album />} />
            <Route path="/metrics" element={<Metrics />} />
          </Route>
          <Route path="/present" element={<Present />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
