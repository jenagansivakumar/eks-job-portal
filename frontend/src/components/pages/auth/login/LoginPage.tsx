import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../../../models/FormSchema";
import axios from "axios";
import { z } from "zod";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { useNavigate } from "react-router-dom";

type LoginData = z.infer<typeof LoginSchema>;

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();

  const userLogin = async (data: LoginData) => {
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("authToken", response.data.authToken);
      console.log("Token stored in localStorage:", localStorage.getItem("authToken"));
      navigate("/jobs/display");
      setSuccess("Successfully logged in!");
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(error.message || "Cannot log in");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: LoginData) => {
    await userLogin(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <Card className="w-full max-w-md bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold text-gray-100">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-gray-300">
                Username
              </Label>
              <Input
                id="username"
                {...register("username")}
                type="text"
                placeholder="Enter your username"
                className="bg-gray-700 text-gray-100 placeholder-gray-500 border-gray-600 focus:ring-gray-500"
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="bg-gray-700 text-gray-100 placeholder-gray-500 border-gray-600 focus:ring-gray-500"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gray-700 text-gray-100 hover:bg-gray-600"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            {success && <p className="mt-2 text-sm text-green-500">{success}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
