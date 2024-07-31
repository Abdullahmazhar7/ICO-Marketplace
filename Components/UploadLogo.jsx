// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useDropzone } from "react-dropzone";

// // internal Import
// import UploadICON from "./SVG/UploadICON";

// const UploadLogo = ({
//   imageURL,
//   setimageURL,
//   setLoader,
//   PINATA_API_KEY,
//   PINATA_SECRET_KEY,
// }) => {
//   const notifySuccess = (msg) => toast.success(msg, { duration: 900 });
//   const notifyError = (msg) => toast.error(msg, { duration: 900 });

//   const uploadToIPFS = async (file) => {
//     if (file) {
//       try {
//         setLoader(true);
//         const formData = new FormData();
//         formData.append("file", file);

//         const response = await axios({
//           method: "post",
//           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           data: formData,
//           maxBodyLength: "Infinity",
//           headers: {
//             pinata_api_key: PINATA_API_KEY,
//             pinata_secret_api_key: PINATA_SECRET_KEY,
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

//         setimageURL(url);
//         setLoader(false);
//         notifySuccess("Logo Uploaded Successfully");
//       } catch (error) {
//         setLoader(false);
//         notifyError("Check your Pinata Keys");
//         console.log(error);
//       }
//     }
//   };

//   const onDrop = useCallback(async (acceptedFiles) => {
//     await uploadToIPFS(acceptedFiles[0]);
//   });

//   const { getInputProps, getRootProps } = useDropzone({
//     onDrop,
//     maxSize: 5000000, // 5 MB for example
//   });

//   return (
//     <>
//       {imageURL ? (
//         <div>
//           <img
//             src={imageURL}
//             style={{ width: "200px", height: "auto" }}
//             alt="Uploaded logo"
//           />
//         </div>
//       ) : (
//         <div {...getRootProps()}>
//           <label for="file" className="custum-file-upload">
//             <div className="icon">
//               <UploadICON />
//             </div>
//             <div className="text">
//               <span>Click to upload LOGO</span>
//             </div>
//             <input type="file" id="file" {...getInputProps()} />
//           </label>
//         </div>
//       )}
//     </>
//   );
// };

// export default UploadLogo;

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
//import UploadICON from './UploadICON'; // Ensure you have the UploadICON component
import UploadICON from "./SVG/UploadICON";

const UploadLogo = () => {
  const [imageURL, setImageURL] = useState(null);
  
  const maxSize = 5242880; // 5 MB in bytes

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      alert('File size should be less than 5 MB');
      return;
    }
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize,
    accept: 'image/*'
  });

  return (
    <>
      {imageURL ? (
        <div>
          <img
            src={imageURL}
            style={{ width: "200px", height:"auto" }}
            alt="Uploaded logo"
          />
        </div>
      ) : (
        <div {...getRootProps()}>
          <label htmlFor="file" className="custom-file-upload">
            <div className="icon">
              <UploadICON/>
            </div>
            <div className="text">
              <span>Click to upload LOGO</span>
            </div>
            <input type="file" id="file" {...getInputProps()} />
          </label>
        </div>
      )}
    </>
  );
};

export default UploadLogo;








