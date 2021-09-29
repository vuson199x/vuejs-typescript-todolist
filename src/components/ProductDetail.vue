<template>
  <div style="margin-left: 2rem; ">
    <h1>Product Detail</h1>
    <div>user_id: {{ products.user_id }}</div>
    <div>category: {{ products.category.name }}</div>
    <div>title :{{ products.title }}</div>
    <div>url : {{ products.url }}</div>
    <div>createdAt: {{ products.createdAt }}</div>
    <div>description: {{ products.description }}</div>
    Tags:
    <ul>
      <li v-for="tag in products.tags" v-bind:key="tag.id">
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "@/model/UserModel";
import ProductService from "@/ApiService/apiProduct";
import swal from "sweetalert";
import { Observable } from "rxjs";
@Component
export default class ProductDetail extends Vue {
  productId = this.$route.params.productId;
  products = {
    id: "",
    title: "",
    user_id: "",
    url: "",
    category: {
      id: "",
      name: "",
    },
    updatedAt: "",
    createdAt: "",
    description: "",
    tags: [],
  };

  getData(): void {
    let observable = Observable.create((observer: any) => {
      ProductService.getListDetail(this.productId)
        .then((response: any) => {
          observer.next(response.qa);
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
      next: (data: any) => (this.products = data),
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
