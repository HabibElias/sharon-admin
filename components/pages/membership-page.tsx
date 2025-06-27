"use client"

import type React from "react"

import { useState } from "react"
import {
  Users,
  UserPlus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Download,
  Calendar,
  Upload,
  Send,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Textarea } from "@/components/ui/textarea"

// Sample member data
const members = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    category: "Professional",
    status: "Active",
    joinDate: "2023-01-15",
    location: "New York, NY",
    lastAttendance: "2024-01-14",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 234-5678",
    category: "Support",
    status: "Active",
    joinDate: "2023-02-20",
    location: "Los Angeles, CA",
    lastAttendance: "2024-01-14",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@email.com",
    phone: "+1 (555) 345-6789",
    category: "Prayer",
    status: "Inactive",
    joinDate: "2022-11-10",
    location: "Chicago, IL",
    lastAttendance: "2024-01-07",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 456-7890",
    category: "Both",
    status: "Active",
    joinDate: "2023-03-05",
    location: "Houston, TX",
    lastAttendance: "2024-01-14",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "d.wilson@email.com",
    phone: "+1 (555) 567-8901",
    category: "Professional",
    status: "Active",
    joinDate: "2023-01-28",
    location: "Phoenix, AZ",
    lastAttendance: "2024-01-13",
  },
]

const memberStats = [
  { category: "Professional", count: 450, color: "bg-blue-500" },
  { category: "Support", count: 320, color: "bg-green-500" },
  { category: "Prayer", count: 280, color: "bg-yellow-500" },
  { category: "Both", count: 150, color: "bg-purple-500" },
]

