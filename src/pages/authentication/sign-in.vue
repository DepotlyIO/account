<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user';
import { useApi } from '@/composables/useApi';
import UiText from '@/components/ui/Text.vue';
import UiFormInput from '@/components/ui/form/Input.vue';
import UiButton from '@/components/ui/Button.vue';

const router = useRouter();
const { t } = useI18n();
const userStore = useUserStore();
const api = useApi();

const form = ref({
  email: '',
  password: '',
});

const error = ref();

const handleFormSubmit = async () => {
  try {
    await userStore.signIn({ user: form.value });
    if (userStore.isAuthenticated) await router.push({ name: 'index' });
  } catch (e) {
    if (api.isAxiosError(e))
      error.value = e.response?.data?.message ?? t('labels.unexpected_server_error');
  }
};

watch(
  form,
  () => {
    if (error.value) error.value = undefined;
  },
  { deep: true },
);
</script>

<template>
  <div :class="$style['page-authentication-sign-in']">
    <UiText variant="h1" align="center">
      {{ $t('pages.authentication.sign_in.title') }}
    </UiText>

    <form @submit.prevent="handleFormSubmit" :class="$style['page-authentication-sign-in__form']">
      <UiFormInput
        v-model="form.email"
        name="email"
        :label="$t('labels.email')"
        type="email"
        autocomplete="email"
      />

      <UiFormInput
        v-model="form.password"
        :label="$t('labels.password')"
        :error="error"
        name="password"
        type="password"
        autocomplete="current-password"
      />

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
