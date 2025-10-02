import { useEffect, useMemo } from "react";
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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type MissionFormData = any;

const MissionForm = ({ isOpen, onClose, onSubmit, data }) => {
  const { t } = useTranslation();

  const form_data = useMemo(() => {
    return data
      ? {
          template_id: data._id ?? "",
          tasks:
            data.tasks.map((task: any) => ({
              name: task.name ?? "",
              device_name: task.device_name ?? "",
              param:
                task.param.map((param: any) => ({
                  name: param.name ?? "",
                  type: param.type ?? "",
                  value: param.value ?? "",
                })) ?? [],
            })) ?? [],
        }
      : {
          template_id: "",
          tasks: [],
        };
  }, [data]);

  const form = useForm<MissionFormData>({ defaultValues: form_data });

  // Sync form values when incoming data changes
  useEffect(() => {
    form.reset(form_data);
  }, [form_data]);

  const handleSubmit = (formData: MissionFormData) => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="z-[9999] max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Mission information</DialogTitle>
          <DialogDescription>
            View details of the mission before running
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="flex flex-col gap-4">
              {(form.watch("tasks") ?? []).map((task: any, index: number) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`tasks.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Collapsible>
                          <CollapsibleTrigger className="w-full flex items-center justify-between rounded-md border px-4 py-2 hover:bg-gray-100">
                            <div className="font-medium">
                              {field.value?.name || `Task ${index + 1}`}
                            </div>
                            <ChevronDown />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-3">
                            <div className="flex flex-col gap-4">
                              <FormItem>
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
                                        {(field.value?.param ?? []).map(
                                          (_param: any, pIndex: number) => (
                                            <TableRow key={pIndex}>
                                              <TableCell>
                                                <FormField
                                                  control={form.control}
                                                  name={`tasks.${index}.param.${pIndex}.name`}
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
                                                  name={`tasks.${index}.param.${pIndex}.type`}
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
                                                  name={`tasks.${index}.param.${pIndex}.value`}
                                                  render={({ field }) => (
                                                    <FormItem>
                                                      <FormControl>
                                                        <Input
                                                          {...field}
                                                          placeholder="value"
                                                        />
                                                      </FormControl>
                                                    </FormItem>
                                                  )}
                                                />
                                              </TableCell>
                                            </TableRow>
                                          )
                                        )}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </FormControl>
                              </FormItem>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                {t("cancel")}
              </Button>
              <Button type="submit" className="gap-2">
                Run
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MissionForm;
