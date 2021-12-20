<script lang="ts">
  import { onMount, tick } from "svelte";
  import { _ } from "svelte-i18n";
  import Sortable from "sortablejs";
  import SvgIcon from "@jamescoyle/svelte-icon";
  import { mdiTrashCanOutline, mdiPlus, mdiDragVerticalVariant } from "@mdi/js";

  import { render_ } from "~/stores/render-options";

  let labelListElement: HTMLElement;

  function addItem(input: HTMLInputElement) {
    if (input.value === "") {
      return;
    }
    $render_.labels = [...$render_.labels, input.value];
    input.value = "";
  }

  const changeItem = (index: number) => {
    if ($render_.labels[index] === "") {
      removeItem(index);
    }
  };

  const removeItem = (index: number) => {
    $render_.labels.splice(index, 1);
    $render_.labels = [...$render_.labels];
  };

  $: {
    // ラベルに変更があった際にScrollBoosterの領域を再計算 //
    $render_.labels;
    (async () => {
      await tick();
      $render_.sbInstance?.updateMetrics();
    })();
    /////////////////////////////////////////////////////
  }

  onMount(() => {
    Sortable.create(labelListElement, {
      handle: ".LabelItemList__item-icon--drag",
      async onEnd(event) {
        const newList = [...$render_.labels];
        newList.splice(event.oldIndex, 1);
        newList.splice(event.newIndex, 0, $render_.labels[event.oldIndex]);
        // SortableJSによるDOMの入れ替えを無理やり無効化 //
        $render_.labels = [];
        await tick();
        $render_.labels = newList;
        ////////////////////////////////////////////////
      },
    });
  });
</script>

<div class="LabelItemList">
  <div class="LabelItemList__item LabelItemList__item--new">
    <input
      type="text"
      placeholder={$_("label.new")}
      on:blur={function () {
        addItem(this);
      }}
      on:keypress={function (event) {
        if (event.key == "Enter") {
          addItem(this);
        }
      }}
    />
    <i class="LabelItemList__item-icon">
      <SvgIcon type="mdi" path={mdiPlus} style="cursor: pointer;" />
    </i>
  </div>

  <ol class="LabelItemList__labels" bind:this={labelListElement}>
    {#each $render_.labels as item, index}
      <li class="LabelItemList__item" data-index={index}>
        <i
          class="LabelItemList__item-icon LabelItemList__item-icon--drag"
          on:click={() => removeItem(index)}
        >
          <SvgIcon
            type="mdi"
            path={mdiDragVerticalVariant}
            style="cursor: move;"
          />
        </i>
        <span class="LabelItemList__item-number">{index + 1}</span>
        <input
          type="text"
          bind:value={item}
          on:blur={() => changeItem(index)}
          on:keypress={(event) => {
            if (event.key == "Enter") {
              changeItem(index);
            }
          }}
        />
        <i class="LabelItemList__item-icon" on:click={() => removeItem(index)}>
          <SvgIcon
            type="mdi"
            path={mdiTrashCanOutline}
            style="cursor: pointer;"
          />
        </i>
      </li>
    {/each}
  </ol>
</div>

<style lang="scss">
  .LabelItemList {
    padding: 4px;
    &__labels {
      list-style: none;
      margin: 0;
      padding: 0;
      overflow-y: auto;
    }
    &__item {
      display: flex;
      align-items: center;
      padding: 4px 8px;
      input[type="text"] {
        width: 100%;
        padding: 8px 16px;
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
        box-sizing: border-box;
        &::placeholder {
          color: rgba(255, 255, 255, 0.75);
          font-size: 0.8rem;
        }
      }
    }
    &__item-number {
      display: block;
      padding: 8px;
      background-color: rgba(255, 255, 255, 0.2);
    }
    &__item-icon {
      display: flex;
      align-items: center;
      padding: 8px;
      background-color: rgba(255, 255, 255, 0.1);
      &--drag {
        padding: 8px 2px;
        background-color: transparent;
        opacity: 0.5;
      }
    }
  }
</style>
