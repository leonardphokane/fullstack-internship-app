import React, { useEffect, useState } from "react";
import { getProfile } from "../services/profile";   // ✅ use service helper

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {profile && (
        <div className="card profile-card">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
        </div>
      )}
    </div>
  );
}
