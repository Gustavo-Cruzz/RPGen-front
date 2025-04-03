import React, { useState } from "react";
import "./ImageField.css";
import GenerateImageButton from "./GenerateImageButton";

const ImageField: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = () => {
    // Logic for generating an image (placeholder for now)
    alert("Generate Image button clicked!");
  };

  return (
    <div
      className={`image-input-container ${
        imagePreview ? "no-border" : ""
      }`} /* Add a conditional class */
    >
      <label htmlFor="image-upload" className="image-input-label">
        Image
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleImageUpload}
        className="image-input"
      />
      <div
        className="image-preview"
        onClick={() => document.getElementById("image-upload")?.click()}
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Uploaded Preview" />
        ) : (
          <label>Click to upload</label>
        )}
      </div>
      <GenerateImageButton onClick={handleGenerateImage} />
    </div>
  );
};

export default ImageField;
