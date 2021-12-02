<script lang="ts">
  import interact from "interactjs";
  import { onMount } from "svelte";
  export let imageDataURL: string;
  export let listPos: string;
  export let listOverlay: boolean;
  export let numberingItems: string[];

  const labelSpan = 48;

  onMount(() => {
    // target elements with the "draggable" class
    interact(".MainRender__draggable-label").draggable({
      // enable inertial throwing
      inertia: false,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
      // enable autoScroll
      autoScroll: true,

      listeners: {
        // call this function on every dragmove event
        move(event) {
          const target = event.target;
          // keep the dragged position in the data-x/data-y attributes
          const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

          // translate the element
          target.style.transform = "translate(" + x + "px, " + y + "px)";

          // update the posiion attributes
          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
        },
      },
    });
  });
</script>

<div
  class="MainRender"
  class:MainRender--overlay={listOverlay}
  data-pos={listPos}
>
  <img src={imageDataURL} alt="" class="MainRender__photo" />

  <ol class="MainRender__labels">
    {#each numberingItems as _, index}
      <li
        class="MainRender__draggable-label"
        style={`transform: translate(${index * labelSpan}px, 0);`}
        data-x={index * labelSpan}
      >
        {index + 1}
      </li>
    {/each}
  </ol>

  <ol class="MainRender__list">
    {#each numberingItems as item, index}
      <li>
        <i>{index + 1}</i>
        {item}
      </li>
    {/each}
  </ol>
</div>

<style lang="scss">
  .MainRender {
    display: flex;
    position: relative;
    width: fit-content;
    overflow: hidden;
    &__photo {
      display: block;
      width: var(--image-width);
      height: var(--image-height);
      object-fit: cover;
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
    }
    &__labels > li,
    &__list > li > i {
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
    &__labels > li {
      background-color: var(--label-rgba);
      padding: 2px;
      color: var(--label-font-color);
    }
    &__list > li > i {
      margin-right: 4px;
      background-color: var(--list-font-color);
      padding: 1px;
      color: var(--list-rgb);
    }

    &--overlay &__list {
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: var(--list-rgba);
    }
    &[data-pos="right"] &__list {
      display: grid;
      grid-template-rows: repeat(auto-fill, minmax(1.5em, 1fr));
      grid-auto-flow: column;
      gap: 1em;
      min-height: var(--image-height);
      max-height: var(--image-height);
    }
    &[data-pos="bottom"] {
      flex-direction: column;
    }
    &[data-pos="bottom"] &__list {
      flex-direction: column;
      display: flex;
      flex-flow: row wrap;
      gap: 1em;
      min-width: var(--image-width);
      max-width: var(--image-width);
    }
    &__labels,
    &__list {
      &:empty {
        display: none !important;
      }
    }
  }
</style>
