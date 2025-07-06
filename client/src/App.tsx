import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Products from "@/pages/products";
import Blogs from "@/pages/blogs";
import ForVets from "@/pages/for-vets";
import C09GPSTracker from "@/pages/shop/c09-gps-tracker";
import VetRegistration from "@/pages/vet-registration";
import PetParentRegistration from "@/pages/pet-parent-registration";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/products" component={Products} />
      <Route path="/blogs" component={Blogs} />
      <Route path="/forvets" component={ForVets} />
      <Route path="/vet-registration" component={VetRegistration} />
      <Route path="/pet-parent-registration" component={PetParentRegistration} />
      <Route path="/shop/c09-gps-tracker" component={C09GPSTracker} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
