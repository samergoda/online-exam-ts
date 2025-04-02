declare interface SubjectResponse {
  message: string;
  metadata: metadata;
  subjects: Subject[];
}

declare type Subject = {
  name: string;
  icon: string;
} & DatabaseFields;
