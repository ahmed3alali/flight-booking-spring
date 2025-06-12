
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane, UserCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Plane className="h-6 w-6 text-airline-blue" />
          <span className="text-xl font-bold text-airline-blue">Travero</span>
        </Link>
        
        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Open menu</span>
                <UserCircle className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/flights">Find Flights</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/manage-booking">Manage My Booking</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/login">Sign In</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-airline-blue transition">
              Find Flights
            </Link>
            <Link to="/manage-booking" className="text-gray-600 hover:text-airline-blue transition">
              Manage My Booking
            </Link>
            <Button asChild variant="outline" className="ml-2">
              <Link to="/login">Sign In</Link>
            </Button>
         
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
