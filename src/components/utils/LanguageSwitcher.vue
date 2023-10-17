<script lang="ts" setup>
import { mergeProps, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { IDropdownState } from '@/config/prime'

const locales = ref()
const localLocale = ref<{ label: string; code: string }>()

const { locale, availableLocales } = useI18n()

function setLanguage(event: { value: { code: string } }) {
  localStorage.setItem('locale', event.value.code)
  locale.value = getLanguage()
}
function getLanguage() {
  return localStorage.getItem('locale') || 'en'
}

onMounted(() => {
  locale.value = getLanguage()
  locales.value = availableLocales.map((lang) => {
    return {
      label: lang,
      code: lang,
    }
  })
  localLocale.value = {
    label: getLanguage(),
    code: getLanguage(),
  }
})
</script>

<template>
  <Dropdown
    v-if="locales"
    v-model="localLocale"
    class="dark:border-0 !w-auto"
    :pt="{
      item: (item: IDropdownState) => ({
        class: [
          {
            'bg-accent text-white dark:bg-blue-800 dark:text-white/80': item.context.focused && item.context.selected,
            'bg-accent text-white dark:bg-primary dark:text-white/80': !item.context.focused && item.context.selected,
          },
        ],
      }),
    }"
    :pt-options="{ mergeSections: true, mergeProps: true }"
    option-label="label"
    :options="locales"
    @change="setLanguage"
  />
</template>
