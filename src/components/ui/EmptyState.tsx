type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
      <h2 className="text-lg font-semibold text-gray-900">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-sm text-sm text-gray-500">
          {description}
        </p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
