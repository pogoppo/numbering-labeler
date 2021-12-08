<script lang="ts">
  import { onMount } from "svelte";
  import { getLocaleFromNavigator, init, addMessages } from "svelte-i18n";
  import ScrollBooster from "scrollbooster";

  import JA from "~/locales/ja.json";
  import { image, list, label, render_ } from "~/stores/render-options";

  import MainRender from "~/components/MainRender.svelte";
  import StartUp from "~/components/StartUp.svelte";
  import LabelItemList from "~/components/LabelItemList.svelte";
  import RenderOptionControl from "~/components/RenderOptionControl.svelte";
  import DownloadRender from "~/components/DownloadRender.svelte";

  addMessages("ja", JA);
  init({
    fallbackLocale: "ja",
    initialLocale: getLocaleFromNavigator(),
  });

  const toHEX = (n: number) =>
    Math.round(n * 2.55)
      .toString(16)
      .padStart(2, "0");

  onMount(() => {
    $render_.sbInstance = new ScrollBooster({
      viewport: $render_.workspace,
      scrollMode: "native",
      emulateScroll: true,
      bounce: true,
      shouldScroll: (_, event) => {
        return event.target.dataset.noScroll == undefined;
      },
      onWheel: (_, event) => {
        event.preventDefault();
        $render_.zoom += event.deltaY * -0.001;
        $render_.zoom = Math.min(Math.max(0.125, $render_.zoom), 1);
      },
    });
  });
</script>

<main>
  <div
    class="AppLayout__control"
    class:AppLayout__control--disabled={!!!$render_.labels.length}
  >
    <RenderOptionControl />
  </div>

  <div bind:this={$render_.workspace} class="AppLayout__workspace">
    <div bind:this={$render_.render} class="AppLayout__render">
      {#if $image.url}
        <MainRender
          zoom={$render_.zoom}
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
    <DownloadRender renderElement={$render_.render} />
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
  .AppLayout__workspace {
    display: flex;
    overflow: auto;
    scrollbar-color: rgba(255, 255, 255, 0.2);
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
    }
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track-piece,
    &::-webkit-scrollbar-corner,
    &::-webkit-resizer {
      display: none;
    }
  }
  .AppLayout__render {
    width: max-content;
    height: max-content;
    margin: auto;
  }
  .AppLayout__control,
  .AppLayout__list {
    max-height: 100vh;
    background-color: rgba(0, 0, 0, 0.1);
    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
  .AppLayout__list {
    display: grid;
    grid-template-rows: 1fr 64px;
  }
</style>
