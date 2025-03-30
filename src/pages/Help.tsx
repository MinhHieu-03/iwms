
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Search,
  HelpCircle,
  MessageSquare,
  Book,
  BookOpen,
  Video,
  FileQuestion,
  ArrowRight,
} from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const guideCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Book className="h-5 w-5 text-warehouse-primary" />,
      description: "Learn the basics of SmartWareHub",
      guides: [
        { id: "welcome", title: "Welcome to SmartWareHub", duration: "2 min read" },
        { id: "dashboard", title: "Using the Dashboard", duration: "3 min read" },
        { id: "first-mission", title: "Creating Your First Mission", duration: "5 min read" },
      ],
    },
    {
      id: "missions",
      title: "Robot Missions",
      icon: <FileText className="h-5 w-5 text-warehouse-accent2" />,
      description: "Everything about robot mission management",
      guides: [
        { id: "mission-types", title: "Understanding Mission Types", duration: "4 min read" },
        { id: "templates", title: "Creating Mission Templates", duration: "6 min read" },
        { id: "scheduling", title: "Scheduling Recurring Missions", duration: "5 min read" },
      ],
    },
    {
      id: "warehouse",
      title: "Warehouse Management",
      icon: <BookOpen className="h-5 w-5 text-warehouse-accent1" />,
      description: "Configure and optimize your warehouse",
      guides: [
        { id: "zones", title: "Setting Up Warehouse Zones", duration: "7 min read" },
        { id: "layout", title: "Optimizing Warehouse Layout", duration: "8 min read" },
        { id: "inventory", title: "Inventory Management Basics", duration: "6 min read" },
      ],
    },
    {
      id: "videos",
      title: "Video Tutorials",
      icon: <Video className="h-5 w-5 text-red-500" />,
      description: "Watch step-by-step video guides",
      guides: [
        { id: "video-overview", title: "Platform Overview", duration: "5:22" },
        { id: "video-robots", title: "Managing Robot Fleet", duration: "8:15" },
        { id: "video-analytics", title: "Using Analytics Dashboard", duration: "6:48" },
      ],
    },
  ];

  const supportResources = [
    {
      title: "Frequently Asked Questions",
      icon: <FileQuestion className="h-6 w-6" />,
      description: "Browse answers to common questions about SmartWareHub features",
      link: "/help/faqs",
      linkText: "Browse FAQs",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Contact Support",
      icon: <MessageSquare className="h-6 w-6" />,
      description: "Get in touch with our support team for personalized help",
      link: "#",
      linkText: "Create Support Ticket",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Documentation",
      icon: <Book className="h-6 w-6" />,
      description: "Access detailed technical documentation and API references",
      link: "#",
      linkText: "View Documentation",
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Help Center</h2>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="What do you need help with?"
          className="pl-10 py-6 text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Support Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {supportResources.map((resource, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${resource.color}`}>
                {resource.icon}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <h3 className="text-lg font-medium">{resource.title}</h3>
              <p className="text-gray-500 mt-1">{resource.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link to={resource.link}>
                  {resource.linkText}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Guide Categories */}
      {guideCategories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              {category.icon}
              <CardTitle>{category.title}</CardTitle>
            </div>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.guides.map((guide) => (
                <Link
                  key={guide.id}
                  to={`/help/guides/${guide.id}`}
                  className="group block border rounded-lg p-4 hover:border-warehouse-primary hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-medium group-hover:text-warehouse-primary transition-colors">
                    {guide.title}
                  </h4>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <FileText className="h-3 w-3 mr-1" />
                    {guide.duration}
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm">
              View All {category.title} Guides
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Still Need Help?</CardTitle>
          <CardDescription>
            Our support team is always ready to assist you.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center">
          <HelpCircle className="h-8 w-8 text-warehouse-primary mr-4" />
          <div>
            <h3 className="font-medium">Contact Support</h3>
            <p className="text-sm text-gray-500 mt-1">
              Our average response time is under 2 hours during business hours.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="bg-warehouse-primary hover:bg-warehouse-primary/90">
            Create Support Ticket
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Help;
