import { Alert, Button, FileInput, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategories = (e) => {
    setFormData({ ...formData, categories: e.target.value.split(",") });
  };

  const handleAuthor = (e) => {
    setFormData({ ...formData, author: e.target.value.split(",") });
  };

  const handleImage = (e) => {
    // rules_version = '2';
    // Craft rules based on data in your Firestore database
    // allow write: if firestore.get(
    //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }

    try {
      if (!image) {
        setImageUploadError("Please select an image");
        return;
      }

      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image failed uploaded");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadUrl });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/book/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        setError(data.message);
      } else {
        navigate("/admin-panel?tab=products");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full border mt-2 mb-3">
      <h1 className="my-7 text-center text-3xl">Add Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label value="Title" />
          </div>
          <TextInput
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Author" />
          </div>
          <TextInput type="text" id="author" onChange={handleAuthor} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Categories" />
          </div>
          <TextInput
            type="text"
            name="categories"
            id="categories"
            onChange={handleCategories}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Price" />
          </div>
          <TextInput
            type="text"
            name="price"
            id="price"
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Stock" />
          </div>
          <TextInput
            type="text"
            name="stock"
            id="stock"
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Image" />
          </div>
          <div className="flex gap-4 items-center justify-between">
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={handleImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
          {imageUploadError && (
            <div className="mt-2">
              <Alert color="failure">{imageUploadError}</Alert>
            </div>
          )}
        </div>
        {formData.image && <Alert color="success">Uploaded successfully</Alert>}
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Add
        </Button>
      </form>
      {error && (
        <Alert color="failure" className="mt-2">
          {error}
        </Alert>
      )}
    </div>
  );
}

export default AddBook;
