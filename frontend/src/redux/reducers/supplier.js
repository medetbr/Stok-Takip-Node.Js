export const supplier = (state = {}, action) => {
  switch (action.type) {
    case 'SUPPLIER_GET_LIST_SUCCESS':
      return {suppliers:action.payload}
    default:
      return state
  }
};
