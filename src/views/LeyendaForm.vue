<template>
  <div class="container mt-4">
    <h2 class="mb-4">{{ esEdicion ? "Editar Leyenda" : "Nueva Leyenda" }}</h2>

    <form @submit.prevent="guardarLeyenda">
      <!-- Nombre -->
      <BaseInput v-model="leyenda.nombre" label="Nombre" required />

      <!-- Categoría -->
      <BaseSelect v-model="leyenda.categoria" :options="categorias" label="Categoría" required />

      <!-- Provincia -->
      <BaseSelect v-model="leyenda.provincia" :options="provincias" label="Provincia" required />

      <!-- Cantón -->
      <BaseInput v-model="leyenda.canton" label="Cantón" required />

      <!-- Distrito -->
      <BaseInput v-model="leyenda.distrito" label="Distrito" required />

      <!-- Descripción -->
      <BaseTextarea v-model="leyenda.descripcion" label="Descripción" required />

      <!-- Fecha de Creación -->
      <BaseDatePicker v-model="leyenda.fecha" label="Fecha de Creación" required />

      <!-- Subida de Imagen -->
      <div class="mb-3">
        <label class="form-label">Imagen</label>
        <input type="file" class="form-control" @change="subirImagen" accept="image/*" />
      </div>

      <div v-if="leyenda.imagen_url" class="mb-3">
        <img :src="leyenda.imagen_url" alt="Imagen de la leyenda" class="img-thumbnail" />
      </div>

      <!-- Botones -->
      <div class="d-flex justify-content-between">
        <BaseButton type="submit" variant="primary">{{ esEdicion ? "Actualizar" : "Guardar" }}</BaseButton>
        <BaseButton type="button" variant="secondary" @click="cancelar">Cancelar</BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import BaseInput from "../components/BaseInput.vue";
import BaseTextarea from "../components/BaseTextarea.vue";
import BaseSelect from "../components/BaseSelect.vue";
import BaseDatePicker from "../components/BaseDatePicker.vue";
import BaseButton from "../components/BaseButton.vue";

export default {
  components: {
    BaseInput,
    BaseTextarea,
    BaseSelect,
    BaseDatePicker,
    BaseButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const esEdicion = computed(() => !!route.params.id);
    const leyenda = ref({
      nombre: "",
      categoria: "",
      provincia: "",
      canton: "",
      distrito: "",
      descripcion: "",
      fecha: new Date().toISOString().split("T")[0],
      imagen_url: "",
    });
    const imagenFile = ref(null);
    let imagenOriginal = "";

    const categorias = [
      { value: "Mito", label: "Mito" },
      { value: "Leyenda", label: "Leyenda" },
      { value: "Cuento", label: "Cuento" }
    ];

    const provincias = [
      { value: "San José", label: "San José" },
      { value: "Alajuela", label: "Alajuela" },
      { value: "Cartago", label: "Cartago" },
      { value: "Heredia", label: "Heredia" },
      { value: "Guanacaste", label: "Guanacaste" },
      { value: "Puntarenas", label: "Puntarenas" },
      { value: "Limón", label: "Limón" }
    ];

    const obtenerLeyenda = async () => {
      if (esEdicion.value) {
        try {
          const respuesta = await axios.get(`http://localhost:8080/leyendas/${route.params.id}`);
          leyenda.value = respuesta.data;
          if (leyenda.value.fecha) {
            leyenda.value.fecha = leyenda.value.fecha.split("T")[0];
          }

          if (leyenda.value.imagen_url) {
            imagenOriginal = leyenda.value.imagen_url;
            leyenda.value.imagen_url = `http://localhost:8080${leyenda.value.imagen_url}`;
          }

        } catch (error) {
          console.error("Error obteniendo la leyenda:", error);
        }
      }
    };

    const subirImagen = async (event) => {
      const archivo = event.target.files[0];
      if (archivo) {
        imagenFile.value = archivo;
        const formData = new FormData();
        formData.append("imagen", archivo);
        
        try {
          const response = await axios.post("http://localhost:8080/leyendas/subir-imagen/", formData, {
            headers: { "Content-Type": "multipart/form-data" }
          });
          leyenda.value.imagen_url = `http://localhost:8080${response.data.imagen_url}`;
        } catch (error) {
          console.error("Error subiendo la imagen:", error);
        }
      }
    };

    const guardarLeyenda = async () => {
      leyenda.value.fecha = leyenda.value.fecha || new Date().toISOString().split("T")[0];
      if (!imagenFile.value && esEdicion.value) {
        leyenda.value.imagen_url = imagenOriginal;
      }
      
      try {
        if (esEdicion.value) {
          await axios.put(`http://localhost:8080/leyendas/${route.params.id}`, leyenda.value, {
            headers: { "Content-Type": "application/json" }
          });
        } else {
          await axios.post("http://localhost:8080/leyendas/", leyenda.value, {
            headers: { "Content-Type": "application/json" }
          });
        }
        router.push({ name: "lista-leyendas" });
      } catch (error) {
        console.error("Error guardando la leyenda:", error.response ? error.response.data : error);
      }
    };

    const cancelar = () => {
      router.push({ name: "lista-leyendas" });
    };

    onMounted(obtenerLeyenda);

    return {
      leyenda,
      categorias,
      provincias,
      esEdicion,
      subirImagen,
      guardarLeyenda,
      cancelar,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
.img-thumbnail {
  max-width: 100%;
  height: auto;
}
</style>