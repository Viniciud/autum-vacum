class World {
  public location;
  public floors;

  constructor(numFloors: number) {
    this.location = 0;
    this.floors = [];
    for (let i = 0; i < numFloors; i++) {
      this.floors.push({ dirty: false });
    }
  }

  setFloorDirty(floorNumber: number) {
    this.floors[floorNumber].dirty = true;
  }

  run(action: any) {
    switch (action) {
      case 'SUCK':
        this.floors[this.location].dirty = false;
        break;
      case 'LEFT':
        this.location = 0;
        break;
      case 'RIGHT':
        this.location = 1;
        break;
      case 'UP':
        this.location = 2;
        break;
      case 'DOWN':
        this.location = 3;
        break;
    }

    return action;
  }
}

// Rules are defined in code
export function reflexVacuumAgent(world: World) {
  if (world.floors[world.location].dirty) {
    return 'SUCK';
  } else if (world.location == 0) {
    return 'RIGHT';
  } else if (world.location == 1) {
    return 'LEFT';
  } else if (world.location == 2) {
    return 'UP';
  } else if (world.location == 3) {
    return 'DOWN';
  }
}

// Rules are defined in data, in a table indexed by [location][dirty]
export function tableVacuumAgent(world: World, table: any) {
  let location = world.location;
  let dirty = world.floors[location].dirty ? 1 : 0;
  return table[location][dirty];
}
