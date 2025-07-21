import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function isAdminAuthenticated() {
  const token = cookies().get('token')?.value;
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXTAUTH_SECRET)
    );

    return payload?.role === 'admin';
  } catch (err) {
    console.error("JWT error:", err);
    return false;
  }
}
