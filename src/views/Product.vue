<template lang="">
  <div class="container">
    <h1>Product</h1>
    <div class="search-Input">
      <div class="search-items">
        <input
          type="text"
          id="myInput"
          placeholder="Search for products..."
          v-on:keyup.enter="onSeach"
          v-model="params.keyword"
        />
        <button
          class="button success"
          style="margin-left: 10px"
          v-on:click="onSeach"
        >
          Search
        </button>
      </div>
      <div class="search-button">
        <div class="dropdown">
          <button class="dropbtn">Sắp xếp</button>
          <div class="dropdown-content">
            <span
              v-on:click="changeSortType('asc')"
              v-bind:class="{
                sortSelected:
                  params.sortType === 'asc' || params.sortType === '',
              }"
              >Asc</span
            >
            <span
              v-on:click="changeSortType('desc')"
              v-bind:class="{
                sortSelected: params.sortType === 'desc',
              }"
              >Desc</span
            >
          </div>
        </div>
        <button
          class="button success"
          style="float: right"
          v-on:click="isVisibleAddModal"
        >
          Add new product
        </button>
      </div>
    </div>

    <div style="overflow-x:auto;">
      <table id="table">
        <tr>
          <th v-on:click="changeSortName('id')">ID</th>
          <th v-on:click="changeSortName('title')">Title</th>
          <th>Category</th>
          <th>Tags</th>
          <th></th>
        </tr>
        <tr v-for="product in displayedProducts" v-bind:key="product.id">
          <td style="width: 150px">
            {{ product.id }}
          </td>
          <td v-html="product.title">{{ product.title }}</td>
          <td>{{ product.category.name }}</td>
          <td>
            <div v-for="(item, index) in product.tags" v-bind:key="index">
              {{ item.name }}
            </div>
          </td>
          <td>
            <button
              class="sm-button primary"
              v-on:click="isVisibleEditModal(product)"
            >
              Sửa
            </button>
            <button
              class="sm-button success"
              v-on:click="$router.push(`/product/${id}/${product.id}`)"
            >
              Detail
            </button>

            <button class="sm-button danger" v-on:click="onDelete(product)">
              Xóa
            </button>
          </td>
        </tr>
      </table>

      <div class="pagination">
        <a
          v-if="pagination.currentPage != 1"
          v-on:click="pagination.currentPage--"
          >&laquo;</a
        >
        <a
          v-for="(pag, index) in pagination.totalPage"
          v-bind:key="index"
          @click="pagination.currentPage = pag"
          >{{ pag }}</a
        >
        <a
          v-if="pagination.currentPage < pagination.totalPage.length"
          v-on:click="pagination.currentPage++"
          >&raquo;</a
        >
      </div>
    </div>

    <AddEditProduct
      v-if="isVisible"
      v-bind:isVisible="isVisible"
      v-bind:dataUpdate="dataUpdate"
      v-on:handleCancelEvent="handleCancelEvent"
      v-on:onCreateProduct="onCreateProduct"
      v-on:onUpdateProduct="onUpdateProduct"
    />
  </div>
</template>

<script lang="ts">
import {
  ParamsInterface,
  ProductInterface,
  ProductSubmitInterface,
  User,
} from "@/utils/interface";
import swal from "sweetalert";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ProductService from "../ApiService/apiProduct";
import AddEditProduct from "../components/AddEditProduct.vue";
@Component({
  components: {
    AddEditProduct,
  },
})
export default class Product extends Vue {
  id = this.$route.params.id;
  products = [];
  isVisible = false;
  dataUpdate = null;
  pagination: any = {
    totalPage: [],
    currentPage: 1,
    limit: 20,
  };
  params: ParamsInterface = {
    page: 1,
    size: 0,
    sortName: "title",
    sortType: "",
    keyword: "",
  };

  isVisibleEditModal(data: any): void {
    this.dataUpdate = data;
    this.isVisible = true;
  }
  isVisibleAddModal(): void {
    this.isVisible = true;
  }
  handleCancelEvent() {
    this.dataUpdate = null;
    this.isVisible = false;
  }
  onSeach(): void {
    this.getData();
  }
  changeSortType(value: string): void {
    console.log(value, "value");
    this.params.sortType = value;
    this.getData();
  }
  changeSortName(value: string): void {
    console.log("value");
    this.params.sortName = value;
    this.getData();
  }
  async onDelete(product: ProductInterface): Promise<void> {
    console.log("product", product);
    try {
      if (window.confirm(`Are you want to delete this product?`)) {
        await ProductService.deleteProduct(product.id);
        this.getData();
        swal({
          title: "Success",
          text: `Delete product successfully!`,
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async onCreateProduct(data: ProductSubmitInterface): Promise<void> {
    console.log(data);
    const payload = {
      ...data,
      user_id: this.id,
    };
    await ProductService.postProduct(payload);
    this.getData();
    this.isVisible = false;
    swal({
      title: "Success",
      text: `Add product successfully!`,
      icon: "success",
    });
  }
  async onUpdateProduct(data: ProductSubmitInterface): Promise<void> {
    console.log(data);
    const payload = {
      id: data.id,
      data: {
        ...data,
        user_id: this.id,
      },
    };
    await ProductService.putProduct(payload);
    this.getData();
    this.isVisible = false;
    swal({
      title: "Success",
      text: `Update product successfully!`,
      icon: "success",
    });
  }
  async getData(): Promise<void> {
    console.log("id", this.id);
    try {
      const payload = {
        userId: this.id,
        ...this.params,
      };
      const response: any = await ProductService.getList(payload);
      this.products = response.qas;
    } catch (error) {
      console.log(error);
    }
  }
  setPages(): void {
    var numPages = this.products.length / this.pagination.limit;
    for (let i = 0; i < numPages; i++) {
      var pageNum = i + 1;
      this.pagination.totalPage.push(pageNum);
    }
  }
  paginate(products: any): void {
    let page = this.pagination.currentPage;
    let perPage = this.pagination.limit;
    let from = page * perPage - perPage;
    let to = page * perPage;
    return products.slice(from, to);
  }
  //computed
  get result(): User {
    return this.$store.state.AUTH.user;
  }
  //computed
  get displayedProducts(): any {
    return this.paginate(this.products);
  }

  created(): void {
    this.getData();
  }

  @Watch("products")
  onChangeProduct(): void {
    this.setPages();
  }
}
</script>

<style lang="css" scoped src="@/assets/css/global.css"></style>
