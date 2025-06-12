
import React from "react";
import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-airline-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Plane className="h-6 w-6" />
              <span className="text-xl font-bold">Travero</span>
            </Link>
            <p className="text-white/70 text-sm">
              A flight booking system designed and developed by Ahmed Alali and Mhd Habeeb.
              
            </p>
          </div>
        
  
        
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
          &copy; {new Date().getFullYear()} Travero. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
