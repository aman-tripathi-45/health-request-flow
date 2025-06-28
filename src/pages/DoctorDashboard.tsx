
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Calendar, 
  FileText, 
  Upload, 
  Check, 
  X, 
  Clock, 
  Stethoscope,
  LogOut,
  Home,
  Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [appointments] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'General Consultation',
      status: 'pending'
    },
    {
      id: 2,
      patientName: 'Michael Chen',
      date: '2024-01-15',
      time: '2:30 PM',
      type: 'Follow-up',
      status: 'pending'
    },
    {
      id: 3,
      patientName: 'Emma Davis',
      date: '2024-01-16',
      time: '9:00 AM',
      type: 'Initial Consultation',
      status: 'pending'
    }
  ]);

  const [profile, setProfile] = useState({
    name: 'Dr. John Smith',
    specialization: 'Cardiologist',
    experience: '15 years',
    education: 'MD from Johns Hopkins',
    bio: 'Experienced cardiologist with expertise in interventional cardiology and heart disease prevention.',
    email: 'dr.smith@healthcare.com',
    phone: '+1 (555) 123-4567'
  });

  const handleAcceptAppointment = (id: number) => {
    console.log(`Accepted appointment ${id}`);
  };

  const handleRejectAppointment = (id: number) => {
    console.log(`Rejected appointment ${id}`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Uploaded file:', file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Doctor Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {profile.name}</p>
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
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Appointment Requests</h2>
                <Badge variant="secondary" className="text-blue-600">
                  {appointments.filter(apt => apt.status === 'pending').length} Pending
                </Badge>
              </div>

              <div className="grid gap-4">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{appointment.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
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
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() => handleAcceptAppointment(appointment.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleRejectAppointment(appointment.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Doctor Profile</span>
                </CardTitle>
                <CardDescription>
                  Manage your professional profile and information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input 
                      id="specialization" 
                      value={profile.specialization}
                      onChange={(e) => setProfile({...profile, specialization: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Input 
                      id="experience" 
                      value={profile.experience}
                      onChange={(e) => setProfile({...profile, experience: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Input 
                      id="education" 
                      value={profile.education}
                      onChange={(e) => setProfile({...profile, education: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea 
                    id="bio" 
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    placeholder="Tell patients about your background, expertise, and approach to healthcare..."
                  />
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Documents & Certificates</span>
                </CardTitle>
                <CardDescription>
                  Upload your medical licenses, certificates, and other professional documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h3>
                  <p className="text-gray-600 mb-4">
                    Upload your medical license, certificates, and other professional documents
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </label>
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Uploaded Documents</h4>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Medical License</p>
                          <p className="text-sm text-gray-600">license.pdf • 2.3 MB</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Board Certification</p>
                          <p className="text-sm text-gray-600">certificate.pdf • 1.8 MB</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                        Pending
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;
