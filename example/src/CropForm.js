import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CropForm.css';

function CropForm() {
  const navigate = useNavigate();
  const [stateName, setStateName] = useState('');
  const [cropSeason, setCropSeason] = useState('');
  const [stateSuggestions, setStateSuggestions] = useState([]);
  const [cropSuggestions, setCropSuggestions] = useState([]);

  const indianStates = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];
  const cropSeasons = ['Kharif', 'Rabi', 'Zaid'];

  // Function to handle input change for state name
  const handleStateChange = (e) => {
    const value = e.target.value;
    setStateName(value);
    if (value.length > 0) {
      const suggestions = indianStates.filter(state => state.toLowerCase().startsWith(value.toLowerCase()));
      setStateSuggestions(suggestions);
    } else {
      setStateSuggestions([]);
    }
  };

  // Function to handle input change for crop season
  const handleCropSeasonChange = (e) => {
    const value = e.target.value;
    setCropSeason(value);
    if (value.length > 0) {
      const suggestions = cropSeasons.filter(crop => crop.toLowerCase().startsWith(value.toLowerCase()));
      setCropSuggestions(suggestions);
    } else {
      setCropSuggestions([]);
    }
  };

 // Function to handle form submission
const handleSubmit = async (e) => {
  navigate('/Results');
  e.preventDefault();
  console.log("State Name:", stateName);
  console.log("Crop Season:", cropSeason);

  try {
    const response = await fetch('/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stateName, cropSeason })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Response from server:', data);
      // Optionally, you can navigate to another page here
      navigate('/Results');
    } else {
      console.error('Failed to submit form');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};


  // Function to handle selecting a state suggestion
  const handleSelectState = (state) => {
    setStateName(state);
    setStateSuggestions([]);
  };

  // Function to handle selecting a crop suggestion
  const handleSelectCropSeason = (crop) => {
    setCropSeason(crop);
    setCropSuggestions([]);
  };

  return (
    <div className="centered-form">
      <div className="crop-form">
        <h2>Crop Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="stateName">State Name:</label>
            <input
              type="text"
              name='statename'
              id="stateName"
              value={stateName}
              onChange={handleStateChange}
              onFocus={handleStateChange}
              placeholder="Enter state name"
            />
            {stateSuggestions.length > 0 && (
              <ul className="suggestions">
                {stateSuggestions.map((state, index) => (
                  <li key={index} onClick={() => handleSelectState(state)}>{state}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="cropSeason">Crop Season:</label>
            <input
              type="text"
              name='cropseason'
              id="cropSeason"
              value={cropSeason}
              onChange={handleCropSeasonChange}
              onFocus={handleCropSeasonChange}
              placeholder="Enter crop season"
            />
            {cropSuggestions.length > 0 && (
              <ul className="suggestions">
                {cropSuggestions.map((crop, index) => (
                  <li key={index} onClick={() => handleSelectCropSeason(crop)}>{crop}</li>
                ))}
              </ul>
            )}
          </div>
          <button onClick={handleSubmit} type="button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CropForm;
