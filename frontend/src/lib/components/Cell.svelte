<script lang="ts">
  import Connector from "./Connector.svelte"; 
  import type { Direction } from "$lib/types";
  import { Color } from "$lib/types";

  export let value;
  export let direction : Direction | null = null;
  export let color : Color  = Color.None;
  export let shell : boolean = false;

  function colorString(c :  Color) {
    if (c === Color.None) { return "" }
    if (c === Color.Primary) { return "primary"}
    if (c === Color.Secondary) { return "secondary"}
    return "";
  }

  
</script>

<div>
  {#if direction !== null}
      <Connector direction={direction} color={colorString(color)} />
  {/if}

  <button on:click>
    <div class="{shell ? 'shell' : ""}">
        <div class="grid-item {colorString(color)}">{value}</div>
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

  .primary {
    border-radius: 50%;
    background-color: red;
  }

  .secondary {
    border-radius: 50%;
    background-color: blue;
  }

  .shell {
    border-radius: 50%;
    width: 2em;
    height: 2em;
    outline: 3px solid blue;

    gap : 1em;
  }
</style>
