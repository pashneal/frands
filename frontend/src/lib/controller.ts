import { indexToPosition, positionToIndex, Chain } from './chain';
import type { Connections, ValidationMessage, BoardProperties } from '$lib/types';
import { Color } from '$lib/types';

export class ChainsController {
  private chains : Array<Chain> = [];
  private doubleClick : boolean = false;
  private latestMessage : ValidationMessage = {message: "", valid: false};

  public constructor() {
  }

  public interact(arrayIndex : number,  boardProperties : BoardProperties) {
    let pos = indexToPosition(arrayIndex);

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

    this.updateSelectionColors(boardProperties.colors);
    this.updateConnectors(boardProperties.connectors);
    this.updateShells(boardProperties.shells);

    if (this.newPhraseCheck()) {
      this.latestMessage = this.validateLatestChain(boardProperties.letters);

      if (this.latestMessage.valid) {
        this.finalizeLatestChain();
        this.chains.push(new Chain());
        // Force board to update
        this.updateShells(boardProperties.shells);
        this.updateConnectors(boardProperties.connectors);
        this.updateSelectionColors(boardProperties.colors);
      } else {
        this.clearLatestChain(boardProperties);
        this.chains.push(new Chain());
      }
    } else {
      this.latestMessage = {message: "", valid: false};
    }
  }

  public getLatestMessage() : ValidationMessage {
    return this.latestMessage;
  }

  private updateConnectors( connectors : Connections) {
    connectors.fill(null);

    for (let chain of this.chains) {
      for (let [pos, dir] of chain.getConnectors()) {
        let index = positionToIndex(pos);
        connectors[index] = dir;
      }
    }
  }

  private updateSelectionColors( colors : Array<Color> ) {
    colors.fill(Color.None);

    for (let chain of this.chains) {
      for (let pos of chain.getSelections()) {
        let index = positionToIndex(pos);
        colors[index] = Color.Primary;
      }
    }

    let latestChain = this.chains[this.chains.length - 1];
    if (latestChain !== undefined) {
      for (let pos of latestChain.getSelections()) {
        let index = positionToIndex(pos);
        colors[index] = Color.Secondary;
      }
    }

  }

  private updateShells( shells : Array<boolean> ) {
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
      return {message: "Nothing selected", valid: false};
    }

    let phrase = latestChain.constructPhraseFrom(letters);
    if (phrase.length <= 3) {
      return {message: "Too short", valid: false};
    }

    const validationMessage =  {message: "Correct!", valid: true};
    // TODO: check if phrase is *actually* in the dictionary
    return validationMessage;

  }

  public clearLatestChain(boardProperties : BoardProperties) {

    let latestChain = this.chains[this.chains.length - 1];
    this.doubleClick = false;

    if (latestChain === undefined) {
      return;
    }
    for (let pos of latestChain.getSelections()) {
      let index = positionToIndex(pos);
      boardProperties.colors[index] = Color.None;
    }
    for (let [pos, _] of latestChain.getConnectors()) {
      let index = positionToIndex(pos);
      boardProperties.connectors[index] = null;
    }
    let shellPos = latestChain.getShellPosition();
    if (shellPos !== undefined) {
      let index = positionToIndex(shellPos);
      boardProperties.shells[index] = false;
    }


    // Remove all non-finalized chains
    this.chains = this.chains.filter((chain) => chain.is_finalized());
  }

  public finalizeLatestChain() {
    let latestChain = this.chains[this.chains.length - 1];
    if (latestChain === undefined) {
      throw new Error("No chain to finalize!");
    }
    latestChain.finalize();
  }

} 

