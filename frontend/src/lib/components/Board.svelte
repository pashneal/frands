<script lang="ts">
  import Cell from './Cell.svelte';
  import { Controller } from '$lib/controller';
  import type { FlatBoard } from '$lib/types';

  export let board = Array(48).fill(0);
  $: directions = Array(48).fill(null);
  $: selections = Array(48).fill(false);

  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  alphabet += alphabet;

  $: controller = new Controller();

  function interact(pos : number) {
    controller.interact(pos);
    controller.updateDirections(directions);
    selections[pos] = true;
  }


</script>

<div class="grid-container">
  {#each board as _, i (`${i}-${directions[i]}-${selections[i]}`)}
    <Cell value={alphabet[i]} direction={directions[i]} selected={selections[i]} on:click={() => interact(i)}/>
  {/each}
</div>


<style>

  .grid-container {
    display: grid;
    grid-template-columns: repeat(6, 50px);
    grid-template-rows: repeat(8, 50px);

    gap: 10px;
  }

</style>
