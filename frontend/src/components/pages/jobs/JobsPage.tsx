import { useEffect, useState } from "react";
import { Job } from "../../../models/JobSchema";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { apiUrl } from "../auth/login/LoginPage";

export const JobsPage = () => {
  console.log("Component rendered")
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchJobs = async () => {
    console.log("TEST Fetching jobs...")
    console.log("API_URL: ", apiUrl)
    setError("");
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/jobs/fetch`);
      console.log("Fetched data: ", response.data)
      setJobs(Array.isArray(response.data) ? response.data : []);
    } catch (error: any) {
      setError(error.message || "Cannot fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <Card className="w-full max-w-3xl bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-100">
            All Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex justify-center my-4">
              <h2>Loading...</h2>
            </div>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!loading && jobs.length === 0 && (
            <p className="text-gray-300">No jobs available</p>
          )}
          {!loading && jobs.length > 0 && (
            <ul className="space-y-2">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="p-4 bg-gray-700 border border-gray-600 rounded-lg"
                >
                  <strong className="text-gray-100">{job.jobTitle}</strong>:{" "}
                  <span className="text-gray-300">{job.jobDescription}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <Button
        onClick={fetchJobs}
        className="mt-4 bg-gray-700 text-gray-100 hover:bg-gray-600"
      >
        Refresh
      </Button>
    </div>
  );
};
