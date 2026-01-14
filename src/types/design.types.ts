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
      cornerstones: {
        type: string | null;
        images: Record<number, string | null>;
      };
    };
  };

  text: {
    items: any[];
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
  previewImage?: string;
  designData: DesignData;
  price: string;
  createdAt: string;
  updatedAt: string;
}
