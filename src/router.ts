import { createRouter, createWebHistory } from 'vue-router';
import generatedRoutes from '~pages';
import { setupLayouts } from 'virtual:generated-layouts';

const routes = setupLayouts(generatedRoutes);

// Recorre las rutas generadas y configura las props necesarias
routes.forEach((route) => {
  if (route.name === 'acertijo') {
    route.props = (route) => ({
      acertijo: route.params.acertijo,
      clave: route.params.clave,
    });
  }
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
