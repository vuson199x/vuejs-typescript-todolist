<template lang="">
  <div class="container">
    <h1>Category</h1>
    <!-- {{ result }} -->

    <div class="search-Input">
      <div class="search-items">
        <input
          type="text"
          id="myInput"
          placeholder="Search for categories.."
          v-on:keyup.enter="onSeach"
          v-model="params.keyword"
        />
        <button
          class="button success"
          v-on:click="onSeach"
          style="margin-left: 10px"
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
              v-bind:class="{ sortSelected: params.sortType === 'desc' }"
              >Desc</span
            >
          </div>
        </div>
        <button
          style="float: right"
          class="button success"
          v-on:click="isVisibleAddModal"
        >
          Add new category
        </button>
      </div>
    </div>
    <div style="overflow-x:auto;">
      <table id="table">
        <tr>
          <!-- <th>STT</th> -->
          <th v-on:click="changeSortName('id')">ID</th>
          <th v-on:click="changeSortName('name')">Name</th>
          <th></th>
        </tr>
        <tr v-for="category in displayedCategories" v-bind:key="category.id">
          <!-- <td style="width: 50px">{{ index + 1 }}</td> -->
          <td style="width: 150px">{{ category.id }}</td>
          <td v-html="category.name"></td>
          <td style="text-align: center, width: 200px">
            <button
              class="sm-button primary"
              v-on:click="isVisibleEditModal(category)"
            >
              Edit
            </button>
            <button
              class="sm-button success"
              v-on:click="$router.push(`/category/${id}/${category.id}`)"
            >
              Detail
            </button>
            <button class="sm-button danger" v-on:click="onDelete(category)">
              Detele
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

    <AddEditCategory
      v-if="isVisible"
      v-bind:isVisible="isVisible"
      v-bind:dataUpdate="dataUpdate"
      v-on:handleCancelEvent="handleCancelEvent"
      v-on:onCreateCategory="onCreateCategory"
      v-on:onUpdateCategory="onUpdateCategory"
    />
  </div>
</template>

<script lang="ts">
import swal from "sweetalert";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CategoryService from "../ApiService/apiCategory";
import AddEditCategory from "@/components/AddEditCategory.vue";
import { Observable } from "rxjs";
@Component({
  components: {
    AddEditCategory,
  },
})
export default class Category extends Vue {
  id = this.$route.params.id;
  categories = [];
  isVisible = false;
  dataUpdate = null;
  pagination: any = {
    totalPage: [],
    currentPage: 1,
    limit: 20,
  };
  params = {
    page: 1,
    size: 0,
    sortName: "name",
    sortType: "",
    keyword: "",
  };

  onSeach(): void {
    this.getData();
  }
  changeSortName(value: string): void {
    this.params.sortName = value;
    this.getData();
  }
  changeSortType(value: string): void {
    console.log(value, "value");
    this.params.sortType = value;
    this.getData();
  }
  isVisibleEditModal(data: any): void {
    this.dataUpdate = data;
    this.isVisible = true;
  }
  isVisibleAddModal(): void {
    this.isVisible = true;
  }
  handleCancelEvent(): void {
    this.dataUpdate = null;
    this.isVisible = false;
  }
  onUpdateCategory(data: { id: string; name: string }): void {
    const payload: any = {
      id: data.id,
      data: {
        name: data.name,
        user_id: this.id,
      },
    };
    let observable = Observable.create((observer: any) => {
      CategoryService.putCategory(payload)
        .then((response: any) => {
          observer.next(response);
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
      next: (data: any) => {
        this.getData();
        this.isVisible = false;
        this.dataUpdate = null;
        swal({
          title: "Success",
          text: `Update category successfully!`,
          icon: "success",
        });
      },
    });
  }
  onCreateCategory(name: string): void {
    const payload: any = {
      name: name,
      user_id: this.id,
    };
    let observable = Observable.create((observer: any) => {
      CategoryService.postCategory(payload)
        .then((response: any) => {
          observer.next(response);
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
      next: (data: any) => {
        this.getData();
        this.isVisible = false;
        swal({
          title: "Success",
          text: `Add category successfully!`,
          icon: "success",
        });
      },
    });
  }
  onDelete(category: any): void {
    if (window.confirm(`Are you want to delete this category?`)) {
      let observable = Observable.create((observer: any) => {
        CategoryService.deleteCategory(category.id)
          .then((response: any) => {
            observer.next(response);
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
        next: (data: any) => {
          this.getData();
          swal({
            title: "Success",
            text: `Delete category successfully!`,
            icon: "success",
          });
        },
      });
    }
  }
  getData(): void {
    const payload = {
      userId: this.id,
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
      next: (data: any) => (this.categories = data),
    });
  }
  setPages(): void {
    var numPages = this.categories.length / this.pagination.limit;
    for (let i = 0; i < numPages; i++) {
      var pageNum = i + 1;
      this.pagination.totalPage.push(pageNum);
    }
  }
  paginate(categories: any): void {
    let page = this.pagination.currentPage;
    let perPage = this.pagination.limit;
    let from = page * perPage - perPage;
    let to = page * perPage;
    return categories.slice(from, to);
  }

  get result(): void {
    return this.$store.state.AUTH.user;
  }
  get displayedCategories(): void {
    return this.paginate(this.categories);
  }
  created(): void {
    this.getData();
  }

  @Watch("categories")
  onChangeCategory(): void {
    this.setPages();
  }
}
</script>

<style lang="css" scoped src="../assets/css/global.css"></style>
