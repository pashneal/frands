import { indexToPosition, positionToIndex, Chain } from './chain';
import type { FlatBoard as Connections } from '$lib/types.ts';
import type { Position } from '$lib/types.ts';


export type ValidationMessage = {
  reason : string,
  valid : boolean,
}


export class Controller {
  private chains : Array<Chain> = [];
  private doubleClick : boolean = false;

  public constructor() {
  }

  public interact(arrayIndex : number) {
    let pos = indexToPosition(arrayIndex);
    this.doubleClick = false;
    if (this.chains.length === 0) {
      this.chains.push(new Chain());
    }

    let chain = this.chains[this.chains.length - 1];

    let lastPos = chain.lastPosition();

    if (lastPos !== undefined && (lastPos[0] === pos[0] && lastPos[1] === pos[1])) {
      this.doubleClick = true;
    } else {
      this.doubleClick = false;
    }
    chain.addPosition(pos);

  }

  public updateConnectors( connectors : Connections) {
    connectors.fill(null);

    for (let chain of this.chains) {
      for (let [pos, dir] of chain.getConnectors()) {
        let index = positionToIndex(pos);
        connectors[index] = dir;
      }
    }
  }

  public updateSelections( selections : Array<boolean> ) {
    selections.fill(false);

    for (let chain of this.chains) {
      for (let pos of chain.getSelections()) {
        let index = positionToIndex(pos);
        selections[index] = true;
      }
    }
  }

  public updateShells( shells : Array<boolean> ) {
    shells.fill(false);

    for (let chain of this.chains) {
      let shellPosition = chain.getShellPosition();
      if (shellPosition !== undefined) {
        let index = positionToIndex(shellPosition);
        shells[index] = true;
      }
    }
  }

  // Returns true if a new phrase is to be checked
  // (as indicated by user)
  public newPhraseCheck() : boolean {
    return this.doubleClick;
  }

  // Determines the legality of the phrase currently highlighted
  // by the user in a Chain and returns a ValidationMessage
  // indicating the result.
  //
  // letters : the flattened board of displayed letters
  public validateLatestChain( letters : Array<string>) : ValidationMessage {
    let latestChain = this.chains[this.chains.length - 1];
    if (latestChain === undefined) {
      return {reason: "Nothing selected", valid: false};
    }

    let phrase = latestChain.constructPhraseFrom(letters);
    if (phrase.length < 3) {
      return {reason: "Too short", valid: false};
    }

    return {reason: "Dictionary Checking Not Implemented Yet", valid: false};
  }

  public clearLatestChain(selections : Array<boolean>, connectors : Connections, shells : Array<boolean>) {
    let latestChain = this.chains[this.chains.length - 1];
    this.doubleClick = false;

    if (latestChain === undefined) {
      return;
    }
    for (let pos of latestChain.getSelections()) {
      let index = positionToIndex(pos);
      selections[index] = false;
    }
    for (let [pos, _] of latestChain.getConnectors()) {
      let index = positionToIndex(pos);
      connectors[index] = null;
    }
    let shellPos = latestChain.getShellPosition();
    if (shellPos !== undefined) {
      let index = positionToIndex(shellPos);
      shells[index] = false;
    }

    this.chains.pop();
  }

} 

