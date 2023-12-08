import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { debounce } from "lodash";

const MapWithMyLocation = ({ setBooking }) => {
  const [mapCenter, setMapCenter] = useState([]);
  const [isSuccess, setSuccess] = useState(false);
  const [streetName, setStreetName] = useState("");
  const [inputStreet, setInputStreet] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputStreet(value);
    debouncedSearch(value);
    setSuccess(false);
  };

  const debouncedSearch = debounce(async (value) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value
        )}&limit=5`
      );

      const address = response.data;

      setSuggestions(address);
    } catch (error) {
      console.error("Error searching for street name suggestions:", error);
    }
  });

  const handleSearch = async () => {
    const query = inputStreet.trim();
    if (query) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&limit=1`
        );

        console.log(response.data);

        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setMapCenter([parseFloat(lat), parseFloat(lon)]);
          setStreetName(query);
          setSuccess(true);

          setSelectedCoordinates({
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
          });
        } else {
          console.error("No location found for the provided street name.");
          setSuccess(false);
        }
      } catch (error) {
        console.error("Error searching for street name:", error);
        setSuccess(false);
      } finally {
        setSuggestions([]);
      }
    }
  };

  const handleSelectSuggestion = async (suggestion) => {
    setInputStreet(suggestion.display_name);
    setSuggestions([]);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          suggestion.display_name
        )}&limit=1`
      );

      const address_name = response.data[0].display_name;
      console.log(response.data);
      const address_array = address_name.split(",");

      console.log(address_array);

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
        setStreetName(suggestion.display_name);
        setSuccess(true);
        setSelectedCoordinates({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        });
      } else {
        console.error("No location found for the provided street name.");
        setSuccess(false);
      }
    } catch (error) {
      console.error(
        "Error fetching coordinates for the selected street:",
        error
      );
      setSuccess(false);
    } finally {
      setInputStreet("");
      setSuggestions([]);
    }
  };

  return (
    <div>
      <div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Enter street name"
            value={inputStreet}
            onChange={handleInputChange}
            className="w-[70%] bg-gray-200  rounded-sm h-[50px] p-2"
          />

          <button
            type="button"
            onClick={handleSearch}
            className="w-[30%]  mt-2 p-3  border-2 bg-cyan-500 text-white  font-bold  shadow-md rounded-md text-sm"
          >
            Search
          </button>
        </div>
      </div>
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
      {isSuccess ? (
        <div className="mt-5">
          <MapContainer
            center={mapCenter}
            zoom={15}
            style={{ height: "400px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={mapCenter}>
              <Popup>Your Location: {streetName}</Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MapWithMyLocation;
