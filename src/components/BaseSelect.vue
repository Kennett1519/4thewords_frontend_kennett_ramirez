<template>
  <div class="mb-3">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <select
      :id="id"
      :name="name"
      class="form-select"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :required="required"
    >
      <option value="" disabled selected>{{ placeholder }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <small v-if="errorMessage" class="text-danger">{{ errorMessage }}</small>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    label: String,
    name: String,
    id: String,
    placeholder: { type: String, default: "Seleccione una opción" },
    options: { type: Array, required: true },
    required: { type: Boolean, default: false },
    errorMessage: String,
  },
};
</script>