<script setup>
import SibebarMenuItem from './SibebarMenuItem.vue'

import { useUserStore } from '@/stores/userStore'
import { convertNumberToPersian } from '@/utils/stringFormatter'

import Element4Icon from '@/assets/svg/icons/dashboard/Element4Icon.vue'
import WalletIcon from '@/assets/svg/icons/dashboard/WalletIcon.vue'
import StrongBoxIcon from '@/assets/svg/icons/dashboard/StrongBoxIcon.vue'
import CardsIcon from '@/assets/svg/icons/dashboard/CardsIcon.vue'
import ReceiptSearchIcon from '@/assets/svg/icons/dashboard/ReceiptSearchIcon.vue'
import CardPosIcon from '@/assets/svg/icons/dashboard/CardPosIcon.vue'
import ExitIcon from '@/assets/svg/icons/common/ExitIcon.vue'

const userStore = useUserStore()
const userData = userStore.userData

const username = `${userData.firstName} ${userData.lastName}`
const idNumber = convertNumberToPersian(userData.idNumber)

const menuItems = [
  {
    id: 1,
    icon: Element4Icon,
    text: 'داشبورد',
    modifier: 'active'
  },
  {
    id: 2,
    icon: WalletIcon,
    text: 'حساب',
    modifier: ''
  },
  {
    id: 3,
    icon: StrongBoxIcon,
    text: 'تسهیلات',
    modifier: ''
  },
  {
    id: 4,
    icon: CardsIcon,
    text: 'عملیات کارت',
    modifier: ''
  },
  {
    id: 5,
    icon: ReceiptSearchIcon,
    text: 'سفته الکترونیک',
    modifier: ''
  },
  {
    id: 6,
    icon: CardPosIcon,
    text: 'خدمات',
    modifier: ''
  },
  {
    id: 7,
    icon: ExitIcon,
    text: 'خروج',
    modifier: 'exit'
  }
]
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <div class="sidebar__user-name">{{ username }}</div>
      <div class="sidebar__user-id user-id">
        <div class="user-id__label">کد ملی:</div>
        <div class="user-id__number">{{ idNumber }}</div>
      </div>
    </div>
    <div class="sidebar__separator"></div>
    <ul class="sidebar__menu menu">
      <SibebarMenuItem
        v-for="item in menuItems"
        :key="item.id"
        :icon="item.icon"
        :text="item.text"
        :modifier="item.modifier"
      />
    </ul>
  </aside>
</template>

<style lang="scss">
.sidebar {
  @include flex($direction: column, $align: center, $justify: flex-start);
  width: 13.75rem;
  padding: 1.5rem 0rem 0.5rem 0rem;
  gap: 1.25rem;
  border-radius: 0.75rem;
  background: #fff;

  &__header {
    width: 10.75rem;
    @include flex($direction: column, $align: center, $justify: flex-start);
    gap: 2.5rem;
  }

  &__user-name {
    color: var(--black-500, #3c4351);
    text-align: center;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.75rem;
  }

  &__user-id {
    @include flex($justify: space-between);
  }

  &__separator {
    width: 12.25rem;
    height: 1px;
    background-color: #e2edff;
  }

  &__menu {
    @include flex($direction: column, $align: flex-start);
    padding: 0rem 0.5rem;
    gap: 0.125rem;
    align-self: stretch;
  }
}

.user-id {
  height: 1.25rem;
  width: 10.75rem;

  &__label {
    color: #8999b9;
    font-size: 0.75rem;
  }

  &__number {
    color: var(--black-500, #3c4351);
    font-size: 0.875rem;
    font-weight: 600;
  }
}
</style>
