import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Error from "../views/404page.vue";
import Tags from "../views/Tags.vue";
import Category from "../views/Category.vue";
import Product from "../views/Product.vue";
import CategoryDetail from "@/components/CategoryDetail";
import ProductDetail from "@/components/ProductDetail";
import TagDetail from "@/components/TagDetail";

import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/tags/:id",
    name: "Tags",
    component: Tags,
    meta: { requiresAuth: true },
  },
  {
    path: "/tags/:userId/:tagId",
    name: "TagDetail",
    component: TagDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/category/:id",
    name: "Category",
    component: Category,
    meta: { requiresAuth: true },
  },
  {
    path: "/category/:userId/:categoryId",
    name: "CategoryDetail",
    component: CategoryDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/product/:id",
    name: "Product",
    component: Product,
    meta: { requiresAuth: true },
  },
  {
    path: "/product/:userId/:productId",
    name: "ProductDetail",
    component: ProductDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/404page",
    name: "404page",
    component: Error,
  },
  {
    path: "*",
    redirect: "/404page",
  },
];

const router = new VueRouter({
  mode: "history",
  // base: ,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("to", to);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    store.dispatch("AUTH/getLocalStorage");
    if (store.state.AUTH.user) {
      next();
    } else {
      console.log("123123123123 89 router");
      next({
        name: "Login",
        query: { redirect: to.fullPath },
      });
    }
  } else {
    console.log("123213123123123");
    next();
  }
});

export default router;
