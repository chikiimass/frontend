import { useForm } from "@/utils/useForm";

const PrivacySettings = () => {
  const { formState, handleInputChange } = useForm({
    profileVisibility: "public",
    activitySharing: true,
  });

  return (
    <section id="privacy" className="mt-8">
      <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Visibility</label>
          <select
            name="profileVisibility"
            value={formState.profileVisibility}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Share Activity</label>
          <input
            type="checkbox"
            name="activitySharing"
            checked={formState.activitySharing}
            onChange={(e) =>
              handleInputChange({
                target: { name: "activitySharing", value: e.target.checked },
              })
            }
            className="mt-1"
          />
        </div>
      </form>
    </section>
  );
};

export default PrivacySettings;
