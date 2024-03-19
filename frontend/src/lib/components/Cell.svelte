<script lang="ts">
  import Connector from "./Connector.svelte"; 
  import type { Direction } from "$lib/types";
  export let value;
  export let direction : Direction | null = null;
  export let selected : boolean = false;

</script>

<div>
  {#if direction !== null}
      <Connector direction={direction} />
  {/if}

  <button on:click>
    <div class="grid-item {selected ? 'highlighted' : ''}">{value}</div>
  </button>
</div>

<style>
  button {
    border: 0;
    background-color: rgba(0, 0, 0, 0);
    font-size: 1.9em;
    z-index: 1;
  }

  div {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .grid-item {
    width : 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .highlighted {
    border-radius: 50%;
    background-color: red;
  }

</style>
