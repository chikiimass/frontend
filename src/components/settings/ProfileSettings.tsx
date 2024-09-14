'use client'
import { useForm } from "@/utils/useForm";

const ProfileSettings = () => {
  const { formState, handleInputChange } = useForm({
    username: "",
    email: "",
    profilePicture: null,
  });

  return (
    <section id="profile" className="mt-8">
      <h2 className="text-xl font-bold mb-4">Profile Information</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            onChange={(e) =>
              handleInputChange({ target: { name: "profilePicture", value: e.target.files[0] } })
            }
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
      </form>
    </section>
  );
};

export default ProfileSettings;
