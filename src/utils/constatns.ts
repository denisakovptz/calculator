export const mode = {
   CONSTRUCTOR: true,
   RUNTIME: false
};

export const dndTypes = {
   COMPONENT: 'component'
};

export const componentNames = {
   DISPLAY: 'display',
   ACTIONS: 'actions',
   NUMBERS: 'numbers',
   EQUAL: 'equal'
};

export const calcBlocks = [
   {
      id: 0,
      index: 0,
      name: componentNames.DISPLAY,
      blockClass: 'display_block',
      value: '0',
      isActive: false,
      isVisible: true
   },
   {
      id: 1,
      index: 1,
      name: componentNames.ACTIONS,
      blockClass: 'actions_block',
      buttons: [
         { id: 0, value: '/' },
         { id: 1, value: 'x' },
         { id: 2, value: '-' },
         { id: 3, value: '+' }
      ],
      isActive: false,
      isVisible: true
   },
   {
      id: 2,
      index: 2,
      name: componentNames.NUMBERS,
      blockClass: 'numbers_block',
      buttons: [
         { id: 1, value: '7' },
         { id: 2, value: '8' },
         { id: 3, value: '9' },
         { id: 4, value: '4' },
         { id: 5, value: '5' },
         { id: 6, value: '6' },
         { id: 7, value: '1' },
         { id: 8, value: '2' },
         { id: 9, value: '3' },
         { id: 10, value: '0' },
         { id: 11, value: ',' }
      ],
      isActive: false,
      isVisible: true
   },
   {
      id: 3,
      index: 3,
      name: componentNames.EQUAL,
      blockClass: 'equal_block',
      buttons: [{ id: 0, value: '=' }],
      isActive: false,
      isVisible: true
   }
];

export const reg = {
   ACTIONS: /[x/+-]/,
   NUMBERS: /\d/,
   EQUAL: /=/,
   DOT: /,/
};

export interface initialInputsProps {
   valueA: string;
   valueB: string;
   action: string;
}

export const initialInputs: initialInputsProps = {
   valueA: '',
   valueB: '',
   action: ''
};
