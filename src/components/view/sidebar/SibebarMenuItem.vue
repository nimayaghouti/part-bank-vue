<script setup>
import { useAuthOut } from '@/composables/useAuthOut'
import router from '@/router'
import { useUserStore } from '@/stores/userStore'

const props = defineProps({
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

const userStore = useUserStore()
const userData = userStore.userData

const handleLogout = async () => {
  try {
    if (!userStore.isLoggedin || props.modifier !== 'exit') return

    const response = await useAuthOut(userData.token)

    if (response === '200') {
      userStore.$reset()
      router.push({ path: '/login' })
      sessionStorage.clear()
      localStorage.clear()
    } else {
      throw new Error('not logged in!')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <li :class="['menu__item', modifier && `menu__item_${modifier}`]" @click="handleLogout">
    <component v-if="icon" :is="icon" class="menu__item-icon" />
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
