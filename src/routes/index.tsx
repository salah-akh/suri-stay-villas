import { createFileRoute } from "@tanstack/react-router";
import { SearchListingsPage } from "@/components/SearchListingsPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hajazna - Villa ve Yazlik Kiralama" },
      {
        name: "description",
        content: "Villa, yazlik ve ozel konaklama yerlerini tek ekranda arayin.",
      },
      { property: "og:title", content: "Hajazna - Villa ve Yazlik Kiralama" },
      {
        property: "og:description",
        content: "Villa, yazlik ve ozel konaklama yerlerini kolayca bulun.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <SearchListingsPage mode="home" />;
}
