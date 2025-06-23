import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Flame, Phone, Shield } from "lucide-react";

const phoneSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number format"),
});

const otpSchema = z.object({
  phoneNumber: z.string(),
  code: z.string().length(6, "OTP must be 6 digits"),
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

export default function Login() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      phoneNumber: "",
      code: "",
    },
  });

  const sendOtpMutation = useMutation({
    mutationFn: async (data: PhoneFormData) => {
      const response = await apiRequest("POST", "/api/auth/send-otp", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code.",
      });
      setStep("otp");
      otpForm.setValue("phoneNumber", phoneNumber);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (data: OtpFormData) => {
      const response = await apiRequest("POST", "/api/auth/verify-otp", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Login Successful",
        description: "Welcome to WaxHeave!",
      });
      window.location.href = "/";
    },
    onError: () => {
      toast({
        title: "Invalid Code",
        description: "Please check your code and try again.",
        variant: "destructive",
      });
    },
  });

  const onPhoneSubmit = (data: PhoneFormData) => {
    setPhoneNumber(data.phoneNumber);
    sendOtpMutation.mutate(data);
  };

  const onOtpSubmit = (data: OtpFormData) => {
    verifyOtpMutation.mutate(data);
  };

  const handleReditAuth = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-white via-soft-cream to-warm-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Flame className="text-warm-amber text-5xl animate-flicker" />
              <div className="absolute inset-0 animate-glow-pulse">
                <Flame className="text-amber-glow text-5xl opacity-50" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gradient-warm mb-2">WaxHeave</h1>
          <p className="text-warm-gray">Sign in to your account</p>
        </div>

        {/* Replit Auth Option */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-gray-900">Welcome Back</CardTitle>
            <CardDescription>Choose your preferred login method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              onClick={handleReditAuth}
              className="w-full bg-gradient-warm hover:bg-gradient-glow text-white py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 animate-scale-in"
            >
              <Shield className="w-5 h-5 mr-2" />
              Continue with Replit
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-warm-gray">or</span>
              </div>
            </div>

            {/* Phone Authentication */}
            {step === "phone" ? (
              <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                  <FormField
                    control={phoneForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-amber h-5 w-5" />
                            <Input
                              placeholder="+1 (555) 123-4567"
                              className="pl-12 h-12 border-light-amber focus:ring-amber-glow focus:border-amber-glow"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={sendOtpMutation.isPending}
                    className="w-full bg-warm-amber hover:bg-deep-amber text-white py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    {sendOtpMutation.isPending ? "Sending..." : "Send Verification Code"}
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...otpForm}>
                <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-sm text-warm-gray">
                      We sent a verification code to
                    </p>
                    <p className="font-semibold text-gray-900">{phoneNumber}</p>
                  </div>
                  <FormField
                    control={otpForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Verification Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123456"
                            className="text-center h-12 text-2xl font-mono tracking-widest border-light-amber focus:ring-amber-glow focus:border-amber-glow"
                            maxLength={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-warm-amber text-warm-amber hover:bg-warm-amber hover:text-white"
                      onClick={() => {
                        setStep("phone");
                        phoneForm.reset();
                        otpForm.reset();
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={verifyOtpMutation.isPending}
                      className="flex-1 bg-warm-amber hover:bg-deep-amber text-white transition-all duration-300 transform hover:scale-105"
                    >
                      {verifyOtpMutation.isPending ? "Verifying..." : "Verify"}
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-warm-amber hover:text-deep-amber"
                      onClick={() => sendOtpMutation.mutate({ phoneNumber })}
                      disabled={sendOtpMutation.isPending}
                    >
                      Resend Code
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-warm-gray">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}