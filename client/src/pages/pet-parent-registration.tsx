import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Heart, MapPin, Phone, Home, Calendar, Star, DollarSign } from "lucide-react";
import { useState } from "react";
import type { InsertPetParent, Vet } from "@/shared/schema";

const petParentRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  petName: z.string().min(1, "Pet name is required"),
  petBreed: z.string().min(1, "Pet breed is required"),
  petAge: z.number().min(0, "Pet age must be 0 or greater"),
  petWeight: z.number().min(0, "Pet weight must be greater than 0"),
  healthHistory: z.string().optional(),
  allergies: z.string().optional(),
  mapLocationLink: z.string().url("Please provide a valid Google Maps link").optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

type PetParentRegistrationForm = z.infer<typeof petParentRegistrationSchema>;

export default function PetParentRegistration() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showNearbyVets, setShowNearbyVets] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  
  const form = useForm<PetParentRegistrationForm>({
    resolver: zodResolver(petParentRegistrationSchema),
    defaultValues: {
      petAge: 1,
      petWeight: 5,
    }
  });

  // Fetch nearby vets after registration
  const { data: nearbyVets, isLoading: vetsLoading } = useQuery({
    queryKey: ["/api/vets/nearby"],
    enabled: showNearbyVets,
    queryFn: async () => {
      const response = await apiRequest("/api/vets/approved");
      return response.json();
    }
  });

  const createPetParentMutation = useMutation({
    mutationFn: async (data: InsertPetParent) => {
      const response = await apiRequest("/api/pet-parents", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "Welcome to our pet family network! Here are veterinarians near you.",
      });
      setRegistrationComplete(true);
      setShowNearbyVets(true);
      queryClient.invalidateQueries({ queryKey: ["/api/pet-parents"] });
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: PetParentRegistrationForm) => {
    createPetParentMutation.mutate(data as InsertPetParent);
  };

  const bookConsultation = (vet: Vet, consultationType: string) => {
    toast({
      title: "Consultation Booking",
      description: `Booking ${consultationType} consultation with ${vet.fullName}. You will be contacted shortly.`,
    });
  };

  if (registrationComplete && showNearbyVets) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <main className="pt-20">
          {/* Success Hero */}
          <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-green-600 rounded-full">
                    <Heart className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold mb-4">Welcome to Our Pet Family!</h1>
                <p className="text-xl text-gray-600 mb-8">
                  Your registration is complete. Here are verified veterinarians near you.
                </p>
              </div>
            </div>
          </section>

          {/* Nearby Vets */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Veterinarians Near You</h2>
                <p className="text-lg text-gray-600">Connect with trusted professionals in your area</p>
              </div>

              {vetsLoading ? (
                <div className="text-center">Loading nearby veterinarians...</div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                  {nearbyVets?.map((vet: Vet) => (
                    <motion.div
                      key={vet.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="p-6 hover:shadow-xl transition-shadow">
                        <CardContent className="p-0">
                          <div className="flex items-start space-x-4 mb-4">
                            <img 
                              src={vet.profilePhotoUrl || "/api/placeholder/80/80"} 
                              alt={vet.fullName}
                              className="w-20 h-20 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold mb-1">{vet.fullName}</h3>
                              <p className="text-blue-600 font-medium mb-1">{vet.qualification}</p>
                              <p className="text-gray-600 mb-1">{vet.workExperience} years experience</p>
                              <div className="flex items-center text-gray-500 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{vet.clinicName}, {vet.city}</span>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">4.8 (124 reviews)</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <p className="text-sm text-gray-700 italic">"{vet.testimonial}"</p>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            {vet.phoneConsultation && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => bookConsultation(vet, 'phone')}
                                className="flex flex-col h-auto py-2"
                              >
                                <Phone className="h-4 w-4 mb-1" />
                                <span className="text-xs">Phone</span>
                                <span className="text-xs font-semibold text-green-600">₹{vet.phoneConsultationFee}</span>
                              </Button>
                            )}
                            
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => bookConsultation(vet, 'clinic')}
                              className="flex flex-col h-auto py-2"
                            >
                              <Calendar className="h-4 w-4 mb-1" />
                              <span className="text-xs">Clinic</span>
                              <span className="text-xs font-semibold text-blue-600">₹{vet.clinicConsultationFee}</span>
                            </Button>

                            {vet.homeConsultation && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => bookConsultation(vet, 'home')}
                                className="flex flex-col h-auto py-2"
                              >
                                <Home className="h-4 w-4 mb-1" />
                                <span className="text-xs">Home</span>
                                <span className="text-xs font-semibold text-purple-600">₹{vet.homeVisitFee}</span>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-pink-600 rounded-full">
                  <Heart className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">Join as a Pet Family</h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect with trusted veterinarians and access comprehensive pet care services
              </p>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Heart className="h-6 w-6 mr-2 text-pink-600" />
                        Pet Parent Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mapLocationLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Google Maps Location Link</FormLabel>
                            <FormControl>
                              <Input placeholder="https://maps.google.com/?q=..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Heart className="h-6 w-6 mr-2 text-pink-600" />
                        Pet Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="petName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pet Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Buddy" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="petBreed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pet Breed *</FormLabel>
                              <FormControl>
                                <Input placeholder="Golden Retriever" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="petAge"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pet Age (Years) *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="3" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="petWeight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pet Weight (kg) *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  step="0.1"
                                  placeholder="25.5" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="healthHistory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Important Pet Health History</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Previous surgeries, ongoing treatments, chronic conditions..."
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="allergies"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pet Allergies or Critical Conditions</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Food allergies, medication allergies, critical conditions to be aware of..."
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <div className="flex justify-center">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="bg-pink-600 hover:bg-pink-700 px-8"
                      disabled={createPetParentMutation.isPending}
                    >
                      {createPetParentMutation.isPending ? "Registering..." : "Join Pet Family Network"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}