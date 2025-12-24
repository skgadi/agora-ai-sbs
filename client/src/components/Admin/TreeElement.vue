<template>
  <q-input
    outlined
    rounded
    dense
    clearable
    debounce="300"
    v-model="filter"
    label="Search - only filters labels that have also '(*)'"
  >
    <template v-if="ticked.length > 0" #after>
      <q-btn flat round icon="mdi-minus-box-outline" color="red" @click="ticked = []" />
    </template>
  </q-input>
  <q-tree
    :nodes="treeData"
    node-key="label"
    default-expand-all
    hoverable
    transition-duration="300"
    v-model:ticked="ticked"
    tick-strategy="leaf-filtered"
    selected-color="primary"
    :filter="filter"
    :filter-method="
      (node, filter) => {
        if (filter === '') return true;
        const labelMatches = node.label.toLowerCase().includes(filter.toLowerCase());
        const isLeaf = !node.children || node.children.length === 0;
        return labelMatches && isLeaf;
      }
    "
  />
</template>
<script lang="ts" setup>
import { type GSK_TOPIC, topics } from 'src/services/library/constants/topics';
import type { GSK_QUASAR_TREE_ELEMENT } from 'src/services/library/types/client';
import type { GSK_DATA_FOR_EVENT_GENERATION } from 'src/services/library/types/participants';
import { computed, ref } from 'vue';

const convertTopicsToTreeElements = (
  topicsList: GSK_TOPIC[],
  parents: string[] = [],
): GSK_QUASAR_TREE_ELEMENT[] => {
  return topicsList.map((topic) => {
    const newParents = [...parents, topic.topic];
    const element: GSK_QUASAR_TREE_ELEMENT = {
      label: topic.topic,
      children: topic.sub ? convertTopicsToTreeElements(topic.sub, newParents) : [],
      parents: newParents,
    };
    return element;
  });
};

const treeData = convertTopicsToTreeElements(topics);
const ticked = ref<string[]>([]);

const findElementByLabel = (
  label: string,
  elements: GSK_QUASAR_TREE_ELEMENT[],
): GSK_QUASAR_TREE_ELEMENT | null => {
  const foundElement = elements.find((el) => el.label === label);
  if (foundElement) {
    return foundElement;
  }
  for (const el of elements) {
    if (el.children && el.children.length > 0) {
      const childResult = findElementByLabel(label, el.children);
      if (childResult) {
        return childResult;
      }
    }
  }
  return null;
};

const selectedTreeElements = computed(() => {
  const selectedElements: GSK_DATA_FOR_EVENT_GENERATION['topicsToDiscuss'] = ticked.value.map(
    (label) => {
      const findElement = findElementByLabel(label, treeData);
      console.log('treeData:', treeData);
      if (findElement) {
        const parents = [...findElement.parents];
        const subSubTopic = parents.pop() || '';
        const subTopic = parents.pop() || '';
        const topic = parents.pop() || '';
        return {
          topic,
          subTopic,
          subSubTopic,
        };
      }
      return {
        topic: '',
        subTopic: '',
        subSubTopic: label,
      };
    },
  );
  return selectedElements;
});

defineExpose({ selectedTreeElements });

const filter = ref<string>('');
</script>
