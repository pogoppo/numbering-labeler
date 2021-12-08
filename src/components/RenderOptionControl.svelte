<script lang="ts">
  import { tick } from "svelte";

  import { list, label as label_, render_ } from "~/stores/render-options";

  $: {
    $list.pos;
    $list.overlay;
    (async () => {
      await tick();
      $render_.sbInstance?.updateMetrics();
    })();
  }
</script>

<div class="RenderOptionControl">
  <h3>リスト</h3>
  <div class="RenderOptionControl__item">
    <h4>位置</h4>
    <div class="RenderOptionControl__switch">
      <span
        class:active={$list.pos == "bottom"}
        on:click={() => ($list.pos = "bottom")}
      >
        下に配置
      </span>
      <span
        class:active={$list.pos == "right"}
        on:click={() => ($list.pos = "right")}
      >
        右に配置
      </span>
      <span
        class:active={$list.overlay}
        on:click={() => ($list.overlay = !$list.overlay)}
      >
        画像と重ねる
      </span>
    </div>
  </div>
  <div class="RenderOptionControl__item">
    <h4>背景色</h4>
    <label>
      <input type="color" bind:value={$list.color} />
      <span class="RenderOptionControl__button">変更</span>
    </label>
  </div>
  {#if $list.overlay}
    <div class="RenderOptionControl__item">
      <h4>背景色の透明度</h4>
      <input
        type="range"
        bind:value={$list.alpha}
        min="0"
        max="100"
        step="10"
      />
    </div>
  {/if}
  <div class="RenderOptionControl__item">
    <h4>フォントの色</h4>
    <label>
      <input type="color" bind:value={$list.fontColor} />
      <span class="RenderOptionControl__button">変更</span>
    </label>
  </div>
  <div class="RenderOptionControl__item">
    <h4>フォントサイズ</h4>
    <input
      type="range"
      bind:value={$list.fontSize}
      min="10"
      max="24"
      step="1"
    />
  </div>

  <h3>ラベル</h3>
  <div class="RenderOptionControl__item">
    <h4>背景色</h4>
    <label>
      <input type="color" bind:value={$label_.color} />
      <span class="RenderOptionControl__button">変更</span>
    </label>
  </div>
  <div class="RenderOptionControl__item">
    <h4>背景色の透明度</h4>
    <input
      type="range"
      bind:value={$label_.alpha}
      min="0"
      max="100"
      step="10"
    />
  </div>
  <div class="RenderOptionControl__item">
    <h4>フォントの色</h4>
    <label>
      <input type="color" bind:value={$label_.fontColor} />
      <span class="RenderOptionControl__button">変更</span>
    </label>
  </div>
  <div class="RenderOptionControl__item">
    <h4>フォントサイズ</h4>
    <input
      type="range"
      bind:value={$label_.fontSize}
      min="16"
      max="48"
      step="2"
    />
  </div>
</div>

<style lang="scss">
  .RenderOptionControl {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    font-size: 0.9em;
    > h3 {
      margin: 32px 0 0;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    }
    &__item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      > h4 {
        margin: 0;
      }
      > label {
        display: inline-flex;
        align-items: center;
        width: fit-content;
      }
      input[type="color"] {
        height: 40px;
        margin-right: 8px;
      }
      input[type="range"] {
        width: 100%;
        max-width: 160px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 8px;
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
    &__button {
      padding: 4px 8px;
      background-color: var(--color-blue);
    }
    &__switch {
      > span {
        display: inline-flex;
        align-items: center;
        margin: 8px 4px;
        padding: 4px 12px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 12px;
        opacity: 0.6;
        cursor: pointer;
        &.active {
          background-color: var(--color-blue);
          opacity: 1;
        }
      }
    }
  }
</style>
