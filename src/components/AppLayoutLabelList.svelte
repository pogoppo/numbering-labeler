<script lang="ts">
  import { image, render_ } from "~/stores/render-options";
  import labelList from "~/stores/label-list";

  import LabelItemList from "~/components/LabelItemList.svelte";
  import DownloadRenderButton from "~/components/DownloadRenderButton.svelte";
  import RestartButton from "~/components/RestartButton.svelte";
</script>

<div
  class="AppLayoutLabelList"
  class:AppLayoutLabelList--disabled={!!!$image.url}
>
  <LabelItemList />
  {#if $labelList.length}
    <DownloadRenderButton renderElement={$render_.render} />
  {/if}
  {#if $image.url}
    <RestartButton />
  {/if}
</div>

<style lang="scss">
  .AppLayoutLabelList {
    overflow-y: auto;
    display: grid;
    grid-area: list;
    grid-template-rows: 1fr 48px 48px;
    max-height: 100vh;
    background-color: rgba(0, 0, 0, 0.1);
    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
</style>