export function MembershipPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false)
  const [sendEmailDialogOpen, setSendEmailDialogOpen] = useState(false)
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false)

  const [memberForm, setMemberForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    location: "",
    notes: "",
  })

  const [emailForm, setEmailForm] = useState({
    subject: "",
    message: "",
    recipients: "all",
  })

  const [attendanceForm, setAttendanceForm] = useState({
    startDate: "",
    endDate: "",
    eventType: "all",
  })

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || member.category === filterCategory
    const matchesStatus = filterStatus === "all" || member.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Professional":
        return "bg-blue-100 text-blue-800"
      case "Support":
        return "bg-green-100 text-green-800"
      case "Prayer":
        return "bg-yellow-100 text-yellow-800"
      case "Both":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const handleAddMember = () => {
    console.log("Adding member:", memberForm)
    setMemberForm({
      name: "",
      email: "",
      phone: "",
      category: "",
      location: "",
      notes: "",
    })
    setAddMemberDialogOpen(false)
  }

  const handleSendEmail = () => {
    console.log("Sending email:", emailForm)
    console.log("Recipients:", emailForm.recipients === "all" ? "All members" : "Filtered members")
    setSendEmailDialogOpen(false)
    setEmailForm({
      subject: "",
      message: "",
      recipients: "all",
    })
  }

  const handleExportMembers = () => {
    console.log("Exporting members...")
    const csvContent = [
      ["Name", "Email", "Phone", "Category", "Status", "Join Date", "Location", "Last Attendance"],
      ...filteredMembers.map((member) => [
        member.name,
        member.email,
        member.phone,
        member.category,
        member.status,
        member.joinDate,
        member.location,
        member.lastAttendance,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "members-export.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleImportMembers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log("Importing members from file:", file.name)
      // Handle file processing here
      const reader = new FileReader()
      reader.onload = (e) => {
        const csv = e.target?.result as string
        console.log("CSV content:", csv)
        // Process CSV content here
      }
      reader.readAsText(file)
      setImportDialogOpen(false)
    }
  }

  const handleGenerateAttendanceReport = () => {
    console.log("Generating attendance report:", attendanceForm)

    // Sample attendance data
    const attendanceData = [
      ["Member Name", "Email", "Last Attendance", "Total Attendance", "Attendance Rate"],
      ["John Smith", "john.smith@email.com", "2024-01-14", "45", "90%"],
      ["Sarah Johnson", "sarah.j@email.com", "2024-01-14", "42", "84%"],
      ["Michael Brown", "m.brown@email.com", "2024-01-07", "38", "76%"],
      ["Emily Davis", "emily.davis@email.com", "2024-01-14", "47", "94%"],
      ["David Wilson", "d.wilson@email.com", "2024-01-13", "41", "82%"],
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([attendanceData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `attendance-report-${attendanceForm.startDate}-to-${attendanceForm.endDate}.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    setAttendanceDialogOpen(false)
    setAttendanceForm({
      startDate: "",
      endDate: "",
      eventType: "all",
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Member Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        {memberStats.map((stat) => (
          <Card key={stat.category}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.category}</CardTitle>
              <div className={`h-4 w-4 rounded-full ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{((stat.count / 1200) * 100).toFixed(1)}% of total</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Bulk Actions
          </CardTitle>
          <CardDescription>Perform actions on multiple members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Dialog open={sendEmailDialogOpen} onOpenChange={setSendEmailDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email to All
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Send Email to Members</DialogTitle>
                  <DialogDescription>Send an email to all or filtered members.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="recipients" className="text-right">
                      Recipients
                    </Label>
                    <Select
                      value={emailForm.recipients}
                      onValueChange={(value) => setEmailForm({ ...emailForm, recipients: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Members ({members.length})</SelectItem>
                        <SelectItem value="filtered">Filtered Members ({filteredMembers.length})</SelectItem>
                        <SelectItem value="active">Active Members Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Email subject"
                      value={emailForm.subject}
                      onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
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
                      value={emailForm.message}
                      onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                      className="col-span-3 min-h-[100px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSendEmailDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSendEmail}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm" onClick={handleExportMembers}>
              <Download className="h-4 w-4 mr-2" />
              Export Members
            </Button>

            <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Members
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Import Members</DialogTitle>
                  <DialogDescription>Upload a CSV file to import multiple members at once.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="csvFile">CSV File</Label>
                    <Input id="csvFile" type="file" accept=".csv" onChange={handleImportMembers} />
                    <p className="text-sm text-muted-foreground">
                      CSV should include: Name, Email, Phone, Category, Location
                    </p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm font-medium mb-2">CSV Format Example:</p>
                    <code className="text-xs">
                      Name,Email,Phone,Category,Location
                      <br />
                      John Doe,john@email.com,555-1234,Professional,New York
                    </code>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={attendanceDialogOpen} onOpenChange={setAttendanceDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Attendance Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Generate Attendance Report</DialogTitle>
                  <DialogDescription>Generate a detailed attendance report for the specified period.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={attendanceForm.startDate}
                        onChange={(e) => setAttendanceForm({ ...attendanceForm, startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={attendanceForm.endDate}
                        onChange={(e) => setAttendanceForm({ ...attendanceForm, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Select
                      value={attendanceForm.eventType}
                      onValueChange={(value) => setAttendanceForm({ ...attendanceForm, eventType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="sunday-service">Sunday Service</SelectItem>
                        <SelectItem value="bible-study">Bible Study</SelectItem>
                        <SelectItem value="prayer-meeting">Prayer Meeting</SelectItem>
                        <SelectItem value="special-events">Special Events</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAttendanceDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleGenerateAttendanceReport}>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Member Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Member Management
              </CardTitle>
              <CardDescription>Manage and view all church members</CardDescription>
            </div>
            <Dialog open={addMemberDialogOpen} onOpenChange={setAddMemberDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Member</DialogTitle>
                  <DialogDescription>Add a new member to the church community.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={memberForm.name}
                      onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={memberForm.email}
                      onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={memberForm.phone}
                      onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select
                      value={memberForm.category}
                      onValueChange={(value) => setMemberForm({ ...memberForm, category: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Professional">Professional</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                        <SelectItem value="Prayer">Prayer</SelectItem>
                        <SelectItem value="Both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="New York, NY"
                      value={memberForm.location}
                      onChange={(e) => setMemberForm({ ...memberForm, location: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notes
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional notes..."
                      value={memberForm.notes}
                      onChange={(e) => setMemberForm({ ...memberForm, notes: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddMemberDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMember}>Add Member</Button>
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
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Prayer">Prayer</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Members Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {member.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryBadgeColor(member.category)}>{member.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(member.status)}>{member.status}</Badge>
                    </TableCell>
                    <TableCell>{member.joinDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {member.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Member
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No members found matching your criteria.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
