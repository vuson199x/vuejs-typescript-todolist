export default abstract class BaseClass {
  private _dataUpdate: any;
  private _isVisible: boolean;

  constructor(dataUpdate: any, isVisible: boolean) {
    this._dataUpdate = dataUpdate;
    this._isVisible = isVisible;
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

  public isVisibleEditModal(data: any): void {
    this._dataUpdate = data;
    this._isVisible = true;
  }
  public isVisibleAddModal(): void {
    this._isVisible = true;
  }
  public handleCancelEvent(): void {
    this._dataUpdate = null;
    this._isVisible = false;
  }

  abstract changeSortName(value: string): void;
  abstract changeSortType(value: string): void;
  abstract getData(): void;
}
