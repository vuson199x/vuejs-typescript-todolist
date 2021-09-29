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
          v-model="tags.params.keyword"
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
                  tags.params.sortType === 'asc' || tags.params.sortType === '',
              }"
              >Asc</span
            >
            <span
              v-on:click="changeSortType('desc')"
              v-bind:class="{
                sortSelected: tags.params.sortType === 'desc',
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
          v-if="tags.pagination.currentPage != 1"
          v-on:click="tags.pagination.currentPage--"
          >&laquo;</a
        >
        <a
          v-for="(pag, index) in tags.pagination.totalPage"
          v-bind:key="index"
          @click="tags.pagination.currentPage = pag"
          >{{ pag }}</a
        >
        <a
          v-if="tags.pagination.currentPage < tags.pagination.totalPage.length"
          v-on:click="tags.pagination.currentPage++"
          >&raquo;</a
        >
      </div>
    </div>
    <AddEditTag
      v-if="tags.isVisible"
      v-bind:isVisible="tags.isVisible"
      v-bind:dataUpdate="tags.dataUpdate"
      v-on:handleCancelEvent="handleCancelEvent"
      v-on:onCreateTag="onCreateTag"
      v-on:onUpdateTag="onUpdateTag"
    />
  </div>
</template>

<script lang="ts" src="@/classes/tag.ts"></script>

<style lang="css" scoped src="../assets/css/global.css"></style>
