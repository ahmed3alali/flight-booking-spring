
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { 
  Users, 
  Plane, 
  CreditCard, 
  Calendar, 
  Settings,
  PlusCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const mockAnalyticsData = [
  { name: "Jan", bookings: 400, revenue: 24000 },
  { name: "Feb", bookings: 300, revenue: 18000 },
  { name: "Mar", bookings: 500, revenue: 30000 },
  { name: "Apr", bookings: 700, revenue: 42000 },
  { name: "May", bookings: 600, revenue: 36000 },
  { name: "Jun", bookings: 800, revenue: 48000 },
];

const AdminDashboard = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-airline-blue">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, Admin</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto py-8 px-4">
     
        
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
       
          
          <div className="w-full lg:w-1/4 space-y-6 ">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
              

<div className="btns-container flex flex-col gap-3">


<a href="/admin/flights">

<Button className="w-full justify-start" variant="outline" >
    

    <Plane className="mr-2 h-4 w-4" />
    Manage Flights
  </Button>


</a>


<a href="/admin/bookings">

<Button className="w-full justify-start" variant="outline">
    <Users className="mr-2 h-4 w-4" />
    View Bookings
  </Button>


</a>

<a href="/admin/flights/new">

<Button className="w-full justify-start" variant="outline">
    <Users className="mr-2 h-4 w-4" />
   New Flight
  </Button>


</a>



</div>

      
              
            
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Status</span>
                    <span className="text-green-500 text-sm flex items-center">
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span> Operational
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database</span>
                    <span className="text-green-500 text-sm flex items-center">
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span> Operational
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Payment Gateway</span>
                    <span className="text-green-500 text-sm flex items-center">
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span> Operational
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
