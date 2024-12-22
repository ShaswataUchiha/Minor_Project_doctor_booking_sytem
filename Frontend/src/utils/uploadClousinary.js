const upload_preset = 'doctor-booking';
const cloud_name = 'shaswata';

const uploadImageToCloudinary = async (file) => {
  const uploadData = new FormData();

  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset); 
  uploadData.append("cloud_name", cloud_name); 


  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: uploadData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Contains secure_url and other metadata
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw error for handling in calling code
  }
};

export default uploadImageToCloudinary;
