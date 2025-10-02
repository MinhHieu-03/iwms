
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

type GuideContent = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const guides: Record<string, GuideContent> = {
  "getting-started": {
    id: "getting-started",
    title: "Getting Started",
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Welcome to SmartWareHub</h3>
        <p>
          This guide will help you understand the basics of using our warehouse management system.
        </p>
        
        <h4 className="text-md font-medium mt-6">Dashboard Navigation</h4>
        <p>
          The dashboard is your central hub for all warehouse activities. Here you can monitor 
          key metrics, view recent activities, and access all system functionality.
        </p>
        
        <h4 className="text-md font-medium mt-6">Basic Operations</h4>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Navigate to the Operator Interface to process inbound and outbound orders.</li>
          <li>Use the Warehouse Layout section to visualize and manage storage locations.</li>
          <li>Configure automated Missions to optimize warehouse operations.</li>
          <li>Track all inbound and outbound activities in the corresponding section.</li>
        </ol>
        
        <div className="bg-muted p-4 rounded-md mt-6">
          <p className="font-medium">Quick Tip</p>
          <p className="text-sm">
            You can customize your dashboard view in the User Settings page 
            to show the metrics and information most relevant to your role.
          </p>
        </div>
      </div>
    )
  },
  "inbound-outbound": {
    id: "inbound-outbound",
    title: "Inbound & Outbound Management",
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Managing Warehouse Flow</h3>
        <p>
          Efficient handling of inbound and outbound operations is critical for warehouse success.
          This guide covers the essentials of managing product flow.
        </p>
        
        <h4 className="text-md font-medium mt-6">Processing Inbound Orders</h4>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Navigate to the Operator Interface and click "Start Inbound"</li>
          <li>Enter all required shipment details including supplier information</li>
          <li>Assign the shipment to an available dock</li>
          <li>Process items by scanning or manual entry</li>
          <li>Complete the inbound process when all items are accounted for</li>
        </ol>
        
        <h4 className="text-md font-medium mt-6">Processing Outbound Orders</h4>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Navigate to the Operator Interface and click "Start Outbound"</li>
          <li>Enter customer information and order details</li>
          <li>Assign to an available outbound dock</li>
          <li>Fulfill the order by collecting items from storage locations</li>
          <li>Verify order accuracy and complete the outbound process</li>
        </ol>
        
        <div className="bg-muted p-4 rounded-md mt-6">
          <p className="font-medium">Important Note</p>
          <p className="text-sm">
            Always ensure that item counts match the expected quantities to maintain accurate inventory levels.
            Any discrepancies should be reported immediately.
          </p>
        </div>
      </div>
    )
  },
  "warehouse-layout": {
    id: "warehouse-layout",
    title: "Warehouse Layout Management",
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Optimizing Your Warehouse Layout</h3>
        <p>
          An efficient warehouse layout is essential for maximizing productivity and space utilization.
          This guide will help you manage your warehouse layout effectively.
        </p>
        
        <h4 className="text-md font-medium mt-6">Viewing Your Layout</h4>
        <p>
          The Warehouse Layout page offers both 2D and 3D visualization of your warehouse.
          You can toggle between these views to get different perspectives on your space.
        </p>
        
        <h4 className="text-md font-medium mt-6">Modifying Layout Elements</h4>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Select an area or element to modify</li>
          <li>Use the editing tools to adjust dimensions, position, or type</li>
          <li>Save your changes when satisfied with the new layout</li>
          <li>Changes will be reflected in the optimization algorithms for missions</li>
        </ol>
        
        <h4 className="text-md font-medium mt-6">Layout Best Practices</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Keep high-velocity items in easily accessible locations</li>
          <li>Ensure adequate aisle width for equipment movement</li>
          <li>Group similar items together where possible</li>
          <li>Maintain clear paths to emergency exits</li>
        </ul>
        
        <div className="bg-muted p-4 rounded-md mt-6">
          <p className="font-medium">Pro Tip</p>
          <p className="text-sm">
            Use the heatmap view to identify congested areas and optimize traffic flow
            in your warehouse.
          </p>
        </div>
      </div>
    )
  },
  "missions": {
    id: "missions",
    title: "Automated Missions",
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Creating and Managing Missions</h3>
        <p>
          Missions automate repetitive warehouse tasks, improving efficiency and reducing errors.
          Learn how to create, monitor, and optimize mission templates.
        </p>
        
        <h4 className="text-md font-medium mt-6">Mission Types</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Pick and Place:</strong> Move items from one location to another</li>
          <li><strong>Inventory Check:</strong> Verify stock levels in specified locations</li>
          <li><strong>Zone Transfer:</strong> Move multiple items between warehouse zones</li>
          <li><strong>Order Fulfillment:</strong> Collect items for outbound orders</li>
        </ul>
        
        <h4 className="text-md font-medium mt-6">Creating a Mission Template</h4>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Navigate to Missions {'>'}{'>'} Templates and click "New Template"</li>
          <li>Name your template and select a mission type</li>
          <li>Use the graph editor to define mission steps and logic</li>
          <li>Connect nodes to establish the workflow sequence</li>
          <li>Save the template when your workflow is complete</li>
        </ol>
        
        <h4 className="text-md font-medium mt-6">Executing Missions</h4>
        <p>
          Missions can be executed manually or scheduled to run automatically.
          Monitor active missions in the History tab and intervene if necessary.
        </p>
        
        <div className="bg-muted p-4 rounded-md mt-6">
          <p className="font-medium">Advanced Feature</p>
          <p className="text-sm">
            Use conditional logic in your mission templates to handle exceptions and edge cases,
            making your automated processes more robust and flexible.
          </p>
        </div>
      </div>
    )
  },
  "settings": {
    id: "settings",
    title: "System Configuration",
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Configuring Your System</h3>
        <p>
          Learn how to configure system settings to optimize performance and customize
          the application to your specific warehouse needs.
        </p>
        
        <h4 className="text-md font-medium mt-6">User Settings</h4>
        <p>
          In the User Settings page, you can customize your personal preferences:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Toggle dark mode for comfortable viewing</li>
          <li>Configure notification preferences</li>
          <li>Change your password and security settings</li>
        </ul>
        
        <h4 className="text-md font-medium mt-6">System Settings</h4>
        <p>
          Administrators can configure global system settings:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Database configuration for performance optimization</li>
          <li>Server settings including environment and logging</li>
          <li>Storage configuration for backups and data management</li>
          <li>API configuration for integration with other systems</li>
        </ul>
        
        <h4 className="text-md font-medium mt-6">Team Settings</h4>
        <p>
          Manage users and their access rights:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Create new user accounts with appropriate roles</li>
          <li>Edit existing users and update their permissions</li>
          <li>Review roles and associated permissions</li>
        </ul>
        
        <div className="bg-muted p-4 rounded-md mt-6">
          <p className="font-medium">Security Note</p>
          <p className="text-sm">
            Regularly audit user accounts and permissions to maintain security.
            Remove access for users who no longer require it.
          </p>
        </div>
      </div>
    )
  }
};

const HelpGuides = () => {
  const { guideId = "getting-started" } = useParams();
  const currentGuide = guides[guideId] || guides["getting-started"];

  const guideLinks = Object.values(guides).map(guide => ({
    id: guide.id,
    title: guide.title
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/help">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold">Help Guides</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Guide Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {guideLinks.map(guide => (
                  <Link 
                    key={guide.id} 
                    to={`/help/guides/${guide.id}`}
                    className={`block p-4 hover:bg-muted/50 transition-colors ${
                      guide.id === guideId ? 'bg-muted' : ''
                    }`}
                  >
                    {guide.title}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>{currentGuide.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentGuide.content}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpGuides;
