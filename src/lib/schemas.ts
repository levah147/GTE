import { z } from 'zod';

// Shared regex for phone numbers (simple E.164 like format, can be adjusted for Nigeria specific)
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);


export const CompanyRegistrationSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  rcNumber: z.string().min(5, { message: "RC Number must be at least 5 characters." }).optional(),
  contactPersonName: z.string().min(2, { message: "Contact person name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string().regex(phoneRegex, { message: "Invalid phone number." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Passwords must match." })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // path of error
});

export type CompanyRegistrationData = z.infer<typeof CompanyRegistrationSchema>;


export const DepartureLogSchema = z.object({
  vehiclePlateNumber: z.string().min(5, { message: "Vehicle plate number is required." }),
  driverName: z.string().min(2, { message: "Driver's name is required." }),
  driverPhoneNumber: z.string().regex(phoneRegex, { message: "Invalid driver phone number." }),
  destination: z.string().min(3, { message: "Destination is required." }),
  departureTime: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid departure time." }),
  // Passenger details would be more complex, handled separately or as an array of objects
  // For now, let's keep it simple
  // numberOfPassengers: z.coerce.number().int().min(1, { message: "At least one passenger is required." }),
});

export type DepartureLogData = z.infer<typeof DepartureLogSchema>;

// Simplified for passenger details for now
export const PassengerSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required." }),
  phoneNumber: z.string().regex(phoneRegex, { message: "Invalid phone number." }),
  address: z.string().min(5, { message: "Address is required." }),
  destination: z.string().min(3, { message: "Passenger destination is required." }),
  bloodType: z.string().optional(),
  nextOfKinName: z.string().min(2, { message: "Next of kin name is required." }),
  nextOfKinPhoneNumber: z.string().regex(phoneRegex, { message: "Invalid next of kin phone number." }),
});

export type PassengerData = z.infer<typeof PassengerSchema>;


export const EmergencyReportSchema = z.object({
  reporterName: z.string().min(2, { message: "Your name is required." }),
  reporterPhoneNumber: z.string().regex(phoneRegex, { message: "Invalid phone number." }),
  vehiclePlateNumber: z.string().optional(),
  emergencyLocation: z.string().min(10, { message: "Emergency location description is required." }),
  natureOfEmergency: z.enum(['accident', 'breakdown', 'security', 'other'], { required_error: "Please select the nature of the emergency." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }).max(500, { message: "Description must be less than 500 characters." }),
});

export type EmergencyReportData = z.infer<typeof EmergencyReportSchema>;
