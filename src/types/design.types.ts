import { BlanketSizeId } from "src/data/blanketSizes";
export interface sizeObj {
  name: BlanketSizeId;
  rows: number;
  cols: number;
}

export interface DesignData {
  meta: {
    name: string;
    createdAt: string | null;
    updatedAt: string | null;
  };

  canvas: {
    size: sizeObj;
    layout: any[];
    zoom: number;
  };

  colors: {
    blanket: string | null;
    border: string | null;
    backing: string | null;
    binding: string | null;
    blocking: {
      colors: string[];
      random: boolean;
    };
    qualityPreserve: string | null;
  };

  upgrades: {
    selected: string[];
    props: {
      embroidery: { zones: any };
      blocking: { colors: string[]; random: boolean };
      binding: { color: string | null };
      customPanel: { text: string; image: string | null; options: any };
      cornerstones: {
        type: string | null;
        images: Record<number, string | null>;
      };
    };
  };

  text: {
    items: any[];
  };

  preview: {
    image: string | null;
  };

  photos: {
    items: any[];
  };
  price: string;
}

export interface Design {
  id: string;
  userId: number;
  name: string;
  previewImageUrl?: string;
  designData: DesignData;
  createdAt: string;
  updatedAt: string;
}
