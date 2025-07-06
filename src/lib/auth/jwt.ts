"use server";

import { cookies } from "next/headers";

interface TokenPair {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}

/**
 * Stores access and refresh JWT tokens in secure, HTTP-only cookies.
 */
export async function setTokenCookie(tokens: TokenPair) {
  const cookieStore = await cookies();

  const accessExpires = new Date(tokens.access.expires);
  const refreshExpires = new Date(tokens.refresh.expires);

  console.log("Storing accessToken and refreshToken cookies");

  cookieStore.set("accessToken", tokens.access.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: accessExpires,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("refreshToken", tokens.refresh.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: refreshExpires,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Removes both access and refresh tokens from cookies.
 */
export async function removeTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

/**
 * Retrieves access and refresh tokens from cookies (server only).
 */
export async function getTokenFromCookie(): Promise<{
  accessToken?: string;
  refreshToken?: string;
}> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  return { accessToken, refreshToken };
}
