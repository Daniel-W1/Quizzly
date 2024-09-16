import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing(); 

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadError((error) => {
      console.log("Upload error:", error);
    })
    .middleware(async ({ req }) => {
      const session = await auth();
 
      if (!session || new Date(session.expires) < new Date()) throw new UploadThingError("Unauthorized");
 
      return { userId: session.user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }
    
  ),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;