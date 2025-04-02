"use server";

import { JSON_HEADER } from "../../constants/api.constanst";

export async function handleSignup(formData: FormData): Promise<void> {
  const { firstName, lastName, email, password, rePassword } = Object.fromEntries(formData.entries()) as SignupFormData;

  if (password !== rePassword) {
    throw new Error("Passwords do not match");
  }

  if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    throw new Error("Password must be at least 6 characters, include an uppercase letter, and a number.");
  }

  const payload = {
    username: firstName + lastName,
    firstName,
    lastName,
    email,
    password,
    rePassword,
    phone: "01094155711",
  };

  try {
    const response = await fetch("https://exam.elevateegy.com/api/v1/auth/signup", {
      method: "POST",
      headers: { ...JSON_HEADER },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to sign up.");
    }

    return data;

    // redirect("/auth/signin");
  } catch (err) {
    throw new Error((err as Error).message); // Rethrow the error;
  }
}
