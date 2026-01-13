import { getChangedFields } from "./getChangedFields";

export function createDesignUpdater<T extends Record<string, unknown>>(options: {
  designId: string;
  mutate: (args: {
    id: string;
    payload: { designData: Partial<T> };
    preview?: Blob | null;
  }) => void | Promise<void>;
  generatePreview?: () => Promise<Blob | null>;
}) {
  let lastSnapshot: Partial<T> | undefined;
  let saveTimeout: ReturnType<typeof setTimeout> | null = null;
  let hydrated = false;

  const VISUAL_KEYS: (keyof T)[] = ["canvas", "colors", "photos"] as any;

  async function execute(current: Partial<T>) {
    if (!hydrated) return;

    const changed = getChangedFields<T>(lastSnapshot, current);
    if (Object.keys(changed).length === 0) return;

    let preview: Blob | null | undefined = null;

    if (
      options.generatePreview &&
      VISUAL_KEYS.some((k) => k in changed)
    ) {
      preview = await options.generatePreview();
    }

    await options.mutate({
      id: options.designId,
      payload: { designData: changed },
      preview,
    });

    lastSnapshot = {
      ...lastSnapshot,
      ...changed,
    };
  }

  function hydrate(initial: T) {
    lastSnapshot = initial;
    hydrated = true;
  }

  function schedule(current: Partial<T>, delay = 1500) {
    if (!hydrated) return;

    if (saveTimeout) clearTimeout(saveTimeout);

    saveTimeout = setTimeout(() => {
      execute(current);
    }, delay);
  }

  async function flush(current: Partial<T>) {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
      saveTimeout = null;
    }
    await execute(current);
  }

  // ✅ الجديد
  function hasPendingChanges(current: Partial<T>): boolean {
    if (!hydrated) return false;
    const changed = getChangedFields<T>(lastSnapshot, current);
    return Object.keys(changed).length > 0;
  }

  return {
    hydrate,
    schedule,
    flush,
    hasPendingChanges, // 👈 expose it
  };
}

