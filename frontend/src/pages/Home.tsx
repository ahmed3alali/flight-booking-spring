
import React from "react";
import FlightSearchForm from "@/components/FlightSearchForm";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-20 md:py-32"
        style={{ 
          backgroundImage: "linear-gradient(rgba(10, 36, 99, 0.7), rgba(10, 36, 99, 0.5)), url('https://images.unsplash.com/photo-1536318733116-8898043a63e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" 
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
              Find Your Perfect Flight
            </h1>
            <p className="text-xl text-white opacity-90 max-w-2xl mx-auto animate-fly-in">
             A flight booking system developed and designed by Ahmed Alali and Mhd Habeeb 
            </p>
          </div>
          
          <FlightSearchForm />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-airline-blue">
            Why Book with Travero?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-airline-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-airline-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Best Price Guarantee</h3>
              <p className="text-gray-500">Find the best deals across hundreds of airlines.</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-airline-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-airline-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Booking</h3>
              <p className="text-gray-500">Your personal and payment details are protected.</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-airline-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-airline-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-500">Get assistance anytime, anywhere with our team.</p>
            </div>
          </div>
        </div>
      </div>

  
    </div>
  );
};

export default Home;
