import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "@/api/api";
import { setAllAdminJobs } from "@/redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await api.get("/api/v1/job/getadminjobs");
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.error(
          "Admin jobs fetch error:",
          error.response?.data || error.message
        );
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
