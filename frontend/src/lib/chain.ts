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
  private connectors : Array<[Position, Direction]> = [];
  private finalized : boolean = false;

  public constructor() {
  }

  // Add a position to the chain.
  //
  // If the position is adjacent to the last position, grow the chain. 
  // If the position is not adjacent, reset the chain.
  // If the position already exists in the chain, back up to that position.
  public addPosition(position : [number, number]) {
    for (let [index, [x,y]] of this.selections.entries()) {
      if (x === position[0] && y === position[1]) {
        this.selections = this.selections.slice(0, index + 1);
        this.connectors = this.connectors.slice(0, index);
        return;
      }
    }

    this.selections.push(position);
    const length = this.selections.length;
    if (length > 1) {
      const newIndex = length - 1;
      const lastIndex = length - 2;
      const newPos = this.selections[newIndex];
      const lastPos = this.selections[lastIndex];
      const dir = this.relativeDirection(lastPos, newPos);
      if (dir === undefined) {
        this.selections = this.selections.slice(length - 1);
        this.connectors = [];
      } else {
        this.connectors.push([lastPos, dir])
      }
    }
  }

  public lastPosition() : Position | undefined {
    return this.selections[this.selections.length - 1];
  }

  private relativeDirection( first : Position , next : Position ) : Direction | undefined {
    const dx = next[0] - first[0];
    const dy = next[1] - first[1];
    return find(directionMap, [dx, dy]);
  }

  public getSelections() : Array<Position> {
    // defensively copy the array
    return this.selections.map(([x,y]) => [x,y]);
  }

  public getConnectors() : Array<[Position, Direction]> {
    // defensively copy the array
    return this.connectors.map(([[x,y], dir]) => [[x,y], dir]);
  }

  public getShellPosition() : Position | undefined {
    if (this.finalized) {
      return undefined;
    }
    const length = this.selections.length;
    if (length === 0) {
      return undefined;
    }
    return this.lastPosition();
  }


  public constructPhraseFrom(letters : Array<string> ) : string {
    let phrase = "";
    for (let pos of this.selections) {
      let index = positionToIndex(pos);
      phrase += letters[index];
    }
    return phrase;
  }

}
