<script setup lang="ts">
import { ref } from 'vue';
import { useApi } from '@/composables/useApi';
import { useDayJs } from '@/composables/useDayJs';
import UiCard from '@/components/ui/Card.vue';
import UiIcon from '@/components/ui/Icon.vue';
import UiText from '@/components/ui/Text.vue';
import type { Authentication } from '@/types/models/authentication';

const api = useApi();
const dayjs = useDayJs();

const loading = ref(false);
const authentications = ref<Authentication[]>();

const loadAuthentications = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.authentication.list();
    authentications.value = data;
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};

loadAuthentications();
</script>

<template>
  <UiCard :title="$t('pages.account.authentications.title')">
    <div :class="$style['page-account-authentications__cards']">
      <div
        v-for="authentication in authentications"
        :key="authentication.id"
        :class="$style['page-account-authentications__cards_card']"
      >
        <UiIcon
          :name="authentication.is_mobile ? 'cellphone' : 'monitor'"
          size="40"
          color="color-gray"
        />

        <div :class="$style['page-account-authentications__cards_card-start']">
          <UiText font-weight="700">{{ $t('labels.os') }}</UiText>
          <UiText>{{ authentication.os }} ({{ authentication.os_version }})</UiText>

          <UiText font-weight="700">{{ $t('labels.browser') }}</UiText>
          <UiText>{{ authentication.browser }} ({{ authentication.browser_version }})</UiText>

          <UiText font-weight="700">{{ $t('labels.latest_activity') }}</UiText>
          <UiText>{{ dayjs(authentication.updated_at).fromNow() }}</UiText>
        </div>
      </div>
    </div>
  </UiCard>
</template>

<style module lang="scss">
.page-account-authentications {
  &__cards {
    display: flex;
    flex-direction: column;

    &_card {
      padding-block: 10px;
      display: flex;
      align-items: center;
      gap: 25px;

      &:not(:last-of-type) {
        border-bottom: 1px solid $color-border;
      }

      &-start {
        display: grid;
        grid-template-columns: repeat(2, auto);
        column-gap: 25px;
      }
    }
  }
}
</style>
