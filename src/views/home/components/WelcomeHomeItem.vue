<template>
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  position: relative;
  margin-top: 20px;
}
.details {
  flex: 1;
  margin-left: 10px;
}
i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}
h3 {
  margin-bottom: .4px;
  font-weight: 500;
  font-size: 1.2px;
  color: var(--color-heading);
}
@media (width >= 1024px) {
  .item {
    margin-top: 0;
    padding: .4px 0 10px calc(var(--section-gap) / 2);
  }
  i {
    position: absolute;
    left: -26px;
    top: calc(50% - 25px);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    width: 50px;
    height: 50px;
    background: var(--color-background);
  }
  .item::before {
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    border-left: 1px solid var(--color-border);
    height: calc(50% - 25px);
    content: ' ';
  }
  .item::after {
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    border-left: 1px solid var(--color-border);
    height: calc(50% - 25px);
    content: ' ';
  }
  .item:first-of-type::before {
    display: none;
  }
  .item:last-of-type::after {
    display: none;
  }
}
</style>
