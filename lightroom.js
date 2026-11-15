let body = $response.body;

if (typeof body === "string" && body.length > 0) {
  // Xóa các dòng điều khiển while nếu có trong phản hồi
  body = body.replace(/^\s*while[^\n]*\n/gm, "");

  try {
    let obj = JSON.parse(body);

    // Buộc trạng thái gói thành Premium
    obj.entitlement = obj.entitlement || {};
    obj.entitlement.status = "subscriber";
    obj.entitlement.name = "Creative Cloud Premium";
    obj.entitlement.level = "premium";

    // Thay gói Creative Cloud Standard bằng Creative Cloud Premium
    obj.current_subs = obj.current_subs || {};
    obj.current_subs.product_id = "creative_cloud_premium";
    obj.current_subs.store = "adobe";
    obj.current_subs.purchase_date = "2019-10-10T16:32:10.254954Z";
    obj.current_subs.subscription_name = "Creative Cloud Premium";
    obj.current_subs.plan_type = "premium";

    // Bật toàn bộ cờ tính năng Creative Cloud Premium
    obj.current_subs.sao = {
      "inpkg_CCES": "1",
      "inpkg_CCLE": "1",
      "inpkg_CCSN": "1",
      "inpkg_CCSV": "1",
      "inpkg_LCCC": "1",
      "inpkg_LPES": "1",
      "inpkg_LRBRL": "1",
      "inpkg_LRMAC": "1",
      "inpkg_LRMC": "1",
      "inpkg_LRMP": "1",
      "inpkg_LRTB": "1",
      "inpkg_PHLT": "1",
      "inpkg_PHLT2": "1",
      "inpkg_PLES": "1",
      "inpkg_CCAP": "1",
      "inpkg_CCALL": "1",
      "storage_quota": "100"
    };

    // Đặt giới hạn dung lượng lưu trữ 1 TB
    obj.entitlement.storage = {
      "used": 1,
      "limit": 1154487209165,
      "display_limit": 1099511627776,
      "warn": 992137445376
    };

    // Ẩn avatar
    obj.avatar = obj.avatar || {};
    obj.avatar.placeholder = true;

    // Bổ sung trường gói và cấp
    obj.plan = "premium";
    obj.tier = "creative_cloud";
    obj.subscription = "Creative Cloud Premium";

    // Trả về JSON đã chỉnh sửa
    $done({ body: JSON.stringify(obj) });
  } catch (e) {
    // Trả về body gốc nếu lỗi phân tích JSON
    $done({ body });
  }
} else {
  // Phản hồi rỗng
  $done({});
}
