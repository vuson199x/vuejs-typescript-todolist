<template>
  <div class="add-edit">
    <div id="id01" class="modal" v-if="isVisible">
      <form @submit.prevent="onSubmitProduct" class="modal-content animate">
        <div class="imgcontainer">
          <h3>{{ dataUpdate ? "Edit product" : "Add new product" }}</h3>
          <span class="close" title="Close Modal" v-on:click="onCancelModal"
            >&times;</span
          >
        </div>

        <div class="container">
          <div>
            <label for="title"><b>Product title</b></label>
            <input
              type="text"
              placeholder="Enter product title"
              name="title"
              required
              v-model="title"
              class="form-control"
            />
          </div>
          <div>
            <label for="url"><b>Url</b></label>
            <input
              type="text"
              placeholder="Enter product's url"
              name="url"
              required
              v-model="url"
              class="form-control"
            />
          </div>
          <div>
            <label for="category"><b>Category: </b></label>
            <multiselect
              v-model="category"
              :options="optionCategory"
              placeholder="Search and select one"
              label="name"
              track-by="name"
            >
              ></multiselect
            >
          </div>
          <div>
            <label for="tags"><b>Tags: </b></label>
            <multiselect
              v-model="tags"
              :options="optionTags"
              :multiple="true"
              label="name"
              track-by="name"
            >
            </multiselect>
          </div>
          <div>
            <label for="description"><b>Description: </b></label>
            <textarea
              required
              v-model="description"
              placeholder="Enter product's description"
              name="description"
              rows="4"
              cols="50"
            ></textarea>
          </div>

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
import Multiselect from "vue-multiselect";
import { ProductInterface, ProductSubmitInterface } from "@/utils/interface";
import TagService from "@/ApiService/apiTag";
import CategoryService from "@/ApiService/apiCategory";
import { Observable } from "rxjs";
import swal from "sweetalert";

@Component({
  components: {
    Multiselect,
  },
})
export default class AddEditProduct extends Vue {
  @Prop(Boolean) isVisible: any;
  @Prop({ default: null, type: Object, required: false }) dataUpdate: any;
  id = "";
  title = "";
  description = "";
  tags = [];
  url = "";
  category = {
    id: "",
    name: "",
  };
  optionCategory = [];
  optionTags = [];
  params = {
    userId: this.$route.params.id,
    page: 1,
    size: 0,
    sortName: "name",
    sortType: "",
    keyword: "",
  };

  onCancelModal(): void {
    this.$emit("handleCancelEvent");
  }
  onSubmitProduct(): void {
    try {
      const data: ProductSubmitInterface = {
        title: this.title,
        description: this.description,
        tags: this.tags.map((item: any) => item.id),
        url: this.url,
        category: this.category.id,
      };

      if (!this.dataUpdate) {
        this.$emit("onCreateProduct", data);
        this.title = "";
        this.description = "";
        this.tags = [];
        this.url = "";
        this.category = {
          id: "",
          name: "",
        };
      } else {
        const updateData = {
          id: this.id,
          ...data,
        };
        this.$emit("onUpdateProduct", updateData);
        this.title = "";
        this.description = "";
        this.tags = [];
        this.url = "";
        this.category = {
          id: "",
          name: "",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  getDataCatgory(): void {
    const payload = {
      ...this.params,
    };
    let observable = Observable.create((observer: any) => {
      CategoryService.getList(payload)
        .then((response: any) => {
          observer.next(response.categories);
        })
        .catch((error: any) => {
          swal({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
          });
          observer.error(error);
        });
    });
    observable.subscribe({
      next: (data: any) => (this.optionCategory = data),
    });
  }
  getDataTags(): void {
    const payload = {
      ...this.params,
    };
    let observable = Observable.create((observer: any) => {
      TagService.getList(payload)
        .then((response: any) => {
          observer.next(response.tags);
        })
        .catch((error: any) => {
          swal({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
          });
          observer.error(error);
        });
    });
    observable.subscribe({
      next: (data: any) => (this.optionTags = data),
    });
  }

  created(): void {
    this.getDataCatgory();
    this.getDataTags();
    this.id = this.dataUpdate.id ? this.dataUpdate.id : "";
    this.title = this.dataUpdate.title ? this.dataUpdate.title : "";
    this.description = this.dataUpdate.description
      ? this.dataUpdate.description
      : "";
    this.tags = this.dataUpdate.tags ? this.dataUpdate.tags : "";
    this.url = this.dataUpdate.url ? this.dataUpdate.url : "";
    this.category = this.dataUpdate.category ? this.dataUpdate.category : "";
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="css" scoped src="@/assets/css/global.css"></style>
<style lang="css" scoped src="@/assets/css/product.css"></style>
