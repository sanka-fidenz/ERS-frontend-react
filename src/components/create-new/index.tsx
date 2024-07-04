import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function CreateNew() {
  const [file, setFile] = useState<File & { preview: string }>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleCreate = () => {};

  return (
    <form className="flex flex-col gap-5">
      <h1 className="text-center font-semibold text-2xl">Create a new Event</h1>

      <div
        {...getRootProps()}
        className="h-40 relative rounded-md border border-slate-200 flex justify-center items-center"
      >
        <input {...getInputProps()} />

        {file && (
          <img
            src={file.preview}
            className="absolute top-0 bottom-0 h-40 w-full object-cover"
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        )}

        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      <div>
        <label htmlFor="title">Title</label>
        <Input id="title" />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Input id="description" />
      </div>
      <div>
        <label htmlFor="date">Start Date</label>
        <Input id="date" />
      </div>
      <Button onClick={handleCreate}>Create</Button>
    </form>
  );
}
