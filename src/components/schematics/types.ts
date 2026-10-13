export type FlowNode = {
  id: string;
  label: string;
  sub?: string;
  /** Grid column, 0-indexed. */
  col: number;
  /** Grid row. Rows are normalised, so a single-row diagram has no empty band. */
  row: number;
  /** At most one node per schematic may be lit. */
  lit?: boolean;
};

export type FlowEdge = {
  from: string;
  to: string;
  label?: string;
};
