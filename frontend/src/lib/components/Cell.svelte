<script lang="ts">
  import Connector from "./Connector.svelte"; 
  import type { Direction } from "$lib/types";

  export let value;
  export let direction : Direction | null = null;
  export let selected : boolean = false;
  export let shell : boolean = false;
</script>

<div>
  {#if direction !== null}
      <Connector direction={direction} />
  {/if}

  <button on:click>
    <div class="{shell ? 'shell' : ""}">
        <div class="grid-item {selected ? 'selected' : ''}">{value}</div>
    </div>
  </button>
</div>

<style>
  button {
    border: 0;
    background-color: rgba(0, 0, 0, 0);
    font-size: 1.6em;
    z-index: 1;
  }

  div {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .grid-item {
    width : 1.7em;
    height: 1.7em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .selected {
    border-radius: 50%;
    background-color: red;
  }

  .shell {
    border-radius: 50%;
    width: 2em;
    height: 2em;
    outline: 3px solid red;

    gap : 1em;
  }
</style>
