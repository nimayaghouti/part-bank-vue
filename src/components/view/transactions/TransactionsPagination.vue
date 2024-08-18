<script setup>
import AngleLeftIcon from '@/assets/svg/icons/common/AngleLeftIcon.vue'
import AngleRightIcon from '@/assets/svg/icons/common/AngleRightIcon.vue'
import { formattedPersianNumber } from '@/utils/stringFormatter'
import { onMounted, ref } from 'vue'

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

// pagination logic /////////////////////////////
const currentPage = ref(1)
const lastPage = ref(0) // totalPages

const slicer = () => {
  return props.dataArray?.slice(
    currentPage.value * props.itemsPerPage - props.itemsPerPage,
    currentPage.value * props.itemsPerPage
  )
}

const setSlicedData = () => {
  const newSlice = slicer()
  emits('slicer', newSlice)
}

const setCurrentPage = (index) => {
  currentPage.value = index
  setSlicedData()
}

onMounted(() => {
  // console.log('<TransactionsPagination />', props.dataArray)
  lastPage.value = Math.ceil(props.dataArray?.length / props.itemsPerPage)
  setSlicedData()
})

// handle buttons /////////////////////////////
const previousButton = () => {
  if (currentPage.value === 1) return
  setCurrentPage(currentPage.value - 1)
}

const nextButton = () => {
  if (currentPage.value === lastPage.value) return
  setCurrentPage(currentPage.value + 1)
}
</script>

<template>
  <div class="pagination">
    <button class="pagination__previous" title="قبلی" @click="previousButton">
      <AngleRightIcon />
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
      {{ formattedPersianNumber(index) }}
    </button>
    <button class="pagination__next" title="بعدی" @click="nextButton">
      <AngleLeftIcon />
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
