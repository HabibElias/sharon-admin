"use client"

import { useState } from "react"
import {
  FileText,
  BookOpen,
  Video,
  Music,
  ImageIcon,
  Download,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
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

// Sample resource data
const resources = [
  {
    id: 1,
    title: "Sunday Service Guide",
    type: "Document",
    category: "Worship",
    size: "2.4 MB",
    downloads: 145,
    uploadDate: "2024-01-15",
    uploadedBy: "Pastor John",
    status: "Published",
  },
  {
    id: 2,
    title: "The Purpose Driven Life",
    type: "Book",
    category: "Spiritual Growth",
    size: "8.5 MB",
    downloads: 312,
    uploadDate: "2024-01-14",
    uploadedBy: "Library Admin",
    status: "Published",
  },
  {
    id: 3,
    title: "Youth Ministry Handbook",
    type: "PDF",
    category: "Ministry",
    size: "5.2 MB",
    downloads: 89,
    uploadDate: "2024-01-12",
    uploadedBy: "Sarah Johnson",
    status: "Published",
  },
  {
    id: 4,
    title: "Mere Christianity",
    type: "Book",
    category: "Theology",
    size: "12.3 MB",
    downloads: 267,
    uploadDate: "2024-01-10",
    uploadedBy: "Library Admin",
    status: "Published",
  },
  {
    id: 5,
    title: "Christmas Carol Collection",
    type: "Audio",
    category: "Music",
    size: "45.6 MB",
    downloads: 234,
    uploadDate: "2023-12-20",
    uploadedBy: "Music Director",
    status: "Published",
  },
  {
    id: 6,
    title: "Bible Study Materials",
    type: "Document",
    category: "Education",
    size: "3.1 MB",
    downloads: 167,
    uploadDate: "2024-01-10",
    uploadedBy: "Elder Smith",
    status: "Draft",
  },
  {
    id: 7,
    title: "Jesus Calling Devotional",
    type: "Book",
    category: "Devotional",
    size: "6.8 MB",
    downloads: 189,
    uploadDate: "2024-01-08",
    uploadedBy: "Library Admin",
    status: "Published",
  },
  {
    id: 8,
    title: "Community Outreach Video",
    type: "Video",
    category: "Outreach",
    size: "125.8 MB",
    downloads: 78,
    uploadDate: "2024-01-08",
    uploadedBy: "Media Team",
    status: "Published",
  },
]

const resourceStats = [
  { type: "Documents", count: 156, icon: FileText, color: "bg-blue-500" },
  { type: "Books", count: 67, icon: BookOpen, color: "bg-indigo-500" },
  { type: "Videos", count: 43, icon: Video, color: "bg-red-500" },
  { type: "Audio", count: 89, icon: Music, color: "bg-green-500" },
  { type: "Images", count: 234, icon: ImageIcon, color: "bg-yellow-500" },
]

const categories = [
  "All",
  "Worship",
  "Ministry",
  "Music",
  "Education",
  "Outreach",
  "Spiritual Growth",
  "Theology",
  "Devotional",
]

export function ResourcePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    title: "",
    type: "",
    category: "",
    description: "",
    file: null as File | null,
  })

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || resource.type.toLowerCase() === filterType.toLowerCase()
    const matchesCategory = filterCategory === "all" || resource.category === filterCategory
    const matchesStatus = filterStatus === "all" || resource.status === filterStatus

    return matchesSearch && matchesType && matchesCategory && matchesStatus
  })

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "book":
        return BookOpen
      case "document":
      case "pdf":
        return FileText
      case "video":
        return Video
      case "audio":
        return Music
      case "image":
        return ImageIcon
      default:
        return FileText
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "book":
        return "bg-indigo-100 text-indigo-800"
      case "document":
      case "pdf":
        return "bg-blue-100 text-blue-800"
      case "video":
        return "bg-red-100 text-red-800"
      case "audio":
        return "bg-green-100 text-green-800"
      case "image":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "Archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleUpload = () => {
    // Handle upload logic here
    console.log("Uploading resource:", uploadForm)
    setUploadForm({
      title: "",
      type: "",
      category: "",
      description: "",
      file: null,
    })
    setUploadDialogOpen(false)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Resource Statistics */}
      <div className="grid gap-4 md:grid-cols-5">
        {resourceStats.map((stat) => {
          const IconComponent = stat.icon
          return (
            <Card key={stat.type}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.type}</CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total resources</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Resource Library */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Resource Library
              </CardTitle>
              <CardDescription>Manage and organize church resources</CardDescription>
            </div>
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Upload Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Upload New Resource</DialogTitle>
                  <DialogDescription>Add a new resource to the church library.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Resource title"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select
                      value={uploadForm.type}
                      onValueChange={(value) => setUploadForm({ ...uploadForm, type: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="book">Book</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select
                      value={uploadForm.category}
                      onValueChange={(value) => setUploadForm({ ...uploadForm, category: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right">
                      File
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Resource description..."
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpload}>Upload Resource</Button>
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
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="book">Books</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Resources Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResources.map((resource) => {
                  const TypeIcon = getTypeIcon(resource.type)
                  return (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{resource.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeBadgeColor(resource.type)}>{resource.type}</Badge>
                      </TableCell>
                      <TableCell>{resource.category}</TableCell>
                      <TableCell>{resource.size}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {resource.downloads}
                        </div>
                      </TableCell>
                      <TableCell>{resource.uploadedBy}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(resource.status)}>{resource.status}</Badge>
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
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No resources found matching your criteria.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
