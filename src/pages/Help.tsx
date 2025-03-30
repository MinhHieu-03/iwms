
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  PlayCircle, 
  FileQuestion, 
  MessageSquare, 
  ArrowRight,
  Phone
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const Help = () => {
  const helpGuides = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of navigating and using the system",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      id: "inbound-outbound",
      title: "Inbound & Outbound",
      description: "Managing product receiving and shipping",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      id: "warehouse-layout",
      title: "Warehouse Layout",
      description: "Optimize your warehouse space and organization",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      id: "missions",
      title: "Missions",
      description: "Creating and managing automated workflows",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      id: "settings",
      title: "Settings",
      description: "Configure system and user preferences",
      icon: <BookOpen className="h-6 w-6" />
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Help Center</h2>
      
      <div className="relative">
        <div className="bg-warehouse-primary rounded-lg p-8 text-white">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-semibold mb-4">How can we help you today?</h3>
            <p className="text-white/80 mb-6">
              Search our knowledge base or browse the help guides below to find answers to your questions.
            </p>
            <div className="relative">
              <Input
                placeholder="Search for help topics..."
                className="pr-10 bg-white text-black placeholder:text-gray-500"
              />
              <Button 
                className="absolute right-0 top-0 h-full rounded-l-none"
                variant="default"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold">Popular Help Guides</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {helpGuides.map((guide) => (
          <Card key={guide.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                {guide.icon}
                <span className="ml-2">{guide.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{guide.description}</p>
            </CardContent>
            <CardFooter className="pt-3 border-t">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-between" 
                asChild
              >
                <Link to={`/help/guides/${guide.id}`}>
                  Read guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <PlayCircle className="h-6 w-6" />
              <span className="ml-2">Video Tutorials</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Watch step-by-step video tutorials to learn key features
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t">
            <Button variant="ghost" size="sm" className="w-full justify-between">
              Watch videos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <FileQuestion className="h-6 w-6" />
              <span className="ml-2">FAQs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Find answers to commonly asked questions
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t">
            <Button variant="ghost" size="sm" className="w-full justify-between">
              View FAQs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <h3 className="text-xl font-semibold pt-4">Support Options</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Chat Support
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                Chat with our support team for immediate assistance during business hours.
              </p>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span>Support agents online now</span>
              </div>
            </div>
            <Button>Start Chat</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              Call Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-warehouse-primary/10 text-warehouse-primary">
                  SP
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Support Team</p>
                <p className="text-sm text-muted-foreground">
                  Available Monday-Friday, 9am-5pm
                </p>
              </div>
            </div>
            <Button className="w-full" variant="outline">
              +1 (555) 123-4567
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
