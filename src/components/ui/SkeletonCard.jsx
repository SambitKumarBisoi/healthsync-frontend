function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-xl2 shadow-card animate-pulse">
      <div className="h-6 bg-blue-100 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-blue-50 rounded w-full mb-2"></div>
      <div className="h-4 bg-blue-50 rounded w-5/6"></div>
    </div>
  );
}

export default SkeletonCard;