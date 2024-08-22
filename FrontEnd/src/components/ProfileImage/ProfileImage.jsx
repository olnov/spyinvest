import { useState, useEffect } from 'react';
import "./ProfileImage.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const PLACEHOLDER_IMAGE = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

export const ProfileImage = ({ userId, height, width }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/profiles/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        // Extract the image URL from the response JSON
        const data = await response.json();
        if (data.imageUrl) {
          setImageSrc(data.imageUrl);
        } else {
          setImageSrc(PLACEHOLDER_IMAGE);
        }
      } catch (err) {
        console.error('Error fetching profile image:', err);
        setImageSrc(PLACEHOLDER_IMAGE);
      }
    };

    fetchProfileImage();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {imageSrc ? (
        <img
          className="profile-image"
          src={imageSrc}
          alt="Profile"
          height={height}
          width={width}
          onError={() => setImageSrc(PLACEHOLDER_IMAGE)} // Fallback to placeholder if the image fails to load
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProfileImage;
