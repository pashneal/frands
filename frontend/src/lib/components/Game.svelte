<script lang="ts">
  import Board from '$lib/components/Board.svelte';

  let message = "";
  function handleCheckPhrase(event : any) {
    message = event.detail.reason.toUpperCase();
  }
</script>

<div>
  <div class="status-container">
    <h1 class="status">{message}</h1>
  </div>

  <div class="board">
    <Board on:checkphrase={handleCheckPhrase}/>
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
  .status-container {
    height : 100px;
  }
</style>
