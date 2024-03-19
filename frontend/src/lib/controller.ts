import { indexToPosition, Chain } from './chain';
import type { FlatBoard as Connections } from '$lib/types.ts';


export class Controller {
  private chains : Array<Chain> = [];

  public constructor() {
  }

  public interact(arrayPos : number) {
    let pos = indexToPosition(arrayPos);
    if (this.chains.length === 0) {
      this.chains.push(new Chain());
    }

    let chain = this.chains[this.chains.length - 1];
    chain.addPosition(pos);
  }

  public updateConnectors( connectors : Connections) {
    for (let chain of this.chains) {
      chain.updateConnectors(connectors);
    }
  }

  public updateSelections( selections : Array<boolean> ) {
    for (let chain of this.chains) {
      chain.updateSelections(selections);
    }
  }

  public updateShells( shells : Array<boolean> ) {
    for (let chain of this.chains) {
      chain.updateShells(shells);
    }
  }
} 

