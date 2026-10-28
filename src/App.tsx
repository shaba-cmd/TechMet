import { useMemo, useState } from "react";
import { Catalog } from "./components/Catalog/Catalog";
import { Faq } from "./components/Faq/Faq";
import { Filters } from "./components/Filters/Filters";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { ProductModal } from "./components/ProductModal/ProductModal";
import { PRODUCTS, type Product, type TabId } from "./data/catalog";
import { DEFAULT_FILTERS, useSavedFilters } from "./hooks/useSavedFilters";
import {
  filterProducts,
  paginate,
  sortProducts,
  type Filters as FilterValues,
  type SortOrder,
} from "./utils/filter";

const PER_PAGE = 9;

function App() {
  const [applied, saveFilters] = useSavedFilters();
  const [draft, setDraft] = useState<FilterValues>(applied);
  const [tab, setTab] = useState<TabId>("rent");
  const [sort, setSort] = useState<SortOrder>("default");
  const [pageNumber, setPageNumber] = useState(1);
  const [selected, setSelected] = useState<Product | null>(null);
  const [requestSubject, setRequestSubject] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const found = useMemo(
    () => sortProducts(filterProducts(PRODUCTS, tab, applied), sort),
    [tab, applied, sort],
  );
  const page = paginate(found, pageNumber, PER_PAGE);

  const apply = (next: FilterValues) => {
    saveFilters(next);
    setDraft(next);
    setPageNumber(1);
    setFiltersOpen(false);
  };

  const goToPage = (n: number) => {
    setPageNumber(n);
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  const request = (product: Product) => {
    setSelected(null);
    setRequestSubject(product.title);
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <div className="shop">
          <Filters
            value={draft}
            onChange={setDraft}
            onApply={() => apply(draft)}
            onReset={() => apply(DEFAULT_FILTERS)}
            dirty={JSON.stringify(draft) !== JSON.stringify(applied)}
            open={filtersOpen}
          />
          <Catalog
            tab={tab}
            onTabChange={(t) => {
              setTab(t);
              setPageNumber(1);
            }}
            sort={sort}
            onSortChange={(s) => {
              setSort(s);
              setPageNumber(1);
            }}
            page={page}
            total={found.length}
            onPageChange={goToPage}
            onMore={setSelected}
            onToggleFilters={() => setFiltersOpen((v) => !v)}
            filtersOpen={filtersOpen}
          />
        </div>
        <Faq />
      </main>
      <Footer
        subject={requestSubject}
        onClearSubject={() => setRequestSubject(null)}
      />
      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
        onRequest={request}
      />
    </>
  );
}

export default App;
