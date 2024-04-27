<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import UiText from '@/components/ui/Text.vue';
import UiFormInput from '@/components/ui/form/Input.vue';
import UiButton from '@/components/ui/Button.vue';

const { t } = useI18n();

const loading = ref(false);
const form = ref({
  email: '',
});

const handleFormSubmit = () => {};

useHead(() => ({
  title: t('pages.authentication.reset.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-authentication-reset']">
    <UiText variant="h1" align="center" :class="$style['page-authentication-reset__title']">
      {{ t('pages.authentication.reset.title') }}
    </UiText>

    <form :class="$style['page-authentication-reset__form']" @submit.prevent="handleFormSubmit">
      <UiFormInput
        v-model="form.email"
        :label="t('labels.email')"
        :hint="t('pages.authentication.reset.description')"
        :readonly="loading"
        name="email"
        placeholder="user@example.com"
        type="email"
        autocomplete="email"
        required
        tabindex="1"
      />

      <UiButton
        color="color-green"
        type="submit"
        tabindex="2"
        :class="$style['page-authentication-reset__form_button']"
      >
        {{ t('pages.authentication.reset.button') }}
      </UiButton>
    </form>
  </div>
</template>

<style module lang="scss">
.page-authentication-reset {
  &__title {
    margin-block-end: 20px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    width: 100%;
    border-radius: 15px;
    background: $color-gray-light;
    border: 1px solid $color-border;

    &_button {
      margin-block-start: 10px;
    }
  }
}
</style>
