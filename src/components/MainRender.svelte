<script lang="ts">
  import interact from "interactjs";
  import { onMount } from "svelte";
  import { image, list, numberingItems } from "~/stores/render-options";

  const labelSpan = 32;
  let maxLabelXPos: number;

  $: {
    maxLabelXPos = $image.width - labelSpan * 2;
  }

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
        move(event) {
          const target = event.target;
          const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

          target.style.transform = "translate(" + x + "px, " + y + "px)";
          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
        },
      },
    });
  });
</script>

<div class="MainRender" data-pos={$list.pos}>
  <img src={$image.url} alt="" class="MainRender__photo" />

  <ol class="MainRender__labels">
    {#each $numberingItems as item, index}
      <li
        class="MainRender__draggable-label"
        style={`transform: translate(
          ${Math.min(maxLabelXPos, index * labelSpan)}px, 0
        );`}
        data-x={Math.min(maxLabelXPos, index * labelSpan)}
        data-no-scroll
        data-draggable
      >
        <i class="MainRender__item-number">{index + 1}</i>
        <span class="MainRender__item-text">{item}</span>
      </li>
    {/each}
  </ol>

  <ol
    class="MainRender__list"
    class:MainRender__list--overlay={$list.overlay}
    data-pos={$list.pos}
  >
    {#each $numberingItems as item, index}
      <li>
        <i class="MainRender__item-number">{index + 1}</i>
        <span class="MainRender__item-text">{item}</span>
      </li>
    {/each}
  </ol>
</div>

<style lang="scss">
  .MainRender {
    position: relative;
    width: max-content;
    height: max-content;
    margin: auto;
    &[data-pos="right"] {
      display: flex;
    }
    &__photo {
      display: block;
      width: var(--image-width);
      height: var(--image-height);
    }
    &__labels {
      counter-reset: numbering-label 0;
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
      }
    }
    &__list {
      counter-reset: numbering-label 0;
      list-style: none;
      margin: 0;
      padding: 16px;
      background-color: var(--list-rgb);
      color: var(--list-font-color);
      font-size: var(--list-font-size);
      box-sizing: border-box;
      &[data-pos="right"] {
        display: grid;
        grid-template-rows: repeat(auto-fill, minmax(1.5em, 1fr));
        grid-auto-flow: column;
        gap: 1em;
        width: max-content;
        min-height: var(--image-height);
        max-height: var(--image-height);
      }
      &[data-pos="bottom"] {
        display: flex;
        flex-direction: column;
        flex-flow: row wrap;
        gap: 1em;
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
      content: counter(numbering-label);
      counter-increment: numbering-label;
      display: inline-block;
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
    &__labels &__item-text {
      display: none;
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
