import swal from "sweetalert";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ParamsInterface, TagInterface, User } from "../utils/interface";
import TagService from "../ApiService/apiTag";
import AddEditTag from "../components/AddEditTag.vue";
import { Observable } from "rxjs";
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

  onDelete(tag: TagInterface): void {
    if (window.confirm(`Are you want to delete this tag?`)) {
      const observable = Observable.create((observer: any) => {
        TagService.deleteTag(tag.id)
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
            text: `Delete tag successfully!`,
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
      TagService.getList(payload)
        .then((response: any) => {
          observer.next(response.tags);
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
      next: (data: any) => (this.tags = data),
    });
  }
  onCreateTag(name: string): void {
    const payload = {
      name: name,
      user_id: this.id,
    };
    const observable = Observable.create((observer: any) => {
      TagService.postTag(payload)
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
          text: `Add tag successfully!`,
          icon: "success",
        });
      },
    });
  }
  onUpdateTag(data: { id: string; name: string }): void {
    const payload = {
      id: data.id,
      data: {
        name: data.name,
        user_id: this.id,
      },
    };
    const observable = Observable.create((observer: any) => {
      TagService.putTag(payload)
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
          text: `Update tag successfully!`,
          icon: "success",
        });
      },
    });
  }
  setPages(): void {
    const numPages = this.tags.length / this.pagination.limit;
    for (let i = 0; i < numPages; i++) {
      const pageNum = i + 1;
      this.pagination.totalPage.push(pageNum);
    }
  }
  paginate(tags: any): void {
    const page = this.pagination.currentPage;
    const perPage = this.pagination.limit;
    const from = page * perPage - perPage;
    const to = page * perPage;
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
