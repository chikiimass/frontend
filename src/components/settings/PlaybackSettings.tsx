'use client'
import { useForm } from "@/utils/useForm";

const PlaybackSettings = () => {
  const { formState, handleInputChange } = useForm({
    quality: "auto",
    autoPlay: true,
  });

  return (
    <section id="playback" className="mt-8">
      <h2 className="text-xl font-bold mb-4">Playback Settings</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Default Quality</label>
          <select
            name="quality"
            value={formState.quality}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="auto">Auto</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="ultra">Ultra HD</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Auto-Play</label>
          <input
            type="checkbox"
            name="autoPlay"
            checked={formState.autoPlay}
            onChange={(e) =>
              handleInputChange({
                target: { name: "autoPlay", value: e.target.checked },
              })
            }
            className="mt-1"
          />
        </div>
      </form>
    </section>
  );
};

export default PlaybackSettings;
