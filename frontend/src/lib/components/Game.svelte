<script lang="ts">
  import Board from '$lib/components/Board.svelte';
  import Hint from '$lib/components/Hint.svelte';

  let message = "";
  function handleMessageUpdate(event : any) {
    message = event.detail.message.toUpperCase();
  }
</script>

<div class="game">
  <div>
    <div class="status-container">
      <h1 class="status">{message}</h1>
    </div>

    <div class="board">
      <Board on:messageUpdate={handleMessageUpdate}/>
    </div>
  </div>

  <Hint/>
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
