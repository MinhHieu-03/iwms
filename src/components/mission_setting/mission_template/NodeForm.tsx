import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useTranslation } from "react-i18next";
import { Textarea } from "@/components/ui/textarea";

type NodeFormData = any;

interface NodeFormProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
}

const NodeForm: React.FC<NodeFormProps> = ({ isOpen, onClose, data }) => {
  const { t } = useTranslation();
  const form_data = data
    ? {
        device_name: data.device_name ?? "",
        name: data.name ?? "",
        param: Array.isArray(data.param) ? data.param : [],
        flow: data.flow ?? { ok: 0, fail: 0, timeout: 0 },
        notify: data.notify ?? {
          begin: { enable: true, url: "", userdata: "" },
          end: { enable: true, url: "", userdata: "" },
        },
        timeout: data.timeout ?? 0,
        need_trigger: data.need_trigger ?? false,
      }
    : {
        device_name: "",
        name: "",
        param: [],
        flow: { ok: 0, fail: 0, timeout: 0 },
        notify: {
          begin: { enable: true, url: "", userdata: "" },
          end: { enable: true, url: "", userdata: "" },
        },
        timeout: 0,
        need_trigger: false,
      };

  const form = useForm<NodeFormData>({ defaultValues: form_data });
  useEffect(() => form.reset(form_data), [data, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="z-[9999] max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Node information</DialogTitle>
          <DialogDescription>
            View details of the selected node
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="device_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Device Name</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        placeholder={t("device_name_holder")}
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
                name="flow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flow</FormLabel>
                    <FormControl>
                      <Textarea
                        readOnly
                        value={JSON.stringify(
                          field.value ?? { ok: 0, fail: 0, timeout: 0 },
                          null,
                          2
                        )}
                        className="font-mono text-sm"
                        rows={4}
                        placeholder="{ }"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>Notify Begin</FormLabel>
                  <div className="grid grid-cols-1 gap-2">
                    <Input
                      readOnly
                      value={String(
                        (form.watch("notify") as any)?.begin?.enable ?? false
                      )}
                      placeholder="enable"
                    />
                    <Input
                      readOnly
                      value={(form.watch("notify") as any)?.begin?.url ?? ""}
                      placeholder="url"
                    />
                    <Input
                      readOnly
                      value={
                        (form.watch("notify") as any)?.begin?.userdata ?? ""
                      }
                      placeholder="userdata"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <FormLabel>Notify End</FormLabel>
                  <div className="grid grid-cols-1 gap-2">
                    <Input
                      readOnly
                      value={String(
                        (form.watch("notify") as any)?.end?.enable ?? false
                      )}
                      placeholder="enable"
                    />
                    <Input
                      readOnly
                      value={(form.watch("notify") as any)?.end?.url ?? ""}
                      placeholder="url"
                    />
                    <Input
                      readOnly
                      value={(form.watch("notify") as any)?.end?.userdata ?? ""}
                      placeholder="userdata"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {(() => {
                const items = (form.watch("param") as any[] | undefined) ?? [];
                const rows: any[][] = [];
                for (let i = 0; i < items.length; i += 2) {
                  rows.push(items.slice(i, i + 2));
                }
                return rows.map((pair, rowIdx) => (
                  <div
                    key={`param-row-${rowIdx}`}
                    className="grid grid-cols-2 gap-3"
                  >
                    {pair.map((p, colIdx) => (
                      <div
                        key={`param-col-${rowIdx}-${colIdx}`}
                        className="space-y-1"
                      >
                        <FormLabel className="text-xs">
                          {p?.name ?? `Param ${rowIdx * 2 + colIdx + 1}`}
                        </FormLabel>
                        <Input
                          readOnly
                          value={
                            typeof p?.value === "string" ||
                            typeof p?.value === "number" ||
                            typeof p?.value === "boolean"
                              ? String(p?.value ?? "")
                              : JSON.stringify(p?.value ?? "", null, 2)
                          }
                        />
                      </div>
                    ))}
                  </div>
                ));
              })()}
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                {t("cancel")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { NodeForm, type NodeFormData };
