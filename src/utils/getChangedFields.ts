export function getChangedFields<T extends Record<string, any>>(
  original: T,
  updated: T
): Partial<T> {
  const changes: Partial<T> = {};

  Object.keys(updated).forEach((key) => {
    if (updated[key] !== original[key]) {
      changes[key as keyof T] = updated[key];
    }
  });

  return changes;
}
