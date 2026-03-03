interface SkeletonProps {
  lines?: number;
  className?: string;
}

const Skeleton = ({ lines = 3, className }: SkeletonProps) => {
  return (
    <div className={`space-y-3 ${className ?? ''}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-3 w-full animate-pulse rounded-full bg-base-100 dark:bg-base-700/60"
        />
      ))}
    </div>
  );
};

export default Skeleton;
