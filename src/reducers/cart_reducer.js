import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  // handle add to cart
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((item) => item.id === id + color);
    // if item is in the cart already
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        //if id matches
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          //check if isn't exceeding the available stock
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    }
    // if item isn't in the cart
    else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  // handle remove item
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((product) => {
      return product.id !== action.payload;
    });
    return { ...state, cart: tempCart };
  }
  // handle clear cart
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  // handle toggle amount
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        // if increase
        if (value === "inc") {
          let newAmount = item.amount + 1;
          // check if it not bigger than amount in stock
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        // if decrease
        if (value === "dec") {
          let newAmount = item.amount - 1;
          // check if it is less than one
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });

    return { ...state, cart: tempCart };
  }

  // handle carts count
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_amount += price * amount;
        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );
    return { ...state, total_items, total_amount };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
