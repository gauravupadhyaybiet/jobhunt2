import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import api from "@/api/api";   // ✅ USE API.JS HERE

const JobDescription = () => {

  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);

  /* ================= APPLY JOB ================= */

  const applyJobHandler = async () => {
    try {
      const res = await api.get(`/api/v1/application/apply/${jobId}`);

      if (res.data.success) {

        setIsApplied(true);

        const updatedJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: user?._id }
          ],
        };

        dispatch(setSingleJob(updatedJob));

        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Apply failed");
    }
  };



  /* ================= FETCH JOB ================= */

  useEffect(() => {

    const fetchSingleJob = async () => {
      try {

        const res = await api.get(`/api/v1/job/get/${jobId}`);

        if (res.data.success) {

          dispatch(setSingleJob(res.data.job));

          const alreadyApplied =
            res.data.job.applications?.some(
              (a) => String(a.applicant) === String(user?._id)
            ) || false;

          setIsApplied(alreadyApplied);
        }

      } catch (error) {
        console.log(error);
      }
    };

    if (jobId) fetchSingleJob();

  }, [jobId, dispatch, user?._id]);



  /* ================= UI ================= */

  return (
    <div className="max-w-7xl mx-auto my-10">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>

          <div className="flex items-center gap-2 mt-4">
            <Badge variant="ghost">{singleJob?.position} positions</Badge>
            <Badge variant="ghost">{singleJob?.jobType}</Badge>
            <Badge variant="ghost">{singleJob?.salary} LPA</Badge>
          </div>
        </div>

        <Button
          onClick={!isApplied ? applyJobHandler : undefined}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>

      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>

      <div className="my-4">

        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal">
            {singleJob?.title}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal">
            {singleJob?.location}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal">
            {singleJob?.description}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-normal">
            {singleJob?.experience || 0} yrs
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Salary:
          <span className="pl-4 font-normal">
            {singleJob?.salary} LPA
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Total Applicants:
          <span className="pl-4 font-normal">
            {singleJob?.applications?.length || 0}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-normal">
            {singleJob?.createdAt
              ? singleJob.createdAt.split("T")[0]
              : "N/A"}
          </span>
        </h1>

      </div>

    </div>
  );
};

export default JobDescription;
