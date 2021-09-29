import swal from "sweetalert";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CategoryService from "../ApiService/apiCategory";
import AddEditCategory from "@/components/AddEditCategory.vue";
import { Observable } from "rxjs";
import { CategoryModel } from "@/model/CategoryModel";
import { ParamsInterface } from "@/utils/interface";
@Component({
  components: {
    AddEditCategory,
  },
})
export default class Category extends Vue {
  isPagination = {
    totalPage: [],
    currentPage: 1,
    limit: 20,
  };

  isParams = {
    page: 1,
    size: 0,
    sortName: "name",
    sortType: "",
    keyword: "",
  };
  id = this.$route.params.id;

  categories = new CategoryModel(
    this.id,
    [],
    false,
    null,
    this.isPagination,
    this.isParams
  );

  onSeach(): void {
    this.getData();
  }
  changeSortName(value: string): void {
    this.categories.params.sortName = value;
    this.getData();
  }
  changeSortType(value: string): void {
    console.log(value, "value");
    this.categories.params.sortType = value;
    this.getData();
  }
  isVisibleEditModal(data: any): void {
    this.categories.dataUpdate = data;
    this.categories.isVisible = true;
  }
  isVisibleAddModal(): void {
    this.categories.isVisible = true;
  }
  handleCancelEvent(): void {
    this.categories.dataUpdate = null;
    this.categories.isVisible = false;
  }
  onUpdateCategory(data: { id: string; name: string }): void {
    const payload: any = {
      id: data.id,
      data: {
        name: data.name,
        user_id: this.id,
      },
    };
    const observable = Observable.create((observer: any) => {
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
        this.categories.isVisible = false;
        this.categories.dataUpdate = null;
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
    const observable = Observable.create((observer: any) => {
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
        this.categories.isVisible = false;
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
      const observable = Observable.create((observer: any) => {
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
    console.log(this.categories.id, "this.categories.id");
    const payload = {
      userId: this.id,
      ...this.categories.params,
    };
    const observable = Observable.create((observer: any) => {
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
      next: (data: any) => {
        (this.categories.categories = data),
          (this.categories.pagination.totalPage = []);
      },
    });
  }
  setPages(): void {
    const numPages =
      this.categories.categories.length / this.categories.pagination.limit;
    console.log("numPages", numPages);
    for (let i = 0; i < numPages; i++) {
      const pageNum = i + 1;
      this.categories.pagination.totalPage.push(pageNum);
    }
  }
  paginate(categories: any): void {
    const page = this.categories.pagination.currentPage;
    const perPage = this.categories.pagination.limit;
    const from = page * perPage - perPage;
    const to = page * perPage;
    return categories.slice(from, to);
  }

  get result(): void {
    return this.$store.state.AUTH.user;
  }
  get displayedCategories(): void {
    return this.paginate(this.categories.categories);
  }
  created(): void {
    this.getData();
  }

  @Watch("categories.categories")
  onChangeCategory(): void {
    this.setPages();
  }
}
