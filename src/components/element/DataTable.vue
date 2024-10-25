<script setup lang="ts" generic="T extends ElementTableItem, C extends ElementTableColumn">
import type { RouteLocationRaw } from 'vue-router';

export interface ElementTableColumn {
  name: string;
  title: string;
  align?: 'start' | 'center' | 'end';
}

export interface ElementTableItem {
  id: number | string;
  rowLink?: string | RouteLocationRaw;
  [key: string]: any;
}

const props = withDefaults(
  defineProps<{
    columns: C[];
    items: T[];
  }>(),
  {},
);
</script>

<template>
  <div :class="$style['element-data-table__wrapper']">
    <table :class="$style['element-data-table']">
      <thead>
        <tr>
          <th
            v-for="column in props.columns"
            :key="column.name"
            :style="{ textAlign: column.align }"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in props.items" :key="item.id">
          <td
            v-for="column in props.columns"
            :key="`${column.name}-${item.id}`"
            :style="{ textAlign: column.align }"
          >
            <RouterLink
              v-if="item.rowLink && column.name === 'id'"
              :to="item.rowLink"
              :class="$style['element-data-table__stretched-link']"
            >
              <slot name="item:id" :item="item as T">
                {{ item.id }}
              </slot>
            </RouterLink>

            <slot v-else :name="`item:${column.name}`" :item="item as T">
              {{ item[column.name] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style module lang="scss">
.element-data-table {
  width: max-content;
  min-width: 100%;
  border-spacing: 0;

  &__wrapper {
    overflow-x: auto;
  }

  &__stretched-link {
    color: inherit;

    &::after {
      position: absolute;
      inset: 0;
      z-index: 1;
      content: '';
    }
  }

  thead {
    tr {
      th {
      }
    }
  }

  tbody {
    tr {
      transform: rotate(0);
      transition: background-color $duration-medium ease-in-out;

      &:hover {
        background-color: $color-border;
      }

      td {
        border-block-start: 1px solid $color-border;
      }
    }
  }

  th,
  td {
    padding: 10px;
  }

  th {
    text-align: start;
  }
}
</style>
