"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// This would typically come from your backend
type initialCustomersType = {
  id: number;
  name: string;
  email: string;
  status: string;
}[]

type statusesType = string[]

const initialCustomers: initialCustomersType = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "New" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Contract Sent" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", status: "Contract Signed" },
  { id: 4, name: "David Lee", email: "david@example.com", status: "New" },
  { id: 5, name: "Eva Martinez", email: "eva@example.com", status: "Contract Sent" },
]

const statuses: statusesType = ["New", "Contract Sent", "Contract Signed"]

export default function Home() {
  const [customers, setCustomers] = useState(initialCustomers)

  const handleStatusChange = (customerId: number, newStatus: string) => {
    setCustomers(
      customers.map((customer) => (customer.id === customerId ? { ...customer, status: newStatus } : customer)),
    )
    // In a real application, you would also send this update to your backend
  }

  const groupedCustomers = customers.reduce(
    (acc, customer) => {
      if (!acc[customer.status]) {
        acc[customer.status] = []
      }
      acc[customer.status].push(customer)
      return acc
    },
    {} as Record<string, typeof customers>,
  )

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Initech CRM</h1>
        <p className="text-xl text-muted-foreground">Manage your customers and sales funnel</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {statuses.map((status) => (
          <FunnelStageCard
            key={status}
            title={status}
            count={groupedCustomers[status]?.length || 0}
            color={status === "New" ? "bg-blue-500" : status === "Contract Sent" ? "bg-yellow-500" : "bg-green-500"}
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>Manage your customers by their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {statuses.map((status) => (
              <AccordionItem key={status} value={status}>
                <AccordionTrigger>
                  {status} ({groupedCustomers[status]?.length || 0})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {groupedCustomers[status]?.map((customer) => (
                      <CustomerRow
                        key={customer.id}
                        customer={customer}
                        onStatusChange={(newStatus) => handleStatusChange(customer.id, newStatus)}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

function FunnelStageCard({ title, count, color }: { title: string; count: number; color: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <div className={`h-2 ${color} mt-2 rounded`} />
      </CardContent>
    </Card>
  )
}

function CustomerRow({
  customer,
  onStatusChange,
}: {
  customer: { id: number; name: string; email: string; status: string }
  onStatusChange: (newStatus: string) => void
}) {
  return (
    <div className="flex items-center justify-between">
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
        <div>
          <p className="text-sm font-medium leading-none">{customer.name}</p>
          <p className="text-sm text-muted-foreground">{customer.email}</p>
        </div>
      </div>
      <Select value={customer.status} onValueChange={onStatusChange}>
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
    </div>
  )
}
