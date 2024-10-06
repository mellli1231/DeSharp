import React, { useState, useRef } from 'react'
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import "./form.css";

const Form = () => {

  const [user_name, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [photo, setPhoto] = useState('');

  const generateUploadUrl = useMutation(api.myFunctions.generateUploadUrl);
  const addEntry = useMutation(api.myFunctions.createTask);
  const tasks = useQuery(api.tasks.get);
  const imageInput = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();

      // Get the user's location before proceeding
      const location = await getUserLocation();
      if (!location) {
          alert("Could not get location");
          return;
      }
      const { latitude, longitude } = location;

      // Get short-lived upload URL
      const postURL = await generateUploadUrl();
      // POST file to the url
      const result = await fetch(postURL, {
          method: "POST",
          headers: { "Content-Type": selectedImage.type },
          body: selectedImage,
      });
      // save result to this ID to save to database
      const { storageId } = await result.json();

      await addEntry({ latitude, longitude, storageId, user_name, comment });
      setUserName("");
      setComment("");
      setSelectedImage(null);
      imageInput.current.value = null;
      alert("Form Submitted");
  };

  // Define the function that finds the user's geolocation
  const getUserLocation = () => {
      return new Promise((resolve, reject) => {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                  (position) => {
                      const { latitude, longitude } = position.coords;
                      setUserLocation({ latitude, longitude });
                      resolve({ latitude, longitude });
                  },
                  (error) => {
                      console.error('Error getting user location:', error);
                      reject(null);
                  }
              );
          } else {
              console.error('Geolocation is not supported by this browser.');
              reject(null);
          }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form">
        <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setUserName(e.target.value)}
              value={user_name}
              required
          />

          <textarea
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
          />
          <input
              type="file"
              accept="image/*"
              ref={imageInput}
              onChange={(e) => setSelectedImage(e.target.files[0])}
              disabled={selectedImage !== null}
              required
          />
          <p> </p>
          
        <button type='submit'>Click to submit</button>
        {/*{tasks && JSON.stringify(tasks)}*/}
        </div>
    </form>
  );
};

export default Form;