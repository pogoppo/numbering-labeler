<script lang="ts">
  import { tick } from "svelte";
  import { _ } from "svelte-i18n";
  import SvgIcon from "@jamescoyle/svelte-icon";
  import { mdiTrashCanOutline } from "@mdi/js";

  import { render_ } from "~/stores/render-options";

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
    $render_.labels;
    (async () => {
      await tick();
      $render_.sbInstance?.updateMetrics();
    })();
  }
</script>

<ol class="LabelItemList">
  <li class="LabelItemList__new-item">
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
  </li>

  {#each $render_.labels as item, index}
    <li class="LabelItemList__item">
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
      <i class="LabelItemList__item-delete" on:click={() => removeItem(index)}>
        <SvgIcon type="mdi" path={mdiTrashCanOutline} />
      </i>
    </li>
  {/each}
</ol>

<style lang="scss">
  .LabelItemList {
    list-style: none;
    margin: 0;
    padding: 4px;
    overflow-y: auto;
    > li {
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
  }
  .LabelItemList__item {
    display: flex;
    align-items: center;
  }
  .LabelItemList__item-number {
    display: block;
    padding: 8px;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .LabelItemList__item-delete {
    display: flex;
    align-items: center;
    padding: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }
</style>
