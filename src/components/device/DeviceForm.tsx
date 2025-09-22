import React, { useEffect, useState } from "react";
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
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type DeviceData, devices, deviceTypes } from "@/data/deviceData";
import { useTranslation } from "react-i18next";
import { getDeviceInfo } from "@/api/missionSettingApi";
import { Textarea } from "../ui/textarea";

// type DeviceFormData = Omit<DeviceData, "id" | "connected" | "state">;
type DeviceFormData = any;
const device_types = [...new Set(deviceTypes.map((m) => m.id))];

interface DeviceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DeviceFormData) => void;
  initialData?: any;
  mode: "create" | "edit" | "view";
  deviceTypes: any[];
}

const DeviceForm: React.FC<DeviceFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  deviceTypes,
}) => {
  const { t } = useTranslation();
  const form_data = initialData
    ? {
        name: initialData.name,
        description: initialData.description,
        type: initialData.type,
        config: initialData.config,
        setting: initialData.setting,
        state: initialData.state,
      }
    : {
        name: "",
        description: "",
        type: "",
        config: {},
        setting: {},
        state: {},
      };

  const form = useForm<DeviceFormData>({ defaultValues: form_data });
  useEffect(() => form.reset(form_data), [initialData, form]);

  const handleSubmit = (data: DeviceFormData) => {
    onSubmit(data);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Create device"
              : mode === "edit"
              ? "Edit device"
              : "View device"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create new device from existed types"
              : mode === "edit"
              ? "Edit an existed device's information"
              : "View device's information"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("device_type")}</FormLabel>
                    <Select
                      disabled={mode === "view" || mode === "edit"}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("device_type_holder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {deviceTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("device_name")}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={mode === "view" || mode === "edit"}
                        placeholder={t("device_name_holder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("device_description")}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={mode === "view"}
                        placeholder={t("device_description_holder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="setting"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Setting</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={mode === "view" || mode === "edit"}
                        value={
                          typeof field.value === "string"
                            ? field.value
                            : JSON.stringify(field.value ?? {}, null, 2)
                        }
                        onChange={(e) => {
                          const v = e.target.value;
                          try {
                            field.onChange(JSON.parse(v));
                          } catch {
                            field.onChange(v);
                          }
                        }}
                        className="font-mono text-sm"
                        rows={4}
                        placeholder="{ }"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="config"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Config</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={mode === "view"}
                        value={
                          typeof field.value === "string"
                            ? field.value
                            : JSON.stringify(field.value ?? {}, null, 2)
                        }
                        onChange={(e) => {
                          const v = e.target.value;
                          try {
                            field.onChange(JSON.parse(v));
                          } catch {
                            field.onChange(v);
                          }
                        }}
                        className="font-mono text-sm"
                        rows={4}
                        placeholder="{ }"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={mode === "view"}
                        value={
                          typeof field.value === "string"
                            ? field.value
                            : JSON.stringify(field.value ?? {}, null, 2)
                        }
                        onChange={(e) => {
                          const v = e.target.value;
                          try {
                            field.onChange(JSON.parse(v));
                          } catch {
                            // Người dùng đang gõ JSON dở → tạm giữ dạng string
                            field.onChange(v);
                          }
                        }}
                        className="font-mono text-sm"
                        rows={4}
                        placeholder="{ }"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <div className="grid grid-cols-2 gap-4">
              <FormField
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
              />

              <FormField
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
              />
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
              <FormField
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
              />

              <FormField
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
              />
            </div>

            <FormField
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
              {mode !== "view" && (
                <Button type="submit">
                  {mode === "create" ? "Create Order" : "Lưu thay đổi"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { DeviceForm, type DeviceFormData };
