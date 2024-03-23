import React, { useState } from 'react';

const ProfilePic = () => {
  const [isHovered, setIsHovered] = useState(false);

  const imageStyle = {
    borderRadius: "50%",
    width: "200px",
    height: "200px",
    objectFit: "cover",
    animation: isHovered ? "spin 1.5s ease-out" : "none"
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <style>{keyframes}</style>
      <img 
        src="/images/lol.jpg" 
        alt="Profile" 
        style={imageStyle} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );
};

export default ProfilePic;