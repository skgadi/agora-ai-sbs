<template>
  <div style="border: 1px solid gainsboro">
    <q-splitter v-model="splitterModel" style="height: 400px; max-height: calc(80vh - 200px)">
      <template #before>
        <div class="q-pa-md">
          <div class="text-bold">Activity type</div>
          <q-select
            v-model="generatorData.activity"
            :options="availableActivities"
            option-label="label"
            option-value="value"
            emit-value
            map-options
            dense
            outlined
            rounded
            class="q-mb-md"
          />
          <div class="row justify-center q-mt-md">
            <q-btn
              class="q-my-md"
              label="Generate Event"
              color="primary"
              rounded
              icon="mdi-creation-outline"
              @click="requestEventGeneration"
            />
          </div>

          <template v-if="generatorData.topicsToDiscuss.length > 0">
            <div class="text-bold">Selected topics</div>
            <q-list bordered separator dense>
              <template v-for="(topic, tIdx) in generatorData.topicsToDiscuss" :key="tIdx">
                <q-item>
                  <q-item-section>
                    <q-item-label>{{ topic.subSubTopic }}</q-item-label>
                    <q-item-label caption
                      >{{ topic.topic }} &gt; {{ topic.subTopic }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-list>
          </template>
        </div>
      </template>
      <template #after>
        <div class="q-pa-md">
          <tree-element ref="topicsTree" />
        </div>
      </template>
    </q-splitter>
  </div>
</template>
<script lang="ts" setup>
import TreeElement from 'src/components/Admin/TreeElement.vue';

import type { GSK_QUASAR_OPTION } from 'src/services/library/types/client';
import type { GSK_REQUEST_EVENT_GENERATION } from 'src/services/library/types/data-transfer-protocls';
import type { GSK_DATA_FOR_EVENT_GENERATION } from 'src/services/library/types/participants';
import { ref, watch } from 'vue';
import { useSocketStore } from 'src/stores/socket-store';

const socketStore = useSocketStore();
const splitterModel = ref(50);

const generatorData = ref<GSK_DATA_FOR_EVENT_GENERATION>({
  topicsToDiscuss: [],
  activity: 'learn',
});

const topicsTree = ref<InstanceType<typeof TreeElement> | null>(null);

const updateSelectedTopics = () => {
  if (topicsTree.value) {
    generatorData.value.topicsToDiscuss = topicsTree.value.selectedTreeElements;
  }
};

watch(
  () => topicsTree.value?.selectedTreeElements,
  () => {
    updateSelectedTopics();
  },
  { immediate: true },
);

const availableActivities: GSK_QUASAR_OPTION[] = [
  {
    label: 'Learn',
    value: 'learn',
    description: 'Participants will focus on acquiring new knowledge on the selected topics.',
  },
  {
    label: 'Brainstorm',
    value: 'brainstorm',
    description: 'Participants will generate ideas and solutions related to the selected topics.',
  },
  {
    label: 'Panel Discussion',
    value: 'panel-discussion',
    description: 'Participants will engage in a structured discussion on the selected topics.',
  },
  {
    label: 'Debate',
    value: 'debate',
    description: 'Participants will engage in a formal debate on the selected topics.',
  },
];

const requestEventGeneration = () => {
  const payload: GSK_REQUEST_EVENT_GENERATION = {
    type: 'GSK_REQUEST_EVENT_GENERATION',
    payload: {
      eventData: generatorData.value,
    },
  };

  socketStore.emit('GSK_REQUEST_EVENT_GENERATION', payload);
};
</script>
