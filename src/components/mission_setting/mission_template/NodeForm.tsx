import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type NodeFormData = any;

interface NodeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NodeFormData, id: string) => void;
  data?: any;
  id?: string;
}

const NodeForm: React.FC<NodeFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
  id,
}) => {
  const { t } = useTranslation();
  const [param, setParam] = useState<any[]>([]);

  // Memoize form_data to prevent unnecessary recalculations
  const form_data = useMemo(() => {
    let paramValue = [];
    if (data?.param) {
      if (Array.isArray(data.param)) {
        paramValue = [...data.param];
      } else {
        paramValue = Object.entries(data.param).map(
          ([key, value]: [string, any]) => ({
            name: key,
            type: value,
            value: "",
            assigned: false,
          })
        );
      }
    }
    return data
      ? {
          ...data,
          device_name: data.device_name ?? "",
          name: data.name ?? "",
          param: paramValue,
          flow: data.flow ?? { ok: 0, fail: 0, timeout: 0 },
          notify: data.notify ?? {
            begin: { enable: false, url: "", userdata: "" },
            end: { enable: false, url: "", userdata: "" },
          },
          timeout: data.timeout ?? 0,
          need_trigger: data.need_trigger ?? false,
        }
      : {
          ...data,
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
  }, [data]);

  const form = useForm<NodeFormData>({ defaultValues: form_data });

  const handleSubmit = (formData: NodeFormData) => {
    console.log("data node updated", formData, id);

    onSubmit(formData, id);
    onClose();
  };

  const handleAddRow = () => {};

  // Only reset when data actually changes, not when form changes
  useEffect(() => {
    form.reset(form_data);
  }, [form_data]);

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
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="device_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Device Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled
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
                        disabled
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
                        {...field}
                        disabled
                        value={JSON.stringify(
                          field.value ?? { ok: 0, fail: 0, timeout: 0 },
                          null,
                          2
                        )}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            field.onChange(parsed);
                          } catch {
                            field.onChange(e.target.value);
                          }
                        }}
                        className="font-mono text-sm"
                        rows={5}
                        placeholder="{ }"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel>Notify</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2 bg-white rounded-md p-4">
                  <FormLabel className="text-center">Begin</FormLabel>
                  <FormField
                    control={form.control}
                    name="notify.begin.enable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center">
                        <FormLabel className="w-20 text-sm">Enable</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notify.begin.url"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center">
                        <FormLabel className="w-20 text-sm">URL</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            placeholder="url"
                            className="flex-1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notify.begin.userdata"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center">
                        <FormLabel className="w-20 text-sm">
                          User Data
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            placeholder="userdata"
                            className="flex-1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-2 bg-white rounded-md p-4">
                  <FormLabel className="text-center">End</FormLabel>
                  <FormField
                    control={form.control}
                    name="notify.end.enable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center">
                        <FormLabel className="w-20 text-sm">Enable</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notify.end.url"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center">
                        <FormLabel className="w-20 text-sm">URL</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            placeholder="url"
                            className="flex-1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notify.end.userdata"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center">
                        <FormLabel className="w-20 text-sm">
                          User Data
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            placeholder="userdata"
                            className="flex-1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex space-x-4">
              <FormField
                control={form.control}
                name="timeout"
                render={({ field }) => (
                  <FormItem className="flex flex-1 items-center">
                    <FormLabel className="w-20 text-sm">Timeout</FormLabel>
                    <FormControl>
                      <Input placeholder={t("timeout_holder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="need_trigger"
                render={({ field }) => (
                  <FormItem className="flex flex-1 items-center">
                    <FormLabel className="w-35 text-sm">Need Trigger</FormLabel>
                    <FormControl>
                      <Switch
                        className="ml-4"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="param"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Param</FormLabel>
                  <FormControl>
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {field.value.map((data, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`param.${index}.name`}
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-center">
                                      <FormControl>
                                        <Input
                                          {...field}
                                          placeholder="name"
                                          disabled
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`param.${index}.type`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          placeholder="type"
                                          disabled
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`param.${index}.value`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          placeholder="value"
                                          onChange={(e) => {
                                            const nextVal = e.target.value;
                                            field.onChange(nextVal);
                                            const isAssigned =
                                              String(nextVal).trim() !== "";
                                            form.setValue(
                                              `param.${index}.assigned`,
                                              isAssigned,
                                              {
                                                shouldDirty: true,
                                                shouldTouch: true,
                                                shouldValidate: false,
                                              }
                                            );
                                          }}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                {t("cancel")}
              </Button>
              <Button type="submit">{t("save_changes")}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { NodeForm, type NodeFormData };
