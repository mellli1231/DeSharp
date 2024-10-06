import React, { useState } from 'react'
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const Form = () => {

    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [userLocation, setUserLocation] = useState(null);
    const [photo, setPhoto] = useState('');

    const addEntry = useMutation(api.myFunctions.createTask);
    const handleSubmit = async (e) => {

        e.preventDefault();
        [latitude, longitude] = userLocation;
        await addEntry({ latitude, longitude, photo, name });

        setName("");
        setComment("");
        alert("Form Submitted");
    }

    // define the function that finds the users geolocation
    const getUserLocation = () => {
      // if geolocation is supported by the users browser
      if (navigator.geolocation) {
  
        // get the current users location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // save the geolocation coordinates in two variables
            const { latitude, longitude } = position.coords;
            // update the value of userlocation variable
            setUserLocation({ latitude, longitude });
          },
          // if there was an error getting the users location
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      }
      // if geolocation is not supported by the users browser
      else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
            />

            <textarea
                placeholder="Enter your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
            />
            <button type='submit'>Click to submit</button>
        </form>
    );

}

export default Form;