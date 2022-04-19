export type AuditEventData = {
  type: "CREATE" | "UPDATE" | "DELETE" | "REPLACE";
  alteredObject: {
    type?: string;
    name?: string;
    id: string;
    representation?: string;
  };
  by: string;
};
