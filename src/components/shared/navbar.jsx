import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import api from "@/api/api";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await api.get("/api/v1/user/logout");

      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed"
      );
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">

        <h1 className="text-2xl font-bold">
          job<span className="text-[#F83002]">portal</span>
        </h1>

        <div className="flex items-center gap-12">

          <ul className="flex font-medium items-center gap-5">

            {user && user.role === "recuiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}

          </ul>

          {!user ? (

            <div className="flex items-center gap-2">

              <Link to="/Login">
                <Button variant="outline">Login</Button>
              </Link>

              <Link to="/Signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Sign up
                </Button>
              </Link>

            </div>

          ) : (

            <Popover>

              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80">

                <div className="flex gap-4">

                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>

                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>

                </div>

                <div className="flex flex-col my-3 text-gray-500">

                  {user?.role === "student" && (
                    <Link to="/profile" className="flex items-center gap-2 my-1">
                      <User2 />
                      <span className="cursor-pointer">View Profile</span>
                    </Link>
                  )}

                  <div
                    onClick={logoutHandler}
                    className="flex items-center gap-2 cursor-pointer my-1"
                  >
                    <LogOut />
                    <span>Logout</span>
                  </div>

                </div>

              </PopoverContent>

            </Popover>

          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;



