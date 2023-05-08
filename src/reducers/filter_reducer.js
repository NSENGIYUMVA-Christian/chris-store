import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  // handle getting products from productsGlobalContext
  if (action.type === LOAD_PRODUCTS) {
    //get max price
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  // handle grid view toggle
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  // handle list view toggle
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  // handle filter by option selected
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  // display products based on selected sort option
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === `price-lowest`) {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === `price-highest`) {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === `name-a`) {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === `name-z`) {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }
  // handle updating filters on Filter component
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  // handling products to display when search change
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    let tempProduct = [...all_products];
    const { text, company, category, color, price, shipping } = state.filters;
    // filtering by text
    if (text) {
      tempProduct = tempProduct.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    // filtering by category
    if (category !== `all`) {
      tempProduct = tempProduct.filter((product) => {
        return product.category === category;
      });
    }
    // filtering by company
    if (company !== `all`) {
      tempProduct = tempProduct.filter((product) => {
        return product.company === company;
      });
    }
    // filtering by color
    if (color !== `all`) {
      tempProduct = tempProduct.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }
    // filtering by price

    tempProduct = tempProduct.filter((product) => {
      return product.price <= price;
    });

    // filtering by shipping
    if (shipping) {
      tempProduct = tempProduct.filter((product) => {
        return product.shipping === true;
      });
    }

    return { ...state, filtered_products: tempProduct };
  }
  // clear filters
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: ``,
        company: `all`,
        category: `all`,
        color: `all`,
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
