<script lang="ts">
  import interact from "interactjs";
  import { onMount } from "svelte";

  import { image, list, render_ } from "~/stores/render-options";
  import labelList from "~/stores/label-list";

  export let zoom = 1;

  onMount(() => {
    interact(".MainRender [data-draggable]").draggable({
      inertia: false,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
      autoScroll: true,
      listeners: {
        start() {
          $render_.sbInstance.updateOptions({
            lockScrollOnDragDirection: true,
          });
        },
        move(event) {
          const target = event.target;
          const index = target.dataset.index;
          const listItem = $labelList[index];
          const x = listItem.x + event.dx * (1 / zoom);
          const y = listItem.y + event.dy * (1 / zoom);

          target.style.transform = "translate(" + x + "px, " + y + "px)";
          listItem.x = x;
          listItem.y = y;
        },
        end() {
          $render_.sbInstance.updateOptions({
            lockScrollOnDragDirection: false,
          });
        },
      },
    });
  });
</script>

<div
  class="MainRender"
  style={`transform: scale(${zoom});`}
  data-pos={$list.pos}
>
  <img src={$image.url} alt="" class="MainRender__photo" />

  <ol class="MainRender__labels">
    {#each $labelList as item, index}
      <li
        class="MainRender__draggable-label"
        style={`transform: translate(
          ${item.x}px, ${item.y}px
        );`}
        data-index={index}
        data-no-scroll
        data-draggable
      >
        <i class="MainRender__item-number">{index + 1}</i>
      </li>
    {/each}
  </ol>

  <ol
    class="MainRender__list"
    class:MainRender__list--overlay={$list.overlay}
    data-pos={$list.pos}
  >
    {#each $labelList as item, index}
      <li>
        <i class="MainRender__item-number">{index + 1}</i>
        <span class="MainRender__item-text">{item.text}</span>
      </li>
    {/each}
  </ol>
</div>

<style lang="scss">
  .MainRender {
    position: relative;
    width: max-content;
    height: max-content;
    &[data-pos="right"] {
      display: flex;
    }
    &__photo {
      display: block;
      width: var(--image-width);
      height: var(--image-height);
    }
    &__labels {
      list-style: none;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 4;
      width: var(--image-width);
      height: var(--image-height);
      margin: 0;
      padding: 16px;
      color: var(--label-font-color);
      font-size: var(--label-font-size);
      box-sizing: border-box;
      > li {
        position: absolute;
        touch-action: none;
        user-select: none;
      }
    }
    &__list {
      list-style: none;
      margin: 0;
      background-color: var(--list-rgb);
      color: var(--list-font-color);
      font-size: var(--list-font-size);
      box-sizing: border-box;
      &[data-pos="right"] {
        width: max-content;
        min-height: var(--image-height);
        max-height: var(--image-height);
        padding: 1em;
        writing-mode: vertical-lr;
        > li {
          display: inline-flex;
          align-items: baseline;
          gap: 0.25em;
          width: max-content;
          max-width: 12em;
          padding: 0.5em;
          writing-mode: horizontal-tb;
          vertical-align: bottom;
        }
      }
      &[data-pos="bottom"] {
        display: flex;
        flex-direction: column;
        flex-flow: row wrap;
        gap: 1em;
        padding: 1em;
        min-width: var(--image-width);
        max-width: var(--image-width);
      }
      &--overlay {
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: var(--list-rgba);
      }
    }
    &__item-number {
      display: inline-block;
      flex: 1 0 auto;
      width: 1.2em;
      height: 1.2em;
      border-radius: 100%;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: bold;
      font-style: normal;
      line-height: 1.2em;
      text-align: center;
    }
    &__labels &__item-number {
      background-color: var(--label-rgba);
      padding: 2px;
      color: var(--label-font-color);
      pointer-events: none;
    }
    &__list &__item-number {
      margin-right: 4px;
      background-color: var(--list-font-color);
      padding: 1px;
      color: var(--list-rgb);
    }
    &__labels,
    &__list {
      &:empty {
        display: none !important;
      }
    }
  }
</style>
