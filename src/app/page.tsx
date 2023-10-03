"use client"
import { useUploadThing } from "@/utils/uploadthing";
import Link from "next/link";
import { fileURLToPath } from "url";
 
async function compress(file: File) {
  // Run some compression algorithm on the file
  return file;
}
 
export default function Home() {
  const { startUpload } = useUploadThing("imageUploader", {
    onUploadBegin: () => {
      const uploadButton = document.getElementById("uploadButton") as HTMLElement;
      uploadButton.className = "upload-button upload-uploading";
      uploadButton.textContent = "Uploading...";
    },
    onClientUploadComplete: (res) => {
      const uploadButton = document.getElementById("uploadButton") as HTMLElement;
      uploadButton.className = "upload-button upload-success";
      uploadButton.textContent = "Upload Success!";

      const linkElement = document.getElementById("imageURL") as HTMLAnchorElement;

      const url = res?.[0]?.url;

      console.log(url);

      linkElement.href = url as string;
      linkElement.textContent = url as string;

      setTimeout(() => {
        uploadButton.className = "upload-button";
        uploadButton.textContent = "Upload";
      }, 2000);

    },
  });
 
  return (
    <main className="page-wrapper">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
  
            // Do something with the file before uploading
            const compressed = await compress(file);
  
            // Then start the upload of the compressed file
            await startUpload([compressed]);
          }}
        />
        <label id="uploadButton" htmlFor="fileInput" className="upload-button">
          Upload
        </label>
        <div>
          Image URL: <a href="" id="imageURL" target="_blank"></a>
        </div>
      </div>
    </main>
  );
}