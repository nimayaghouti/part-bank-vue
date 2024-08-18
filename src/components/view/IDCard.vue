<script setup>
import { ref } from 'vue'
import moreIcon from '@/assets/svg/icons/common/moreIcon.vue'
import editIcon from '@/assets/svg/icons/common/editIcon.vue'
import trashIcon from '@/assets/svg/icons/common/trashIcon.vue'
import uploadIcon from '@/assets/svg/flats/uploadIcon.vue'
import useShowToast from '@/composables/useShowToast'

const props = defineProps({
  description: {
    type: String,
    required: true
  },
  imageSide: {
    type: String,
    required: true,
    validator(value) {
      return ['front', 'back'].includes(value)
    }
  }
})

const emit = defineEmits(['update:image'])

const imageUrl = ref('')

const { showToast } = useShowToast()

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const validImageTypes = ['image/jpeg', 'image/png']
  if (!validImageTypes.includes(file.type)) {
    showToast({
      message: 'فقط فرمت‌های تصویری (JPEG, PNG) قابل قبول هستند.'
    })
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    imageUrl.value = e.target.result
    emit('update:image', imageUrl.value)
  }
  reader.readAsDataURL(file)
}

const handleEditImage = () => {
  const fileInput = document.getElementById(`image-${props.imageSide}-side`)
  if (!fileInput) return

  fileInput.click()
}

const handleDeleteImage = () => {
  imageUrl.value = ''
}
</script>

<template>
  <div class="id-card">
    <div class="id-card__image">
      <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" />
      <template v-else>
        <uploadIcon class="id-card__upload-icon" />
        <div class="id-card__upload-text">
          تصویر را بکشید و اینجا رها کنید
          <br />
          یا
          <span class="id-card__upload-text_highlight"> کلیک کنید. </span>
        </div>
      </template>
      <input
        v-show="!imageUrl"
        type="file"
        :id="`image-${imageSide}-side`"
        accept="image/*"
        @change="handleFileChange"
      />
    </div>
    <div class="id-card__footer">
      <p class="id-card__description">{{ description }}</p>
      <div v-if="imageUrl" class="id-card__options">
        <div class="id-card__options-icon">
          <moreIcon />
        </div>
        <div class="options-menu">
          <div class="options-menu__item options-menu__item_edit" @click="handleEditImage">
            <editIcon class="options-menu__icon" />
            ویرایش
          </div>
          <div class="options-menu__separator"></div>
          <div class="options-menu__item options-menu__item_delete" @click="handleDeleteImage">
            <trashIcon class="options-menu__icon" />
            حذف
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.id-card {
  @include flex(column);
  @include border-radius(0.75rem);
  width: 20rem;
  overflow: hidden;

  &__image {
    @include flex($direction: column);
    width: 100%;
    height: 11.25rem;
    position: relative;
    border: 1px dashed #e2edff;
    border-radius: 0.75rem 0.75rem 0 0;
    background-color: #f9fafb;
    gap: 0.5rem;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__upload-icon {
    color: #c3c5c9;
  }

  &__upload-text {
    @include text-style(#8999b9, 0.875rem, 600);
    text-align: center;

    &_highlight {
      color: var(--primary-500);
    }
  }

  &__footer {
    @include flex($justify: space-between);
    width: 100%;
    height: 3.25rem;
    padding: 1rem 0.75rem;
    background-color: #f9fafb;
  }

  &__description {
    @include text-style($size: 0.875rem);
  }

  &__options {
    width: 20px;
    height: 20px;
    position: relative;

    &:hover .options-menu {
      cursor: pointer;
      bottom: -4px;
      opacity: 1;
      visibility: visible;
    }
  }

  &__options-icon {
    position: relative;
    color: var(--common-gray);

    &:hover {
      cursor: pointer;
    }
  }
}

.options-menu {
  @include flex(column, $align: flex-start);
  @include border-radius();
  @include box-shadow();
  @include text-style();
  padding: 8px 12px;
  gap: 8px;
  background-color: #fff;
  position: absolute;
  bottom: 14px;
  left: 4px;
  opacity: 0;
  visibility: hidden;
  transition: 0.5s;

  &__item {
    @include flex();
    gap: 8px;

    &_delete {
      color: var(--fail-500);
    }
  }

  &__icon {
    display: flex;
    width: 20px;
    height: 20px;
    position: relative;
  }

  &__separator {
    width: 100%;
    height: 1px;
    background-color: #e2edff;
  }
}

#image-front-side,
#image-back-side {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: absolute;
  opacity: 0;
}
</style>
