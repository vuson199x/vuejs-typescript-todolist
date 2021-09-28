<template>
  <div style="margin-left: 2rem; ">
    <h1>Category Detail</h1>
    <div>id: {{ category.id }}</div>
    <div>name: {{ category.name }}</div>
    <div>updatedAt :{{ category.updatedAt }}</div>
    <div>createdAt: {{ category.createdAt }}</div>
    <div>user_id: {{ category.user_id }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "../utils/interface";
import CategoryService from "@/ApiService/apiCategory";
import swal from "sweetalert";
import { Observable } from "rxjs";
@Component
export default class CategoryDetail extends Vue {
  categoryId = this.$route.params.categoryId;
  category = {
    id: "",
    name: "",
    updatedAt: "",
    createdAt: "",
    user_id: "",
  };

  getData(): void {
    let observable = Observable.create((observer: any) => {
      CategoryService.getListDetail(this.categoryId)
        .then((response: any) => {
          observer.next(response.category);
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
      next: (data: any) => (this.category = data),
    });
  }

  get result(): User {
    return this.$store.state.AUTH.user;
  }
  created() {
    this.getData();
  }
}
</script>
