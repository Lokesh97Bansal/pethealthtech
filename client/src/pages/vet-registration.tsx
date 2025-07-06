import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Stethoscope, Upload, MapPin, Phone, Home, DollarSign } from "lucide-react";
import type { InsertVet } from "@/shared/schema";

const vetRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  qualification: z.string().min(1, "Qualification is required"),
  collegeName: z.string().min(1, "College name is required"),
  workExperience: z.number().min(0, "Work experience must be 0 or greater"),
  clinicName: z.string().min(1, "Clinic name is required"),
  clinicAddress: z.string().min(10, "Please provide a complete clinic address"),
  profilePhotoUrl: z.string().optional(),
  mapLocationLink: z.string().url("Please provide a valid Google Maps link").optional(),
  testimonial: z.string().min(10, "Please provide a testimonial about your experience"),
  smartCareComments: z.string().min(10, "Please share your thoughts on smart pet care"),
  homeConsultation: z.boolean().default(false),
  phoneConsultation: z.boolean().default(false),
  dietManagement: z.boolean().default(false),
  phoneConsultationFee: z.number().min(0).optional(),
  clinicConsultationFee: z.number().min(0).optional(),
  homeVisitFee: z.number().min(0).optional(),
  city: z.string().min(1, "City is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

type VetRegistrationForm = z.infer<typeof vetRegistrationSchema>;

export default function VetRegistration() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<VetRegistrationForm>({
    resolver: zodResolver(vetRegistrationSchema),
    defaultValues: {
      homeConsultation: false,
      phoneConsultation: false,
      dietManagement: false,
      phoneConsultationFee: 50,
      clinicConsultationFee: 500,
      homeVisitFee: 800,
    }
  });

  const createVetMutation = useMutation({
    mutationFn: async (data: InsertVet) => {
      const response = await apiRequest("/api/vets", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Submitted!",
        description: "Your veterinarian registration has been submitted for review. We'll contact you within 24-48 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/vets"] });
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: VetRegistrationForm) => {
    createVetMutation.mutate(data as InsertVet);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-600 rounded-full">
                  <Stethoscope className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">Join Our Veterinarian Network</h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect with pet parents and provide exceptional care through our platform
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
                        <Stethoscope className="h-6 w-6 mr-2 text-blue-600" />
                        Personal & Professional Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Dr. John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="qualification"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Qualification *</FormLabel>
                              <FormControl>
                                <Input placeholder="BVSc & AH, MVSc" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="collegeName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>College Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="College of Veterinary Science" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="workExperience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Work Experience (Years) *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="5" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="profilePhotoUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Profile Photo URL</FormLabel>
                            <FormControl>
                              <div className="flex space-x-2">
                                <Input placeholder="https://example.com/photo.jpg" {...field} />
                                <Button type="button" variant="outline" size="sm">
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload
                                </Button>
                              </div>
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
                        <MapPin className="h-6 w-6 mr-2 text-blue-600" />
                        Clinic Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="clinicName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Clinic Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Pet Care Clinic" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City *</FormLabel>
                              <FormControl>
                                <Input placeholder="Mumbai" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="clinicAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Clinic Address *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Complete clinic address with landmarks"
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
                        <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                        Consultation Services & Fees
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <FormField
                            control={form.control}
                            name="phoneConsultation"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Can offer phone consultation?</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <FormField
                            control={form.control}
                            name="homeConsultation"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Can offer home consultation?</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <FormField
                            control={form.control}
                            name="dietManagement"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Available to plan diet and weight management?</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="phoneConsultationFee"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Consultation Fee (₹)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="50" 
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
                          name="clinicConsultationFee"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Physical Clinic Fee (₹)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="500" 
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
                          name="homeVisitFee"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Home Visit Fee (₹)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="800" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Testimonials & Comments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="testimonial"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Testimonial about the brand *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Share your experience with smart pet monitoring technology..."
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="smartCareComments"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Comments on significance of smart pet care products *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="How do you think smart pet care products impact veterinary practice..."
                                rows={4}
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
                      className="bg-blue-600 hover:bg-blue-700 px-8"
                      disabled={createVetMutation.isPending}
                    >
                      {createVetMutation.isPending ? "Submitting..." : "Submit Registration"}
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