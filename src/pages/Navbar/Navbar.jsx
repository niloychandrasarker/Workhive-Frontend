import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateProjectFrom from "../Project/CreateProjectFrom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux/Auth/Action";

const Navbar = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className=" relative border-b py-4 px-5 flex items-center justify-between">
      {/* Logo and Desktop Nav */}
      <div className="flex items-center gap-3">
        <p
          onClick={() => navigate("/")}
          className="cursor-pointer text-2xl font-bold md:text-3xl"
        >
          WorkHive
        </p>
        <div className="hidden md:flex items-center gap-3">
          <Dialog>
            <DialogTrigger>
              <Button variant="ghost">New Project</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Create New Project</DialogHeader>
              <CreateProjectFrom />
            </DialogContent>
          </Dialog>
          <Button onClick={() => navigate("/upgrade_plan")} variant="ghost">
            Upgrade
          </Button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex gap-3 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-2 border-gray-500"
            >
              <PersonIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuTrigger>
            <DropdownMenuContent onClick={handleLogout}>
              Logout
            </DropdownMenuContent>
          </DropdownMenuTrigger>
        </DropdownMenu>
        <p className="hidden sm:block">{auth.user?.fullName}</p>
      </div>

      {/* Mobile Menu */}
      <Card
        className={`${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        } overflow-hidden absolute top-full left-0 w-full z-50 shadow-lg transform transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col p-4 gap-3 opacity-100 transition-opacity duration-300 ease-in-out">
          <div className="flex justify-between items-center">
            <p>{auth.user?.fullName}</p>
            <Button size="icon" className="rounded-full">
              <PersonIcon />
            </Button>
          </div>
          <Separator />
          <ul className="flex flex-col gap-3 items-start w-full">
            <li className={"w-full cursor-pointer py-2  hover:bg-gray-800"}>
              <Dialog>
                <DialogTrigger>
                  <Button variant="ghost">New Project</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>Create New Project</DialogHeader>
                  <CreateProjectFrom />
                </DialogContent>
              </Dialog>
            </li>
            <li
              className={"w-full cursor-pointer py-2 px-4 hover:bg-gray-800"}
              onClick={() => navigate("/upgrade_plan")}
            >
              {" "}
              Upgrade
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default Navbar;
