<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Cell from './Cell.svelte';
  import { Controller } from '$lib/controller';

  export let board = Array(48).fill(0);
  $: connectors = Array(48).fill(null);
  $: selections = Array(48).fill(false);
  $: shells = Array(48).fill(false);

  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  alphabet += alphabet;

  $: letters = alphabet.split('');

  $: controller = new Controller();


  const dispatch = createEventDispatcher();

  function interact(pos : number) {
    controller.interact(pos);
    controller.updateConnectors(connectors);
    controller.updateSelections(selections);
    controller.updateShells(shells);

    // trick to force reactivity
    connectors = connectors;
    selections = selections;
    shells = shells;

    // Bubble custom events up to parent
    dispatch('interact', { });

    if (controller.newPhraseCheck()) {
      dispatch('checkphrase', controller.validateLatestChain(letters));
      controller.clearLatestChain(selections, connectors, shells);
    } else {
      dispatch('checkphrase', { reason: "" , valid: false});
    }
  }


</script>

<div class="grid-container">
  {#each board as _, i (`${i}-${connectors[i]}-${selections[i]}-${shells[i]}`)}
    <Cell 
      value={letters[i]} 
      direction={connectors[i]} 
      selected={selections[i]} 
      shell={shells[i]}
    on:click={() => interact(i)}/>
  {/each}
</div>


<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(6, 50px);
    grid-template-rows: repeat(8, 50px);

    gap : 1em;
  }
</style>
