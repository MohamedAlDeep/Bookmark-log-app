"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BookOpen, ExternalLink, Plus, Search, Trash2, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Book {
  id: string
  title: string
  author: string
  description: string
  link: string
  tags: string[]
  dateAdded: string
}

export default function BookmarkManager() {
  const [books, setBooks] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    link: "",
    tags: "",
  })
  const { toast } = useToast()

  // Load books from localStorage on component mount
  useEffect(() => {
    const savedBooks = localStorage.getItem("bookmarks")
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks))
    }
  }, [])

  // Save books to localStorage whenever books array changes
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(books))
  }, [books])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.author || !formData.link) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the title, author, and link fields.",
        variant: "destructive",
      })
      return
    }

    const newBook: Book = {
      id: Date.now().toString(),
      title: formData.title,
      author: formData.author,
      description: formData.description,
      link: formData.link,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      dateAdded: new Date().toISOString(),
    }

    setBooks((prev) => [newBook, ...prev])
    setFormData({ title: "", author: "", description: "", link: "", tags: "" })
    setIsDialogOpen(false)

    toast({
      title: "Book Added",
      description: `"${newBook.title}" has been added to your bookmarks.`,
    })
  }

  const handleDelete = (id: string) => {
    const bookToDelete = books.find((book) => book.id === id)
    setBooks((prev) => prev.filter((book) => book.id !== id))

    toast({
      title: "Book Removed",
      description: `"${bookToDelete?.title}" has been removed from your bookmarks.`,
    })
  }

  const handleOpenBook = (link: string, title: string) => {
    try {
      // Check if it's a local file path (Windows, Mac, or Linux)
      const isLocalFile =
        /^([a-zA-Z]:\\|\/|~\/|\.\/|\.\.\/)/i.test(link) ||
        link.startsWith("file://") ||
        (!link.startsWith("http://") && !link.startsWith("https://") && !link.startsWith("ftp://"))

      if (isLocalFile) {
        // For local files, we'll show instructions since browsers can't directly open local files
        toast({
          title: "Local File",
          description: `Copy this path and open it in your file manager: ${link}`,
          duration: 10000,
        })

        // Try to copy to clipboard if available
        if (navigator.clipboard) {
          navigator.clipboard
            .writeText(link)
            .then(() => {
              toast({
                title: "Path Copied",
                description: "File path has been copied to your clipboard.",
              })
            })
            .catch(() => {
              // Clipboard copy failed, but that's okay
            })
        }
      } else {
        // For online links, open in new tab
        window.open(link, "_blank", "noopener,noreferrer")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to open the book link.",
        variant: "destructive",
      })
    }
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const isLocalFile = (link: string) => {
    return (
      /^([a-zA-Z]:\\|\/|~\/|\.\/|\.\.\/)/i.test(link) ||
      link.startsWith("file://") ||
      (!link.startsWith("http://") && !link.startsWith("https://") && !link.startsWith("ftp://"))
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-8 w-8" />
              My Book Bookmarks
            </h1>
            <p className="text-muted-foreground mt-2">Keep track of all the books you've read and easily access them</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Book
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>
                  Add a new book to your bookmark collection. Include a link to access it later.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter book title"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                    placeholder="Enter author name"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description or your thoughts about the book"
                    rows={3}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="link">Link *</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData((prev) => ({ ...prev, link: e.target.value }))}
                    placeholder="https://example.com/book.pdf or C:\Books\mybook.pdf"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Enter a web URL or local file path to your book</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                    placeholder="fiction, sci-fi, favorite (comma separated)"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Book</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books by title, author, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{books.length === 0 ? "No books yet" : "No books found"}</h3>
            <p className="text-muted-foreground mb-4">
              {books.length === 0
                ? "Start building your book collection by adding your first book."
                : "Try adjusting your search terms."}
            </p>
            {books.length === 0 && (
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Book
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2 text-lg">{book.title}</CardTitle>
                      <CardDescription className="mt-1">by {book.author}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(book.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  {book.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{book.description}</p>
                  )}

                  {book.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {book.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {isLocalFile(book.link) ? (
                        <>
                          <FileText className="h-3 w-3" />
                          Local File
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-3 w-3" />
                          Online
                        </>
                      )}
                    </div>

                    <Button
                      onClick={() => handleOpenBook(book.link, book.title)}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      Open Book
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">
                    Added {new Date(book.dateAdded).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
