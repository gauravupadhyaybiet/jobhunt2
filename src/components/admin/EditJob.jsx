import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/api";
import { toast } from "sonner";
import Navbar from "../shared/navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
    company: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/api/v1/job/get/${id}`);

        if (res.data.success) {
          const job = res.data.job;
          setInput({
            title: job.title || "",
            description: job.description || "",
            requirements: job.requirements?.join(", ") || "",
            salary: job.salary || "",
            location: job.location || "",
            jobType: job.jobType || "",
            experienceLevel: job.experienceLevel || "",
            position: job.position || "",
            company: job.company?._id || "",
          });
        }
      } catch {
        toast.error("Failed to fetch job");
      }
    };

    if (id) fetchJob();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...input,
        requirements: input.requirements
          .split(",")
          .map((r) => r.trim()),
      };

      if (!payload.company) delete payload.company;

      const res = await api.put(`/api/v1/job/update/${id}`, payload);

      if (res.data.success) {
        toast.success("Job updated!");
        navigate("/admin/jobs");
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler} className="space-y-4">
          {Object.keys(input).map((key) =>
            key !== "company" ? (
              <div key={key}>
                <Label>{key}</Label>
                <Input
                  name={key}
                  value={input[key]}
                  onChange={(e) =>
                    setInput({ ...input, [key]: e.target.value })
                  }
                />
              </div>
            ) : null
          )}

          <Button disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Job"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;



