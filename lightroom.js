let body = $response.body;
// Xóa dòng while (nếu có)
body = body.replace(/while.{7}\n/, "");
let obj = JSON.parse(body);

// --- Chuyển thành gói Premium ---
obj.entitlement = obj.entitlement || {};
obj.entitlement.status = "subscriber";
obj.entitlement.name = "Lightroom Premium";          // Tên hiển thị
obj.entitlement.level = "premium";                   // Cấp độ

// Đổi product_id
obj.current_subs = obj.current_subs || {};
obj.current_subs.product_id = "lightroom_premium";   // Hoặc "lightroom_1tb"
obj.current_subs.store = "adobe";
obj.current_subs.purchase_date = "2019-10-10T16:32:10.254954Z";

// Bật tất cả tính năng Lightroom
obj.current_subs.sao = {
    "inpkg_CCES": "1",    // không cần
    "inpkg_CCLE": "1",    // Cloud Libraries
    "inpkg_CCSN": "1",
    "inpkg_CCSV": "1",
    "inpkg_LCCC": "1",    // Lightroom CC (cốt lõi)
    "inpkg_LPES": "1",
    "inpkg_LRBRL": "1",   // Bộ lọc
    "inpkg_LRMAC": "1",   // Lightroom trên Mac
    "inpkg_LRMC": "1",    // Lightroom Mobile
    "inpkg_LRMP": "1",    // Lightroom Premium (quan trọng)
    "inpkg_LRTB": "1",    // Lightroom trên web?
    "inpkg_PHLT": "1",
    "inpkg_PHLT2": "1",
    "inpkg_PLES": "1",
    "storage_quota": "100"
};

// Đặt dung lượng 1TB
obj.entitlement.storage = {
    "used": 1,
    "limit": 1154487209165,   // ~1.07TB
    "display_limit": 1099511627776,
    "warn": 992137445376
};

// Ẩn avatar
obj.avatar = obj.avatar || {};
obj.avatar.placeholder = true;

// Nếu có trường "tier" hay "plan" – thêm vào
obj.plan = "premium";
obj.tier = "lightroom";

// Xuất kết quả
body = JSON.stringify(obj);
$done({body});
