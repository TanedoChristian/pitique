import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import api from "../../helper/api";
const PitiqueProfilePortfolio = ({ pitiquerId }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("img", selectedFile);
      formData.append("ptqr_id", pitiquerId);

      try {
        const { data } = await api.post("/portfolios", formData);

        console.log(data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-6">
      <img
        className="h-[100px] w-[100px]  object-cover rounded-md"
        src="https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      <img
        className="h-[100px] w-[100px]  object-cover rounded-md"
        src="https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      <img
        className="h-[100px] w-[100px]  object-cover rounded-md"
        src="https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      <img
        className="h-[100px] w-[100px]  object-cover rounded-md"
        src="https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      <img
        className="h-[100px] w-[100px]  object-cover rounded-md"
        src="https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      <img
        className="h-[100px] w-[100px]  object-cover rounded-md"
        src="https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      <img
        className="h-[100px] w-[100px]  object-cover rounded-md"
        src="https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default PitiqueProfilePortfolio;
