import React from "react";

const Uploader: React.FC = () => {
//   const [files, setFiles] = useState<File[]>([]);

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setFiles(Array.from(e.dataTransfer.files));
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles(Array.from(e.target.files));
//     }
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

  return (
    <div className="flex flex-col gap-5 items-center justify-center ">
      <div className="bg-secondary-background  rounded-2xl shadow-xl p-6 w-full max-w-md flex flex-col items-center text-white">
        {/* Image/Illustration */}

        {/* Drop zone */}
        <div
          className="w-full h-32 border-2 border-dashed border-gray-600 rounded-xl flex flex-col items-center justify-center text-secondary-text  cursor-pointer mb-4"
        >
          <p className="text-center text-sm px-2">
            Drag and drop your files here or click below to select them.
          </p>
        </div>
        <div
          className="w-full mb-4"
        >
          <p className="text-center text-sm px-2">
            Drag and drop your files here or click below to select them.
          </p>
        </div>

        {/* File input */}
        <label className="mb-2">
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.tiff"
            className="hidden"
          />
          <span className="px-4 py-2 bg-white text-black rounded-full   cursor-pointer hover:bg-gray-200">
            Select Files
          </span>
        </label>

        {/* File info */}
        <p className="text-xs text-gray-500 mb-4 text-center">
          Supported formats: JPG, PNG, TIFF <br />
          Maximum size: 5MB per file
        </p>

        {/* Upload button */}
        

        {/* Preview of selected files */}
        {/* {files.length > 0 && (
          <div className="mt-4 w-full text-sm text-left">
            <p className="font-semibold mb-2">Selected Files:</p>
            <ul className="list-disc list-inside space-y-1">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
      <div>
        <button className="bg-primary  hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition cursor-pointer">
              Upload
        </button>
      </div>
    </div>
  );
};

export default Uploader;
