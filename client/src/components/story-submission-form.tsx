import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertStorySchema, type InsertStory } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Upload, CheckCircle } from "lucide-react";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = insertStorySchema.extend({
  agree: z.boolean().refine((val) => val === true, {
    message: "You must agree to share your story",
  }),
});

import { z } from "zod";

type FormData = z.infer<typeof formSchema>;

export default function StorySubmissionForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      petName: "",
      petType: "",
      category: "",
      story: "",
      photoUrl: "",
      agree: false,
    },
  });

  const submitStoryMutation = useMutation({
    mutationFn: async (data: InsertStory) => {
      return apiRequest("POST", "/api/stories", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/stories"] });
      toast({
        title: "Story Submitted!",
        description: "Thank you for sharing your story. It will be reviewed before being published.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit your story. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    const { agree, ...storyData } = data;
    submitStoryMutation.mutate(storyData);
  };

  if (isSubmitted) {
    return (
      <section id="submit" className="py-20 bg-gradient-to-br from-warm-brown to-dark-brown text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <CheckCircle size={64} className="mx-auto mb-6 text-pale-green" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Thank You!
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-8">
              Your heartwarming story has been submitted successfully. Our team will review it and, 
              once approved, it will be featured on our website to inspire others.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSubmitted(false)}
              className="bg-soft-coral hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300"
            >
              Share Another Story
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="submit" className="py-20 bg-gradient-to-br from-warm-brown to-dark-brown text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Share Your Story
          </h2>
          <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            Have a heartwarming story about the special bond you share with your pet? 
            We'd love to hear about the love, protection, and joy they bring to your life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">Your Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          {...field}
                          className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:ring-soft-coral focus:border-soft-coral"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="petName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">Pet's Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your pet's name"
                          {...field}
                          className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:ring-soft-coral focus:border-soft-coral"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="petType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">Pet Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/20 border-white/30 text-white focus:ring-soft-coral focus:border-soft-coral">
                            <SelectValue placeholder="Select pet type" className="text-white/60" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Dog">Dog</SelectItem>
                          <SelectItem value="Cat">Cat</SelectItem>
                          <SelectItem value="Bird">Bird</SelectItem>
                          <SelectItem value="Rabbit">Rabbit</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">Story Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/20 border-white/30 text-white focus:ring-soft-coral focus:border-soft-coral">
                            <SelectValue placeholder="Choose category" className="text-white/60" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Protection & Loyalty">Protection & Loyalty</SelectItem>
                          <SelectItem value="Comfort & Healing">Comfort & Healing</SelectItem>
                          <SelectItem value="Daily Companionship">Daily Companionship</SelectItem>
                          <SelectItem value="Special Moment">Special Moment</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="story"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold">Your Story</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="Tell us about the special bond you share with your pet. What makes your relationship unique? How has your pet shown love, protection, or brought joy to your life?"
                        {...field}
                        className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:ring-soft-coral focus:border-soft-coral resize-none"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold">Photo URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter photo URL"
                        {...field}
                        className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:ring-soft-coral focus:border-soft-coral"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agree"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-white/30 data-[state=checked]:bg-soft-coral data-[state=checked]:border-soft-coral"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-white/90 cursor-pointer">
                        I agree to share my story and understand it may be featured on the website
                      </FormLabel>
                      <FormMessage className="text-red-300" />
                    </div>
                  </FormItem>
                )}
              />

              <div className="text-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    disabled={submitStoryMutation.isPending}
                    className="bg-soft-coral hover:bg-opacity-90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg disabled:opacity-50"
                  >
                    {submitStoryMutation.isPending ? "Submitting..." : "Share My Story"}
                  </Button>
                </motion.div>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
