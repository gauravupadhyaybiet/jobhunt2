import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/api/api";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const { id } = useParams();
  useGetCompanyById(id);

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      setLoading(true);
      const res = await api.put(
        `/api/v1/company/update/${id}`,
        formData
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
            className="mb-4"
          >
            <ArrowLeft /> Back
          </Button>

          <div className="grid grid-cols-2 gap-4">
            {["name", "description", "website", "location"].map((field) => (
              <div key={field}>
                <Label>{field}</Label>
                <Input
                  name={field}
                  value={input[field]}
                  onChange={(e) =>
                    setInput({ ...input, [field]: e.target.value })
                  }
                />
              </div>
            ))}

            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setInput({ ...input, file: e.target.files?.[0] })
                }
              />
            </div>
          </div>

          <Button className="w-full my-4" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
