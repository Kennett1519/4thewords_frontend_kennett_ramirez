<template>
  <div class="mb-3">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      class="form-control"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
    />
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
    placeholder: String,
    type: { type: String, default: "text" },
    required: { type: Boolean, default: false },
    errorMessage: String,
  },
};
</script>