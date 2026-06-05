import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { z } from "zod";
import { SearchListingsPage } from "@/components/SearchListingsPage";

const searchSchema = z.object({
  q: z.string().optional(),
  city: z.string().optional(),
  type: z.string().optional(),
  category: z.string().optional(),
  advertiser: z.string().optional(),
  sort: z.enum(["default", "price-asc", "price-desc"]).optional(),
});

export const Route = createFileRoute("/listings")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Kiralik Villalar - Hajazna" },
      {
        name: "description",
        content: "Villa ve yazlik ilanlarini tek ekranda arayin.",
      },
      { property: "og:title", content: "Kiralik Villalar - Hajazna" },
    ],
  }),
  component: ListingsPage,
});

function ListingsPage() {
  const isDetailPage = useRouterState({
    select: (state) => state.location.pathname.startsWith("/listings/"),
  });
  const search = Route.useSearch();

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <SearchListingsPage
      mode="results"
      initialQuery={search.q}
      initialCity={search.city}
      initialType={search.type}
      initialCategory={search.category}
      initialAdvertiser={search.advertiser}
      initialSort={search.sort}
    />
  );
}
