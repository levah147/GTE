"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { EmergencyReportData } from "@/lib/schemas";
import { EmergencyReportSchema } from "@/lib/schemas";
import { reportEmergencyAction } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";
import { AlertTriangle, User, Phone, Car, MapPin, Info } from "lucide-react";

export default function EmergencyReportForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<EmergencyReportData>({
    resolver: zodResolver(EmergencyReportSchema),
    defaultValues: {
      reporterName: "",
      reporterPhoneNumber: "",
      vehiclePlateNumber: "",
      emergencyLocation: "",
      natureOfEmergency: undefined,
      description: "",
    },
  });

  function onSubmit(values: EmergencyReportData) {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await reportEmergencyAction(values);
      if (result.error) {
        setError(result.error);
        toast({
          title: "Report Failed",
          description: result.error,
          variant: "destructive",
        });
      } else if (result.success) {
        setSuccess(result.success);
        toast({
          title: "Emergency Reported",
          description: result.success,
          variant: "default"
        });
        form.reset();
      }
    });
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-destructive/50">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-7 w-7" />
          Report an Emergency
        </CardTitle>
        <CardDescription>
          Provide details about the emergency. This will alert administrators immediately.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="reporterName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Full Name" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reporterPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="tel" placeholder="e.g., +2348012345678" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="vehiclePlateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Plate Number (If applicable)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="e.g., ABC-123-XYZ" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Location</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea placeholder="Describe the location (e.g., Kubwa Expressway, near NNPC Mega Station)" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="natureOfEmergency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nature of Emergency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select emergency type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="accident">Accident</SelectItem>
                      <SelectItem value="breakdown">Vehicle Breakdown</SelectItem>
                      <SelectItem value="security">Security Concern</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Info className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        placeholder="Provide a clear and concise description of the emergency, including number of people involved if known, severity, etc."
                        {...field}
                        className="min-h-[120px] pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {error && <FormMessage className="text-destructive text-center">{error}</FormMessage>}
            {success && <FormMessage className="text-green-600 text-center">{success}</FormMessage>}

            <Button type="submit" variant="destructive" className="w-full" size="lg" disabled={isPending}>
              {isPending ? "Submitting Report..." : "Submit Emergency Report"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
