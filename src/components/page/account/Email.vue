<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useApi } from '@/composables/useApi';
import { useDayJs } from '@/composables/useDayJs';
import { useTimer } from '@/composables/useTimer';
import UiCard from '@/components/ui/Card.vue';
import UiText from '@/components/ui/Text.vue';
import UiNotification from '@/components/ui/Notification.vue';
import UiButton from '@/components/ui/Button.vue';

const userStore = useUserStore();
const api = useApi();
const dayjs = useDayJs();

const loading = ref(false);

const timer = useTimer(() =>
  userStore.user?.email_verification_sent_at
    ? dayjs(userStore.user?.email_verification_sent_at).add(1, 'hour')
    : dayjs(),
);

const requestVerificationLetter = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.user.resendVerificationEmail();
    userStore.user = data;
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};
</script>

<template>
  <UiCard :title="$t('labels.email')">
    <div :class="$style['page-account-email']">
      <UiText>
        <span
          v-html="
            $t('pages.account.email.unverified.current_email', { email: userStore.user?.email })
          "
        />
      </UiText>

      <UiNotification
        v-if="!userStore.user?.is_email_verified"
        variant="warning"
        :title="$t('pages.account.email.unverified.title')"
        :class="$style['page-account-email__notification']"
      >
        <UiText color="color-inherit">
          {{ $t('pages.account.email.unverified.description') }}
        </UiText>

        <UiButton
          :loading="loading"
          :disabled="!!timer"
          color="color-orange"
          :class="$style['page-account-email__notification_action']"
          @click="requestVerificationLetter"
        >
          {{ timer ?? $t('pages.account.email.unverified.request_verification_letter') }}
        </UiButton>
      </UiNotification>
    </div>
  </UiCard>
</template>

<style module lang="scss">
.page-account-email {
  &__notification {
    margin-block-start: 0.5rem;

    &_action {
      margin-block-start: 0.5rem;
    }
  }
}
</style>
