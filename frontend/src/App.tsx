
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import NotFound from "./pages/NotFound";
import HomeBeta from "./pages/HomeBeta";
import SearchResults from "./pages/SearchResults";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import ThankYouPage from "./pages/ThankYou";
import FlightsAdmin from "./pages/Admin/FlightsAdmin";
import AddEditFlight from "./pages/Admin/AddEditFlight";
import BookingsList from "./pages/Admin/BookingsList";
import PersonsList from "./pages/Admin/PersonsList";
import EditPerson from "./pages/Admin/EditPerson";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<HomeBeta />} />
            <Route path="/search/:from/:to/:date" element={<SearchResults />} />
            
            <Route path="/bookingPage/:flightId" element={<BookingPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/thankyou" element={<ThankYouPage />} />
            <Route path="/flights/:origin/:destination" element={<Flights />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/flights" element={<FlightsAdmin />} />
<Route path="/admin/flights/new" element={<AddEditFlight />} />
<Route path="/admin/flights/edit/:pnr" element={<AddEditFlight />} />
<Route path="/admin/bookings" element={<BookingsList />} />

<Route path="/admin/persons" element={<PersonsList />} />
<Route path="/admin/passengers/edit/:id" element={<EditPerson />} />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
