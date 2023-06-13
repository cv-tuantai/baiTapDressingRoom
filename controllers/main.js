import SelectedItem from "../models/SelectedItem.js";
import SelectedList from "../models/SelectedList.js";
const selectedList = new SelectedList();

let selELE = document.querySelectorAll(".nav-link");

/* Tạo hàm chuyển đổi giữa các tab */
const switchTab = () => {
  selELE.forEach((selected) => {
    // sử dụng phương thức addEventListener() để thêm hàm xử lý sự kiện click
    selected.addEventListener("click", (e) => {
      // xóa hết class active
      selELE.forEach((item) => item.classList.remove("active"));
      // thêm active vào phần tử được click
      e.target.classList.add("active");
      // sử dụng destructuring assignment để trích xuất các thuộc tính data vào các biến
      const { category, type, length } = e.target.dataset;
      // render list trang phục
      renderListSkin(category, type, Number(length));
    });
  });
};

/* Tạo hàm Render list trang phục */
const renderListSkin = (category, type, length) => {
  let content = "";

  // Duyệt mảng để hiển thị từng món trang phục
  for (let i = 1; i <= length; i++) {
    content += `
        <div class="col-3">
            <div class="card p-2 my-2">
                <img src="../assets/images/${category}/${type}${i}_show.jpg">
                <p class="name-${i}">${type} ${i}</p>
                <button class="btn btn-success" onclick ="changeOutfit(${i},'${category}','${type}')">Thử đồ</button>
            </div>
        </div>
        `;
  }
  document.querySelector(".tab-content").innerHTML = content;
};

/* Khi trang web được tải hoàn tất, sự kiện "DOMContentLoaded" sẽ xảy ra và hàm xử lý sự kiện được thực thi */
window.addEventListener("DOMContentLoaded", function () {
  // hiển thị trang phục phần "Áo"
  renderListSkin("clothes", "topcloth", 6);
  // gọi hàm chuyển tab
  switchTab();
});

/* Tạo hàm thay đồ khi click vào nút "Thử đồ" */
const changeOutfit = (i, category, type) => {
  // lấy nội dung của phần tử HTML có class name-${i}
  const name = document.querySelector(`.name-${i}`).textContent;
  //extension để lưu trữ đuôi mở rộng của hình ảnh dựa trên giá trị của type, type là background sẽ có đuôi jpg, các loại khác là png
  const extension = type === "background" ? ".jpg" : ".png";
  // đường dẫn hình ảnh và loại của mục được chọn
  const src = `../assets/images/${category}/${type}${i}${extension}`;
  // tạo đối tượng selectedItem từ lớp đối tượng SelectedItem chứa các thông tin về tên, đường dẫn hình ảnh, loại trang phục
  const selectedItem = new SelectedItem(name, src, type);
  // thêm đối tượng này vào mảng của đối tượng selectedList
  selectedList.addItem(selectedItem);
  // render trang phục trong mảng lên UI
  selectedList.renderOutfit();
};
window.changeOutfit = changeOutfit;
