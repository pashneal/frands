<script lang="ts">
  import Board from '$lib/components/Board.svelte';

  let message = "";
  function checkWord() {
    message = "";
  }
</script>

<div>
  <h1 class="status">{message}</h1>

  <div class="board">
    <Board on:checkword={checkWord}/>
  </div>
</div>

<style>
  .status {
    text-align: center;
  }
  .board {
    display: flex;
    justify-content: center;
  }
</style>
