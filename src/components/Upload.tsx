"use client";

import { FormEvent, useState } from "react";

export default function SellerForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: null,
  });

  const handleImageUpload = async (ev: FormEvent) => {
    const file = (ev.target as HTMLInputElement).files![0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    setForm({ ...form, profileImage: data.secure_url });
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    await fetch("/api/sellers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        placeholder="Last Name"
      />
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <button type="submit">Submit</button>
    </form>
  );
}
