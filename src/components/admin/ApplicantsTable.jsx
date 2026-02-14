import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import api from "@/api/api";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await api.post(
        `/api/v1/application/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  return (
    <Table>
      <TableCaption>A list of recent applicants</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {applicants?.applications?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No applicants found
            </TableCell>
          </TableRow>
        ) : (
          applicants?.applications?.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item?.applicant?.fullname || "N/A"}</TableCell>
              <TableCell>{item?.applicant?.email || "N/A"}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber || "N/A"}</TableCell>

              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {item.applicant.profile.resumeOriginalName}
                  </a>
                ) : (
                  "NA"
                )}
              </TableCell>

              <TableCell>
                {item?.createdAt
                  ? item.createdAt.split("T")[0]
                  : "N/A"}
              </TableCell>

              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent>
                    {shortlistingStatus.map((status) => (
                      <div
                        key={status}
                        onClick={() => statusHandler(status, item._id)}
                        className="cursor-pointer my-2"
                      >
                        {status}
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ApplicantsTable;
