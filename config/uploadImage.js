import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { Alert } from "react-native";

const uploadImage = async (uploadUri, fileName, address) => {
  // const blob = await new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.onload = function () {
  //     resolve(xhr.response);
  //   };
  //   xhr.onerror = function () {
  //     reject(new TypeError("Netword request failed"));
  //   };
  //   xhr.responseType = "blob";
  //   xhr.open("GET", uploadUri, true);
  //   xhr.send(null);
  //
  const blob = await fetch(uploadUri).then((res) => res.blob());

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, address + fileName);
  const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

  // Listen for state changes, errors, and completion of the upload.

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        alert("progress", "Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            "Upload is paused";
            break;
          case "running":
            "Upload is running";
            break;
        }
      }, // progress callback, not needed for this example
      (error) => reject(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          "File available at", downloadURL;
          resolve(downloadURL);
        });
      }
    );
  });
};

export default uploadImage;
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       ("Upload is " + progress + "% done");
//       switch (snapshot.state) {
//         case "paused":
//           ("Upload is paused");
//           break;
//         case "running":
//           ("Upload is running");
//           break;
//       }
//     },
//     (error) => {
//       // A full list of error codes is available at
//       // https://firebase.google.com/docs/storage/web/handle-errors
//       switch (error.code) {
//         case "storage/unauthorized":
//           // User doesn't have permission to access the object
//           break;
//         case "storage/canceled":
//           // User canceled the upload
//           break;

//         // ...

//         case "storage/unknown":
//           // Unknown error occurred, inspect error.serverResponse
//           break;
//       }
//     },
//     () => {
//       // Upload completed successfully, now we can get the download URL
//       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         ("File available at", downloadURL);
//         resolve(downloadURL);
//       });
//     }
//   );

// };

// export default uploadImage;
