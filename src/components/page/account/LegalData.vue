<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import UiCard from '@/components/ui/Card.vue';
import UiField from '@/components/ui/Field.vue';
import UiButton from '@/components/ui/Button.vue';
import UiIcon from '@/components/ui/Icon.vue';

const userStore = useUserStore();
</script>

<template>
  <UiCard :title="$t('labels.profile')">
    <template #header-end>
      <UiButton :to="{ name: 'account-edit-profile' }" size="small-compact">
        <UiIcon name="pencil" size="20" color="color-white" />
      </UiButton>
    </template>

    <div :class="$style['page-account-legal-data']">
      <UiField
        :title="$t('pages.account.profile.fields.profile_type')"
        :value="userStore.user?.profile.profile_type"
      />

      <UiField
        :title="$t('pages.account.profile.fields.name')"
        :value="userStore.user?.profile.name"
      />

      <div :class="$style['page-account-legal-data__row--2']">
        <UiField
          :title="$t('pages.account.profile.fields.identification_number')"
          :value="userStore.user?.profile.identification_number"
        />

        <UiField
          :title="$t('pages.account.profile.fields.email')"
          :value="userStore.user?.profile.email"
        />
      </div>

      <div :class="$style['page-account-legal-data__row--3']">
        <UiField
          :title="$t('pages.account.profile.fields.country')"
          :value="userStore.user?.profile.country"
        />

        <UiField
          :title="$t('pages.account.profile.fields.region')"
          :value="userStore.user?.profile.region"
        />

        <UiField
          :title="$t('pages.account.profile.fields.city')"
          :value="userStore.user?.profile.city"
        />
      </div>

      <div :class="$style['page-account-legal-data__row--2']">
        <UiField
          :title="$t('pages.account.profile.fields.zip')"
          :value="userStore.user?.profile.zip"
        />

        <UiField
          :title="$t('pages.account.profile.fields.address')"
          :value="userStore.user?.profile.address"
        />
      </div>
    </div>
  </UiCard>
</template>

<style module lang="scss">
.page-account-legal-data {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &__row {
    &--2,
    &--3 {
      --columns: 1;

      display: grid;
      grid-template-columns: repeat(var(--columns), 1fr);
      gap: 0.25rem;
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
