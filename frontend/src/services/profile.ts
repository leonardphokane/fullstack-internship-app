import api from "../api";

export async function getProfile() {
  const res = await api.get("/profile");
  return res.data;
}

export async function updateProfile(data: { name?: string; email?: string }) {
  const res = await api.put("/profile", data);
  return res.data;
}
