<template>
  <div class="mb-3">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <textarea
      :id="id"
      :name="name"
      :placeholder="placeholder"
      class="form-control"
      :rows="rows"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
    ></textarea>
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
    rows: { type: Number, default: 4 },
    required: { type: Boolean, default: false },
    errorMessage: String,
  },
};
</script>
