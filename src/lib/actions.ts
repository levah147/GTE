"use server";

import type { CompanyRegistrationData, DepartureLogData, EmergencyReportData } from "./schemas";
import { CompanyRegistrationSchema, DepartureLogSchema, EmergencyReportSchema } from "./schemas";

export async function registerCompanyAction(data: CompanyRegistrationData) {
  const validatedFields = CompanyRegistrationSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid data provided. Please check the fields.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate API call or database operation
  console.log("Registering company:", validatedFields.data);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

  // In a real app, you'd save to DB and handle potential errors
  return { success: "Company registration submitted successfully! Further instructions will be sent via email." };
}

export async function logDepartureAction(data: DepartureLogData) {
  const validatedFields = DepartureLogSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid data provided. Please check the fields.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate API call or database operation
  console.log("Logging departure:", validatedFields.data);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: "Vehicle departure logged successfully." };
}

export async function reportEmergencyAction(data: EmergencyReportData) {
  const validatedFields = EmergencyReportSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid data provided. Please check the fields.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate API call or database operation
  console.log("Reporting emergency:", validatedFields.data);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: "Emergency report submitted. Authorities will be notified." };
}
