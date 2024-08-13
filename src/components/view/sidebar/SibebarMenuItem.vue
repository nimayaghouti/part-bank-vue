<script setup>
defineProps({
  icon: {
    type: Object,
    default: null
  },
  text: {
    type: String,
    required: true
  },
  modifier: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <li :class="['menu__item', modifier && `menu__item_${modifier}`]">
    <component v-if="icon" :is="icon" class="menu__item-icon"></component>
    {{ text }}
  </li>
</template>

<style lang="scss">
.menu {
  &__item {
    @include flex($justify: flex-start, $align: center);
    height: 2.75rem;
    padding: 0.5rem 1rem 0.5rem 0.75rem;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    list-style-type: none;
    position: relative;
    color: #8999b9;
    cursor: pointer;

    &_active {
      font-weight: 700;
      background-color: #f9fafb;
      color: var(--primary-500);
    }

    &:hover {
      background-color: #f9fafb;
      color: var(--primary-500);
      font-weight: 700;
    }

    &_exit {
      color: var(--fail-500);

      &:hover {
        color: var(--fail-500);
        background-color: var(--fail-50);
      }
    }
  }

  &__item-icon {
    height: 1.25rem;
    width: 1.25rem;
  }
}
</style>
