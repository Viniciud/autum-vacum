export interface PlaceModel {
  position: string;
  status: string;
}

export interface ActionModel {
  actionClean: string;
  actionDirty: string;
}

export interface PerceptionModel {
  status: string;
  action: string;
}

//   constructor(qtdFloors: number) {
//     this.position = 0;
//     this.places = [];
//     for (let i = 0; i < qtdFloors; i++) {
//       this.places.push({ clean: true });
//     }
//   }

//   setPlaceDirty(placeNumber: number) {
//     this.places[placeNumber].dirty = true;
//   }

//   run(action: any) {
//     switch (action) {
//       case 'SUCK':
//         this.places[this.position].clean = false;
//         break;
//       case 'UP':
//         this.position = 1;
//         break;
//       case 'RIGHT':
//         this.position = 2;
//         break;
//       case 'DOWN':
//         this.position = 2;
//         break;
//       case 'LEFT':
//         this.position = 0;
//         break;
//     }

//     return action;
//   }
// }

// export function reflexVacuumAgent(world: PlaceModel) {
//   if (world.places[world.position].dirty) {
//     return 'SUCK';
//   } else if (world.position == 0) {
//     return 'RIGHT';
//   } else if (world.position == 1) {
//     return 'DOWN';
//   } else if (world.position == 2) {
//     return 'LEFT';
//   } else if (world.position == 3) {
//     return 'UP';
//   } else {
//     return;
//   }
// }
