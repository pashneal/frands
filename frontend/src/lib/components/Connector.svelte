<script lang="ts">
  export let direction : "E" | "W" | "N" | "S" | "NE" | "NW" | "SE" | "SW";
  export let color: "primary" | "secondary" | "";
</script>

<svg class="{color}">
  {#if direction === "E"}
      <line x1="50%" y1="50%" x2="90%" y2="50%" />
  {:else if direction === "W"}
      <line x1="50%" y1="50%" x2="10%" y2="50%" />
  {:else if direction === "N"}
      <line x1="50%" y1="50%" x2="50%" y2="10%" />
  {:else if direction === "S"}
      <line x1="50%" y1="50%" x2="50%" y2="90%" />
  {:else if direction === "NE"}
      <line x1="50%" y1="50%" x2="90%" y2="10%" />
  {:else if direction === "NW"}
      <line x1="50%" y1="50%" x2="10%" y2="10%" />
  {:else if direction === "SE"}
      <line x1="50%" y1="50%" x2="90%" y2="90%" />
  {:else if direction === "SW"}
      <line x1="50%" y1="50%" x2="10%" y2="90%" />
  {/if}
</svg>

<style>
  svg {
    width: 150px;
    height: 150px;
    position: absolute;
  }
  line {
    stroke-width: 12px;
  }
  .primary {
    stroke: red;
  }
  .secondary {
    stroke: blue;
  }
</style>

