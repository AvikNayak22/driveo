import Header from "@/components/shared/Header";
import Lists from "@/components/shared/Lists";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { collection, getDocs, query, where } from "firebase/firestore";

const getData = async (uid: string, type: "files" | "folders") => {
  const data: { id: string }[] = [];
  const q = query(
    collection(db, type),
    where("uid", "==", uid),
    where("isArchived", "==", false)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

const HomePage = async () => {
  const { userId } = auth();
  const folders = await getData(userId!, "folders");
  const files = await getData(userId!, "files");

  return (
    <>
      <Header label="My Drive" isHome />
      <Lists
        folders={JSON.parse(JSON.stringify(folders))}
        files={JSON.parse(JSON.stringify(files))}
      />
    </>
  );
};

export default HomePage;
