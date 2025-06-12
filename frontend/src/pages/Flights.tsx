
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Slider
} from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

// Mock flight data
const mockFlights = [
  {
    id: 1,
    airline: "Travero Airways",
    flightNumber: "SJ123",
    departureTime: "08:30",
    arrivalTime: "10:45",
    duration: "2h 15m",
    price: 199,
    stops: 0,
  },
  {
    id: 2,
    airline: "Oceanic Air",
    flightNumber: "OA456",
    departureTime: "12:15",
    arrivalTime: "15:00",
    duration: "2h 45m",
    price: 179,
    stops: 0,
  },
  {
    id: 3,
    airline: "Global Express",
    flightNumber: "GE789",
    departureTime: "14:20",
    arrivalTime: "18:15",
    duration: "3h 55m",
    price: 149,
    stops: 1,
  },
  {
    id: 4,
    airline: "Trans Atlantic",
    flightNumber: "TA234",
    departureTime: "16:50",
    arrivalTime: "19:30",
    duration: "2h 40m",
    price: 219,
    stops: 0,
  },
  {
    id: 5,
    airline: "Continental Wings",
    flightNumber: "CW567",
    departureTime: "19:25",
    arrivalTime: "22:10",
    duration: "2h 45m",
    price: 189,
    stops: 0,
  },
  {
    id: 6,
    airline: "Pacific Sky",
    flightNumber: "PS890",
    departureTime: "07:45",
    arrivalTime: "12:30",
    duration: "4h 45m",
    price: 129,
    stops: 1,
  },
  {
    id: 7,
    airline: "Nordic Airways",
    flightNumber: "NA321",
    departureTime: "10:30",
    arrivalTime: "13:15",
    duration: "2h 45m",
    price: 209,
    stops: 0,
  },
  {
    id: 8,
    airline: "Eastern Jet",
    flightNumber: "EJ654",
    departureTime: "13:40",
    arrivalTime: "17:55",
    duration: "4h 15m",
    price: 169,
    stops: 1,
  },
];

const Flights = () => {
  const location = useLocation();
  const searchParams = location.state || {};
  
  const [flights, setFlights] = useState(mockFlights);
  const [filteredFlights, setFilteredFlights] = useState(mockFlights);
  const [priceRange, setPriceRange] = useState([100, 250]);
  const [sortBy, setSortBy] = useState("price");
  
  // Filter and sort flights
  useEffect(() => {
    let results = [...flights];
    
    // Apply price filter
    results = results.filter(
      (flight) => flight.price >= priceRange[0] && flight.price <= priceRange[1]
    );
    
    // Apply sort
    if (sortBy === "price") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "duration") {
      results.sort((a, b) => {
        const durationA = parseInt(a.duration.split("h")[0]);
        const durationB = parseInt(b.duration.split("h")[0]);
        return durationA - durationB;
      });
    } else if (sortBy === "departure") {
      results.sort((a, b) => {
        const timeA = parseInt(a.departureTime.replace(":", ""));
        const timeB = parseInt(b.departureTime.replace(":", ""));
        return timeA - timeB;
      });
    }
    
    setFilteredFlights(results);
  }, [flights, priceRange, sortBy]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Flight search summary */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="flex items-center">
            <div className="font-semibold">{searchParams.origin || "Departure City"}</div>
            <div className="mx-3 text-gray-400">→</div>
            <div className="font-semibold">{searchParams.destination || "Arrival City"}</div>
          </div>
          <div className="text-sm text-gray-500">
            {searchParams.departDate
              ? format(new Date(searchParams.departDate), "MMM dd, yyyy")
              : "Departure Date"}{" "}
            • {searchParams.passengers || "1"} passenger
            {searchParams.passengers !== 1 ? "s" : ""}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Sort By</h3>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort flights" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Price (Low to High)</SelectItem>
                      <SelectItem value="duration">Duration (Shortest)</SelectItem>
                      <SelectItem value="departure">Departure Time (Earliest)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[100, 250]}
                      min={100}
                      max={250}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Flight results */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold mb-4">
            {filteredFlights.length} flights found
          </h2>
          
          <div className="space-y-4">
            {filteredFlights.map((flight) => (
              <Card key={flight.id} className="flight-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-12 md:col-span-3 p-4 flex flex-col justify-center md:border-r border-gray-100">
                      <div className="font-semibold mb-1">{flight.airline}</div>
                      <div className="text-sm text-gray-500">{flight.flightNumber}</div>
                    </div>
                    
                    <div className="col-span-12 md:col-span-6 p-4 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="font-bold">{flight.departureTime}</div>
                        <div className="text-xs text-gray-500">{searchParams.origin || "Origin"}</div>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-xs text-gray-500 mb-1">{flight.duration}</div>
                        <div className="relative w-full">
                          <div className="border-t border-gray-300 w-full absolute top-1/2"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300"></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop`}
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-bold">{flight.arrivalTime}</div>
                        <div className="text-xs text-gray-500">{searchParams.destination || "Destination"}</div>
                      </div>
                    </div>
                    
                    <div className="col-span-12 md:col-span-3 p-4 bg-gray-50 flex flex-col justify-center items-center">
                      <div className="font-bold text-xl text-airline-blue mb-2">${flight.price}</div>
                      <Button className="w-full" size="sm">
                        Select
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredFlights.length === 0 && (
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold mb-2">No flights found</h3>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
