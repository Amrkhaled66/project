// src/data/blanketSizes.ts
export type BlanketSizeId =
  | "Lap" | "Throw" | "Game" | "Stadium"
  | "Twin" | "Full" | "Queen" | "King";

export type BlanketSize = {
  id: BlanketSizeId;
  name: string;
  width: number;   
  height: number;  
  price: number;
  rows: number;    
  cols: number;   
};

export const BLANKET_SIZES: BlanketSize[] = [
  { id: "Lap",     name: "Lap",     width: 36,  height: 48,  price: 69.99,  rows: 2, cols: 3 },
  { id: "Throw",   name: "Throw",   width: 50,  height: 60,  price: 79.99,  rows: 3, cols: 3 },
  { id: "Game",    name: "Game",    width: 60,  height: 80,  price: 99.99,  rows: 3, cols: 4 },
  { id: "Stadium", name: "Stadium", width: 72,  height: 90,  price: 119.99, rows: 4, cols: 4 },
  { id: "Twin",    name: "Twin",    width: 66,  height: 90,  price: 129.99, rows: 4, cols: 5 },
  { id: "Full",    name: "Full",    width: 80,  height: 90,  price: 149.99, rows: 4, cols: 6 },
  { id: "Queen",   name: "Queen",   width: 90,  height: 90,  price: 169.99, rows: 5, cols: 5 },
  { id: "King",    name: "King",    width: 108, height: 90,  price: 189.99, rows: 6, cols: 6 },
];

// handy lookup
export const getSizeById = (id: BlanketSizeId) =>
  BLANKET_SIZES.find(s => s.id === id)!;
