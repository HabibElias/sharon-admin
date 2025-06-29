"use client";

import { useMemo, useState } from "react";
import {
  MessageSquare,
  Send,
  Search,
  MoreHorizontal,
  Reply,
  Archive,
  Trash2,
  Star,
  Clock,
  User,
  Calendar,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Message from "@/models/Message";
import useMessages from "@/hooks/use-messages";

// Sample message data with full content

export function MessagesPage() {
  const { data: messages, error, isLoading } = useMessages();
  const [searchTerm, setSearchTerm] = useState("");
  // const [filterStatus, setFilterStatus] = useState("all");
  // const [filterCategory, setFilterCategory] = useState("all");
  // const [filterPriority, setFilterPriority] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<Message>();
  const [replyText, setReplyText] = useState("");
  const [viewMessageDialogOpen, setViewMessageDialogOpen] = useState(false);

  const filteredMessages = useMemo(
    () =>
      messages?.filter((message) =>
        message.sender.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, messages]
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Unread":
        return "bg-red-100 text-red-800";
      case "Read":
        return "bg-blue-100 text-blue-800";
      case "Replied":
        return "bg-green-100 text-green-800";
      case "Archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setViewMessageDialogOpen(true);
  };

  const handleReply = () => {
    console.log("Replying to:", selectedMessage?.id, "with:", replyText);
    setReplyText("");
    setSelectedMessage(undefined);
    setViewMessageDialogOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <p>Loading messages...{process.env.NEXT_PUBLIC_APP_URL ?? "no value"}</p>
    );
  }

  if (error) {
    return <p>Error loading messages: {error.message}</p>;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Message Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages?.length}</div>
            <p className="text-xs text-muted-foreground">All messages</p>
          </CardContent>
        </Card>
      </div>

      {/* Messages Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Messages
              </CardTitle>
              <CardDescription>
                Manage and respond to church messages
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Compose Message
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Compose New Message</DialogTitle>
                  <DialogDescription>
                    Send a message to church members or visitors.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="to" className="text-right">
                      To
                    </Label>
                    <Input
                      id="to"
                      placeholder="recipient@email.com"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Message subject"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="message" className="text-right">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Type your message here..."
                      className="col-span-3 min-h-[100px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Send Message</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Unread">Unread</SelectItem>
                  <SelectItem value="Read">Read</SelectItem>
                  <SelectItem value="Replied">Replied</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Prayer Request">Prayer Request</SelectItem>
                  <SelectItem value="Volunteer">Volunteer</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Event">Event</SelectItem>
                  <SelectItem value="Feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
          </div>

          {/* Messages Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sender</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages?.map((message) => (
                  <TableRow
                    key={message.id}
                    className={`cursor-pointer hover:bg-muted/50`}
                    onClick={() => handleViewMessage(message)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32`}
                          />
                          <AvatarFallback>
                            {getInitials(message.sender)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{message.sender}</span>
                          <span className="text-sm text-muted-foreground">
                            {message.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{message.subject}</span>
                        <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {message.fullContent.slice(0, 50)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{new Date(message.date).toLocaleDateString()}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.date).toLocaleTimeString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewMessage(message);
                            }}
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMessage(message);
                            }}
                          >
                            <Reply className="mr-2 h-4 w-4" />
                            Reply
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Star className="mr-2 h-4 w-4" />
                            Mark Important
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Message Detail Dialog */}
      <Dialog
        open={viewMessageDialogOpen}
        onOpenChange={setViewMessageDialogOpen}
      >
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                <AvatarFallback>
                  {selectedMessage ? getInitials(selectedMessage.sender) : ""}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <DialogTitle className="text-left">
                  {selectedMessage?.subject}
                </DialogTitle>
                <DialogDescription className="text-left">
                  From: {selectedMessage?.sender} ({selectedMessage?.email})
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(
                  selectedMessage?.date ?? ""
                ).toLocaleDateString()} at{" "}
                {new Date(selectedMessage?.date ?? "").toTimeString()}
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {selectedMessage?.fullContent}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label htmlFor="reply-message">Reply</Label>
            <Textarea
              id="reply-message"
              placeholder="Type your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setViewMessageDialogOpen(false)}
            >
              Close
            </Button>
            <Button onClick={handleReply} className="flex items-center gap-2">
              <Reply className="h-4 w-4" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog
        open={!!selectedMessage && !viewMessageDialogOpen}
        onOpenChange={() => setSelectedMessage(undefined)}
      >
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
            <DialogDescription>
              Replying to: {selectedMessage?.subject}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reply-to" className="text-right">
                To
              </Label>
              <Input
                id="reply-to"
                value={selectedMessage?.email || ""}
                disabled
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reply-subject" className="text-right">
                Subject
              </Label>
              <Input
                id="reply-subject"
                value={`Re: ${selectedMessage?.subject || ""}`}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reply-message" className="text-right">
                Message
              </Label>
              <Textarea
                id="reply-message"
                placeholder="Type your reply here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="col-span-3 min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedMessage(undefined)}
            >
              Cancel
            </Button>
            <Button onClick={handleReply}>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
