<template>
  <div class="mb-3">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      type="date"
      :id="id"
      :name="name"
      class="form-control"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
      :max="maxDate"
    />
    <small v-if="errorMessage" class="text-danger">{{ errorMessage }}</small>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String, //Conxeion con v-model (el valor de la fecha seleccionada) 
    label: String,
    name: String,
    id: String,
    required: {type: Boolean, default: false },
    errorMessage: String,
    maxDate: { type: String, default: new Date().toISOString().split("T")[0] }, //Fecha maxima (por defecto la fecha actual)
  },
};
</script>

