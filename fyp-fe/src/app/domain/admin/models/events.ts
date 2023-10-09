export type EventStructureType = "image" | "image-with-caption" | "paragraph"  | "title";

export interface EventStructure {
  type: EventStructureType;
  src?: string;
  title?: string;
  content?: string;
}

export interface DispensaryEvent {
  uid: string;
  title: string;
  date: string;
  structure: EventStructure[];
}

