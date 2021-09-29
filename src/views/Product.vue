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
          v-model="products.params.keyword"
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
                  products.params.sortType === 'asc' ||
                  products.params.sortType === '',
              }"
              >Asc</span
            >
            <span
              v-on:click="changeSortType('desc')"
              v-bind:class="{
                sortSelected: products.params.sortType === 'desc',
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
          v-if="products.pagination.currentPage != 1"
          v-on:click="products.pagination.currentPage--"
          >&laquo;</a
        >
        <a
          v-for="(pag, index) in products.pagination.totalPage"
          v-bind:key="index"
          @click="products.pagination.currentPage = pag"
          >{{ pag }}</a
        >
        <a
          v-if="
            products.pagination.currentPage <
              products.pagination.totalPage.length
          "
          v-on:click="products.pagination.currentPage++"
          >&raquo;</a
        >
      </div>
    </div>

    <AddEditProduct
      v-if="products.isVisible"
      v-bind:isVisible="products.isVisible"
      v-bind:dataUpdate="products.dataUpdate"
      v-on:handleCancelEvent="handleCancelEvent"
      v-on:onCreateProduct="onCreateProduct"
      v-on:onUpdateProduct="onUpdateProduct"
    />
  </div>
</template>

<script lang="ts" src="@/actions/product.ts"></script>

<style lang="css" scoped src="@/assets/css/global.css"></style>
