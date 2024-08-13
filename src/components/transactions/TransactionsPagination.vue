<script setup>
import AngleLeft from '@/assets/svg/icons/common/angle-left.vue'
import AngleRight from '@/assets/svg/icons/common/angle-right.vue'
import { ref } from 'vue'

const props = defineProps({
  dataArray: {
    type: Array,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(['slicer'])

// const modelValue = defineModel("data-array");

// pagination logic /////////////////////////////

const currentPage = ref(1)
const lastPage = Math.ceil(props.dataArray.length / props.itemsPerPage) // totalPages

// refresh table rows of data
const slicer = () => {
  return props.dataArray.slice(
    currentPage.value * props.itemsPerPage - props.itemsPerPage,
    currentPage.value * props.itemsPerPage
  )
}

const setSlicedData = () => {
  const test = slicer()
  console.log(test)
  emits('slicer', test)
}

const setCurrentPage = (index) => {
  currentPage.value = index

  setSlicedData()
}

// handle buttons /////////////////////////////

// arrow buttons
const previousButton = () => {
  if (currentPage.value === 1) return
  setCurrentPage(currentPage.value - 1)
}

const nextButton = () => {
  if (currentPage.value === lastPage) return
  setCurrentPage(currentPage.value + 1)
}

// dynamic button
</script>

<template>
  <div class="pagination">
    <button class="pagination__previous" title="قبلی" @click="previousButton">
      <AngleRight />
    </button>
    <button
      v-for="index in lastPage"
      :key="'dynamic-button-' + index"
      :id="'dynamic-button-' + index"
      @click="setCurrentPage(index)"
      :class="[
        'pagination__dynamic-button',
        currentPage === index && 'pagination__dynamic-button_selected'
      ]"
    >
      {{ index }}
    </button>
    <button class="pagination__next" title="بعدی" @click="nextButton">
      <AngleLeft />
    </button>
  </div>
</template>

<style lang="scss">
.pagination {
  @include flex;
  gap: 16px;

  %active-styles {
    color: white;
    background-color: var(--primary-500);
    transition:
      color,
      background-color,
      0.5s ease;
  }

  &__dynamic-button,
  &__previous,
  &__next {
    border-radius: 5px;
    border: none;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--common-gray);

    &:active {
      @extend %active-styles;
    }
  }

  &__dynamic-button {
    &_selected {
      @extend %active-styles;
    }
  }
}
</style>
