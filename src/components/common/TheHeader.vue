<script setup>
import logoSimple from '@/assets/svg/logos/logo-simple.vue'
import notificationIcon from '@/assets/svg/icons/dashboard/notificationIcon.vue'
import angleDown from '@/assets/svg/icons/common/angle-down.vue'

import { useDataStorageStore } from '@/stores/userStorageStore'
const userDataStore = useDataStorageStore()

const userData = userDataStore.userStorage.getItem();

</script>
<template>
  <header class="header">
    <div class="header__logo">
      <logoSimple />
      پارت بانک
    </div>

    <div class="header__user-info user-info">
      <div class="user-info__notifs">
        <notificationIcon />
      </div>
      <div class="user-info__avatar">
        <img src="@/assets/svg/flats/avatar.svg" alt="avatar" />
      </div>
      <div class="user-info__phone"></div>
      <div class="user-info__logout">
        <angleDown />
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  width: 100%;
  height: $header-height;
  padding: 0.88rem 2.5rem;
  display: flex;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0px 2px 8px 0px rgba(21, 0, 43, 0.05);

  &__logo {
    flex-shrink: 0;
    @include flex();
    gap: 0.75rem;
    text-wrap: nowrap;
    font-weight: 400;

    img {
      height: 1.9rem;
    }
  }
}

.user-info {
  @include flex();
  gap: 0.5rem;

  &__logout {
    @include flex();
    color: var(--black-500);

    img {
      width: 2rem;
      height: 2rem;
      cursor: pointer;
    }
  }

  &__notifs {
    cursor: pointer;
    color: #8999b9;
  }
}
</style>
