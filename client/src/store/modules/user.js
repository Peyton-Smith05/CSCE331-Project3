export default {
    namespaced: true,
    state: () => ({
      // User state
      email: '',
      role: 'customer',
      name: '',
    }),
    mutations: {
      // User mutations
      setEmail(state, email) {
        state.email = email;
      },
      setRole(state, role) {
        state.role = role;
      },
      setName(state, name) {
        state.name = name;
      },
    },
    actions: {
      // User actions
      updateEmail({ commit }, email) {
        commit('setEmail', email);
      },
      updateRole({ commit }, role) {
        commit('setRole', role);
      },
      updateName({ commit }, name) {
        commit('setName', name);
      },
    },
    getters: {
      // User getters
      getEmail(state) {
        return state.email;
      },
      isRole(state) {
        return (role) => state.role === role;
      },
      getName(state) {
        return state.name;
      },
      isEmail(state) {
        return (email) => state.email === email;
      },
      isName(state) {
        return (name) => state.name === name;
      },
    }
  };
  