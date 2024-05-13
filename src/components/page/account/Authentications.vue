<script setup lang="ts">
import { ref } from 'vue';
import { useApi } from '@/composables/useApi';
import UiCard from '@/components/ui/Card.vue';
import type { Authentication } from '@/types/models/authentication';

const api = useApi();

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
    <table :class="$style['page-account-authentications__table']">
      <tbody>
        <tr v-for="authentication in authentications" :key="authentication.id">
          <td>{{ authentication.os }}</td>
          <td>{{ authentication.os_version }}</td>
          <td>{{ authentication.browser }}</td>
          <td>{{ authentication.browser_version }}</td>
        </tr>
      </tbody>
    </table>
  </UiCard>
</template>

<style module lang="scss">
.page-account-authentications {
  &__table {
    width: 100%;

    tr {
      &,
      td {
        height: 0;
        min-height: 40px;
      }
    }
  }
}
</style>
