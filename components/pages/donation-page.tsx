"use client"

import { useState } from "react"
import { DollarSign, TrendingUp, Calendar, CreditCard, Search, Download, Plus, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
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

// Sample donation data
const donations = [
  {
    id: 1,
    donor: "John Smith",
    amount: 500,
    type: "Monthly",
    method: "Credit Card",
    date: "2024-01-15",
    status: "Completed",
  },
  {
    id: 2,
    donor: "Sarah Johnson",
    amount: 1200,
    type: "One Time",
    method: "Bank Transfer",
    date: "2024-01-14",
    status: "Completed",
  },
  {
    id: 3,
    donor: "Michael Brown",
    amount: 2500,
    type: "Yearly",
    method: "Check",
    date: "2024-01-13",
    status: "Pending",
  },
  {
    id: 4,
    donor: "Emily Davis",
    amount: 300,
    type: "Monthly",
    method: "Credit Card",
    date: "2024-01-12",
    status: "Completed",
  },
  {
    id: 5,
    donor: "David Wilson",
    amount: 750,
    type: "Quarterly",
    method: "PayPal",
    date: "2024-01-11",
    status: "Completed",
  },
]

const donationStats = [
  { type: "One Time", count: 1200, amount: 125400, color: "bg-blue-500" },
  { type: "Monthly", count: 800, amount: 240000, color: "bg-green-500" },
  { type: "Yearly", count: 400, amount: 180000, color: "bg-yellow-500" },
  { type: "Quarterly", count: 300, amount: 90000, color: "bg-purple-500" },
]

const monthlyTrends = [
  { month: "Jan", amount: 45000 },
  { month: "Feb", amount: 52000 },
  { month: "Mar", amount: 48000 },
  { month: "Apr", amount: 61000 },
  { month: "May", amount: 55000 },
  { month: "Jun", amount: 67000 },
]

const chartConfig = {
  amount: {
    label: "Amount",
    color: "#8884d8",
  },
} satisfies ChartConfig

export function DonationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [addDonationDialogOpen, setAddDonationDialogOpen] = useState(false)
  const [donationForm, setDonationForm] = useState({
    donor: "",
    amount: "",
    type: "",
    method: "",
    notes: "",
  })

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = donation.donor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || donation.type === filterType
    const matchesStatus = filterStatus === "all" || donation.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "One Time":
        return "bg-blue-100 text-blue-800"
      case "Monthly":
        return "bg-green-100 text-green-800"
      case "Yearly":
        return "bg-yellow-100 text-yellow-800"
      case "Quarterly":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalDonations = donationStats.reduce((sum, stat) => sum + stat.amount, 0)
  const totalDonors = donationStats.reduce((sum, stat) => sum + stat.count, 0)

  const handleAddDonation = () => {
    // Handle add donation logic here
    console.log("Adding donation:", donationForm)
    setDonationForm({
      donor: "",
      amount: "",
      type: "",
      method: "",
      notes: "",
    })
    setAddDonationDialogOpen(false)
  }

  const handleExport = () => {
    // Handle export logic here
    console.log("Exporting donations data...")
    // Create CSV content
    const csvContent = [
      ["Donor", "Amount", "Type", "Method", "Date", "Status"],
      ...filteredDonations.map((donation) => [
        donation.donor,
        donation.amount,
        donation.type,
        donation.method,
        donation.date,
        donation.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "donations-export.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Donation Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDonations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDonors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Donation</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(totalDonations / totalDonors).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per donor</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$67,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Donation Statistics by Type */}
      <div className="grid gap-4 md:grid-cols-4">
        {donationStats.map((stat) => (
          <Card key={stat.type}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.type}</CardTitle>
              <div className={`h-4 w-4 rounded-full ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{stat.count.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">${stat.amount.toLocaleString()} total</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Donor Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Top Donors This Month
          </CardTitle>
          <CardDescription>Recognize our generous contributors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gold-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-muted-foreground">Monthly Donor</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">$2,500</p>
                <p className="text-sm text-muted-foreground">5 donations</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-silver-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Yearly Donor</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">$2,000</p>
                <p className="text-sm text-muted-foreground">1 donation</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-bronze-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <p className="font-medium">Michael Brown</p>
                  <p className="text-sm text-muted-foreground">Quarterly Donor</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">$1,800</p>
                <p className="text-sm text-muted-foreground">3 donations</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Donation Trends</CardTitle>
          <CardDescription>Donation amounts over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="var(--color-amount)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-amount)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Recent Donations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Latest donation transactions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={addDonationDialogOpen} onOpenChange={setAddDonationDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Donation
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Add New Donation</DialogTitle>
                    <DialogDescription>Record a new donation transaction.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="donor" className="text-right">
                        Donor Name
                      </Label>
                      <Input
                        id="donor"
                        placeholder="John Smith"
                        value={donationForm.donor}
                        onChange={(e) => setDonationForm({ ...donationForm, donor: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="amount" className="text-right">
                        Amount ($)
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="100.00"
                        value={donationForm.amount}
                        onChange={(e) => setDonationForm({ ...donationForm, amount: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select
                        value={donationForm.type}
                        onValueChange={(value) => setDonationForm({ ...donationForm, type: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="One Time">One Time</SelectItem>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                          <SelectItem value="Yearly">Yearly</SelectItem>
                          <SelectItem value="Quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="method" className="text-right">
                        Method
                      </Label>
                      <Select
                        value={donationForm.method}
                        onValueChange={(value) => setDonationForm({ ...donationForm, method: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Credit Card">Credit Card</SelectItem>
                          <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                          <SelectItem value="Check">Check</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="PayPal">PayPal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="notes" className="text-right">
                        Notes
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Additional notes..."
                        value={donationForm.notes}
                        onChange={(e) => setDonationForm({ ...donationForm, notes: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddDonationDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddDonation}>Add Donation</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search donors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="One Time">One Time</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Donations Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.donor}</TableCell>
                    <TableCell className="font-semibold">${donation.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getTypeBadgeColor(donation.type)}>{donation.type}</Badge>
                    </TableCell>
                    <TableCell>{donation.method}</TableCell>
                    <TableCell>{donation.date}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(donation.status)}>{donation.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredDonations.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No donations found matching your criteria.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
