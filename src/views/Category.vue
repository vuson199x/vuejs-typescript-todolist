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
          v-model="categories.params.keyword"
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
                  categories.params.sortType === 'asc' ||
                  categories.params.sortType === '',
              }"
              >Asc</span
            >
            <span
              v-on:click="changeSortType('desc')"
              v-bind:class="{
                sortSelected: categories.params.sortType === 'desc',
              }"
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
          v-if="categories.pagination.currentPage != 1"
          v-on:click="categories.pagination.currentPage--"
          >&laquo;</a
        >
        <a
          v-for="(pag, index) in categories.pagination.totalPage"
          v-bind:key="index"
          @click="categories.pagination.currentPage = pag"
          >{{ pag }}</a
        >
        <a
          v-if="
            categories.pagination.currentPage <
              categories.pagination.totalPage.length
          "
          v-on:click="categories.pagination.currentPage++"
          >&raquo;</a
        >
      </div>
    </div>

    <AddEditCategory
      v-if="categories.isVisible"
      v-bind:isVisible="categories.isVisible"
      v-bind:dataUpdate="categories.dataUpdate"
      v-on:handleCancelEvent="handleCancelEvent"
      v-on:onCreateCategory="onCreateCategory"
      v-on:onUpdateCategory="onUpdateCategory"
    />
  </div>
</template>

<script lang="ts" src="@/actions/category.ts"></script>
<style lang="css" scoped src="../assets/css/global.css"></style>
