export default class Model {
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

  isVisibleEditModal(data: any): void {
    this._dataUpdate = data;
    this._isVisible = true;
  }
  isVisibleAddModal(): void {
    this._isVisible = true;
  }
  handleCancelEvent(): void {
    this._dataUpdate = null;
    this._isVisible = false;
  }
}
