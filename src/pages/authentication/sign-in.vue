<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useGlobalStore } from '@/stores/global';
import { useUserStore } from '@/stores/user';
import { useApi } from '@/composables/useApi';
import UiText from '@/components/ui/Text.vue';
import UiFormInput from '@/components/ui/form/Input.vue';
import UiButton from '@/components/ui/Button.vue';

const router = useRouter();
const { t } = useI18n();
const globalStore = useGlobalStore();
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
    if (userStore.isAuthenticated)
      await router.push(globalStore.redirectRoute ?? { name: 'index' });
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

useHead(() => ({
  title: t('pages.authentication.sign_in.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-authentication-sign-in']">
    <UiText variant="h2" align="center" :class="$style['page-authentication-sign-in__title']">
      {{ $t('pages.authentication.sign_in.title') }}
    </UiText>

    <form @submit.prevent="handleFormSubmit" :class="$style['page-authentication-sign-in__form']">
      <UiFormInput
        v-model="form.email"
        :label="$t('labels.email')"
        :readonly="userStore.loading"
        name="email"
        placeholder="user@example.com"
        type="email"
        autocomplete="email"
        required
        tabindex="1"
      />

      <UiFormInput
        v-model="form.password"
        :label="$t('labels.password')"
        :readonly="userStore.loading"
        :error="error"
        name="password"
        placeholder="password"
        type="password"
        autocomplete="current-password"
        required
        tabindex="2"
      >
        <template #label>
          <RouterLink :to="{ name: 'authentication-reset' }">
            {{ $t('pages.authentication.sign_in.forgot_password') }}
          </RouterLink>
        </template>
      </UiFormInput>

      <UiButton
        :loading="userStore.loading"
        color="color-green"
        type="submit"
        tabindex="3"
        :class="$style['page-authentication-sign-in__form_button']"
      >
        {{ $t('actions.sign_in') }}
      </UiButton>
    </form>

    <section :class="$style['page-authentication-sign-in__links']">
      {{ t('pages.authentication.sign_in.sign_up_text') }}
      <RouterLink :to="{ name: 'authentication-sign-up' }">
        {{ t('actions.create_account') }}
      </RouterLink>
    </section>
  </div>
</template>

<style module lang="scss">
.page-authentication-sign-in {
  &__title {
    margin-block-end: 20px;
  }

  &__form {
    margin-block-end: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    border-radius: 15px;
    background: $color-gray-light;
    border: 1px solid $color-border;

    &_button {
      margin-block-start: 10px;
    }
  }

  &__links {
    padding: 15px;
    border-radius: 15px;
    border: 1px solid $color-border;
    text-align: center;
  }
}
</style>
