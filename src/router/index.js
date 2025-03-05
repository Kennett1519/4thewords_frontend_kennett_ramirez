import { createRouter, createWebHistory } from "vue-router";
import LeyendasList from "../views/LeyendasList.vue";
import LeyendaForm from "../views/LeyendaForm.vue";

const routes = [
  { path: "/", name: "lista-leyendas", component: LeyendasList },
  { path: "/leyendas/nueva", name: "crear-leyenda", component: LeyendaForm },
  {
    path: "/leyendas/editar/:id",
    name: "editar-leyenda",
    component: LeyendaForm,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
