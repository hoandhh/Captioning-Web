const themeConfig = {
  token: {
    colorPrimary: "#7b3f00", // Nâu gỗ (nút chính, điểm nhấn)
    colorLink: "#d4a373", // Vàng nhạt đất nung (link)
    colorText: "#3e3e3e", // Màu chữ chính xám nâu
    colorBgBase: "#f4efe9", // Nền tổng thể: trắng ngà
    colorBgLayout: "#eaddcf", // Nền layout: vàng nâu nhạt
    colorBorder: "#b08968", // Viền nâu đất
    colorTextHeading: "#5a3e36", // Màu tiêu đề: nâu sẫm
    colorWarning: "#e6b800", // Cảnh báo: vàng đồng
    colorError: "#b22222", // Lỗi: đỏ gạch
  },
  components: {
    Layout: {
      headerBg: "#5a3e36", // Header: nâu sẫm
      headerColor: "#ffffff", // Chữ trắng
      footerBg: "#7b3f00", // Footer: nâu gỗ
      footerColor: "#ffffff",
    },
    Button: {
      colorPrimary: "#7b3f00",
      colorPrimaryHover: "#d4a373",
    },
    Menu: {
      itemColor: "#ffffff",
      itemSelectedColor: "#ffd700",
      itemSelectedBg: "#5a3e36",
    },
  },
};

export default themeConfig;
