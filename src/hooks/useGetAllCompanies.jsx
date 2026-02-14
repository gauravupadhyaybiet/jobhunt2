import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "@/api/api";
import { setCompanies } from "@/redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get("/api/v1/company/get");
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error(
          "Companies fetch error:",
          error.response?.data || error.message
        );
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
