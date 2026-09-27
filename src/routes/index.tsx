import { createFileRoute } from "@tanstack/react-router";
import { LastDayPage } from "@/components/last-day/last-day-page";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <LastDayPage />;
}
