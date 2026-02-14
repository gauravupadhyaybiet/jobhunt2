import React, { useState } from "react";
import Navbar from "../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import api from "@/api/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {

  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });


  /* ================= INPUT CHANGE ================= */

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };


  /* ================= SUBMIT ================= */

  const submitHandler = async (e) => {

    e.preventDefault();

    if (!input.companyId) {
      toast.error("Please select company first");
      return;
    }

    if (!input.title || !input.description) {
      toast.error("Fill required fields");
      return;
    }

    try {

      setLoading(true);

      /* 🔥 PAYLOAD MUST MATCH BACKEND EXACTLY */

      const payload = {
        title: input.title,
        description: input.description,
        requirments: input.requirements,   // ⚠️ MUST USE BACKEND SPELLING
        salary: input.salary,
        location: input.location,
        jobType: input.jobType,
        experience: input.experience,
        position: input.position,
        companyId: input.companyId,
      };

      console.log("Sending payload:", payload);   // DEBUG

      const res = await api.post("/api/v1/job/post", payload);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Post failed");
    } finally {
      setLoading(false);
    }
  };


  /* ================= UI ================= */

  return (
    <div>

      <Navbar />

      <div className="flex items-center justify-center w-screen my-5">

        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border shadow-lg rounded-md"
        >

          <div className="grid grid-cols-2 gap-3">

            <div>
              <Label>Title</Label>
              <Input name="title" value={input.title} onChange={changeHandler}/>
            </div>

            <div>
              <Label>Description</Label>
              <Input name="description" value={input.description} onChange={changeHandler}/>
            </div>

            <div>
              <Label>Requirements (comma separated)</Label>
              <Input name="requirements" value={input.requirements} onChange={changeHandler}/>
            </div>

            <div>
              <Label>Salary</Label>
              <Input name="salary" value={input.salary} onChange={changeHandler}/>
            </div>

            <div>
              <Label>Location</Label>
              <Input name="location" value={input.location} onChange={changeHandler}/>
            </div>

            <div>
              <Label>Job Type</Label>
              <Input name="jobType" value={input.jobType} onChange={changeHandler}/>
            </div>

            <div>
              <Label>Experience</Label>
              <Input name="experience" value={input.experience} onChange={changeHandler}/>
            </div>

            <div>
              <Label>No of Positions</Label>
              <Input name="position" value={input.position} onChange={changeHandler}/>
            </div>


            {/* ================= COMPANY SELECT ================= */}

            {companies.length > 0 && (

              <div className="col-span-2">

                <Label>Select Company</Label>

                <Select
                  onValueChange={(value) =>
                    setInput({ ...input, companyId: value })
                  }
                >

                  <SelectTrigger>
                    <SelectValue placeholder="Choose company"/>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>

                </Select>

              </div>

            )}

          </div>


          <Button type="submit" className="w-full my-4">

            {loading
              ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              : "Post Job"
            }

          </Button>

        </form>

      </div>

    </div>
  );
};

export default PostJob;


