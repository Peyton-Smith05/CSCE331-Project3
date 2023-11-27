export default {
    namespaced: true,
    state: () => ({
      orderedItems: [],
      
    }),
    mutations: {
      // Order mutations
      addOrderedItem(state, orderedItem) {
        state.orderedItems.push(orderedItem);
      },
    },
    actions: {
      // Order actions
      addOrderItem({ commit }, orderedItem) {
        commit('addOrderedItem', orderedItem);
      },
    },
    getters: {
      // Order getters
      totalCost(state) {
        return state.orderedItems.reduce((total, item) => total + item.price, 0);
      },
      tax(state, getters) {
        return getters.totalCost * 0.07; // Assuming tax rate is 7%
      },
    }
  };
  