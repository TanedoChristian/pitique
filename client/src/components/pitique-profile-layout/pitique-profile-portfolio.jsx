import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import api from "../../helper/api";
import { showSuccessMessage } from "../../helper/messageHelper";
const PitiqueProfilePortfolio = ({ pitiquerId, user }) => {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/portfolios/pitiquer/${pitiquerId}`);

        if (data) {
          setPortfolios(data);
        }
      } catch (error) {
        console.error(error);
        setPortfolios([]);
      }
    };

    fetch();
  }, [flag]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await api.delete("/portfolios/" + id);

      if (data) {
        setFlag(!flag);
        showSuccessMessage("Deleted!", "Successfully deleted!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("img", selectedFile);
      formData.append("ptqr_id", pitiquerId);

      try {
        const { data } = await api.post("/portfolios", formData);

        if (data) {
          setFlag(!flag);
          showSuccessMessage("Success", "Added Successfully!");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      {portfolios.length === 0 ? (
        <p>No portfolio/s found</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {portfolios.map((_p) => {
            return (
              <div key={_p.id}>
                <img
                  className="h-[100px] w-[100px] object-fit rounded-md"
                  alt={`Portfolio ${_p.id}`}
                  src={`data:image/png;base64, ${_p.img}`}
                />
                {user && user.id == pitiquerId && (
                  <button
                    className="hover:text-red-500"
                    onClick={() => handleDelete(_p.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
      {user && user.id == pitiquerId && (
        <div className="mt-10 flex justify-center items-center">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default PitiqueProfilePortfolio;
