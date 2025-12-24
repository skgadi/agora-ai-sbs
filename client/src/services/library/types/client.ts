export interface GSK_QUASAR_OPTION {
  label: string;
  value: string;
  description: string;
}

export interface GSK_QUASAR_TREE_ELEMENT {
  label: string;
  avatar?: string;
  parents: string[];
  children: GSK_QUASAR_TREE_ELEMENT[];
}
