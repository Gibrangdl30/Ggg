<template>
  <div ref="autocompleteContainer" class="w-100"></div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';
import { createWidgetMixin } from 'vue-instantsearch/vue2/es';
import { connectSearchBox } from 'instantsearch.js/es/connectors';
import { autocomplete } from '@algolia/autocomplete-js';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

import '@algolia/autocomplete-theme-classic';


// import { 
// Algolia configuration
const searchClient = algoliasearch(
  "YQ73Q1UV03",
  "b0ebda9bda7d1ddf47211de6759dd800"
);
const INSTANT_SEARCH_INDEX_NAME = 'products';
const INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTE = 'categories';
const INSTANT_SEARCH_QUERY_SUGGESTIONS = 'products_query_suggestions';
// } from './algoliaSearchClient';

function debounce(fn, time) {
  let timerId;

  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => fn(...args), time);
  };
}
function debouncePromise(fn, time) {
  let timerId = undefined;

  return function debounced(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    return new Promise((resolve) => {
      timerId = setTimeout(() => resolve(fn(...args)), time);
    });
  };
}

export default {
  componentRoot: this,
  mixins: [createWidgetMixin({ connector: connectSearchBox })],

  methods: {},

  mounted() {
    const { instantSearchInstance } = this;

    // Set the InstantSearch index UI state from external events
    function setInstantSearchUiState({ query, category, resetCategory = false }) {
      // Basic implementation
      instantSearchInstance.setUiState((uiState) => ({
        ...uiState,
        [INSTANT_SEARCH_INDEX_NAME]: {
          ...uiState[INSTANT_SEARCH_INDEX_NAME],
          // We reset the page when the search state changes
          page: 1,
          query,
        },
      }));

      /*
      // Categories based implementation
      let hierarchicalMenu;
      if (resetCategory) {
        hierarchicalMenu = {
          hierarchicalMenu: { [INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTE]: [] },
        };
      } else if (!category) {
        hierarchicalMenu = {};
      } else {
        hierarchicalMenu = {
          hierarchicalMenu: {
            [INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTE]: [category],
          },
        };
      }

      instantSearchInstance.setUiState((uiState) => ({
        ...uiState,
        [INSTANT_SEARCH_INDEX_NAME]: {
          ...uiState[INSTANT_SEARCH_INDEX_NAME],
          page: 1,
          query,
          ...hierarchicalMenu,
        },
      }));
      */
    }

    const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
      key: 'instantsearch',
      limit: 3,
      transformSource({ source }) {
        return {
          ...source,
          onSelect({ item }) {
            submitSearch(item.label);
            setInstantSearchUiState({
              query: item.label,
              category: item.category,
            });
          },
        };
      },
    });

    const querySuggestionsPlugin = createQuerySuggestionsPlugin({
      searchClient,
      indexName: INSTANT_SEARCH_QUERY_SUGGESTIONS,
      getSearchParams() {
        // This creates a shared `hitsPerPage` value once the duplicates
        // between recent searches and Query Suggestions are removed
        return recentSearchesPlugin.data.getAlgoliaSearchParams({
          hitsPerPage: 6,
        });
      },

      transformSource({ source }) {
        return {
          ...source,
          sourceId: 'querySuggestionsPlugin',
          onSelect({ item }) {
            submitSearch(item.query);
            setInstantSearchUiState({ query: item.query });
          },
          getItems(params) {
            // We don't display Query Suggestions when there's no query
            if (!params.state.query) {
              return [];
            }

            return source.getItems(params);
          },
        };
      },


      // Add categories to the suggestions
      // categoryAttribute: [
      //   INSTANT_SEARCH_INDEX_NAME,
      //   'facets',
      //   'exact_matches',
      //   INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTE,
      // ],
      // transformSource({ source }) {
      //   return {
      //     ...source,
      //     sourceId: 'querySuggestionsPlugin',
      //     onSelect({ item }) {
      //       setInstantSearchUiState({ 
      //         query: item.query,
      //         category: item.__autocomplete_qsCategory,
      //       });
      //     },
      //     getItems(params) {
      //       // We don't display Query Suggestions when there's no query
      //       if (!params.state.query) {
      //         return [];
      //       }

      //       return source.getItems(params);
      //     },
      //   };
      // },
    });

    function getInstantSearchCurrentCategory() {
      const indexRenderState = instantSearchInstance.renderState[INSTANT_SEARCH_INDEX_NAME];
      const refinedCategory = indexRenderState?.hierarchicalMenu?.[
        INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTE
      ]?.items?.find(({ isRefined }) => isRefined);

      return refinedCategory?.value;
    }

    const querySuggestionPluginInCategory = createQuerySuggestionsPlugin({
      searchClient,
      indexName: INSTANT_SEARCH_QUERY_SUGGESTIONS,
      getSearchParams() {
        const currentCategory = getInstantSearchCurrentCategory();
        return recentSearchesPlugin.data.getAlgoliaSearchParams({
          hitsPerPage: 3,
          facetFilters: [
            `${INSTANT_SEARCH_INDEX_NAME}.facets.exact_matches.${INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTE}.value:${currentCategory}`,
          ],
        });
      },
      transformSource({ source }) {
        const currentCategory = getInstantSearchCurrentCategory();
        return {
          ...source,
          sourceId: 'querySuggestionsPluginInCategory',
          getItems(params) {
            if (!currentCategory) {
              return [];
            }

            return source.getItems(params);
          },
          templates: {
            ...source.templates,
            header({ items, createElement, Fragment }) {
              if (!items.length) {
                return null;
              }

              return createElement(Fragment, {}, [
                createElement(
                  'span',
                  { className: 'aa-SourceHeaderTitle' },
                  `In ${currentCategory}`
                ),
                createElement('span', { className: 'aa-SourceHeaderLine' }),
              ]);
            },
          },
        };
      },
    });

    const initialState =
      instantSearchInstance.mainIndex.getHelper()?.state || {};

    const debouncedSetInstantSearchUiState = debounce(setInstantSearchUiState, 500);
    const debounced = debouncePromise((items) => Promise.resolve(items), 2000);


    const submitSearch = (query) => {
      this.$router.push({ path: '/busqueda', query: { query } });
    }

    this.autocompleteInstance = autocomplete({
      container: this.$refs.autocompleteContainer,
      placeholder: '¿Qué estás buscando?',
      detachedMediaQuery: 'none',
      openOnFocus: true,
      debug: process.env.NODE_ENV === 'development',
      insights: true,
      plugins: [recentSearchesPlugin, querySuggestionsPlugin], //querySuggestionPluginInCategory, ],
      initialState: { query: new URL(window.location).searchParams.get('query') || '' },
      onSubmit: ({ state }) => {
        submitSearch(state.query);
        setInstantSearchUiState({ query: state.query });
      },
      onReset: () => {
        setInstantSearchUiState({ query: '', resetCategory: true });
      },
      onStateChange: ({ prevState, state }) => {
        if (prevState.query !== state.query) {
          this.$emit('input', state.query);
          debouncedSetInstantSearchUiState({ query: state.query });
          // setInstantSearchUiState({ query: state.query });
        }
      },
      // getSources({ query }) {
      //   return debounced([{
      //     sourceId: 'algoliaItems',
      //     getItems() {
      //     //   // return getAlgoliaResults({
      //     //   //   searchClient,
      //     //   //   queries: [
      //     //   //     {
      //     //   //       indexName: INSTANT_SEARCH_INDEX_NAME,
      //     //   //       query,
      //     //   //     },
      //     //   //   ],
      //     //   // });
      //     },
      //     // ...
      //   }]);
      // },
    });

  },

  beforeDestroy() {
    this.autocompleteInstance?.destroy();
  }
};
</script>