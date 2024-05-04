<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/useApi';
import UiText from '@/components/ui/Text.vue';
import UiIcon from '@/components/ui/Icon.vue';
import UiButton from '@/components/ui/Button.vue';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const api = useApi();

const status = ref<'pending' | 'success' | 'error'>();
const error = ref<string>();

const token = computed(() => route.query.token);

const verifyEmail = async () => {
  if (typeof token.value !== 'string') {
    return router.replace({ name: 'authentication-verify' })
  } else if (status.value === 'pending') {
    return;
  }

  try {
    status.value = 'pending';
    await api.user.verifyEmail({ email_verification_token: token.value });
    status.value = 'success';
  } catch (e) {
    console.error(e);
    status.value = 'error';

    if (api.isAxiosError(e)) {
      error.value = e.response?.data?.message ?? t('labels.unexpected_server_error');
    }
  }
};

verifyEmail();

useHead(() => ({
  title: t('pages.confirm.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-confirm']">
    <UiText variant="h2" align="center" :class="$style['page-confirm__title']">
      {{ t('pages.confirm.title') }}
    </UiText>

    <div :class="$style['page-confirm__content']">
      <div v-if="status === 'pending'" :class="$style['page-confirm__content_loading']">
        <UiIcon
          name="loading"
          color="color-gray"
          size="150"
          :class="$style['page-confirm__content_loading-icon']"
        />
      </div>

      <template v-else-if="status === 'success'">
        <UiText variant="h6" color="color-green" align="center">
          {{ t('pages.confirm.content.success.title') }}
        </UiText>

        <UiText :class="$style['page-confirm__content_description']">
          {{ t('pages.confirm.content.success.content') }}
        </UiText>

        <UiButton :to="{ name: 'authentication-sign-in' }">
          {{ $t('actions.sign_in') }}
        </UiButton>
      </template>

      <template v-else-if="status === 'error'">
        <UiText variant="h6" color="color-orange" align="center">
          {{ t('pages.confirm.content.error.title') }}
        </UiText>

        <div :class="$style['page-confirm__content_description']">
          <UiText>
            {{ t('pages.confirm.content.error.content') }}
          </UiText>

          <UiText font-weight="600">
            {{ error }}
          </UiText>

          <UiText>
            {{ t('pages.confirm.content.error.additional_steps') }}
          </UiText>
        </div>

        <UiButton :to="{ name: 'authentication-verify' }">
          {{ $t('actions.verify_email_address') }}
        </UiButton>
      </template>
    </div>
  </div>
</template>

<style module lang="scss">
.page-confirm {
  &__title {
    margin-block-end: 20px;
  }

  &__content {
    padding: 15px;
    border-radius: 15px;
    background: $color-gray-light;
    border: 1px solid $color-border;

    &_loading {
      text-align: center;

      &-icon {
        animation: spin 0.75s infinite linear;
      }
    }

    &_description {
      margin-block: 10px 20px;
      @include children-margin-block(5px);
    }
  }
}
</style>
