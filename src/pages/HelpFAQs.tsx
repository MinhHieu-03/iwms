
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, MessageCircleQuestion, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const HelpFAQs = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/help">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search FAQs..."
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircleQuestion className="mr-2 h-5 w-5" />
              General Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is SmartWareHub?</AccordionTrigger>
                <AccordionContent>
                  SmartWareHub is an advanced warehouse management system that helps businesses optimize their warehouse operations through automation, real-time tracking, and smart inventory management. It integrates with robotic systems to provide a complete warehouse management solution.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I get started with the platform?</AccordionTrigger>
                <AccordionContent>
                  To get started with SmartWareHub, you should first configure your warehouse layout in the Warehouse Settings section. Then set up your team members in the Team Management section, assigning appropriate roles and permissions. Once the basic setup is complete, you can start managing your inventory and operations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What browsers are supported?</AccordionTrigger>
                <AccordionContent>
                  SmartWareHub supports all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of these browsers. Internet Explorer is not supported.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircleQuestion className="mr-2 h-5 w-5" />
              Robot Missions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I create a new robot mission?</AccordionTrigger>
                <AccordionContent>
                  To create a new robot mission, navigate to the Robot Missions page and click the "New Mission" button in the top right corner. Fill in the required information in the form that appears, including mission name and type, then click the "Create" button.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I schedule recurring missions?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can schedule recurring missions by creating a mission template. Go to the Robot Missions page, click on the "Templates" tab, then click "New Template". Once you've created a template, you can use it to schedule recurring missions by setting up a schedule in the System Settings section.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What happens if a mission fails?</AccordionTrigger>
                <AccordionContent>
                  If a mission fails, the system will automatically alert the appropriate team members based on your notification settings. The failed mission will be logged in the Missions History with a "Failed" status. You can then investigate the cause of the failure, make necessary adjustments, and retry the mission.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircleQuestion className="mr-2 h-5 w-5" />
              Inbound & Outbound Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I process an inbound shipment?</AccordionTrigger>
                <AccordionContent>
                  To process an inbound shipment, go to the Operator Interface and click "Start Inbound". Select the appropriate dock (or use your default dock), fill in the supplier information, PO number, and item count, then click "Process Inbound". The system will guide you through the remaining steps to complete the inbound process.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I track outbound orders?</AccordionTrigger>
                <AccordionContent>
                  You can track outbound orders in the Inbound/Outbound section by clicking on the "History" tab. This will show you all processed outbound orders with their current status. You can filter the list by date range, status, or order number to find specific orders.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I assign specific docks for certain types of operations?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can configure dock assignments in the Warehouse Settings section. Navigate to Warehouse Settings, go to the "Loading Docks" tab, and configure each dock with its appropriate type (inbound, outbound, or both). This helps ensure that operations are directed to the appropriate docks.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircleQuestion className="mr-2 h-5 w-5" />
              Account & Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I change my password?</AccordionTrigger>
                <AccordionContent>
                  To change your password, go to the User Settings page and scroll down to the Security section. Enter your current password, then enter and confirm your new password. Click "Update Password" to save your changes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I update notification preferences?</AccordionTrigger>
                <AccordionContent>
                  You can update your notification preferences in the User Settings page under the Notification Preferences section. Toggle the switches for email and push notifications according to your preferences, then click "Lưu thay đổi" at the top of the page.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I set a default dock for operations?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can set your default working dock in the Operator Interface page. Look for the Operator Settings section where you can select your default dock from the dropdown menu and save your preference. This dock will be pre-selected when you start inbound or outbound operations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpFAQs;
