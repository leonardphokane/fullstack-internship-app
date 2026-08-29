import React, { useEffect, useState } from "react";
import api from "../api";

interface Profile {
  name: string;
  email: string;
  role: string;
  bio: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // ✅ Tell Axios the response type
        const res = await api.get<Profile>("/profile");
        setProfile(res.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
    </div>
  );
}
