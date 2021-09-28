<template>
  <div class="add-edit">
    <div id="id01" class="modal" v-if="isVisible">
      <form @submit.prevent="onSubmitTag" class="modal-content animate">
        <div class="imgcontainer">
          <h3>{{ dataUpdate ? "Edit Tag" : "Add new Tag" }}</h3>
          <span class="close" title="Close Modal" v-on:click="onCancelModal"
            >&times;</span
          >
        </div>

        <div class="container">
          <label for="uname"><b>Tag name</b></label>
          <input
            type="text"
            placeholder="Enter tag name"
            name="tag"
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
export default class AddEditTag extends Vue {
  @Prop(Boolean) isVisible: any;
  @Prop({ default: null, type: Object, required: false }) dataUpdate: any;
  name = "";
  id = "";
  onCancelModal(): void {
    this.$emit("handleCancelEvent");
  }
  onSubmitTag(): void {
    if (!this.dataUpdate) {
      this.$emit("onCreateTag", this.name);
      this.name = "";
      this.id = "";
    } else {
      const data = {
        id: this.id,
        name: this.name,
      };
      this.$emit("onUpdateTag", data);
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
