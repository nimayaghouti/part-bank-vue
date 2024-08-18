<script setup>
import SearchIcon from '@/assets/svg/icons/common/SearchIcon.vue'
import AngleDownIcon from '@/assets/svg/icons/common/AngleDownIcon.vue'
import FluentArrowIcon from '@/assets/svg/icons/dashboard/FluentArrowIcon.vue'
// TODO:
// import BaseFormControl from '../../common/BaseFormControl.vue'
</script>

<template>
  <div class="trans-header">
    <h3 class="trans-header__title">
      لیست تراکنش‌ها
      <div class="trans-header__currency">(ریال)</div>
    </h3>
    <div class="trans-header__tools">
      <div class="trans-header__sort sort">
        <label class="sort__label" for="sort-transactions">
          <FluentArrowIcon class="sort__fluent-icon" />
          مرتب سازی:
        </label>
        <!-- TODO: -->
        <!-- <BaseFormControl /> -->
        <select class="sort__select" name="sort-transactions" id="sort-transactions">
          <option value="همه" selected>همه</option>
        </select>
        <AngleDownIcon class="sort__angle-icon" />
      </div>
      <div class="trans-header__search search">
        <input class="search__input" type="text" placeholder="جستجو" />
        <SearchIcon class="search__icon" />
        <!-- TODO: -->
        <!-- <BaseFormControl
          placeholder="جستجو"
          :icon="{
            component: SearchIcon,
            onClick: () => console.log('temp')
          }"
        /> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.trans-header {
  @include flex($justify: space-between);

  &__title {
    @include flex();
    text-align: right;
    font-size: 1.25rem;
    font-weight: 700;
    gap: 0.15rem;
  }

  &__currency {
    color: var(--common-gray);
    text-align: right;
    font-size: 1rem;
    font-weight: 400;
  }

  &__tools {
    @include flex();
    gap: 0.75rem;
    font-size: 0.875rem;
  }
}

.sort {
  @include flex();
  gap: 0.5rem;
  position: relative;

  &__label {
    color: var(--common-gray);
    @include flex();
  }

  &__fluent-icon {
    position: absolute;
    right: -1.1rem;
  }

  &__select {
    width: 11.43rem;
    height: 2.125rem;
    @include border-radius($radius: 0.5rem);
    outline: none;
    padding-right: 0.5rem;
    font-family: 'Peyda';
    border: 1px solid var(--common-line);
    background: #fff;
    appearance: none;
  }

  &__angle-icon {
    position: absolute;
    left: 0.25rem;
  }
}

.search {
  @include flex();
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;

  &__input {
    width: 16.0625rem;
    height: 2.125rem;
    @include border-radius($radius: 0.5rem);
    outline: none;
    padding-right: 0.5rem;
    border: 1px solid var(--common-line);
    background: #fff;

    &::placeholder {
      font-size: 0.875rem;
    }
  }

  &__icon {
    height: 100%;
    width: 2rem;
    position: absolute;
    top: 0;
    left: 0rem;
    background-color: var(--common-line);
    padding: 0.4rem 0.4rem 0.5rem 0.5rem;
  }
}
</style>
