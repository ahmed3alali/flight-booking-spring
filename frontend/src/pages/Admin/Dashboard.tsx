
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

const mockBookings = [
  {
    id: "B123456",
    customer: "John Doe",
    flight: "SJ123",
    route: "JFK → LAX",
    date: "2025-06-01",
    status: "Confirmed",
    amount: "$199.00"
  },
  {
    id: "B123457",
    customer: "Jane Smith",
    flight: "SJ456",
    route: "LAX → SFO",
    date: "2025-06-02",
    status: "Confirmed",
    amount: "$149.00"
  },
  {
    id: "B123458",
    customer: "Robert Johnson",
    flight: "SJ789",
    route: "SFO → SEA",
    date: "2025-06-03",
    status: "Pending",
    amount: "$179.00"
  },
  {
    id: "B123459",
    customer: "Maria Garcia",
    flight: "SJ234",
    route: "SEA → DEN",
    date: "2025-06-04",
    status: "Confirmed",
    amount: "$209.00"
  },
  {
    id: "B123460",
    customer: "David Brown",
    flight: "SJ567",
    route: "DEN → ORD",
    date: "2025-06-05",
    status: "Cancelled",
    amount: "$229.00"
  },
];

const mockAnalyticsData = [
  { name: "Jan", bookings: 400, revenue: 24000 },
  { name: "Feb", bookings: 300, revenue: 18000 },
  { name: "Mar", bookings: 500, revenue: 30000 },
  { name: "Apr", bookings: 700, revenue: 42000 },
  { name: "May", bookings: 600, revenue: 36000 },
  { name: "Jun", bookings: 800, revenue: 48000 },
];

const AdminDashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-airline-blue">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, Admin</span>
            <Button variant="outline" size="sm">Logout</Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto py-8 px-4">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                <h3 className="text-2xl font-bold">3,248</h3>
                <p className="text-xs text-green-500">+12% from last month</p>
              </div>
              <div className="p-3 bg-airline-blue/10 rounded-full">
                <CreditCard className="h-6 w-6 text-airline-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold">$198,500</h3>
                <p className="text-xs text-green-500">+8% from last month</p>
              </div>
              <div className="p-3 bg-airline-blue/10 rounded-full">
                <CreditCard className="h-6 w-6 text-airline-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold">12,540</h3>
                <p className="text-xs text-green-500">+5% from last month</p>
              </div>
              <div className="p-3 bg-airline-blue/10 rounded-full">
                <Users className="h-6 w-6 text-airline-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Flights</p>
                <h3 className="text-2xl font-bold">48</h3>
                <p className="text-xs text-red-500">-2% from last month</p>
              </div>
              <div className="p-3 bg-airline-blue/10 rounded-full">
                <Plane className="h-6 w-6 text-airline-blue" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/4">
            <Tabs defaultValue="bookings" className="space-y-4">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="flights">Flights</TabsTrigger>
                </TabsList>
                
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Booking
                </Button>
              </div>
              
              <TabsContent value="bookings" className="space-y-4">
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Booking ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Flight</TableHead>
                          <TableHead>Route</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockBookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.customer}</TableCell>
                            <TableCell>{booking.flight}</TableCell>
                            <TableCell>{booking.route}</TableCell>
                            <TableCell>{booking.date}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  booking.status === "Confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {booking.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">{booking.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockAnalyticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" orientation="left" stroke="#0A2463" />
                          <YAxis yAxisId="right" orientation="right" stroke="#D8315B" />
                          <Tooltip />
                          <Bar yAxisId="left" dataKey="bookings" fill="#0A2463" name="Bookings" />
                          <Bar yAxisId="right" dataKey="revenue" fill="#D8315B" name="Revenue ($)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="flights">
                <Card>
                  <CardHeader>
                    <CardTitle>Flight Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-gray-500">
                      Flight management interface coming soon
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="w-full lg:w-1/4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
              
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
              
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Flight Schedule
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  System Settings
                </Button>
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
