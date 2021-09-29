import { ProductClass } from "@/classes/ProductClass";
import { ProductAction, ProductInterface } from "@/model/ProductModal";
import { User } from "@/model/UserModel";

import { Observable } from "rxjs";
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

  isPagination = {
    totalPage: [],
    currentPage: 1,
    limit: 20,
  };
  isParams = {
    page: 1,
    size: 0,
    sortName: "title",
    sortType: "",
    keyword: "",
  };

  products = new ProductClass(
    this.id,
    [],
    false,
    null,
    this.isPagination,
    this.isParams
  );

  isVisibleEditModal(data: any): void {
    this.products.isVisibleEditModal(data);
  }
  isVisibleAddModal(): void {
    this.products.isVisibleAddModal();
  }
  handleCancelEvent(): void {
    this.products.handleCancelEvent();
  }
  onSeach(): void {
    this.getData();
  }
  changeSortType(value: string): void {
    this.products.changeSortType(value);
  }
  changeSortName(value: string): void {
    this.products.changeSortName(value);
  }
  getData(): void {
    this.products.getData();
  }
  onDelete(product: ProductInterface): void {
    console.log("product 62", product);
    if (window.confirm(`Are you want to delete this product?`)) {
      const observable = Observable.create((observer: any) => {
        ProductService.deleteProduct(product.id)
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
        next: () => {
          this.getData();
          swal({
            title: "Success",
            text: `Delete product successfully!`,
            icon: "success",
          });
        },
      });
    }
  }
  onCreateProduct(data: ProductAction): void {
    console.log("data 90", data);
    const payload = {
      ...data,
      user_id: this.id,
    };
    const observable = Observable.create((observer: any) => {
      ProductService.postProduct(payload)
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
      next: () => {
        this.getData();
        this.products.isVisible = false;
        swal({
          title: "Success",
          text: `Add product successfully!`,
          icon: "success",
        });
      },
    });
  }
  onUpdateProduct(data: ProductAction): void {
    console.log("data 122", data);
    const payload = {
      id: data.id,
      data: {
        ...data,
        user_id: this.id,
      },
    };
    const observable = Observable.create((observer: any) => {
      ProductService.putProduct(payload)
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
      next: () => {
        this.getData();
        this.products.isVisible = false;
        this.products.dataUpdate = null;
        swal({
          title: "Success",
          text: `Update product successfully!`,
          icon: "success",
        });
      },
    });
  }

  setPages(): void {
    const numPages =
      this.products.products.length / this.products.pagination.limit;
    for (let i = 0; i < numPages; i++) {
      const pageNum = i + 1;
      this.products.pagination.totalPage.push(pageNum);
    }
  }
  paginate(products: any): void {
    const page = this.products.pagination.currentPage;
    const perPage = this.products.pagination.limit;
    const from = page * perPage - perPage;
    const to = page * perPage;
    return products.slice(from, to);
  }
  //computed
  get result(): User {
    return this.$store.state.AUTH.user;
  }
  //computed
  get displayedProducts(): any {
    return this.paginate(this.products.products);
  }

  created(): void {
    this.getData();
  }

  @Watch("products.products")
  onChangeProduct(): void {
    this.setPages();
  }
}
