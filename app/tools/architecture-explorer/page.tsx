import { redirect } from "next/navigation";

export default function LegacyExplorerRedirect() {
  redirect("/tools/architecture-documentation");
}
