
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { UserPlus, LogIn, Stethoscope, User, Shield, Heart, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState('patient');
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication and redirect to appropriate dashboard
    switch (userRole) {
      case 'doctor':
        navigate('/doctor-dashboard');
        break;
      case 'patient':
        navigate('/patient-dashboard');
        break;
      case 'admin':
        navigate('/admin-dashboard');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                HealthCare Connect
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                <Heart className="h-3 w-3 mr-1" />
                Trusted Healthcare
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Hero content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                Your Health,
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  {" "}Our Priority
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with trusted healthcare professionals, book appointments seamlessly, 
                and manage your health journey with our comprehensive platform.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg border border-blue-100">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Patients</p>
                  <p className="text-sm text-gray-600">Book & manage</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg border border-green-100">
                <div className="bg-green-100 p-2 rounded-full">
                  <Stethoscope className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Doctors</p>
                  <p className="text-sm text-gray-600">Manage practice</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg border border-purple-100">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Admins</p>
                  <p className="text-sm text-gray-600">System control</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Quick Booking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Quality Care</span>
              </div>
            </div>
          </div>

          {/* Right side - Auth form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {isLogin ? 'Welcome Back' : 'Join HealthCare Connect'}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {isLogin ? 'Sign in to access your dashboard' : 'Create your account to get started'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={userRole} onValueChange={setUserRole} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="patient" className="text-xs">Patient</TabsTrigger>
                    <TabsTrigger value="doctor" className="text-xs">Doctor</TabsTrigger>
                    <TabsTrigger value="admin" className="text-xs">Admin</TabsTrigger>
                  </TabsList>
                </Tabs>

                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      className="bg-white/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      className="bg-white/50"
                      required
                    />
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="Confirm your password"
                        className="bg-white/50"
                        required
                      />
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    {isLogin ? (
                      <>
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Create Account
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
