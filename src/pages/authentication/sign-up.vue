<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import UiText from '@/components/ui/Text.vue';
import UiFormInput from '@/components/ui/form/Input.vue';
import UiButton from '@/components/ui/Button.vue';

const { t, locale } = useI18n();
const api = useApi();

const loading = ref(false);
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});
const error = ref();

const handleFormSubmit = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    await api.user.create({
      user: {
        ...form.value,
        locale: locale.value,
      },
    });
    // TODO: add logic after registration
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

useHead(() => ({
  title: t('pages.authentication.sign_up.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-authentication-sign-up']">
    <UiText variant="h2" align="center" :class="$style['page-authentication-sign-up__title']">
      {{ $t('pages.authentication.sign_up.title') }}
    </UiText>

    <form :class="$style['page-authentication-sign-up__form']" @submit.prevent="handleFormSubmit">
      <UiFormInput
        v-model="form.name"
        :label="$t('labels.name')"
        :readonly="loading"
        name="name"
        placeholder="John Doe"
        type="text"
        autocomplete="name"
        required
        tabindex="1"
      />

      <UiFormInput
        v-model="form.email"
        :label="$t('labels.email')"
        :readonly="loading"
        name="email"
        placeholder="user@example.com"
        type="email"
        autocomplete="email"
        required
        tabindex="2"
      />

      <UiFormInput
        v-model="form.password"
        :label="$t('labels.password')"
        :readonly="loading"
        :error="error"
        name="password"
        placeholder="password"
        type="password"
        autocomplete="new-password"
        required
        tabindex="3"
      />

      <UiFormInput
        v-model="form.password_confirmation"
        :label="$t('labels.password_confirmation')"
        :readonly="loading"
        :error="error"
        name="password_confirmation"
        placeholder="password"
        type="password"
        autocomplete="new-password"
        required
        tabindex="4"
      />

      <UiButton
        :loading="loading"
        color="color-green"
        type="submit"
        tabindex="5"
        :class="$style['page-authentication-sign-up__form_button']"
      >
        {{ $t('actions.sign_up') }}
      </UiButton>
    </form>

    <section :class="$style['page-authentication-sign-up__links']">
      {{ t('pages.authentication.sign_up.already_have_account') }}
      <RouterLink :to="{ name: 'authentication-sign-in' }">
        {{ t('actions.back_to_authentication') }}
      </RouterLink>
    </section>
  </div>
</template>

<style module lang="scss">
.page-authentication-sign-up {
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
