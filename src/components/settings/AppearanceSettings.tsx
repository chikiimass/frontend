'use client'
import { useForm } from "@/utils/useForm";

const AppearanceSettings = () => {
  const { formState, handleInputChange } = useForm({
    theme: "light",
    fontSize: "medium",
  });

  return (
    <section id="appearance" className="mt-8">
      <h2 className="text-xl font-bold mb-4">Appearance Settings</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Theme</label>
          <select
            name="theme"
            value={formState.theme}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Font Size</label>
          <select
            name="fontSize"
            value={formState.fontSize}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </form>
    </section>
  );
};

export default AppearanceSettings;
