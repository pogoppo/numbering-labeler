<script lang="ts">
  import { onMount, tick } from "svelte";
  import ScrollBooster from "scrollbooster";

  import {
    image,
    list,
    label,
    numberingItems,
    renderElement,
  } from "~/stores/render-options";

  import MainRender from "~/components/MainRender.svelte";
  import StartUp from "~/components/StartUp.svelte";
  import LabelItemList from "~/components/LabelItemList.svelte";
  import RenderOptionControl from "~/components/RenderOptionControl.svelte";
  import DownloadRender from "~/components/DownloadRender.svelte";

  let sbWrapElement: HTMLElement;

  const toHEX = (n: number) =>
    Math.round(n * 2.55)
      .toString(16)
      .padStart(2, "0");

  onMount(() => {
    const sbInstance = new ScrollBooster({
      viewport: sbWrapElement,
      scrollMode: "native",
      bounce: true,
      shouldScroll: (_, event) => {
        return event.target.dataset.noScroll == undefined;
      },
    });

    image.subscribe(async () => {
      numberingItems.set([]);
      await tick();
      sbInstance.updateMetrics();
    });
    numberingItems.subscribe(async () => {
      await tick();
      sbInstance.updateMetrics();
    });
    list.subscribe(async () => {
      await tick();
      sbInstance.updateMetrics();
    });
  });
</script>

<main>
  <div
    class="AppLayout__control"
    class:AppLayout__control--disabled={!!!$numberingItems.length}
  >
    <RenderOptionControl />
  </div>

  <div bind:this={sbWrapElement} class="AppLayout__sb-wrap">
    <div bind:this={$renderElement} class="AppLayout__render">
      {#if $image.url}
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
      {:else}
        <StartUp />
      {/if}
    </div>
  </div>

  <div class="AppLayout__list" class:AppLayout__list--disabled={!!!$image.url}>
    <LabelItemList />
    <DownloadRender renderElement={$renderElement} />
  </div>
</main>

<style lang="scss">
  main {
    display: grid;
    grid-template-columns: 320px 1fr 320px;
    position: relative;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    user-select: none;
  }
  .AppLayout__sb-wrap {
    display: flex;
    overflow: hidden;
  }
  .AppLayout__render {
    width: max-content;
    height: max-content;
    margin: auto;
  }
  .AppLayout__control,
  .AppLayout__list {
    background-color: rgba(0, 0, 0, 0.25);
  }
</style>
