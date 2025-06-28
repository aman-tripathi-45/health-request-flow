import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Calendar, 
  Clock, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  User,
  Stethoscope,
  LogOut,
  Home,
  Bell,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [appointmentForm, setAppointmentForm] = useState({
    date: '',
    timeSlot: '',
    reason: ''
  });

  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      specialization: 'Cardiologist',
      rating: 4.9,
      experience: '12 years',
      location: 'New York Medical Center',
      avatar: '/placeholder.svg',
      availability: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
      price: '$150'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Dermatologist',
      rating: 4.8,
      experience: '8 years',
      location: 'Downtown Clinic',
      avatar: '/placeholder.svg',
      availability: ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
      price: '$120'
    },
    {
      id: 3,
      name: 'Dr. Emily Johnson',
      specialization: 'Pediatrician',
      rating: 4.9,
      experience: '15 years',
      location: "Children's Hospital",
      avatar: '/placeholder.svg',
      availability: ['8:00 AM', '10:00 AM', '2:00 PM', '4:00 PM'],
      price: '$100'
    }
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Sarah Wilson',
      specialization: 'Cardiologist',
      date: '2024-01-20',
      time: '10:00 AM',
      status: 'confirmed',
      type: 'Consultation'
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialization: 'Dermatologist',
      date: '2024-01-25',
      time: '2:00 PM',
      status: 'pending',
      type: 'Follow-up'
    }
  ]);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAppointment = (doctor: any, timeSlot: string) => {
    if (!appointmentForm.date || !timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time slot.",
        variant: "destructive"
      });
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      date: appointmentForm.date,
      time: timeSlot,
      status: 'pending',
      type: 'Consultation',
      reason: appointmentForm.reason
    };

    setAppointments([...appointments, newAppointment]);
    
    toast({
      title: "Appointment Request Sent!",
      description: `Your appointment request with ${doctor.name} has been submitted successfully.`,
      variant: "default"
    });

    // Reset form
    setAppointmentForm({ date: '', timeSlot: '', reason: '' });
    console.log(`Booking appointment with ${doctor.name} at ${timeSlot}`);
  };

  const handleConfirmBooking = (doctor: any) => {
    if (!appointmentForm.timeSlot) {
      toast({
        title: "Please Select Time",
        description: "Please select a time slot before confirming.",
        variant: "destructive"
      });
      return;
    }
    
    handleBookAppointment(doctor, appointmentForm.timeSlot);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Patient Dashboard</h1>
                <p className="text-sm text-gray-600">Find and book appointments with doctors</p>
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
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="browse">Browse Doctors</TabsTrigger>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
          </TabsList>

          {/* Browse Doctors Tab */}
          <TabsContent value="browse" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Find Your Doctor</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search doctors or specializations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={doctor.avatar} />
                          <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                            <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{doctor.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Stethoscope className="h-4 w-4" />
                              <span>{doctor.experience}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{doctor.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              Available Today
                            </Badge>
                            <span className="text-lg font-semibold text-gray-900">{doctor.price}</span>
                          </div>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                            Book Appointment
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Book Appointment with {doctor.name}</DialogTitle>
                            <DialogDescription>
                              Choose your preferred time slot for the appointment
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Date</Label>
                                <Input 
                                  type="date" 
                                  min={new Date().toISOString().split('T')[0]} 
                                  value={appointmentForm.date}
                                  onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Consultation Fee</Label>
                                <Input value={doctor.price} disabled />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Available Time Slots</Label>
                              <div className="grid grid-cols-2 gap-2">
                                {doctor.availability.map((slot) => (
                                  <Button
                                    key={slot}
                                    variant={appointmentForm.timeSlot === slot ? "default" : "outline"}
                                    className="justify-center"
                                    onClick={() => setAppointmentForm({...appointmentForm, timeSlot: slot})}
                                  >
                                    <Clock className="h-4 w-4 mr-2" />
                                    {slot}
                                  </Button>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Reason for Visit (Optional)</Label>
                              <Textarea 
                                placeholder="Please describe your symptoms or reason for the appointment..."
                                value={appointmentForm.reason}
                                onChange={(e) => setAppointmentForm({...appointmentForm, reason: e.target.value})}
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <DialogTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogTrigger>
                              <DialogTrigger asChild>
                                <Button 
                                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                                  onClick={() => handleConfirmBooking(doctor)}
                                >
                                  Confirm Booking
                                </Button>
                              </DialogTrigger>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
              <Badge variant="secondary" className="text-blue-600">
                {appointments.length} Total
              </Badge>
            </div>

            <div className="grid gap-4">
              {appointments.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments yet</h3>
                    <p className="text-gray-600 mb-4">
                      Browse doctors and book your first appointment to get started
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      Browse Doctors
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                appointments.map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{appointment.doctorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                            <p className="text-sm text-gray-600">{appointment.specialization}</p>
                            <p className="text-sm text-gray-600">{appointment.type}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                            className={appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                          >
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;
