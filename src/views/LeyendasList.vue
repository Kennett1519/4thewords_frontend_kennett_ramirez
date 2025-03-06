<template>
  <div class="container mt-4">
    <h2 class="mb-4">Lista de Leyendas</h2>

    <!-- Sección de filtros -->
    <div class="row mb-3">
      <div class="col-md-4">
        <BaseInput v-model="filtros.nombre" placeholder="Buscar por nombre..." />
      </div>
      <div class="col-md-4">
        <BaseSelect v-model="filtros.categoria" :options="categorias" default-label="Filtrar por categoría" />
      </div>
      <div class="col-md-4">
        <BaseSelect v-model="filtros.provincia" :options="provincias" default-label="Filtrar por provincia" />
      </div>
    </div>

    <!-- Lista de leyendas -->
    <div class="row">
      <div class="col-md-4" v-for="leyenda in leyendasFiltradas" :key="leyenda.id">
        <LeyendaCard :leyenda="leyenda" @editar="irAEditar" @eliminar="confirmarEliminacion" />
      </div>
    </div>

    <!-- Botón para agregar nueva leyenda -->
    <div class="text-center mt-4">
      <BaseButton variant="success" @click="irACrear">Agregar Nueva Leyenda</BaseButton>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import BaseInput from "../components/BaseInput.vue";
import BaseSelect from "../components/BaseSelect.vue";
import BaseButton from "../components/BaseButton.vue";
import LeyendaCard from "../components/LeyendaCard.vue";

export default {
  components: {
    BaseInput,
    BaseSelect,
    BaseButton,
    LeyendaCard,
  },
  setup() {
    const router = useRouter();
    const leyendas = ref([]);

    // Filtros
    const filtros = ref({
      nombre: "",
      categoria: "",
      provincia: "",
    });

    const categorias = [
      { value: "Magia", label: "Magia" },
      { value: "Religiosa", label: "Religiosa" },
      { value: "Topográfica", label: "Topográfica" }
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

    // Obtener leyendas desde el backend
    const obtenerLeyendas = async () => {
      try {
        const respuesta = await axios.get("http://localhost:8080/leyendas/");
        leyendas.value = respuesta.data;
      } catch (error) {
        console.error("Error obteniendo leyendas:", error);
      }
    };

    // Filtrar leyendas según criterios
    const leyendasFiltradas = computed(() => {
      return leyendas.value.filter((leyenda) => {
        return (
          (!filtros.value.nombre || leyenda.nombre.toLowerCase().includes(filtros.value.nombre.toLowerCase())) &&
          (!filtros.value.categoria || leyenda.categoria === filtros.value.categoria) &&
          (!filtros.value.provincia || leyenda.provincia === filtros.value.provincia)
        );
      });
    });

    // Redireccionar a formulario de creación
    const irACrear = () => {
      router.push({ name: "crear-leyenda" });
    };

    // Redireccionar a formulario de edición
    const irAEditar = (id) => {
      router.push({ name: "editar-leyenda", params: { id } });
    };

    // Confirmar eliminación de leyenda con SweetAlert2
    const confirmarEliminacion = (id) => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await eliminarLeyenda(id);
        }
      });
    };

    // Eliminar leyenda en el backend
    const eliminarLeyenda = async (id) => {
      try {
        await axios.delete(`http://localhost:8080/leyendas/${id}`);
        leyendas.value = leyendas.value.filter((leyenda) => leyenda.id !== id);
        Swal.fire("Eliminado", "La leyenda ha sido eliminada.", "success");
      } catch (error) {
        console.error("Error eliminando la leyenda:", error);
        Swal.fire("Error", "No se pudo eliminar la leyenda.", "error");
      }
    };

    onMounted(obtenerLeyendas);

    return {
      leyendas,
      filtros,
      categorias,
      provincias,
      leyendasFiltradas,
      irACrear,
      irAEditar,
      confirmarEliminacion,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>