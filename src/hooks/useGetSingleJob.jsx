import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "@/api/api";
import { setSingleJob } from "@/redux/jobSlice";

const useGetSingleJob = (jobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!jobId) return;

    const fetchSingleJob = async () => {
      try {
        const res = await api.get(`/api/v1/job/get/${jobId}`);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error(
          "Single job fetch error:",
          error.response?.data || error.message
        );
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);
};

export default useGetSingleJob;
