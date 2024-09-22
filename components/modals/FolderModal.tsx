"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/validation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { userFolder } from "@/hooks/useFolder";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FolderModal = () => {
  const { isOpen, onClose } = userFolder();
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const promise = addDoc(collection(db, "folders"), {
      name: values.name,
      timestamp: serverTimestamp(),
      uid: user?.id,
      isArchived: false,
    }).then(() => {
      form.reset();
      onClose();
      router.refresh();
    });

    toast.promise(promise, {
      loading: "Creating folder...",
      success: "Folder created!",
      error: "Something went wrong!",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-x-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Folder name"
                        className="rounded-none outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  type="button"
                >
                  Cancel
                </Button>
                <Button size="sm" type="submit">
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FolderModal;
