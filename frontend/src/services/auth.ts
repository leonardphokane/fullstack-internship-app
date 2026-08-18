import api from "../api";

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token); // save token
  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
}
