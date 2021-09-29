import { PaginationInterface, ParamsInterface } from "@/utils/interface";
import Model from "./Model";

export class TagModel extends Model {
  private _id: string;
  private _tags: any;

  private _pagination: PaginationInterface;
  private _params: ParamsInterface;

  constructor(
    id: string,
    tags: any,
    isVisible: boolean,
    dataUpdate: any,
    pagination: PaginationInterface,
    params: ParamsInterface
  ) {
    super(dataUpdate, isVisible);
    this._id = id;
    this._tags = tags;
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

  public get id(): string {
    return this._id;
  }

  public set id(v: string) {
    this._id = v;
  }

  public get tags(): any {
    return this._tags;
  }

  public set tags(v: any) {
    this._tags = v;
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
