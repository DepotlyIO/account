<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import UiText from '@/components/ui/Text.vue';
import UiFormInput from '@/components/ui/form/Input.vue';
import UiButton from '@/components/ui/Button.vue';

const userStore = useUserStore();

const form = ref({
  email: '',
  password: '',
});

const handleFormSubmit = () => {};
</script>

<template>
  <div :class="$style['page-authentication-sign-in']">
    <UiText variant="h1" align="center">
      {{ $t('pages.authentication.sign_in.title') }}
    </UiText>

    <form @submit.prevent="handleFormSubmit" :class="$style['page-authentication-sign-in__form']">
      <UiFormInput name="email" :label="$t('labels.email')" />

      <UiFormInput name="password" :label="$t('labels.password')" />

      <UiButton
        size="large"
        type="submit"
        :class="$style['page-authentication-sign-in__form_button']"
      >
        {{ $t('actions.sign_in') }}
      </UiButton>
    </form>
  </div>
</template>

<style module lang="scss">
.page-authentication-sign-in {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &_button {
      margin-block-start: 10px;
    }
  }
}
</style>
