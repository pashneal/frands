<script lang="ts">
  import type { Direction } from "$lib/types";
  import { Color } from "$lib/types";
  import { colorString } from "$lib/utils";
  import { send , receive, moved_blob_ids} from "$lib/transitions";

  import Connector from "./Connector.svelte"; 

  export let value;
  export let connectors : Array<[Direction, Color]> = [];
  export let color : Color  = Color.None;
  export let shell : boolean = false;
  export let id : number;

</script>

<div>
  {#each connectors as [direction, color]}
    <Connector direction={direction} color={colorString(color)}/>
  {/each}

  <button on:click>
    <div class="{shell ? 'shell' : ""}">
        <div class="grid-item {colorString(color)}">{value}</div>
        {#if color !== Color.None && !$moved_blob_ids.includes(id)}
            <div class="blob {colorString(Color.Primary)}" out:send="{{key:id}}"></div>
        {/if}
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
    -webkit-user-select: none;
    user-select: none;
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

  .blob {
    position: absolute;
    z-index: 3;
    width : 1.7em;
    height: 1.7em;
  }

</style>
