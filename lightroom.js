let body = $response.body;

if (typeof body === "string" && body.length > 0) {
  // Xóa các dòng điều khiển while nếu có trong phản hồi
  body = body.replace(/^\s*while[^\n]*\n/gm, "");

  try {
    let obj = JSON.parse(body);

    // Buộc trạng thái gói thành Premium
    obj.entitlement = obj.entitlement || {};
    obj.entitlement.status = "subscriber";
    obj.entitlement.name = "Lightroom Premium";
    obj.entitlement.level = "premium";

    // Thay dữ liệu gói đăng ký hiện tại
    obj.current_subs = obj.current_subs || {};
    obj.current_subs.product_id = "lightroom_premium";
    obj.current_subs.store = "adobe";
    obj.current_subs.purchase_date = "2019-10-10T16:32:10.254954Z";
    obj.current_subs.subscription_name = "Lightroom Premium";
    obj.current_subs.plan_type = "premium";

    // Bật TOÀN BỘ cờ tính năng: ánh sáng, màu, hiệu ứng, mặt nạ, AI, preset, phối cảnh, camera, cloud, xuất
    obj.current_subs.sao = {
      // Gói Creative Cloud / Lightroom cơ bản
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

      // Gói Creative Cloud đầy đủ
      "inpkg_CCAP": "1",
      "inpkg_CCALL": "1",

      // Ánh sáng / màu / hiệu ứng / chi tiết
      "inpkg_LRLIGHT": "1",
      "inpkg_LRCOLOR": "1",
      "inpkg_LREFFECTS": "1",
      "inpkg_LRDETAIL": "1",
      "inpkg_LRTONECURVE": "1",
      "inpkg_LRHSL": "1",
      "inpkg_LRCOLORGRADING": "1",
      "inpkg_LRPROFILES": "1",

      // Mặt nạ và chọn vùng
      "inpkg_LRMASK": "1",
      "inpkg_LRSELECTSUBJECT": "1",
      "inpkg_LRSELECTSKY": "1",
      "inpkg_LRSELECTBG": "1",
      "inpkg_LRSELECTOBJ": "1",
      "inpkg_LRSELECTPEOPLE": "1",
      "inpkg_LRBRUSH": "1",
      "inpkg_LRGRADIENT": "1",
      "inpkg_LRCOLORRANGE": "1",
      "inpkg_LRLUMRANGE": "1",
      "inpkg_LRDEPTHRANGE": "1",

      // AI và xóa đối tượng
      "inpkg_LRGENREMOVE": "1",
      "inpkg_LRREMOVE": "1",
      "inpkg_LRHEAL": "1",
      "inpkg_LRCLONE": "1",
      "inpkg_LRLENSBLUR": "1",
      "inpkg_LRAI": "1",

      // Preset và profile
      "inpkg_LRPRESETS": "1",
      "inpkg_LRPREMIUMPRESETS": "1",
      "inpkg_LRADAPTIVEPRESETS": "1",
      "inpkg_LRCUSTOMPRESETS": "1",
      "inpkg_LRIMPORTEXPORT": "1",

      // Phối cảnh và cắt ảnh
      "inpkg_LRUPRIGHT": "1",
      "inpkg_LRGUIDEDUPRIGHT": "1",
      "inpkg_LRGEOMETRY": "1",
      "inpkg_LRCROP": "1",

      // Camera và chụp ảnh
      "inpkg_LRCAMERA": "1",
      "inpkg_LRRAW": "1",
      "inpkg_LRDNG": "1",
      "inpkg_LRPROCAMERA": "1",

      // Cloud và quản lý thư viện
      "inpkg_LRCLOUD": "1",
      "inpkg_LRSYNC": "1",
      "inpkg_LRALBUM": "1",
      "inpkg_LRSEARCH": "1",
      "inpkg_LRPEOPLEVIEW": "1",
      "inpkg_LRBACKUP": "1",
      "inpkg_LRSHARE": "1",

      // Chỉnh sửa hàng loạt
      "inpkg_LRBATCH": "1",
      "inpkg_LRCOPYSETTINGS": "1",
      "inpkg_LRPASTESETTINGS": "1",
      "inpkg_LRVERSIONS": "1",

      // Xuất ảnh
      "inpkg_LREXPORT": "1",
      "inpkg_LREXPORTJPEG": "1",
      "inpkg_LREXPORTDNG": "1",
      "inpkg_LREXPORTTIFF": "1",
      "inpkg_LRWATERMARK": "1",

      // Hạn mức lưu trữ (đơn vị quy ước)
      "storage_quota": "100"
    };

    // Đặt giới hạn lưu trữ ~1 TB
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
    obj.tier = "lightroom";
    obj.subscription = "Lightroom Premium";

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
