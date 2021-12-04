<script lang="ts">
  import { image, list, label, numberingItems } from "~/stores/render-options";

  import MainRender from "~/components/MainRender.svelte";
  import StartUp from "~/components/StartUp.svelte";
  import DownloadRender from "~/components/DownloadRender.svelte";
  import LabelItemList from "~/components/LabelItemList.svelte";
  import RenderOptionControl from "~/components/RenderOptionControl.svelte";

  let renderElement: HTMLElement;

  $: {
    $image.url;
    numberingItems.set([]);
  }

  const toHEX = (n: number) =>
    Math.round(n * 2.55)
      .toString(16)
      .padStart(2, "0");
</script>

<main>
  <StartUp />

  {#if $image.url}
    <LabelItemList />
    <RenderOptionControl />
    <div bind:this={renderElement} class="MainRenderWrapper">
      <MainRender
        --image-width={`${$image.width}px`}
        --image-height={`${$image.height}px`}
        --list-rgb={$list.color}
        --list-rgba={$list.color + toHEX($list.alpha)}
        --list-font-color={$list.fontColor}
        --list-font-size={`${$list.fontSize}px`}
        --label-rgb={$label.color}
        --label-rgba={$label.color + toHEX($label.alpha)}
        --label-font-color={$label.fontColor}
        --label-font-size={`${$label.fontSize}px`}
      />
    </div>
    <DownloadRender {renderElement} />
  {/if}
</main>

<style>
  main {
    padding: 1em;
  }
  .MainRenderWrapper {
    width: fit-content;
  }
</style>
