import { PaginationInterface, ParamsInterface } from "@/utils/interface";

export class ProductModel {
  private _id: string;
  private _products: any;
  private _isVisible: boolean;
  private _dataUpdate: any;
  private _pagination: PaginationInterface;
  private _params: ParamsInterface;

  constructor(
    id: string,
    products: any,
    isVisible: boolean,
    dataUpdate: any,
    pagination: PaginationInterface,
    params: ParamsInterface
  ) {
    this._id = id;
    this._products = products;
    this._isVisible = isVisible;
    this._dataUpdate = dataUpdate;
    this._pagination = pagination;
    this._params = params;
  }

  public get id(): string {
    return this._id;
  }

  public set id(v: string) {
    this._id = v;
  }

  public get products(): any {
    return this._products;
  }

  public set products(v: any) {
    this._products = v;
  }

  public get isVisible(): boolean {
    return this._isVisible;
  }

  public set isVisible(v: boolean) {
    this._isVisible = v;
  }

  public get dataUpdate(): any {
    return this._dataUpdate;
  }

  public set dataUpdate(v: any) {
    this._dataUpdate = v;
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
