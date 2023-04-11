export interface IMode {
   isConstructor: boolean;
}

export interface ICalcBlocks {
   paletteBlocks: CalcBlockType[];
   canvasBlocks: CalcBlockType[];
}

export interface CalcBlockType {
   id: number;
   name: string;
   blockClass: string;
   buttons?: ButtonType[];
   value?: string;
   isActive: boolean;
   isVisible: boolean;
   index: number;
}

export interface ButtonType {
   id: number;
   value: string;
}
