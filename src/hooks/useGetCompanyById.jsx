import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "@/api/api";
import { setSingleCompany } from "@/redux/companySlice";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!companyId) return;

    const fetchSingleCompany = async () => {
      try {
        const res = await api.get(`/api/v1/company/get/${companyId}`);
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.error(
          "Company fetch error:",
          error.response?.data || error.message
        );
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
