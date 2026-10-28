import { TABS, type Product, type TabId } from "../../data/catalog";
import { SORT_OPTIONS, type Page, type SortOrder } from "../../utils/filter";
import { Pagination } from "../Pagination/Pagination";
import { ProductCard } from "../ProductCard/ProductCard";
import "./Catalog.css";

interface Props {
  tab: TabId;
  onTabChange: (tab: TabId) => void;
  sort: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  page: Page<Product>;
  total: number;
  onPageChange: (page: number) => void;
  onMore: (product: Product) => void;
  onToggleFilters: () => void;
  filtersOpen: boolean;
}

export function Catalog(props: Props) {
  const { tab, sort, page, total } = props;
  const title = TABS.find((t) => t.id === tab)?.title;

  return (
    <section className="catalog" id="catalog" aria-labelledby="catalog-title">
      <div
        className="catalog__tabs"
        role="tablist"
        aria-label="Разделы магазина"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === tab}
            className={t.id === tab ? "is-active" : undefined}
            onClick={() => props.onTabChange(t.id)}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div className="catalog__body">
        <div className="catalog__toolbar">
          <p className="catalog__found" aria-live="polite">
            {total
              ? `Найдено ${page.from}–${page.to} из ${total} результатов`
              : "Ничего не найдено"}
          </p>
          <button
            type="button"
            className="catalog__filters-toggle"
            aria-controls="filters"
            aria-expanded={props.filtersOpen}
            onClick={props.onToggleFilters}
          >
            Фильтры
          </button>
          <select
            className="catalog__sort"
            aria-label="Сортировка"
            value={sort}
            onChange={(e) => props.onSortChange(e.target.value as SortOrder)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <h2 className="catalog__title" id="catalog-title">
          {title}
        </h2>

        {page.items.length > 0 ? (
          <div className="catalog__grid">
            {page.items.map((p) => (
              <ProductCard key={p.id} product={p} onMore={props.onMore} />
            ))}
          </div>
        ) : (
          <p className="catalog__empty">
            {tab === "rent"
              ? "По выбранным фильтрам техника не найдена. Попробуйте изменить условия поиска."
              : "Раздел наполняется — товары появятся в ближайшее время."}
          </p>
        )}

        <Pagination
          page={page.page}
          pageCount={page.pageCount}
          onChange={props.onPageChange}
        />
      </div>
    </section>
  );
}
