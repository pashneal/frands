import type { Direction, FlatBoard, Position } from "$lib/types";

const BOARD_WIDTH = 6;
const BOARD_HEIGHT = 8;

// Assumes that top-right is 0,0
const directionMap : Array<[Position, Direction]> = [
  [[1,0], "E"],
  [[-1,0], "W"],
  [[1,-1], "NE"],
  [[-1,-1], "NW"],
  [[1,1], "SE"],
  [[-1,1], "SW"],
  [[0,1], "S"],
  [[0,-1], "N"],
]

let find = (arr : Array<[Position, Direction]>, pos : Position) => {
  for (let [p, dir] of arr) {
    if (p[0] === pos[0] && p[1] === pos[1]) {
      return dir;
    }
  }
  return undefined;
}

export function indexToPosition( array_pos : number ) : Position { 
  let x = array_pos % BOARD_WIDTH;
  let y = Math.floor(array_pos / BOARD_WIDTH);
  return [x, y];
}

export function positionToIndex( pos : Position ) : number {
  let [x, y] = pos;
  return y * BOARD_WIDTH + x;
}

export class Chain {
  private selections : Array<Position> = [];
  private directions : Array<[Position, Direction]> = [];

  public constructor() {
  }

  public addPosition(position : [number, number]) {
    this.selections.push(position);
    const length = this.selections.length;
    if (length > 1) {
      console.log("Adding direction", this.selections[length - 1]);
      const newIndex = length - 1;
      const lastIndex = length - 2;
      const newPos = this.selections[newIndex];
      const lastPos = this.selections[lastIndex];
      const dir = this.relativeDirection(lastPos, newPos);
      if (dir !== undefined) {
        this.directions.push([lastPos, dir])
      }
    }
  }

  private relativeDirection( first : Position , next : Position ) : Direction | undefined {
    const dx = next[0] - first[0];
    const dy = next[1] - first[1];
    return find(directionMap, [dx, dy]);
  }

  public updateDirections( directions : FlatBoard) {
    for (let [pos, dir] of this.directions) {
      let index = positionToIndex(pos);
      directions[index] = dir;
    }
  }

  public updateSelections( selections : Array<boolean>) {
    for (let pos of this.selections) {
      let index = positionToIndex(pos);
      selections[index] = true;
    }
  }
}
