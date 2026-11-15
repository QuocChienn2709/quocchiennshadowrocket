let body = $response.body;

if (typeof body === "string" && body.length > 0) {
  // Удаление строки while из ответа
  body = body.replace(/^\s*while[^\n]*\n/gm, "");

  try {
    let obj = JSON.parse(body);

    // Принудительная установка статуса подписки Premium
    obj.entitlement = obj.entitlement || {};
    obj.entitlement.status = "subscriber";
    obj.entitlement.name = "Lightroom Premium";
    obj.entitlement.level = "premium";

    // Подмена данных текущей подписки
    obj.current_subs = obj.current_subs || {};
    obj.current_subs.product_id = "lightroom_premium";
    obj.current_subs.store = "adobe";
    obj.current_subs.purchase_date = "2019-10-10T16:32:10.254954Z";

    // Включение всех флагов функций Lightroom
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
      "storage_quota": "100"
    };

    // Установка лимита хранилища 1 ТБ
    obj.entitlement.storage = {
      "used": 1,
      "limit": 1154487209165,
      "display_limit": 1099511627776,
      "warn": 992137445376
    };

    // Скрытие аватара
    obj.avatar = obj.avatar || {};
    obj.avatar.placeholder = true;

    // Дополнительные поля плана
    obj.plan = "premium";
    obj.tier = "lightroom";

    // Возврат изменённого JSON
    $done({ body: JSON.stringify(obj) });
  } catch (e) {
    // Возврат исходного тела при ошибке разбора JSON
    $done({ body });
  }
} else {
  // Пустой ответ
  $done({});
}
