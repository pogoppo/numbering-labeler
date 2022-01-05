<script lang="ts">
  import SvgIcon from "@jamescoyle/svelte-icon";
  import { mdiMagnifyPlusOutline, mdiMagnifyMinusOutline } from "@mdi/js";

  import {
    image,
    list,
    label as label_,
    render_,
  } from "~/stores/render-options";

  import MainRender from "~/components/MainRender.svelte";
  import StartUp from "~/components/StartUp.svelte";

  const toHEX = (n: number) =>
    Math.round(n * 2.55)
      .toString(16)
      .padStart(2, "0");
</script>

<div class="AppLayoutWorkspace__area">
  <div bind:this={$render_.workspace} class="AppLayoutWorkspace">
    <div bind:this={$render_.render} class="AppLayoutWorkspace__render">
      {#if $image.url}
        <MainRender
          zoom={$render_.zoom}
          --image-width={`${$image.width}px`}
          --image-height={`${$image.height}px`}
          --list-rgb={$list.color}
          --list-rgba={$list.color + toHEX($list.alpha)}
          --list-font-color={$list.fontColor}
          --list-font-size={`${$list.fontSize}px`}
          --label-rgb={$label_.color}
          --label-rgba={$label_.color + toHEX($label_.alpha)}
          --label-font-color={$label_.fontColor}
          --label-font-size={`${$label_.fontSize}px`}
        />
      {:else}
        <StartUp />
      {/if}
    </div>
  </div>
  {#if $image.url}
    <div class="AppLayoutWorkspace__zoom-control">
      <div class="AppLayoutWorkspace__zoom-range">
        <SvgIcon type="mdi" path={mdiMagnifyMinusOutline} />
        <input
          type="range"
          bind:value={$render_.zoom}
          min="0.1"
          max="1"
          step="0.1"
        />
        <SvgIcon type="mdi" path={mdiMagnifyPlusOutline} />
      </div>
      <div class="AppLayoutWorkspace__zoom-rate">
        {Math.floor(100 * $render_.zoom * 100) / 100}%
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .AppLayoutWorkspace {
    display: flex;
    overflow: auto;
    width: 100%;
    height: 100%;
    &__area {
      grid-area: workspace;
      position: relative;
      overflow: hidden;
    }
    &__render {
      width: max-content;
      height: max-content;
      margin: auto;
    }
    &__zoom-control {
      display: flex;
      align-items: center;
      gap: 8px;
      position: absolute;
      right: 8px;
      bottom: 8px;
      z-index: 8;
      opacity: 0.75;
      user-select: none;
    }
    &__zoom-range {
      display: flex;
      align-items: center;
      gap: 4px;
      > input[type="range"] {
        width: 120px;
        height: 2px;
        background-color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          background-color: var(--color-blue);
          border-radius: 50%;
        }
        &::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background-color: var(--color-blue);
          border-radius: 50%;
          border: none;
        }
        &::-moz-focus-outer {
          border: 0;
        }
      }
    }
    &__zoom-rate {
      width: 4ch;
    }
  }
</style>
