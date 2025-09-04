export default function ChallengeCard({ title, progress }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="font-bold mb-2">{title}</h4>
      <div className="w-full bg-gray-200 rounded h-4">
        <div
          className="bg-indigo-600 h-4 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">{progress}% complete</p>
    </div>
  );
}
