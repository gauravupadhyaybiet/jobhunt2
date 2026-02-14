import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "@/api/api";
import { setAllJobs } from "@/redux/jobSlice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await api.get("/api/v1/job/get", {
          params: searchedQuery, // ✅ send object safely
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error(
          "Jobs fetch error:",
          error.response?.data || error.message
        );
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]); // ✅ re-fetch when filters change
};

export default useGetAllJobs;
