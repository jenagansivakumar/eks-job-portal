import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { apiUrl } from "../auth/login/LoginPage";

const JobSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  jobDescription: z.string().min(1, "Job description is required"),
});

type JobData = z.infer<typeof JobSchema>;

export const CreateJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobData>({
    resolver: zodResolver(JobSchema),
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  const createJob = async (data: JobData) => {
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken")
      console.log(token)
      await axios.post(`${apiUrl}/jobs/create`, data, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
        
      });
      setSuccess("Successfully added job!");
   
    try {
      const response = await axios.post("http://localhost:8080/logs", data, {headers: {"Content-Type": "application/json"}})
      console.log(response)
    } catch (logError: any){
      console.error("Logging service error: ", logError)
    }
  } catch (error: any){
    setError(error.response?.data?.message || error.message || "Unexpected error has occurred")
  } finally {
    setLoading(false)
  }

}

  const onSubmit = async (data: JobData) => {
    await createJob(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <Card className="w-full max-w-lg bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-100">
            Create Job
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="jobTitle" className="text-gray-300">
                Job Title
              </Label>
              <Input
                id="jobTitle"
                {...register("jobTitle")}
                placeholder="Enter job title"
                className="bg-gray-700 text-gray-100 placeholder-gray-500 border-gray-600 focus:ring-gray-500"
              />
              {errors.jobTitle && (
                <p className="text-sm text-red-500">{errors.jobTitle.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="jobDescription" className="text-gray-300">
                Job Description
              </Label>
              <Input
                id="jobDescription"
                {...register("jobDescription")}
                placeholder="Enter job description"
                className="bg-gray-700 text-gray-100 placeholder-gray-500 border-gray-600 focus:ring-gray-500"
              />
              {errors.jobDescription && (
                <p className="text-sm text-red-500">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gray-700 text-gray-100 hover:bg-gray-600"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
            {success && <p className="mt-4 text-sm text-green-500">{success}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
