
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InboundOutboundOrder } from "@/data/inboundOutboundData";

type OrderFormData = Omit<InboundOutboundOrder, 'id' | 'registrationTime'>;

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OrderFormData) => void;
  initialData?: InboundOutboundOrder;
  mode: 'create' | 'edit';
}

const OrderForm: React.FC<OrderFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode
}) => {
  const form = useForm<OrderFormData>({
    defaultValues: initialData ? {
      taskId: initialData.taskId,
      robotCode: initialData.robotCode,
      pickupLocation: initialData.pickupLocation,
      dropoffLocation: initialData.dropoffLocation,
      status: initialData.status,
      missionId: initialData.missionId,
      partner: initialData.partner,
      category: initialData.category,
      sku: initialData.sku,
      storeMethod: initialData.storeMethod,
      storeCode: initialData.storeCode,
      packingMethod: initialData.packingMethod,
      packingCode: initialData.packingCode,
    } : {
      taskId: '',
      robotCode: '',
      pickupLocation: '',
      dropoffLocation: '',
      status: 'Pending',
      missionId: '',
      partner: '',
      category: 'Inbound',
      sku: '',
      storeMethod: 'Bin',
      storeCode: '',
      packingMethod: 'Carton',
      packingCode: '',
    }
  });

  const handleSubmit = (data: OrderFormData) => {
    onSubmit(data);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create Order' : 'Edit Order'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select order type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Inbound">Inbound</SelectItem>
                        <SelectItem value="Outbound">Outbound</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* <FormField
                control={form.control}
                name="taskId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task ID</FormLabel>
                    <FormControl>
                      <Input placeholder="TSK-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
{/* 
              <FormField
                control={form.control}
                name="robotCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Robot Code</FormLabel>
                    <FormControl>
                      <Input placeholder="R001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* <FormField
                control={form.control}
                name="pickupLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <FormControl>
                      <Input placeholder="A-01-01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* <FormField
                control={form.control}
                name="dropoffLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dropoff Location</FormLabel>
                    <FormControl>
                      <Input placeholder="B-02-03" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="storeMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select store method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Bin">Bin</SelectItem>
                        <SelectItem value="Carton">Carton</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storeCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Code</FormLabel>
                    <FormControl>
                      <Input placeholder="A001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="packingMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Packing Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select packing method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Carton">Carton</SelectItem>
                        <SelectItem value="Bag">Bag</SelectItem>
                        <SelectItem value="Kit">Kit</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="packingCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Packing Code</FormLabel>
                    <FormControl>
                      <Input placeholder="PK0001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* <FormField
                control={form.control}
                name="missionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mission ID</FormLabel>
                    <FormControl>
                      <Input placeholder="M001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* <FormField
                control={form.control}
                name="partner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner</FormLabel>
                    <FormControl>
                      <Input placeholder="Tech Supplies Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            {/* <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {mode === 'create' ? 'Create Order' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;
