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
    const payload = {
      userId: this.id,
      ...this.params,
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
      next: (data: any) => (this.categories = data),
    });
  }
  setPages(): void {
    const numPages = this.categories.length / this.pagination.limit;
    for (let i = 0; i < numPages; i++) {
      const pageNum = i + 1;
      this.pagination.totalPage.push(pageNum);
    }
  }
  paginate(categories: any): void {
    const page = this.pagination.currentPage;
    const perPage = this.pagination.limit;
    const from = page * perPage - perPage;
    const to = page * perPage;
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
