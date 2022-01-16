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
        props: true,
        component: () => import("pages/Dashboard.vue"),
        children: [
          {
            name: "sell",
            path: "sell/:token_address?/:token_id?",
            props: true,
            component: () => import("pages/DialogSellNFT.vue")
          }
        ]
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
