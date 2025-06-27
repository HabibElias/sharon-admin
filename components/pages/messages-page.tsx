"use client"

import { useState } from "react"
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
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Sample message data with full content
const messages = [
  {
    id: 1,
    sender: "John Smith",
    email: "john.smith@email.com",
    subject: "Prayer Request for Family",
    preview: "Dear Pastor, I would like to request prayers for my family during this difficult time...",
    fullContent: `Dear Pastor,

I hope this message finds you well. I would like to request prayers for my family during this difficult time we are going through.

My father was recently diagnosed with a serious illness, and we are all struggling to cope with the news. The doctors have given us hope, but the road ahead looks challenging. We would be grateful for the prayers and support of our church community.

Additionally, my teenage son has been having difficulties at school, and we could use guidance and prayers for wisdom in helping him through this period.

I know that God has a plan for us, and I trust in His will, but I would appreciate the prayers of our church family during this time.

Thank you for your time and consideration.

God bless,
John Smith`,
    date: "2024-01-15",
    time: "10:30 AM",
    status: "Unread",
    priority: "High",
    category: "Prayer Request",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    sender: "Sarah Johnson",
    email: "sarah.j@email.com",
    subject: "Volunteer Opportunity",
    preview: "Hi, I'm interested in volunteering for the upcoming community outreach program...",
    fullContent: `Hi there,

I hope you're doing well. I'm writing to express my interest in volunteering for the upcoming community outreach program that was announced last Sunday.

I have experience working with children and would love to help with the youth activities. I'm also available to help with food preparation and distribution if needed.

My availability is:
- Weekends: Fully available
- Weekdays: Available after 6 PM
- Special events: Can take time off work if needed

Please let me know how I can best contribute to this wonderful initiative. I'm excited to serve our community and make a positive impact.

Looking forward to hearing from you.

Best regards,
Sarah Johnson`,
    date: "2024-01-14",
    time: "2:15 PM",
    status: "Read",
    priority: "Medium",
    category: "Volunteer",
    phone: "+1 (555) 234-5678",
  },
  {
    id: 3,
    sender: "Michael Brown",
    email: "m.brown@email.com",
    subject: "Question about Bible Study",
    preview: "I have some questions about the topics we discussed in last week's Bible study...",
    fullContent: `Hello,

I have some questions about the topics we discussed in last week's Bible study session. The discussion about faith and works really got me thinking, and I'd love to explore this topic further.

Specifically, I'm wondering about:
1. How do we balance faith and good works in our daily lives?
2. What does it mean to have "faith without works is dead"?
3. Are there practical ways to demonstrate our faith through actions?

I've been reading James 2:14-26, but I'd appreciate your insights and perhaps some additional scripture references that might help me understand this better.

Would it be possible to discuss this during our next session, or would you prefer to meet separately?

Thank you for your time and guidance.

In Christ,
Michael Brown`,
    date: "2024-01-13",
    time: "7:45 PM",
    status: "Replied",
    priority: "Low",
    category: "Education",
    phone: "+1 (555) 345-6789",
  },
  {
    id: 4,
    sender: "Emily Davis",
    email: "emily.davis@email.com",
    subject: "Wedding Ceremony Inquiry",
    preview: "We would like to inquire about having our wedding ceremony at the church...",
    fullContent: `Dear Church Administration,

My fiancé and I would like to inquire about having our wedding ceremony at Grace Community Church. We have been attending services for the past two years and feel that this is where we want to begin our married life together.

Wedding Details:
- Proposed Date: June 15, 2024 (Saturday)
- Time: 2:00 PM
- Expected Guests: Approximately 150 people
- Reception: We plan to have the reception at a separate venue

We would love to schedule a meeting to discuss:
- Availability of the sanctuary
- Wedding ceremony requirements
- Pre-marital counseling sessions
- Fees and donations
- Available dates for rehearsal

We are flexible with dates and would appreciate any guidance you can provide. This is a very important step in our lives, and we want to ensure everything is done properly and in accordance with our faith.

Thank you for considering our request. We look forward to hearing from you soon.

Blessings,
Emily Davis & James Wilson`,
    date: "2024-01-12",
    time: "11:20 AM",
    status: "Unread",
    priority: "High",
    category: "Event",
    phone: "+1 (555) 456-7890",
  },
  {
    id: 5,
    sender: "David Wilson",
    email: "d.wilson@email.com",
    subject: "Thank You Note",
    preview: "Thank you so much for the wonderful service last Sunday. It was truly inspiring...",
    fullContent: `Dear Pastor and Church Family,

Thank you so much for the wonderful service last Sunday. The sermon on "Finding Hope in Difficult Times" was exactly what I needed to hear, and it truly touched my heart.

I've been going through a challenging period in my life, dealing with job loss and family issues. Your words reminded me that God is always with us, even in our darkest moments. The way you connected the scripture to real-life situations was powerful and meaningful.

I also want to thank the worship team for the beautiful music. The hymn "Amazing Grace" brought tears to my eyes and filled me with peace.

This church has become such an important part of my life, and I'm grateful for the loving community we have here. Thank you for creating a space where people can come as they are and find comfort, hope, and spiritual growth.

I'm looking forward to continuing my journey of faith with this wonderful congregation.

With gratitude and blessings,
David Wilson

P.S. I've enclosed a small donation to support the church's ministries.`,
    date: "2024-01-11",
    time: "4:30 PM",
    status: "Read",
    priority: "Low",
    category: "Feedback",
    phone: "+1 (555) 567-8901",
  },
]

