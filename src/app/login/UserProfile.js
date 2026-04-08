import React, { useState, useEffect } from 'react';

// ==========================================
// 1. CLEAN COMPONENT (No issues expected)
// ==========================================
export const UserAvatar = ({ user }) => {
  if (!user || !user.avatarUrl) {
    return <div className="placeholder-avatar">No Image</div>;
  }
  
  return (
    <img 
      src={user.avatarUrl} 
      alt={`${user.name}'s avatar`} 
      className="avatar-img" 
      loading="lazy"
    />
  );
};


// ==========================================
// 2. COMMENTED-OUT VULNERABLE COMPONENT (ALL issues must be skipped)
// ==========================================
/*
export const LegacyUserAdmin = ({ userId }) => {
  // TODO: NEVER use this component in production again!!
  
  // The system should ignore this hardcoded secret because it's commented out:
  const adminSecretCode = "SUPER-SECRET-ADMIN-12345";
  
  // The system should ignore this dangerous eval because it's commented out:
  const parseUserData = (dataStr) => {
    return eval("(" + dataStr + ")"); 
  };

  return (
    <div>
      <h1>Legacy Admin Dashboard</h1>
      <button onClick={() => deleteUser(userId, adminSecretCode)}>
        Force Delete User
      </button>
    </div>
  );
};
*/


// ==========================================
// 3. ACTIVE VULNERABLE COMPONENT (Issues SHOULD be reported)
// ==========================================
export const UserProfilePanel = ({ user, bioHtml, friendsList }) => {
  // Active hardcoded token (Rule & AI should flag this)
  const apiToken = "AKIAIOSFODNN7EXAMPLE";
  
  // Active empty catch block (Bad practice - AI should flag this)
  try {
    console.log("Loading profile for:", user.name);
  } catch (error) {
  }

  // Missing the "key" prop in the list iteration (React best practice - AI should flag)
  const renderFriends = () => {
    return friendsList.map((friend) => (
      <li>{friend.name}</li>
    ));
  };

  return (
    <div className="profile-panel">
      <h2>{user.name}</h2>
      
      {/* Active XSS Vulnerability - dangerouslySetInnerHTML without sanitization */}
      <div 
        className="bio-section"
        dangerouslySetInnerHTML={{ __html: bioHtml }} 
      />
      
      <h3>Friends</h3>
      <ul>
        {renderFriends()}
      </ul>
    </div>
  );
};
