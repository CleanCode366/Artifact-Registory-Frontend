import React from "react";
import UploaderImage from "./UploaderImage";

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
    
        <UploaderImage/>
      

  );
};

export default Uploader;
