<template>
  <button 
    :type="type" 
    :class="buttonClass" 
    :disabled="disabled" 
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: { type: String, default: "button" }, 
    variant: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "secondary", "success", "danger", "info"]
    },
    size: { type: String, default: "md" },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    buttonClass() {
      return `btn btn-${this.variant} btn-${this.size}`;
    },
  },
};

</script>