<script lang="ts">
  import { Color } from '$lib/types';
  import { colorString } from '$lib/utils';
  import { fade } from 'svelte/transition';
  import { send , receive } from '$lib/transitions';
  export let id: number;
  
</script>

<div class="blob {colorString(Color.Primary)}" in:receive={{key:id}} out:send={{key:id}}></div>

<style>
  .blob {
    z-index: -1;
    width : 1.7em;
    height: 1.7em;
  }

  .primary {
    border-radius: 50%;
    background-color: red;
  }

  .secondary {
    border-radius: 50%;
    background-color: blue;
  }
</style>
