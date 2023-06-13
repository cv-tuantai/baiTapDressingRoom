export default class SelectedList {
  constructor() {
    this.arr = [];
  }

  // Thêm item vào mảng arr, dùng toán tử ternary: nếu item đã có thì xóa đi và thêm item, nếu chưa có thì thêm item
  addItem(item) {
    const index = this.arr.findIndex((product) => product.type === item.type);
    index !== -1 ? this.arr.splice(index, 1, item) : this.arr.push(item);
  }

  // Hiển thị trang phục trong mảng arr lên UI
  renderOutfit() {
    this.arr.forEach(
      (item) =>
        (document.querySelector(
          `.${item.type}`,
        ).style.backgroundImage = `url(${item.src})`),
    );
  }
}
