<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import { useUserStore } from '@/stores/user';
import { useDatasetsStore } from '@/stores/datasets';
import UiText from '@/components/ui/Text.vue';
import UiCard from '@/components/ui/Card.vue';
import UiFormSelect, { type UiFormSelectOption } from '@/components/ui/form/Select.vue';
import UiFormInput from '@/components/ui/form/Input.vue';
import UiButton from '@/components/ui/Button.vue';
import { ProfileType, type ProfileUpdateRequest } from '@/types/models/user';

const router = useRouter();
const { t } = useI18n();
const api = useApi();
const userStore = useUserStore();
const datasetsStore = useDatasetsStore();

const loading = ref(false);
const profile = ref<ProfileUpdateRequest['profile']>({
  profile_type: ProfileType.COMPANY,
  name: '',
  identification_number: '',
  email: '',
  country: '',
  city: '',
  region: '',
  zip: '',
  address: '',
});
const errors = ref<any>();

const profileTypeOptions = computed<UiFormSelectOption[]>(() => [
  {
    text: t('labels.company'),
    value: ProfileType.COMPANY,
  },
  {
    text: t('labels.individual'),
    value: ProfileType.INDIVIDUAL,
  },
]);

const countryOptions = computed<UiFormSelectOption[]>(() =>
  datasetsStore.countries.map((country) => ({
    text: country,
    value: country,
  })),
);

const loadUserProfile = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    await userStore.loadUserProfile();

    if (userStore.user?.profile) {
      const profileData = userStore.user.profile;
      profile.value = {
        profile_type: profileData.profile_type ?? ProfileType.COMPANY,
        name: profileData.name ?? '',
        identification_number: profileData.identification_number ?? '',
        email: profileData.email ?? '',
        country: profileData.country ?? '',
        city: profileData.city ?? '',
        region: profileData.region ?? '',
        zip: profileData.zip ?? '',
        address: profileData.address ?? '',
      };
    }
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

const updateProfile = async () => {
  if (loading.value || !userStore.user) return;

  errors.value = undefined;
  loading.value = true;
  try {
    const { data } = await api.user.profile.update({ profile: profile.value });
    userStore.user.profile = data;
    await router.push({ name: 'account' });
  } catch (e) {
    console.error(e);
    if (api.isAxiosError(e) && e.response?.status === 422) errors.value = e.response.data;
  }
  loading.value = false;
};

loadUserProfile();
datasetsStore.loadCountries();

useHead(() => ({
  title: t('pages.account.edit.profile.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-account-edit-profile']">
    <UiText variant="h1" :class="$style['page-account-edit-profile__title']">
      {{ $t('pages.account.edit.profile.title') }}
    </UiText>

    <form @submit.prevent="updateProfile" :class="$style['page-account-edit-profile__form']">
      <UiCard>
        <div :class="$style['page-account-edit-profile__fields']">
          <UiFormSelect
            v-model="profile.profile_type"
            :options="profileTypeOptions"
            :label="$t('pages.account.edit.profile.fields.profile_type.label')"
            :placeholder="$t('pages.account.edit.profile.fields.profile_type.placeholder')"
            :disabled="loading"
            :error="errors?.profile_type"
            name="profile_type"
          />

          <div :class="$style['page-account-edit-profile__row--2']">
            <UiFormInput
              v-model="profile.name"
              :label="$t('pages.account.edit.profile.fields.name.label')"
              :placeholder="$t('pages.account.edit.profile.fields.name.placeholder')"
              :disabled="loading"
              :error="errors?.name"
              name="name"
            />

            <UiFormInput
              v-model="profile.identification_number"
              :label="$t('pages.account.edit.profile.fields.identification_number.label')"
              :placeholder="
                $t('pages.account.edit.profile.fields.identification_number.placeholder')
              "
              :disabled="loading"
              :error="errors?.identification_number"
              name="identification_number"
            />
          </div>

          <UiFormInput
            v-model="profile.email"
            :label="$t('pages.account.edit.profile.fields.email.label')"
            :placeholder="$t('pages.account.edit.profile.fields.email.placeholder')"
            :disabled="loading"
            :error="errors?.email"
            name="email"
          />

          <div :class="$style['page-account-edit-profile__row--3']">
            <UiFormSelect
              v-model="profile.country"
              :options="countryOptions"
              :label="$t('pages.account.edit.profile.fields.country.label')"
              :placeholder="$t('pages.account.edit.profile.fields.country.placeholder')"
              :disabled="loading"
              :error="errors?.country"
              name="country"
            />

            <UiFormInput
              v-model="profile.city"
              :label="$t('pages.account.edit.profile.fields.city.label')"
              :placeholder="$t('pages.account.edit.profile.fields.city.placeholder')"
              :disabled="loading"
              :error="errors?.city"
              name="city"
            />

            <UiFormInput
              v-model="profile.region"
              :label="$t('pages.account.edit.profile.fields.region.label')"
              :placeholder="$t('pages.account.edit.profile.fields.region.placeholder')"
              :disabled="loading"
              :error="errors?.region"
              name="region"
            />
          </div>

          <div :class="$style['page-account-edit-profile__row--2']">
            <UiFormInput
              v-model="profile.zip"
              :label="$t('pages.account.edit.profile.fields.zip.label')"
              :placeholder="$t('pages.account.edit.profile.fields.zip.placeholder')"
              :disabled="loading"
              :error="errors?.zip"
              name="zip"
            />

            <UiFormInput
              v-model="profile.address"
              :label="$t('pages.account.edit.profile.fields.address.label')"
              :placeholder="$t('pages.account.edit.profile.fields.address.placeholder')"
              :disabled="loading"
              :error="errors?.address"
              name="address"
            />
          </div>
        </div>
      </UiCard>

      <UiButton :loading size="large" type="submit">
        {{ $t('actions.update') }}
      </UiButton>
    </form>
  </div>
</template>

<style module lang="scss">
.page-account-edit-profile {
  &__title {
    margin-block-end: 1rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__row {
    &--2,
    &--3 {
      --columns: 1;

      display: grid;
      grid-template-columns: repeat(var(--columns), 1fr);
      gap: 0.5rem;
    }
  }

  @media #{$media-query-tablet} {
    &__row {
      &--2 {
        --columns: 2;
      }

      &--3 {
        --columns: 3;
      }
    }
  }
}
</style>
