import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic
    console.log("Forgot password:", { email });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background px-4">
      <GradientBackground variant="mesh" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Link 
          to="/sign-in" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
        
        <Card className="border-border/50 shadow-xl">
          {!submitted ? (
            <>
              <CardHeader className="text-center pb-2">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4"
                >
                  <Mail className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
                <CardDescription>
                  No worries, we'll send you reset instructions
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-4">
                  <Button type="submit" className="w-full" size="lg">
                    Send Reset Link
                  </Button>
                </CardFooter>
              </form>
            </>
          ) : (
            <CardHeader className="text-center py-8">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-success flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-success-foreground" />
              </motion.div>
              <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
              <CardDescription className="mt-2">
                We've sent a password reset link to <br />
                <span className="font-medium text-foreground">{email}</span>
              </CardDescription>
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Didn't receive the email?{" "}
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className="text-primary hover:underline font-medium"
                  >
                    Click to resend
                  </button>
                </p>
                <Link to="/sign-in">
                  <Button variant="outline" className="w-full">
                    Back to sign in
                  </Button>
                </Link>
              </div>
            </CardHeader>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
