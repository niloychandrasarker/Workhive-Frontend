import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import React from "react";
import InviterUserForm from "./InviterUserForm";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";

const ProjectDetails = () => {
  const handleProjectInvitation = () => {};

  return (
    <>
      {/* Team Leader and Team member and project details and TaskList section Start Here*/}
      <div className="mt-5 lg:px-10">
        <div className="lg:flex gap-5 justify-between pb-4">
          <ScrollArea className="h-screen lg:w-[68%] pr-2">
            <div className="text-gray-400 pb-10 w-full">
              <h1 className="text-xl font-semibold pb-5">
                Create Ecommerce Website Using React
              </h1>

              <div className="space-y-5 pb-10 text-lg">
                <p className="w-full md:max-w-lg lg:max-w-xl ">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Esse, nobis!
                </p>

                <div className="flex">
                  <p className="w-36">Project Lead :</p>
                  <p>Niloy</p>
                </div>

                <div className="flex">
                  <p className="w-36">Members :</p>
                  <div className="flex items-center gap-2">
                    {[1, 1, 1, 1].map((item) => (
                      <Avatar className="cursor-pointer" key={item}>
                        <AvatarFallback>N</AvatarFallback>
                      </Avatar>
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

                {/* Invite Section End Here */}

                <div className="flex">
                  <p className="w-36">Category :</p>
                  <p>Fullstake</p>
                </div>

                <div className="flex">
                  <p className="w-36">Status :</p>
                  <Badge>Niloy</Badge>
                </div>
              </div>
              {/* TaskList Section Start Here */}
              <section>
                <p className="py-5 border-b text-lg -tracking-wider">Tasks</p>
                <div className="lg:flex md:flex gap-3 justify-between py-5">
                  <IssueList status="pending" title="Todo List" />
                  <IssueList status="in_progress" title="In Progress" />
                  <IssueList status="done" title="Done" />
                </div>
              </section>
              {/* TaskList Section End Here */}
            </div>
          </ScrollArea>
          {/* Chat Box Section Start Here */}
          <div className="lg:w-[30%] rounded-md sticky right-5 top-10">
            <ChatBox />
          </div>
          {/* Chat Box Section End Here */}
        </div>
      </div>
      {/* Team Leader and Team member and project details and TaskList section Start Here*/}
    </>
  );
};

export default ProjectDetails;
