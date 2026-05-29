export type Operator = "+" | "-" | "*" | "/" | null;

export type AngleMode = "deg" | "rad";

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}