const messageStats = [
  { label: "Total Messages", count: 156, icon: MessageSquare, color: "bg-blue-500" },
  { label: "Unread", count: 12, icon: Clock, color: "bg-red-500" },
  { label: "Replied", count: 89, icon: Reply, color: "bg-green-500" },
  { label: "Archived", count: 55, icon: Archive, color: "bg-gray-500" },
]

export function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState<(typeof messages)[0] | null>(null)
  const [replyText, setReplyText] = useState("")
  const [viewMessageDialogOpen, setViewMessageDialogOpen] = useState(false)

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || message.status === filterStatus
    const matchesCategory = filterCategory === "all" || message.category === filterCategory
    const matchesPriority = filterPriority === "all" || message.priority === filterPriority

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority
  })

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Unread":
        return "bg-red-100 text-red-800"
      case "Read":
        return "bg-blue-100 text-blue-800"
      case "Replied":
        return "bg-green-100 text-green-800"
      case "Archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleViewMessage = (message: (typeof messages)[0]) => {
    setSelectedMessage(message)
    setViewMessageDialogOpen(true)
  }

  const handleReply = () => {
    console.log("Replying to:", selectedMessage?.id, "with:", replyText)
    setReplyText("")
    setSelectedMessage(null)
    setViewMessageDialogOpen(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Message Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        {messageStats.map((stat) => {
          const IconComponent = stat.icon
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.label === "Unread" && "Need attention"}
                  {stat.label === "Replied" && "Responses sent"}
                  {stat.label === "Archived" && "Stored messages"}
                  {stat.label === "Total Messages" && "All messages"}
                </p>
              </CardContent>
            </Card>
          )
        })}
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
              <CardDescription>Manage and respond to church messages</CardDescription>
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
                  <DialogDescription>Send a message to church members or visitors.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="to" className="text-right">
                      To
                    </Label>
                    <Input id="to" placeholder="recipient@email.com" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                      Subject
                    </Label>
                    <Input id="subject" placeholder="Message subject" className="col-span-3" />
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
              <Select value={filterStatus} onValueChange={setFilterStatus}>
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
              </Select>
            </div>
          </div>

          {/* Messages Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sender</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow
                    key={message.id}
                    className={`cursor-pointer hover:bg-muted/50 ${message.status === "Unread" ? "bg-blue-50" : ""}`}
                    onClick={() => handleViewMessage(message)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                          <AvatarFallback>{getInitials(message.sender)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{message.sender}</span>
                          <span className="text-sm text-muted-foreground">{message.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{message.subject}</span>
                        <span className="text-sm text-muted-foreground truncate max-w-[200px]">{message.preview}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{message.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityBadgeColor(message.priority)}>{message.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{message.date}</span>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(message.status)}>{message.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewMessage(message)
                            }}
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedMessage(message)
                            }}
                          >
                            <Reply className="mr-2 h-4 w-4" />
                            Reply
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Star className="mr-2 h-4 w-4" />
                            Mark Important
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>
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

          {filteredMessages.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No messages found matching your criteria.</div>
          )}
        </CardContent>
      </Card>

      {/* Message Detail Dialog */}
      <Dialog open={viewMessageDialogOpen} onOpenChange={setViewMessageDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                <AvatarFallback>{selectedMessage ? getInitials(selectedMessage.sender) : ""}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <DialogTitle className="text-left">{selectedMessage?.subject}</DialogTitle>
                <DialogDescription className="text-left">
                  From: {selectedMessage?.sender} ({selectedMessage?.email})
                </DialogDescription>
              </div>
              <div className="flex gap-2">
                <Badge className={getPriorityBadgeColor(selectedMessage?.priority || "")}>
                  {selectedMessage?.priority}
                </Badge>
                <Badge variant="outline">{selectedMessage?.category}</Badge>
              </div>
            </div>
          </DialogHeader>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {selectedMessage?.date} at {selectedMessage?.time}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {selectedMessage?.phone}
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{selectedMessage?.fullContent}</div>
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
            <Button variant="outline" onClick={() => setViewMessageDialogOpen(false)}>
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
      <Dialog open={!!selectedMessage && !viewMessageDialogOpen} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
            <DialogDescription>Replying to: {selectedMessage?.subject}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reply-to" className="text-right">
                To
              </Label>
              <Input id="reply-to" value={selectedMessage?.email || ""} disabled className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reply-subject" className="text-right">
                Subject
              </Label>
              <Input id="reply-subject" value={`Re: ${selectedMessage?.subject || ""}`} className="col-span-3" />
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
            <Button variant="outline" onClick={() => setSelectedMessage(null)}>
              Cancel
            </Button>
            <Button onClick={handleReply}>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
