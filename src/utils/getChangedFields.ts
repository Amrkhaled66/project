type AnyRecord = Record<string, unknown>;

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }

  const aKeys = Object.keys(a as object);
  const bKeys = Object.keys(b as object);

  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (
      !Object.prototype.hasOwnProperty.call(b, key) ||
      !deepEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key]
      )
    ) {
      return false;
    }
  }

  return true;
}

export function getChangedFields<T extends AnyRecord>(
  prev: Partial<T> | undefined,
  current: Partial<T>
): Partial<T> {
  const changed: Partial<T> = {};

  const keys = new Set<keyof T>([
    ...(Object.keys(prev ?? {}) as (keyof T)[]),
    ...(Object.keys(current ?? {}) as (keyof T)[]),
  ]);

  keys.forEach((key) => {
    const prevValue = prev?.[key];
    const currentValue = current?.[key];

    // field اتضاف أو اتغير
    if (!deepEqual(prevValue, currentValue)) {
      // لو current undefined → ما تبعتوش
      if (currentValue !== undefined) {
        changed[key] = currentValue;
      }
    }
  });

  return changed;
}
