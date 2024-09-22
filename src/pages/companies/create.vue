<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import UiText from '@/components/ui/Text.vue';
import UiFormInput from '@/components/ui/form/Input.vue';
import UiButton from '@/components/ui/Button.vue';
import type { CompanyData } from '@/types/models/company';

const router = useRouter();
const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const company = ref<CompanyData['company']>({
  name: '',
  identification_number: '',
  country: '',
  city: '',
  address: '',
  zip: '',
});
const errorMessage = ref('');
const errors = ref<any>();

const createCompany = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.companies.create({ company: company.value });
    await router.replace({ name: 'companies-company-id', params: { id: data.id } });
  } catch (e) {
    console.error(e);

    if (api.isAxiosError(e) && e.status === 422) {
      errorMessage.value = e.response?.data.message;
      errors.value = e.response?.data.errors;
    }
  }
  loading.value = false;
};

useHead(() => ({
  title: t('pages.companies.create.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-companies-create']">
    <UiText variant="h2">
      {{ $t('pages.companies.create.title') }}
    </UiText>

    <form :class="$style['page-companies-create__form']" @submit.prevent="createCompany">
      <UiText color="color-red">
        {{ errorMessage }}
      </UiText>

      <UiFormInput
        v-model="company.name"
        name="name"
        :disabled="loading"
        :error="errors?.name"
        :label="$t('pages.companies.create.form.name.title')"
        :placeholder="$t('pages.companies.create.form.name.placeholder')"
      />

      <UiFormInput
        v-model="company.identification_number"
        name="identification_number"
        :disabled="loading"
        :error="errors?.identification_number"
        :label="$t('pages.companies.create.form.identification_number.title')"
        :placeholder="$t('pages.companies.create.form.identification_number.placeholder')"
      />

      <UiFormInput
        v-model="company.country"
        name="country"
        :disabled="loading"
        :error="errors?.country"
        :label="$t('pages.companies.create.form.country.title')"
        :placeholder="$t('pages.companies.create.form.country.placeholder')"
      />

      <UiFormInput
        v-model="company.city"
        name="city"
        :disabled="loading"
        :error="errors?.city"
        :label="$t('pages.companies.create.form.city.title')"
        :placeholder="$t('pages.companies.create.form.city.placeholder')"
      />

      <UiFormInput
        v-model="company.address"
        name="address"
        :disabled="loading"
        :error="errors?.address"
        :label="$t('pages.companies.create.form.address.title')"
        :placeholder="$t('pages.companies.create.form.address.placeholder')"
      />

      <UiFormInput
        v-model="company.zip"
        name="zip"
        :disabled="loading"
        :error="errors?.zip"
        :label="$t('pages.companies.create.form.zip.title')"
        :placeholder="$t('pages.companies.create.form.zip.placeholder')"
      />

      <UiButton
        :loading
        size="large"
        type="submit"
        :class="$style['page-companies-create__form__submit']"
      >
        {{ $t('actions.create') }}
      </UiButton>
    </form>
  </div>
</template>

<style module lang="scss">
.page-companies-create {
  gap: 10px;

  &,
  &__form {
    display: flex;
    flex-direction: column;
  }

  &__form {
    gap: 15px;

    &__submit {
      align-self: flex-start;
    }
  }
}
</style>
