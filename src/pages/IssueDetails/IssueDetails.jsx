import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useParams } from "react-router-dom";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssueById, updateIssueStatus } from "@/Redux/Issue/Action";
import { fetchComments } from "@/Redux/Comment/Action";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();

  const dispatch = useDispatch();
  const { issue, comment } = useSelector((store) => store);

  const handleUpdateIssueStatus = (status) => {
    dispatch(updateIssueStatus({ status, id: issueId }));
    console.log(status);
  };

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchComments(issueId));
  }, [issueId]);
  return (
    <Card className="container mt-5 text-gray-400 md:p-8 p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          {issue.issueDetails?.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex md:flex-row flex-col-reverse justify-between gap-5 w-full">
          <div className="h-[68vh] lg:w-9/12 md:w-8/12 w-full">
            <div className="py-5">
              <h className="font-semibold text-gray-400">Description</h>
              <p className="text-gray-400 text-sm mt-3">
                {issue.issueDetails?.description}
              </p>
            </div>
            <ScrollArea className="h-[60vh]">
              <div className="mt-5">
                <h1 className="pb-3">Activity</h1>
                <Tabs defaultValue="comments">
                  <TabsList className="mb-5">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    all make change to your account here
                  </TabsContent>
                  <TabsContent value="comments">
                    <CreateCommentForm issueId={issueId} />
                    <div className="mt-8 space-y-6">
                      {comment.comments.map((item) => (
                        <CommentCard item={item} key={item} />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="history">
                    History Change your password here
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          </div>

          <div className="lg:w-3/12 md:w-4/12 w-full space-y-2">
            <Select onValueChange={handleUpdateIssueStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="To Do" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done ">Done</SelectItem>
              </SelectContent>
            </Select>

            <div className="border rounded-lg">
              <p className="border-b py-3 px-5">Details</p>

              <div className="p-5">
                <div className="space-y-7">
                  <div className="flex gap-10 items-center lg:text-base text-sm">
                    <p className="w-[7rem]">Assignee</p>
                    {issue.issueDetails?.assignee?.fullName ? (
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 text-xs">
                          <AvatarFallback>
                            {issue.issueDetails?.assignee?.fullName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <p>{issue.issueDetails?.assignee?.fullName}</p>
                      </div>
                    ) : (
                      <p>unassigned</p>
                    )}
                  </div>

                  <div className="flex gap-10 items-center">
                    <p className="w-[7rem]">Labels</p>
                    <p>None </p>
                  </div>

                  <div className="flex gap-10 items-center">
                    <p className="w-[7rem]">Status</p>
                    <Badge>{issue.issueDetails?.status}</Badge>
                  </div>

                  <div className="flex gap-10 items-center">
                    <p className="w-[7rem]">Realese</p>
                    <p>19-01-2025</p>
                  </div>

                  <div className="flex gap-10 items-center">
                    <p className="w-[7rem]">Repoter</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 text-xs">
                        <AvatarFallback>N</AvatarFallback>
                      </Avatar>
                      <p>Niloy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueDetails;
