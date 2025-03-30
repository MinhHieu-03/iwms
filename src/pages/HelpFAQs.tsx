
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ThumbsUp, ThumbsDown } from "lucide-react";

// FAQ data structure
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
}

const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "How do I create a new robot mission?",
    answer: "To create a new robot mission, navigate to the Robot Missions page and click on the 'New Mission' button in the top right corner. Fill in the required details in the popup form and click 'Create Mission'.",
    category: "missions",
    helpful: 24,
    notHelpful: 3,
  },
  {
    id: "faq-2",
    question: "How do I configure warehouse zones?",
    answer: "To configure warehouse zones, go to Warehouse Settings > Zones & Layout. Here you can add, edit, or remove zones, set their colors, and specify their purposes.",
    category: "warehouse",
    helpful: 18,
    notHelpful: 2,
  },
  {
    id: "faq-3",
    question: "What happens if a robot mission fails?",
    answer: "If a robot mission fails, it will be marked as 'Failed' in the Robot Missions history. You can view details of the failure by clicking on the mission. The system will also create an alert and notify administrators.",
    category: "missions",
    helpful: 15,
    notHelpful: 1,
  },
  {
    id: "faq-4",
    question: "How do I add a new user to the system?",
    answer: "To add a new user, navigate to Team Management and click the 'Create User' button. Fill in the user details, assign appropriate roles and permissions, then click 'Save'.",
    category: "users",
    helpful: 22,
    notHelpful: 0,
  },
  {
    id: "faq-5",
    question: "Can I customize the dashboard widgets?",
    answer: "Yes, you can customize dashboard widgets. Click on the 'Customize' button in the top-right corner of the dashboard, then drag and drop widgets to rearrange them. You can also add new widgets or remove existing ones.",
    category: "dashboard",
    helpful: 11,
    notHelpful: 4,
  },
  {
    id: "faq-6",
    question: "How do I set up automation rules?",
    answer: "Automation rules can be created in System Settings > Automation. Click 'Add Rule', then define the trigger conditions and the actions that should occur when those conditions are met.",
    category: "automation",
    helpful: 19,
    notHelpful: 2,
  },
  {
    id: "faq-7",
    question: "What is the difference between a mission and a template?",
    answer: "A mission is a specific task assigned to a robot to complete, while a template is a reusable blueprint for creating similar missions. Templates help you create consistent missions without having to define all the steps each time.",
    category: "missions",
    helpful: 28,
    notHelpful: 1,
  },
  {
    id: "faq-8",
    question: "How often is inventory data updated?",
    answer: "Inventory data is updated in real-time whenever changes occur. You can also manually trigger an inventory sync from the Inventory Settings page if needed.",
    category: "inventory",
    helpful: 13,
    notHelpful: 5,
  },
  {
    id: "faq-9",
    question: "How do I reset my password?",
    answer: "Click on 'Forgot password' on the login screen, or go to your User Settings and click 'Change Password'. In both cases, you'll need to verify your identity via email.",
    category: "account",
    helpful: 31,
    notHelpful: 2,
  },
  {
    id: "faq-10",
    question: "Can I integrate with my existing WMS?",
    answer: "Yes, our system can integrate with most major Warehouse Management Systems. Go to System Settings > Integrations to set up the connection with your WMS using our API or pre-built connectors.",
    category: "integrations",
    helpful: 16,
    notHelpful: 3,
  },
];

const categories = [
  { id: "all", name: "All Questions" },
  { id: "missions", name: "Robot Missions" },
  { id: "warehouse", name: "Warehouse" },
  { id: "users", name: "Users" },
  { id: "dashboard", name: "Dashboard" },
  { id: "automation", name: "Automation" },
  { id: "inventory", name: "Inventory" },
  { id: "account", name: "Account" },
  { id: "integrations", name: "Integrations" },
];

const HelpFAQs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [feedbackGiven, setFeedbackGiven] = useState<{[key: string]: "helpful" | "notHelpful" | null}>({});
  
  // Filter FAQs based on search query and selected category
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = searchQuery.trim() === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle feedback on FAQs
  const handleFeedback = (faqId: string, isHelpful: boolean) => {
    setFeedbackGiven((prev) => ({
      ...prev,
      [faqId]: isHelpful ? "helpful" : "notHelpful"
    }));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Search FAQs</CardTitle>
          <CardDescription>
            Find answers to common questions about SmartWareHub
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions or keywords..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedCategory === category.id ? "bg-warehouse-primary" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {filteredFAQs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-gray-700">{faq.answer}</p>
                    
                    <div className="flex justify-between items-center pt-2 border-t">
                      <Badge variant="outline">{categories.find(c => c.id === faq.category)?.name}</Badge>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Was this helpful?</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={`flex items-center space-x-1 ${feedbackGiven[faq.id] === "helpful" ? "text-green-600" : ""}`}
                          disabled={feedbackGiven[faq.id] !== undefined}
                          onClick={() => handleFeedback(faq.id, true)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{faq.helpful + (feedbackGiven[faq.id] === "helpful" ? 1 : 0)}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={`flex items-center space-x-1 ${feedbackGiven[faq.id] === "notHelpful" ? "text-red-600" : ""}`}
                          disabled={feedbackGiven[faq.id] !== undefined}
                          onClick={() => handleFeedback(faq.id, false)}
                        >
                          <ThumbsDown className="h-4 w-4" />
                          <span>{faq.notHelpful + (feedbackGiven[faq.id] === "notHelpful" ? 1 : 0)}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No FAQs match your search criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Clear filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Can't find what you're looking for?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            If you can't find an answer to your question, you can contact our support team for assistance.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="bg-warehouse-primary hover:bg-warehouse-primary/90">
            Contact Support
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HelpFAQs;
