import api from "../api";
import { LoginResponse } from "shared/types";

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token); // save token
  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
}
