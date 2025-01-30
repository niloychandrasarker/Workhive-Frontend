import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import InviterUserForm from "./InviterUserForm";
import IssueList from "./IssueList";
import FloatingChat from "@/pages/ProjectDetails/FloatingChat.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "@/Redux/Project/Action";
import { useParams } from "react-router-dom";
import { store } from "@/Redux/Store";
// const memberList = [
//   {
//     name: "Niloy Chandra Sarker",
//     role: "Team Leader",
//     initial: "N",
//     profilePicture:
//       "https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     name: "Arafat Hossain",
//     role: "Software Engineer",
//     initial: "A",
//     profilePicture:
//       "https://images.pexels.com/photos/11650772/pexels-photo-11650772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     name: "Rakib Hossain",
//     role: "Junior Software Engineer",
//     initial: "R",
//     profilePicture:
//       "https://images.pexels.com/photos/804009/pexels-photo-804009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     name: "Jhon Doe",
//     role: "Software Engineer",
//     initial: "R",
//     profilePicture:
//       "https://images.pexels.com/photos/1812634/pexels-photo-1812634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
// ];
const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);
  const { id } = useParams();

  const handleProjectInvitation = () => {};

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id]);

  return (
    <>
      <FloatingChat />
      {/* Team Leader and Team member and project details and TaskList section Start Here*/}
      <div className="container mt-5 lg:px-10">
        <div className="lg:flex gap-5 justify-between pb-4">
          <ScrollArea className="h-screen w-full pr-2">
            <div className="text-gray-400 pb-10 w-full">
              <Card>
                <CardHeader>
                  <CardTitle className={"text-2xl"}>
                    {project.projectDetails?.name}
                  </CardTitle>
                  <CardDescription className={"text-lg"}>
                    {project.projectDetails?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className={"text-lg"}>
                  <p className="mt-5 ">
                    <b>Project Lead :</b>{" "}
                    {project.projectDetails?.owner.fullName}
                  </p>
                  <div className="flex items-center mt-5">
                    <p className="mr-8 font-bold">Members :</p>
                    <div className="flex items-center">
                      {project.projectDetails?.team.map((member, index) => (
                        <TooltipProvider key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Avatar
                                size="sm"
                                className="cursor-pointer -ml-4 border border-violet-600 w-8 h-8"
                              >
                                {/* <AvatarImage
                                  src={member.profilePicture}
                                  alt={member.name}
                                /> */}
                                <AvatarFallback>
                                  {member.fullName[0]}
                                </AvatarFallback>
                              </Avatar>
                            </TooltipTrigger>
                            {/* <TooltipContent>
                              <p>{member.name}</p>
                              <p>{member.role}</p>
                            </TooltipContent> */}
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                    {/* Invite Section Start Here */}
                    <Dialog>
                      <DialogTrigger>
                        <DialogClose>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleProjectInvitation}
                            className="ml-2"
                          >
                            <span>invite</span>
                            <PlusIcon className="w-3 h-3" />
                          </Button>
                        </DialogClose>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>Invite User</DialogHeader>
                        <InviterUserForm />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <p className="mt-5">
                    <b>Category: </b> {project.projectDetails?.category}
                  </p>
                  <p className="mt-5">
                    <b>Status: </b> <Badge>Active</Badge>
                  </p>
                </CardContent>
              </Card>

              {/* TaskList Section Start Here */}
              <Card className=" mt-5">
                {/* Section Header */}
                <CardHeader>
                  <h2 className="text-2xl font-bold tracking-wide"> Tasks</h2>
                </CardHeader>
                <Separator />
                <CardContent className={"mt-5"}>
                  <div className="grid  lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-4">
                    <IssueList status="pending" title="Todo List" />
                    <IssueList status="in_progress" title="In Progress" />
                    <IssueList status="done" title="Done" />
                  </div>
                </CardContent>
                {/* Task Lists */}
              </Card>

              {/* TaskList Section End Here */}
            </div>
          </ScrollArea>
        </div>
      </div>
      {/* Team Leader and Team member and project details and TaskList section Start Here*/}
    </>
  );
};

export default ProjectDetails;
