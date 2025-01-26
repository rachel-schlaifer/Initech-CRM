"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// This would typically come from your backend
const initialCustomers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "New" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Contract Sent" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", status: "Contract Signed" },
  { id: 4, name: "David Lee", email: "david@example.com", status: "New" },
  { id: 5, name: "Eva Martinez", email: "eva@example.com", status: "Contract Sent" },
]

const statuses = ["New", "Contract Sent", "Contract Signed"]

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers)

  const handleStatusChange = (customerId: number, newStatus: string) => {
    setCustomers(
      customers.map((customer) => (customer.id === customerId ? { ...customer, status: newStatus } : customer)),
    )
    // In a real application, you would also send this update to your backend
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${customer.name}`} />
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    <Select value={customer.status} onValueChange={(value) => handleStatusChange(customer.id, value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

