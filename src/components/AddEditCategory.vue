<template>
  <div class="add-edit">
    <div id="id01" class="modal" v-if="isVisible">
      <form @submit.prevent="onSubmitCategory" class="modal-content animate">
        <div class="imgcontainer">
          <h3>{{ dataUpdate ? "Edit Category" : "Add new Category" }}</h3>
          <span class="close" title="Close Modal" v-on:click="onCancelModal"
            >&times;</span
          >
        </div>

        <div class="container">
          <label for="uname"><b>Category name</b></label>
          <input
            type="text"
            placeholder="Enter Category name"
            name="category"
            required
            v-model="name"
            class="form-control"
          />

          <button class="sm-button success display-center">
            {{ dataUpdate ? "Edit" : "Add" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class AddEditCategory extends Vue {
  @Prop(Boolean) isVisible: any;
  @Prop({ default: null, type: Object, required: false }) dataUpdate: any;
  name = "";
  id = "";

  onCancelModal(): void {
    this.$emit("handleCancelEvent");
  }
  onSubmitCategory(): void {
    if (!this.dataUpdate) {
      this.$emit("onCreateCategory", this.name);
      this.name = "";
      this.id = "";
    } else {
      const data = {
        id: this.id,
        name: this.name,
      };
      this.$emit("onUpdateCategory", data);
      this.name = "";
      this.id = "";
    }
  }

  created(): void {
    this.name = this.dataUpdate ? this.dataUpdate.name : "";
    this.id = this.dataUpdate ? this.dataUpdate.id : "";
  }
}
</script>
<style lang="css" scoped src="@/assets/css/global.css"></style>
