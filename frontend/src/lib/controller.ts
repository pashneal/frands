import { indexToPosition, Chain } from './chain';
import type { Direction , Position, FlatBoard } from '$lib/types.ts';


export class Controller {
  private chains : Array<Chain> = [];

  public constructor() {
  }

  public interact(arrayPos : number) {
    let pos = indexToPosition(arrayPos);
    let chain = this.chains[this.chains.length - 1];
    if (chain === undefined) {
      chain = new Chain();
      this.chains.push(chain);
    }
    chain.addPosition(pos);
  }

  public updateDirections( directions : FlatBoard) {
    for (let chain of this.chains) {
      chain.updateDirections(directions);
      console.log("Chain updated", chain.selections);
    }
    console.log("Directions updated", directions);
  }

}

