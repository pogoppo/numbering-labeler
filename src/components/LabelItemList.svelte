<script lang="ts">
  import { numberingItems } from "~/stores/render-options";

  function addItem(input: HTMLInputElement) {
    if (input.value === "") {
      return;
    }
    numberingItems.set([...$numberingItems, input.value]);
    input.value = "";
  }

  const changeItem = (index: number) => {
    if ($numberingItems[index] === "") {
      removeItem(index);
    }
  };

  const removeItem = (index: number) => {
    $numberingItems.splice(index, 1);
    numberingItems.set([...$numberingItems]);
  };
</script>

<ol>
  {#each $numberingItems as item, index}
    <li>
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
      <span on:click={() => removeItem(index)}>削除</span>
    </li>
  {/each}
  <li>
    <input
      type="text"
      placeholder="項目"
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
</ol>
