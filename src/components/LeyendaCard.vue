<template>
  <div class="card leyenda-card h-100 d-flex flex-column">
    <!-- Imagen -->
    <img :src="leyenda.imagen_url" :alt="leyenda.nombre" class="card-img-top" />

    <div class="card-body">
      <!-- Nombre -->
      <h5 class="card-title">{{ leyenda.nombre }}</h5>

      <!-- Categoria -->
      <span class="badge bg-primary">{{ leyenda.categoria }}</span>

      <!-- Descripción -->
      <p class="card-text mt-2">{{ leyenda.descripcion }}</p>

      <!-- Ubicacion -->
      <p class="card-text text-muted">
        <strong>Ubicación:</strong> {{ leyenda.provincia }}, {{ leyenda.canton }}, {{ leyenda.distrito }}
      </p>

      <!-- Fecha de creacion (formato relativo usando la libreria date-fns) -->
      <p class="card-text text-muted">
        <strong>Fecha:</strong> {{ fechaRelativa }}
      </p>

      <!-- Botones de accion -->
      <div class="d-flex justify-content-between">
        <BaseButton variant="info" @click="$emit('editar', leyenda.id)">Editar</BaseButton>
        <BaseButton variant="danger" @click="$emit('eliminar', leyenda.id)">Eliminar</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import BaseButton from "./BaseButton.vue";

export default {
  components: { BaseButton },
  props: {
    leyenda: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const fechaRelativa = computed(() =>
      formatDistanceToNow(new Date(props.leyenda.fecha), { addSuffix: true, locale: es })
    );

    return { fechaRelativa };
  },
};
</script>

<style scoped>
.leyenda-card {
  max-width: 400px;
  margin: 10px auto;
  border-radius: 10px;
  overflow: hidden;
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
