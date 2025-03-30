
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  BookOpen, 
  LifeBuoy, 
  FileQuestion, 
  MessageSquare, 
  ChevronDown, 
  ChevronRight, 
  FileText
} from "lucide-react";

const Help = () => {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  const faqs = [
    {
      id: "faq1",
      question: "How do I create a new mission for robots?",
      answer:
        "To create a new mission, navigate to the Missions page, click on the 'Add New Mission' button, and follow the step-by-step wizard to configure robot tasks and destinations.",
    },
    {
      id: "faq2",
      question: "How can I manage warehouse zones?",
      answer:
        "Warehouse zones can be managed from the Layout page. Use the 'Zones' tab to view all existing zones, and use the add/edit controls to modify zones as needed.",
    },
    {
      id: "faq3",
      question: "What should I do if a robot stops responding?",
      answer:
        "If a robot stops responding, first check its battery level and network connection status from the Dashboard. You can try to restart the robot from the Missions page, or contact technical support if the issue persists.",
    },
    {
      id: "faq4",
      question: "How do I generate inventory reports?",
      answer:
        "Inventory reports can be generated from the Dashboard. Click on the 'Reports' section, select 'Inventory', choose your desired filters and date range, then click 'Generate Report'.",
    },
    {
      id: "faq5",
      question: "Can I schedule missions for later execution?",
      answer:
        "Yes, when creating a new mission, you can select the 'Schedule' option and set a specific date and time for the mission to start automatically.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Help Center</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-8 w-[300px]" placeholder="Search help articles..." />
        </div>
      </div>

      <Tabs defaultValue="guides" className="space-y-4">
        <TabsList>
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Guides</span>
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <FileQuestion className="h-4 w-4" />
            <span>FAQ</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <LifeBuoy className="h-4 w-4" />
            <span>Support</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <FileText className="mr-2 h-4 w-4 text-warehouse-primary" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Learn the basics of the warehouse management system
                  </p>
                  <div className="space-y-1">
                    <div className="text-sm flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 text-warehouse-primary" />
                      <span>System Overview</span>
                    </div>
                    <div className="text-sm flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 text-warehouse-primary" />
                      <span>User Roles & Permissions</span>
                    </div>
                    <div className="text-sm flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 text-warehouse-primary" />
                      <span>Navigation Guide</span>
                    </div>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-warehouse-primary">
                    Read more
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <FileText className="mr-2 h-4 w-4 text-warehouse-primary" />
                  Mission Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    How to create and manage robot missions effectively
                  </p>
                  <div className="space-y-1">
                    <div className="text-sm flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 text-warehouse-primary" />
                      <span>Creating New Missions</span>
                    </div>
                    <div className="text-sm flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 text-warehouse-primary" />
                      <span>Template Management</span>
                    </div>
                    <div className="text-sm flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 text-warehouse-primary" />
                      <span>Scheduling & Priorities</span>
                    </div>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-warehouse-primary">
                    Read more
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <FileText className="mr-2 h-4 w-4 text-warehouse-primary" />
                  Layout Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Setup and optimize your warehouse layout
                  </p>
                  <div className="space-y-1">
                    <div className="text-sm flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 text-warehouse-primary" />
                      <span>Zone Management</span>
                    </div>
                    <div className="text-sm flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 text-warehouse-primary" />
                      <span>Rack Configuration</span>
                    </div>
                    <div className="text-sm flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 text-warehouse-primary" />
                      <span>Optimizing Routes</span>
                    </div>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-warehouse-primary">
                    Read more
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <FileText className="mr-2 h-4 w-4 text-warehouse-primary" />
                  Inbound/Outbound Operations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Managing shipping and receiving efficiently
                  </p>
                  <div className="space-y-1">
                    <div className="text-sm flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 text-warehouse-primary" />
                      <span>Processing Inbound Shipments</span>
                    </div>
                    <div className="text-sm flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 text-warehouse-primary" />
                      <span>Managing Outbound Orders</span>
                    </div>
                    <div className="text-sm flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 text-warehouse-primary" />
                      <span>Dock Scheduling</span>
                    </div>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-warehouse-primary">
                    Read more
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions about the warehouse management system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border rounded-lg">
                  <button
                    className="flex justify-between items-center w-full p-4 text-left"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span className="font-medium">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="p-4 pt-0 text-sm text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Get help from our support team for any issues or questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email address" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Support request subject" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Describe your issue or question"
                    ></textarea>
                  </div>

                  <Button className="bg-warehouse-primary text-white hover:bg-warehouse-primary/90">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Submit Request
                  </Button>
                </div>

                <div className="space-y-6 lg:border-l lg:pl-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Email Support</h4>
                    <p className="text-sm text-muted-foreground">
                      For general inquiries and non-urgent support:
                    </p>
                    <p className="text-sm">support@smartwarehub.com</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Phone Support</h4>
                    <p className="text-sm text-muted-foreground">
                      For urgent issues requiring immediate assistance:
                    </p>
                    <p className="text-sm">+1 (555) 123-4567</p>
                    <p className="text-xs text-muted-foreground">
                      Available Monday-Friday, 9am-5pm EST
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Live Chat</h4>
                    <p className="text-sm text-muted-foreground">
                      Chat with our support team in real-time:
                    </p>
                    <Button variant="outline" size="sm">
                      Start Live Chat
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Available 24/7 for premium support customers
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Help;
