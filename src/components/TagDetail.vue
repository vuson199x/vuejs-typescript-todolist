<template>
  <div style="margin-left: 2rem; ">
    <h1>Tag Detail</h1>
    <div>id: {{ tag.id }}</div>
    <div>name: {{ tag.name }}</div>
    <div>updatedAt: {{ tag.updatedAt }}</div>
    <div>createdAt: {{ tag.createdAt }}</div>
    <div>user_id: {{ tag.user_id }}</div>
    product:
    <ul>
      <li v-for="tag in tag.qas" v-bind:key="tag.id">
        {{ tag.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "@/model/UserModel";
import TagService from "@/ApiService/apiTag";
import swal from "sweetalert";
import { Observable } from "rxjs";
@Component
export default class CategoryDetail extends Vue {
  tagId = this.$route.params.tagId;
  tag = {
    id: "",
    name: "",
    updatedAt: "",
    createdAt: "",
    user_id: "",
    qas: [],
  };

  getData(): void {
    let observable = Observable.create((observer: any) => {
      TagService.getListDetail(this.tagId)
        .then((response: any) => {
          observer.next(response.tag);
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
      next: (data: any) => (this.tag = data),
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
