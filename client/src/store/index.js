import { createStore } from 'vuex';
import user from './modules/user';
import menu from './modules/menu';
import order from './modules/order';

export default createStore({
  modules: {
    user,
    menu,
    order
  }
});
