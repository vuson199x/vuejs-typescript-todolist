import { PaginationInterface, ParamsInterface } from "@/utils/interface";
import { Observable } from "rxjs";
import swal from "sweetalert";
import BaseClass from "./BaseClass";
import CategoryService from "@/ApiService/apiCategory";
import { CategoryList } from "@/model/CategoryModel";

export class CategoryClass extends BaseClass {
  private _id: string;
  private _categories: any;
  private _pagination: PaginationInterface;
  private _params: ParamsInterface;

  constructor(
    id: string,
    categories: any,
    isVisible: boolean,
    dataUpdate: any,
    pagination: PaginationInterface,
    params: ParamsInterface
  ) {
    super(dataUpdate, isVisible);
    this._id = id;
    this._categories = categories;
    this._pagination = pagination;
    this._params = params;
  }

  public isVisibleEditModal(data: any): void {
    super.isVisibleEditModal(data);
  }
  public isVisibleAddModal(): void {
    super.isVisibleAddModal();
  }
  public handleCancelEvent(): void {
    super.handleCancelEvent();
  }

  public changeSortName(value: string): void {
    this._params.sortName = value;
    this.getData();
  }

  public changeSortType(value: string): void {
    this._params.sortType = value;
    this.getData();
  }

  public getData(): void {
    const payload = {
      userId: this._id,
      ...this._params,
    };
    const observable = Observable.create((observer: any) => {
      CategoryService.getList(payload)
        .then((response: any) => {
          console.log("response", response);
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
      next: (data: CategoryList) => {
        (this._categories = data), (this._pagination.totalPage = []);
      },
    });
  }

  public get id(): string {
    return this._id;
  }

  public set id(v: string) {
    this._id = v;
  }

  public get categories(): any {
    return this._categories;
  }

  public set categories(v: any) {
    this._categories = v;
  }

  public get pagination(): PaginationInterface {
    return this._pagination;
  }

  public set pagination(v: PaginationInterface) {
    this._pagination = v;
  }

  public get params(): ParamsInterface {
    return this._params;
  }

  public set params(v: ParamsInterface) {
    this._params = v;
  }
}
