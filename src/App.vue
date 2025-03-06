<template>
  <div id="app">
    <!-- Barra de navegación -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">Leyendas Costa Rica</router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Lista de Leyendas</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/leyendas/nueva">Nueva Leyenda</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenido dinamico de la aplicación -->
    <div class="container mt-4 mb-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

