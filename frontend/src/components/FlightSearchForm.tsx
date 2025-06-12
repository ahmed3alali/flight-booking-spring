
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// hi asd
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

const FlightSearchForm = () => {



  const [departDate, setDepartDate] =useState("2025-06-24");






  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("2025-06-24");
  const [airports, setAirports] = useState<string[]>([]);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/airports")
      .then((res) => setAirports(res.data.map((a: any) => a.name)))
      .catch((err) => console.error("Failed to fetch airports", err));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !date) {
      alert("Please fill all fields");
      return;
    }
    navigate(`/search/${origin}/${destination}/${date}`);
  };





  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur">
      <CardContent className="p-6">
        <Tabs defaultValue="roundtrip" className="w-full" >
        
          
          <form onSubmit={handleSearch} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="origin" className="text-sm font-medium">
                  From
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="origin"
                    placeholder="Origin Airport Name"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    onFocus={() => setShowOriginDropdown(true)}
                    onBlur={() => setTimeout(() => setShowOriginDropdown(false), 150)}
                    className=" lg:w-1/2 md:w-1/2 ml-8 p-2 border rounded-lg"
                  />
                  {showOriginDropdown && (
                    <ul className="absolute z-10 bg-white border w-1/2  mt-1 max-h-48 overflow-y-auto rounded-lg shadow ml-8">
                      {airports
                        .filter((name) => name.toLowerCase().includes(origin.toLowerCase()))
                        .map((name, i) => (
                          <li
                            key={i}
                            onClick={() => {
                              setOrigin(name);
                              setShowOriginDropdown(false);
                            }}
                            className="p-2 hover:bg-blue-100 cursor-pointer"
                          >
                            {name}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="destination" className="text-sm font-medium">
                  To
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3  top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="destination"
                    placeholder="Destination Airport Name"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onFocus={() => setShowDestinationDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDestinationDropdown(false), 150)}
                    className="w-1/2 ml-8 p-2 border rounded-lg"
                  />
                  {showDestinationDropdown && (
                    <ul className="absolute z-10 bg-white border w-1/2  mt-1 max-h-48 overflow-y-auto rounded-lg shadow ml-8">
                      {airports
                        .filter((name) => name.toLowerCase().includes(destination.toLowerCase()))
                        .map((name, i) => (
                          <li
                            key={i}
                            onClick={() => {
                              setDestination(name);
                              setShowDestinationDropdown(false);
                            }}
                            className="p-2 hover:bg-blue-100 cursor-pointer"
                          >
                            {name}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center w-1/2 m-auto">
              <div className="space-y-2">
                <label className="text-sm font-medium">Depart</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !departDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departDate ? format(departDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                  <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />


                  </PopoverContent>
                </Popover>
              </div>
              
        
            </div>
            
            <div className="flex flex-col justify-center w-1/2 m-auto">
             
              
           
                <Button type="submit" className="w-full bg-airline-blue hover:bg-airline-blue-dark m-auto">
                  Search Flights
                </Button>
           
            </div>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FlightSearchForm;
