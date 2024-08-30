import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

// Define the validation schema
const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name should be at least 3 characters long" })
    .max(255),
  age: z
    .string()
    .min(1, { message: "Age is required" })
    .regex(/^[0-9]+$/, { message: "Age must be a number" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15),
  file: z.instanceof(File).optional(), // File input, optional
  location: z.string().min(1, { message: "Location is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  password: z.string().min(6).max(100),
  confirmPassword: z.string().min(6).max(100),
});

export default function Formyt() {
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(0);
  const [containerHeight, setContainerHeight] = useState("auto");
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      fullName: "",
      password: "",
      phoneNumber: "",
      file: null,
      location: "",
      address: "",
      age: "",
      gender: "",
    },
  });

  const firstStepRef = useRef(null);
  const secondStepRef = useRef(null);

  useEffect(() => {
    if (formStep === 0 && firstStepRef.current) {
      setContainerHeight(firstStepRef.current.clientHeight + "px");
    }
    if (formStep === 1 && secondStepRef.current) {
      setContainerHeight(secondStepRef.current.clientHeight + "px");
    }
  }, [formStep]);

  function onSubmit(data) {
    if (data.confirmPassword !== data.password) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    console.log("FullName:", data.fullName);
    console.log("Age:", data.age);
    console.log("Gender:", data.gender);
    console.log("Email:", data.email);
    console.log("Phone Number:", data.phoneNumber);
    console.log("Location:", data.location);
    console.log("Address:", data.address);
    console.log("Password:", data.password);
    console.log("Confirm Password:", data.confirmPassword);
    console.log("File:", data.file);
  }

  const navigate = useNavigate();

  return (
    <div
      className="relative w-full max-w-md mx-auto mt-10"
      style={{ height: containerHeight }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Start the journey with us today.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-6 overflow-x-hidden"
            >
              <motion.div
                className="space-y-6"
                ref={firstStepRef}
                animate={{ translateX: `-${formStep * 100}%` }}
                transition={{ ease: "easeInOut" }}
              >
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter your full name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Age */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your age..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* File Upload */}
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Government Valid Card</FormLabel>
                      <FormControl>
                        <Input type="file" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your location..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                className="space-y-3 absolute top-0 left-0 right-0"
                ref={secondStepRef}
                animate={{ translateX: `${100 - formStep * 100}%` }}
                transition={{ ease: "easeInOut" }}
              >
                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password..."
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please confirm your password..."
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className={cn({ hidden: formStep === 0 })}
                  onClick={async () => {
                    const {
                      fullName,
                      age,
                      gender,
                      email,
                      phoneNumber,
                      location,
                      address,
                      password,
                      confirmPassword,
                      file,
                    } = form.getValues();

                    const formData = new FormData();
                    formData.append("fullName", fullName);
                    formData.append("age", age);
                    formData.append("gender", gender);
                    formData.append("email", email);
                    formData.append("phoneNumber", phoneNumber);
                    formData.append("location", location);
                    formData.append("address", address);
                    formData.append("password", password);
                    formData.append("confirmPassword", confirmPassword);
                    formData.append("file", file); // Add the file if available

                    try {
                      const response = await fetch(
                        "http://localhost:3000/api/register",
                        {
                          method: "POST",
                          body: formData,
                        }
                      );

                      if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(
                          errorData.message || "Something went wrong"
                        );
                      }

                      const data = await response.json();
                      console.log(data);

                      // Navigate to the home route where the Navbar is shown
                      navigate('/navbar');  // or to any specific route like navigate('/dashboard')
                    } catch (error) {
                      console.error("Error:", error);
                    }
                  }}
                >
                  Submit
                </Button>

                <Button
                  type="button"
                  variant={"ghost"}
                  className={cn({ hidden: formStep === 1 })}
                  onClick={() => {
                    // form.trigger(["fullName", "age", "gender", "email", "phoneNumber", "location", "address"]);
                    // const states = [
                    //   form.getValues("fullName"),
                    //   form.getValues("age"),
                    //   form.getValues("gender"),
                    //   form.getValues("email"),
                    //   form.getValues("phoneNumber"),
                    //   form.getValues("location"),
                    //   form.getValues("address"),
                    //   form.getValues("password"),
                    //   form.getValues("confirmPassword"),
                    // ];
                    // console.log(states);
                    setFormStep(1);
                  }}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant={"ghost"}
                  className={cn({ hidden: formStep === 0 })}
                  onClick={() => setFormStep(0)}
                >
                  Back
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
