import React, { useState, useEffect } from "react";
import Navbar from "../shared/navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setsearchJobByText } from "@/redux/jobSlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobs = () => {

  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setsearchJobByText(input));
  }, [input]);

  return (
    <div>

      <Navbar />

      <div className="max-w-6xl mx-auto my-10">

        {/* 🔥 THIS IS THE MISSING BUTTON AREA */}
        <div className="flex items-center justify-between">

          <Input
            className="w-fit"
            placeholder="Filter jobs"
            onChange={(e) => setInput(e.target.value)}
          />

          {/* ✅ POST JOB BUTTON */}
          <Button onClick={() => navigate("/admin/jobs/create")}>
            Post New Job
          </Button>

        </div>

        <AdminJobsTable />

      </div>

    </div>
  );
};

export default AdminJobs;
