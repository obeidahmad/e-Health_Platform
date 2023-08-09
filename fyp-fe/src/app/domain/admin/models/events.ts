export type EventStructureType = "image" | "image-with-caption" | "paragraph"  | "title";

export interface EventStructure {
  order?: number;
  type: EventStructureType;
  src?: string;
  title?: string;
  content?: string;
}

export interface DispensaryEvent {
  title: string;
  date: string;
  hour?: string;
  structure: EventStructure[];
}
