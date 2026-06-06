import type { Design } from "src/types/design.types";
import type { sizeObj, DesignData } from "src/types/design.types";

export type DirtySection =
  | "canvas"
  | "panelSize"
  | "colors"
  | "photos"
  | "upgrades"
  | "text";

export type AutosavePayload = {
  designData: Partial<DesignData>;
  dirtySections: DirtySection[];
};

export type DesignEditorStateValue = {
  designId: string;
  designData: DesignData;
  designRecord?: Design;
  isLoading: boolean;
  isError: boolean;
  canvasRef: React.RefObject<HTMLDivElement | null>;
};

export type DesignEditorActionsValue = {
  handleDragStart: () => void;
  handleDragEnd: (event: any) => void;
  updateBlanketColor: (color: string | null) => void;
  updateBorderColor: (color: string | null) => void;
  updateBackingColor: (color: string | null) => void;
  updateBindingColor: (color: string | null) => void;
  updateBlocking: (colors: string[], random: boolean) => void;
  updateQualityPreserveColor: (color: string | null) => void;
  toggleUpgrade: (id: string) => void;
  updateCanvasSize: (size: sizeObj) => void;
  updatePanelSize: (panelSize: number) => void;
  replacePhotos: (items: any[]) => void;
  appendPhotos: (items: any[]) => void;
  removePhoto: (id: string) => void;
  setEmbroideryZones: (zones: any[]) => void;
  setCornerImage: (index: number, url: string) => void;
  removeCornerImage: (index: number) => void;
  resetDesign: () => void;
};

export type DesignDerivedValue = {
  price: string;
  hasCornerstones: boolean;
  hasDoubleCorner: boolean;
  hasBlocking: boolean;
  hasEmbroidery: boolean;
  hasCustomPanel: boolean;
  hasQualityPreserve: boolean;
  hasBinding: boolean;
  hasFringe: boolean;
  hasChanged: boolean;
  isDragging: boolean;
  dirtySections: DirtySection[];
};

export type DesignContextType = DesignEditorStateValue &
  DesignEditorActionsValue &
  DesignDerivedValue;

export type DesignEditorAction =
  | { type: "hydrate"; designData: DesignData }
  | { type: "set-blanket-color"; color: string | null }
  | { type: "set-border-color"; color: string | null }
  | { type: "set-backing-color"; color: string | null }
  | { type: "set-binding-color"; color: string | null }
  | { type: "set-blocking"; colors: string[]; random: boolean }
  | { type: "set-quality-preserve-color"; color: string | null }
  | { type: "toggle-upgrade"; id: string }
  | { type: "set-canvas-size"; size: sizeObj }
  | { type: "set-panel-size"; panelSize: number }
  | { type: "replace-photos"; items: any[] }
  | { type: "append-photos"; items: any[] }
  | { type: "remove-photo"; id: string }
  | { type: "set-embroidery-zones"; zones: any[] }
  | { type: "set-corner-image"; index: number; url: string }
  | { type: "remove-corner-image"; index: number }
  | { type: "reset" };
