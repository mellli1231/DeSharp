import React, { useState } from 'react'
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const Form = () => {

    const [user_name, setUserName] = useState('');
    const [comment, setComment] = useState('');
    const [userLocation, setUserLocation] = useState(null);
    const [photo, setPhoto] = useState('');

    const addEntry = useMutation(api.myFunctions.createTask);
    const tasks = useQuery(api.tasks.get);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the user's location before proceeding
        const location = await getUserLocation();
        if (!location) {
            alert("Could not get location");
            return;
        }

        const { latitude, longitude } = location;
        await addEntry({ latitude, longitude, photo, user_name, comment });
        console.log(latitude, longitude, comment, user_name);
        setUserName("");
        setComment("");
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
            <button type='submit'>Click to submit</button>
           {/* {tasks && JSON.stringify(tasks)} */}
        </form>
    );

}

export default Form;