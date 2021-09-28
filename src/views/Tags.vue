<template lang="">
  <div class="container">
    <h1>Tags</h1>
    <div class="search-Input">
      <div class="search-items">
        <input
          type="text"
          id="myInput"
          placeholder="Search for tags..."
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
          Add new tag
        </button>
      </div>
    </div>
    <div style="overflow-x:auto;">
      <table id="table">
        <tr>
          <th v-on:click="changeSortName('id')">ID</th>
          <th v-on:click="changeSortName('name')">Name</th>
          <th>UserId</th>
          <th>Product</th>
          <th></th>
        </tr>
        <tr v-for="tag in displayedTags" v-bind:key="tag.id">
          <td style="width: 150px">{{ tag.id }}</td>
          <td v-html="tag.name"></td>
          <td>{{ tag.user_id }}</td>
          <td>
            <div v-for="(item, index) in tag.qas" v-bind:key="index">
              {{ item }}
            </div>
          </td>
          <button
            class="sm-button primary"
            v-on:click="isVisibleEditModal(tag)"
          >
            Sửa
          </button>
          <button
            class="sm-button success"
            v-on:click="$router.push(`/tags/${id}/${tag.id}`)"
          >
            Detail
          </button>
          <button class="sm-button danger" v-on:click="onDelete(tag)">
            Xóa
          </button>
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
    <AddEditTag
      v-if="isVisible"
      v-bind:isVisible="isVisible"
      v-bind:dataUpdate="dataUpdate"
      v-on:handleCancelEvent="handleCancelEvent"
      v-on:onCreateTag="onCreateTag"
      v-on:onUpdateTag="onUpdateTag"
    />
  </div>
</template>

<script lang="ts">
import swal from "sweetalert";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ParamsInterface, TagInterface, User } from "../utils/interface";
import TagService from "../ApiService/apiTag";
import AddEditTag from "../components/AddEditTag.vue";
@Component({
  components: {
    AddEditTag,
  },
})
export default class Tags extends Vue {
  id = this.$route.params.id;
  tags = [];
  dataUpdate = null;
  isVisible = false;
  pagination: any = {
    totalPage: [],
    currentPage: 1,
    limit: 20,
  };
  params: ParamsInterface = {
    page: 1,
    size: 0,
    sortName: "name",
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
  handleCancelEvent(): void {
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

  async onDelete(tag: TagInterface): Promise<void> {
    console.log("tag", tag);
    try {
      if (window.confirm(`Are you want to delete this tag?`)) {
        await TagService.deleteTag(tag.id);
        this.getData();
        swal({
          title: "Success",
          text: `Delete tag successfully!`,
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getData(): Promise<void> {
    try {
      const payload = {
        userId: this.id,
        ...this.params,
      };
      const response: any = await TagService.getList(payload);
      console.log("response 123", response);
      this.tags = response.tags;
    } catch (error) {
      console.log(error);
    }
  }
  async onCreateTag(name: string): Promise<void> {
    console.log(name);
    const payload = {
      name: name,
      user_id: this.id,
    };
    await TagService.postTag(payload);
    this.getData();
    this.isVisible = false;
    swal({
      title: "Success",
      text: `Add tag successfully!`,
      icon: "success",
    });
  }
  async onUpdateTag(data: { id: string; name: string }): Promise<void> {
    const payload = {
      id: data.id,
      data: {
        name: data.name,
        user_id: this.id,
      },
    };
    await TagService.putTag(payload);
    this.getData();
    this.isVisible = false;
    this.dataUpdate = null;
    swal({
      title: "Success",
      text: `Update tag successfully!`,
      icon: "success",
    });
  }
  setPages(): void {
    var numPages = this.tags.length / this.pagination.limit;
    for (let i = 0; i < numPages; i++) {
      var pageNum = i + 1;
      this.pagination.totalPage.push(pageNum);
    }
  }
  paginate(tags: any): void {
    let page = this.pagination.currentPage;
    let perPage = this.pagination.limit;
    let from = page * perPage - perPage;
    let to = page * perPage;
    return tags.slice(from, to);
  }

  // computed
  get result(): User {
    return this.$store.state.AUTH.user;
  }
  // computed
  get displayedTags(): void {
    return this.paginate(this.tags);
  }

  created(): void {
    this.getData();
  }

  @Watch("tags")
  onChangeTags(): void {
    this.setPages();
  }
}
</script>

<style lang="css" scoped src="../assets/css/global.css"></style>
