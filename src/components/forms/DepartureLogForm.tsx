"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { DepartureLogData } from "@/lib/schemas";
import { DepartureLogSchema } from "@/lib/schemas";
import { logDepartureAction } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";
import { ClipboardList, User, Phone, Car, Navigation, Clock } from "lucide-react";

export default function DepartureLogForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<DepartureLogData>({
    resolver: zodResolver(DepartureLogSchema),
    defaultValues: {
      vehiclePlateNumber: "",
      driverName: "",
      driverPhoneNumber: "",
      destination: "",
      departureTime: new Date().toISOString().slice(0, 16), // Default to current date and time
    },
  });

  function onSubmit(values: DepartureLogData) {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await logDepartureAction(values);
      if (result.error) {
        setError(result.error);
        toast({
          title: "Logging Failed",
          description: result.error,
          variant: "destructive",
        });
      } else if (result.success) {
        setSuccess(result.success);
        toast({
          title: "Departure Logged",
          description: result.success,
        });
        form.reset({
            vehiclePlateNumber: "",
            driverName: "",
            driverPhoneNumber: "",
            destination: "",
            departureTime: new Date().toISOString().slice(0, 16),
        });
      }
    });
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <ClipboardList className="h-7 w-7 text-primary" />
          Log Vehicle Departure
        </CardTitle>
        <CardDescription>
          Enter details for the departing vehicle and trip.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="vehiclePlateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Plate Number</FormLabel>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="driverName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver&apos;s Name</FormLabel>
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
                name="driverPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver&apos;s Phone Number</FormLabel>
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
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="e.g., Lagos, Kano" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="departureTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Date and Time</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="datetime-local" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 
            TODO: Implement passenger manifest section.
            This would likely involve a dynamic list of passenger forms or a modal to add passengers.
            For now, we'll skip this for brevity as per the core feature focus.
            <FormField
              control={form.control}
              name="numberOfPassengers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Passengers</FormLabel>
                  <FormControl>
                     <Input type="number" placeholder="e.g., 14" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
            */}
            
            {error && <FormMessage className="text-destructive text-center">{error}</FormMessage>}
            {success && <FormMessage className="text-green-600 text-center">{success}</FormMessage>}

            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
              {isPending ? "Logging Departure..." : "Log Departure"}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Passenger manifest details will be recorded in the company dashboard.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
