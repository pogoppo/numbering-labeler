/// <reference types="svelte" />
declare namespace svelte.JSX {
  interface DOMAttributes<T> {
    onmousewheel?: CompositionEventHandler<T>;
  }
}