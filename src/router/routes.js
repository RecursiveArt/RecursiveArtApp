const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "marketplace",
        path: "",
        component: () => import("pages/Index.vue")
      },
      {
        name: "dashboard",
        path: "dashboard",
        component: () => import("pages/Dashboard.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
