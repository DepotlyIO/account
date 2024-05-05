<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useUserStore } from '@/stores/user';
import { useScreenSize } from '@/composables/useScreenSize';
import PageAccountEmail from '@/components/page/account/Email.vue';
import UiCard from '@/components/ui/Card.vue';
import UiIcon from '@/components/ui/Icon.vue';
import UiText from '@/components/ui/Text.vue';
import UiButton from '@/components/ui/Button.vue';

const { t } = useI18n();
const { tablet } = useScreenSize();

const userStore = useUserStore();

const accountType = computed(() => t(`labels.${userStore.user?.account_type}_account_type`));

useHead(() => ({
  title: t('pages.account.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-account']">
    <UiCard>
      <div :class="$style['page-account__account']">
        <UiIcon name="account-circle" size="200" color="color-gray" />

        <UiText variant="h3">
          {{ userStore.user?.name }}

          <template v-if="userStore.user?.is_account_verified" #end>
            <UiIcon name="check-decagram" color="color-blue" size="1em" />
          </template>
        </UiText>

        <UiText color="color-gray">{{ accountType }}</UiText>
      </div>
    </UiCard>

    <PageAccountEmail />

    <UiCard v-if="!tablet">
      <div :class="$style['page-account__sign-out']">
        <UiButton
          :loading="userStore.loading"
          color="color-red"
          size="large"
          @click="() => userStore.signOut()"
        >
          {{ t('actions.sign_out') }}
        </UiButton>
      </div>
    </UiCard>
  </div>
</template>

<style module lang="scss">
.page-account {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__account {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__sign-out {
    display: flex;
    flex-direction: column;
  }
}
</style>
