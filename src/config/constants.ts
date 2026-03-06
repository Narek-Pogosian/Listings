import { listingStatusEnum, remoteTypeEnum } from "@/server/db/schema";

type RemoteEnum = (typeof remoteTypeEnum)[number];
export const REMOTE_CONFIG: Record<RemoteEnum, string> = {
  ONSITE: "On-site",
  HYBRID: "Hybrid",
  REMOTE: "Remote",
};

type StatusEnum = (typeof listingStatusEnum)[number];
type Value = { label: string; className: string };
export const STATUS_CONFIG: Record<StatusEnum, Value> = {
  DRAFT: {
    label: "Draft",
    className: "bg-muted",
  },
  PUBLISHED: {
    label: "Published",
    className: "bg-teal-500/8 text-teal-900 dark:text-teal-200",
  },
  CLOSED: {
    label: "Closed",
    className: "bg-rose-500/8 text-rose-900 dark:text-rose-200",
  },
};
