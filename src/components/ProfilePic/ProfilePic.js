import React, { useState } from 'react';
import './ProfilePic.css';

const ProfilePic = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img 
        className={`profile-pic ${isHovered ? 'spin' : ''}`}
        src="/images/lol.jpg" 
        alt="Profile" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );
};

export default ProfilePic;