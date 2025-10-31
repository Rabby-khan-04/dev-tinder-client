const InfoItem = ({ label, value }) => (
  <div>
    <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
      {value || "—"}
    </p>
  </div>
);

export default InfoItem;
