import type {
  AutosavePayload,
  DirtySection,
} from "src/types/desgin/editor.types";
import { getChangedFields } from "./getChangedFields";

const VISUAL_SECTIONS = new Set<DirtySection>([
  "canvas",
  "colors",
  "photos",
  "upgrades",
]);

export function createDesignUpdater<T extends Record<string, unknown>>(options: {
  designId: string;
  mutate: (args: {
    id: string;
    payload: AutosavePayload;
    preview?: Blob | null;
  }) => void | Promise<unknown>;
  generatePreview?: () => Promise<Blob | null>;
  onCommitted?: () => void;
}) {
  let lastSnapshot: Partial<T> | undefined;
  let saveTimeout: ReturnType<typeof setTimeout> | null = null;
  let hydrated = false;
  let pendingCurrent: Partial<T> | null = null;
  let pendingDirtySections = new Set<DirtySection>();

  const execute = async () => {
    if (!hydrated || !pendingCurrent) {
      return;
    }

    const current = pendingCurrent;
    const dirtySections = [...pendingDirtySections];
    pendingCurrent = null;
    pendingDirtySections = new Set<DirtySection>();

    const changed = getChangedFields<T>(lastSnapshot, current);
    if (Object.keys(changed).length === 0) {
      options.onCommitted?.();
      return;
    }

    const shouldGeneratePreview =
      !!options.generatePreview &&
      dirtySections.some((section) => VISUAL_SECTIONS.has(section));

    const preview = shouldGeneratePreview
      ? await options.generatePreview?.()
      : null;

    await options.mutate({
      id: options.designId,
      payload: {
        designData: changed,
        dirtySections,
      },
      preview,
    });

    lastSnapshot = {
      ...lastSnapshot,
      ...changed,
    };
    options.onCommitted?.();
  };

  const hydrate = (initial: T) => {
    lastSnapshot = initial;
    hydrated = true;
  };

  const schedule = (
    current: Partial<T>,
    dirtySections: DirtySection[],
    delay = 1500,
  ) => {
    if (!hydrated) {
      return;
    }

    pendingCurrent = current;
    dirtySections.forEach((section) => pendingDirtySections.add(section));

    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    saveTimeout = setTimeout(() => {
      saveTimeout = null;
      void execute();
    }, delay);
  };

  const flush = async (current: Partial<T>, dirtySections: DirtySection[]) => {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
      saveTimeout = null;
    }

    pendingCurrent = current;
    pendingDirtySections = new Set(dirtySections);
    await execute();
  };

  const hasPendingChanges = (current: Partial<T>): boolean => {
    if (!hydrated) {
      return false;
    }

    const changed = getChangedFields<T>(lastSnapshot, current);
    return Object.keys(changed).length > 0;
  };

  const getSnapshot = () => lastSnapshot;

  return {
    hydrate,
    schedule,
    flush,
    hasPendingChanges,
    getSnapshot,
  };
}
