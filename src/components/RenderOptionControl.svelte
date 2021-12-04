<script lang="ts">
  import { list, label } from "~/stores/render-options";
</script>

<div>
  <input type="color" bind:value={$list.color} style="height:32px;" />
  <input type="range" bind:value={$list.alpha} min="0" max="100" step="10" />
  <input type="color" bind:value={$list.fontColor} style="height:32px;" />
  <input type="range" bind:value={$list.fontSize} min="10" max="24" step="1" />
  <div>
    <span on:click={() => ($list.pos = "bottom")}>bottom</span>
    <span on:click={() => ($list.pos = "right")}>right</span>
    <span on:click={() => ($list.overlay = !$list.overlay)}>overlay</span>
  </div>
</div>
<div>
  <input type="color" bind:value={$label.color} style="height:32px;" />
  <input type="range" bind:value={$label.alpha} min="0" max="100" step="10" />
  <input type="color" bind:value={$label.fontColor} style="height:32px;" />
  <input type="range" bind:value={$label.fontSize} min="16" max="48" step="2" />
</div>
