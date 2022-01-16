const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "home",
        path: "",
        redirect: { name: "marketplace" }
      },
      {
        name: "marketplace",
        path: "marketplace",
        component: () => import("pages/Index.vue"),
        children: [
          {
            name: "buy",
            path: "buy/:offeringId?",
            props: true,
            component: () => import("pages/DialogBuyNFT.vue")
          }
        ]
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
          },
          {
            name: "mint",
            path: "mint/:offeringId?",
            props: true,
            component: () => import("pages/DialogMintNFT.vue")
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
