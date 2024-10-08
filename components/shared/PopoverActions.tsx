"use client";

import { FileUp, Folder, FolderUp } from "lucide-react";
import { ElementRef, useRef } from "react";
import { Separator } from "../ui/separator";
import { userFolder } from "@/hooks/useFolder";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PopoverActions = () => {
  const { onOpen } = userFolder();
  const { user } = useUser();
  const router = useRouter();
  const inputRef = useRef<ElementRef<"input">>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    let image = "";

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        image = e.target?.result as string;
      };
    }

    const promise = addDoc(collection(db, "files"), {
      name: file.name,
      type: file.type,
      size: file.size,
      uid: user?.id,
      timestamp: serverTimestamp(),
      isArchived: false,
    }).then((document) => {
      const imageRef = ref(storage, `files/${document.id}/image`);
      uploadString(imageRef, image, "data_url").then(() => {
        getDownloadURL(imageRef).then((url) => {
          updateDoc(doc(db, "files", document.id), {
            image: url,
          }).then(() => router.refresh());
        });
      });
    });

    toast.promise(promise, {
      success: "File uploaded successfully",
      loading: "Uploading file...",
      error: "Failed to upload file",
    });
  };

  return (
    <>
      <div
        className="flex items-center hover:bg-slate-100 dark:hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
        role="button"
        onClick={onOpen}
      >
        <Folder className="w-4 h-4" />
        <span>New Folder</span>
      </div>
      <Separator />
      <label>
        <div
          className="flex items-center hover:bg-slate-100 dark:hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
          role="button"
        >
          <FileUp className="w-4 h-4" />
          <span>File Upload</span>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </label>

      <label>
        <div
          className="flex items-center hover:bg-slate-100 dark:hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
          role="button"
        >
          <FolderUp className="w-4 h-4" />
          <span>Folder Upload</span>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </label>
    </>
  );
};

export default PopoverActions;
