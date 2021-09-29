import swal from "sweetalert";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CategoryService from "../ApiService/apiCategory";
import AddEditCategory from "@/components/AddEditCategory.vue";
import { Observable } from "rxjs";
import { CategoryClass } from "@/classes/CategoryClass";
import { ParamsInterface } from "@/utils/interface";
import { CategoryInterface } from "@/model/CategoryModel";
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

  categories = new CategoryClass(
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
    this.categories.changeSortName(value);
  }
  changeSortType(value: string): void {
    this.categories.changeSortType(value);
  }

  getData(): void {
    this.categories.getData();
  }

  isVisibleEditModal(data: any): void {
    this.categories.isVisibleEditModal(data);
  }
  isVisibleAddModal(): void {
    this.categories.isVisibleAddModal();
  }
  handleCancelEvent(): void {
    this.categories.handleCancelEvent();
  }
  onUpdateCategory(data: CategoryInterface): void {
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
      next: () => {
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
  onDelete(category: CategoryInterface): void {
    console.log(category, "category");
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
        next: () => {
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
