<script lang="ts">
  import Blob from '$lib/components/Blob.svelte';
  import { Color } from '$lib/types';
  import { colorString } from '$lib/utils';
  import { send, receive, moved_blob_ids } from '$lib/transitions';
  import { derived } from 'svelte/store';

  let blobs : Array<number> = [];
</script>

<button>
  <div>
    Hint
  </div> 
  <div class="blobs-reciever">
    {#each $moved_blob_ids as blob_id}
      <Blob id={blob_id}/>
    {/each}
    <!--{#each Array(48).fill(0) as _, blob_id}-->
      <!--{#if !$moved_blob_ids.includes(blob_id)}-->
        <!--<Blob id={blob_id}/>-->
      <!--{/if}-->
    <!--{/each}-->
  </div> 
</button>

<style>
  button {
    background-image: linear-gradient(45deg, #f3ec78, #af4261);
  }
  .blob {
    z-index: -1;
    width : 1.7em;
    height: 1.7em;
  }
  .primary {
    border-radius: 50%;
    background-color: red;
  }
</style>
