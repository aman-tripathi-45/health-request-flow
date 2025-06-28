
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Users, 
  Calendar, 
  TrendingUp, 
  Check, 
  X, 
  Eye,
  UserCheck,
  UserX,
  Activity,
  LogOut,
  Home,
  Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      doctorName: 'Dr. Michael Chen',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'General Consultation',
      status: 'pending',
      patientAge: 28,
      reason: 'Skin rash and allergic reactions'
    },
    {
      id: 2,
      patientName: 'Robert Smith',
      doctorName: 'Dr. Emily Johnson',
      date: '2024-01-22',
      time: '2:30 PM',
      type: 'Pediatric Consultation',
      status: 'pending',
      patientAge: 8,
      reason: 'Regular checkup and vaccination'
    },
    {
      id: 3,
      patientName: 'Maria Garcia',
      doctorName: 'Dr. Sarah Wilson',
      date: '2024-01-25',
      time: '11:00 AM',
      type: 'Cardiology Consultation',
      status: 'pending',
      patientAge: 45,
      reason: 'Chest pain and breathing difficulties'
    }
  ]);

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      specialization: 'Cardiologist',
      status: 'active',
      patients: 45,
      rating: 4.9,
      joinDate: '2023-01-15',
      verified: true
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Dermatologist',
      status: 'active',
      patients: 38,
      rating: 4.8,
      joinDate: '2023-03-20',
      verified: true
    },
    {
      id: 3,
      name: 'Dr. Emily Johnson',
      specialization: 'Pediatrician',
      status: 'pending',
      patients: 0,
      rating: 0,
      joinDate: '2024-01-10',
      verified: false
    }
  ]);

  const [stats] = useState({
    totalDoctors: 15,
    totalPatients: 342,
    pendingRequests: 8,
    completedAppointments: 156,
    monthlyGrowth: 12.5
  });

  const handleApproveRequest = (id: number) => {
    const request = pendingRequests.find(req => req.id === id);
    if (request) {
      setPendingRequests(prev => prev.filter(req => req.id !== id));
      toast({
        title: "Request Approved",
        description: `Appointment between ${request.patientName} and ${request.doctorName} has been approved.`,
        variant: "default"
      });
      console.log(`Approved appointment request ${id}`);
    }
  };

  const handleRejectRequest = (id: number) => {
    const request = pendingRequests.find(req => req.id === id);
    if (request) {
      setPendingRequests(prev => prev.filter(req => req.id !== id));
      toast({
        title: "Request Rejected",
        description: `Appointment request between ${request.patientName} and ${request.doctorName} has been rejected.`,
        variant: "destructive"
      });
      console.log(`Rejected appointment request ${id}`);
    }
  };

  const handleActivateDoctor = (id: number) => {
    const doctor = doctors.find(doc => doc.id === id);
    if (doctor) {
      setDoctors(prev => prev.map(doc => 
        doc.id === id ? { ...doc, status: 'active', verified: true } : doc
      ));
      toast({
        title: "Doctor Activated",
        description: `${doctor.name} has been activated and can now accept appointments.`,
        variant: "default"
      });
      console.log(`Activated doctor ${id}`);
    }
  };

  const handleDeactivateDoctor = (id: number) => {
    const doctor = doctors.find(doc => doc.id === id);
    if (doctor) {
      setDoctors(prev => prev.map(doc => 
        doc.id === id ? { ...doc, status: 'pending' } : doc
      ));
      toast({
        title: "Doctor Deactivated",
        description: `${doctor.name} has been deactivated and cannot accept new appointments.`,
        variant: "destructive"
      });
      console.log(`Deactivated doctor ${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">System management and oversight</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingRequests.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedAppointments}</p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Growth</p>
                  <p className="text-2xl font-bold text-gray-900">+{stats.monthlyGrowth}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="requests">Appointment Requests</TabsTrigger>
            <TabsTrigger value="doctors">Manage Doctors</TabsTrigger>
          </TabsList>

          {/* Appointment Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Pending Appointment Requests</h2>
              <Badge variant="secondary" className="text-orange-600">
                {pendingRequests.length} Pending Review
              </Badge>
            </div>

            <div className="grid gap-4">
              {pendingRequests.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending requests</h3>
                    <p className="text-gray-600">All appointment requests have been processed.</p>
                  </CardContent>
                </Card>
              ) : (
                pendingRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarFallback>{request.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {request.patientName} (Age: {request.patientAge})
                                </h3>
                                <p className="text-sm text-gray-600">
                                  Requesting appointment with {request.doctorName}
                                </p>
                              </div>
                            </div>
                            <div className="ml-12 space-y-1">
                              <p className="text-sm"><strong>Type:</strong> {request.type}</p>
                              <p className="text-sm"><strong>Date & Time:</strong> {request.date} at {request.time}</p>
                              <p className="text-sm"><strong>Reason:</strong> {request.reason}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-orange-600 border-orange-200">
                            Pending Review
                          </Badge>
                        </div>
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Manage Doctors Tab */}
          <TabsContent value="doctors" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Doctor Management</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {doctors.filter(d => d.status === 'active').length} Active
                </Badge>
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  {doctors.filter(d => d.status === 'pending').length} Pending
                </Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                            {doctor.verified && (
                              <Badge variant="outline" className="text-blue-600 border-blue-200 text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{doctor.specialization}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                            <span>{doctor.patients} patients</span>
                            {doctor.rating > 0 && <span>★ {doctor.rating}</span>}
                            <span>Joined {doctor.joinDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={doctor.status === 'active' ? 'default' : 'secondary'}
                          className={doctor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                        >
                          {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                        </Badge>
                        {doctor.status === 'active' ? (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleDeactivateDoctor(doctor.id)}
                          >
                            <UserX className="h-4 w-4 mr-1" />
                            Deactivate
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() => handleActivateDoctor(doctor.id)}
                          >
                            <UserCheck className="h-4 w-4 mr-1" />
                            Activate
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
