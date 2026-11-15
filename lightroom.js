// Скрипт полной разблокировки Lightroom Premium и обхода проверки чека
let body = $response.body;

// Генерация фиктивного, но валидного для приложения чека
function generateFakeReceipt() {
  return {
    // Основные статусы
    status: 0,
    code: 0,
    message: "OK",
    restore_success: true,      // Флаг успешного восстановления
    success: true,
    
    // Данные транзакции (Google Play / Apple style)
    orderId: "GPA.3399-1234-5678-90123",
    packageName: "com.adobe.lrmobile",
    productId: "lightroom_premium",
    purchaseToken: "fake_token_lightroom_premium_1tb_0000000001",
    purchaseTime: 1570725130254,
    purchaseState: 0,
    acknowledgementState: 1,
    autoRenewing: true,
    subscription: true,
    subscriptionId: "lightroom_premium",
    expiryTimeMillis: 4102444800000, // ~2100 год (бессрочно)
    startTimeMillis: 1570725130254,
    
    // Чек в стиле Apple (iOS)
    receipt: {
      bundle_id: "com.adobe.lrmobile",
      in_app: [{
        product_id: "lightroom_premium",
        transaction_id: "1000000000000001",
        original_transaction_id: "1000000000000001",
        purchase_date_ms: "1570725130254",
        original_purchase_date_ms: "1570725130254",
        expires_date_ms: "4102444800000",
        quantity: "1",
        is_trial_period: "false"
      }]
    },
    
    // Данные подписки
    entitlement: {
      status: "subscriber",
      name: "Lightroom Premium",
      level: "premium",
      product_id: "lightroom_premium",
      expires_date: "2100-12-31T23:59:59Z",
      is_active: true,
      will_renew: true,
      storage: {
        used: 1,
        limit: 1154487209165,
        display_limit: 1099511627776,
        warn: 992137445376
      }
    },
    
    // Флаги всех функций (Активация 100% инструментов)
    current_subs: {
      product_id: "lightroom_premium",
      store: "adobe",
      purchase_date: "2019-10-10T16:32:10.254954Z",
      subscription_name: "Lightroom Premium",
      plan_type: "premium",
      sao: {
        "inpkg_CCES": "1", "inpkg_CCLE": "1", "inpkg_CCSN": "1",
        "inpkg_CCSV": "1", "inpkg_LCCC": "1", "inpkg_LPES": "1",
        "inpkg_LRBRL": "1", "inpkg_LRMAC": "1", "inpkg_LRMC": "1",
        "inpkg_LRMP": "1", "inpkg_LRTB": "1", "inpkg_PHLT": "1",
        "inpkg_PHLT2": "1", "inpkg_PLES": "1", "inpkg_CCAP": "1",
        "inpkg_CCALL": "1", "inpkg_LRLIGHT": "1", "inpkg_LRCOLOR": "1",
        "inpkg_LREFFECTS": "1", "inpkg_LRDETAIL": "1",
        "inpkg_LRTONECURVE": "1", "inpkg_LRHSL": "1",
        "inpkg_LRCOLORGRADING": "1", "inpkg_LRPROFILES": "1",
        "inpkg_LRMASK": "1", "inpkg_LRSELECTSUBJECT": "1",
        "inpkg_LRSELECTSKY": "1", "inpkg_LRSELECTBG": "1",
        "inpkg_LRSELECTOBJ": "1", "inpkg_LRSELECTPEOPLE": "1",
        "inpkg_LRBRUSH": "1", "inpkg_LRGRADIENT": "1",
        "inpkg_LRCOLORRANGE": "1", "inpkg_LRLUMRANGE": "1",
        "inpkg_LRDEPTHRANGE": "1", "inpkg_LRGENREMOVE": "1",
        "inpkg_LRREMOVE": "1", "inpkg_LRHEAL": "1", "inpkg_LRCLONE": "1",
        "inpkg_LRLENSBLUR": "1", "inpkg_LRAI": "1",
        "inpkg_LRPRESETS": "1", "inpkg_LRPREMIUMPRESETS": "1",
        "inpkg_LRADAPTIVEPRESETS": "1", "inpkg_LRCUSTOMPRESETS": "1",
        "inpkg_LRIMPORTEXPORT": "1", "inpkg_LRUPRIGHT": "1",
        "inpkg_LRGUIDEDUPRIGHT": "1", "inpkg_LRGEOMETRY": "1",
        "inpkg_LRCROP": "1", "inpkg_LRCAMERA": "1", "inpkg_LRRAW": "1",
        "inpkg_LRDNG": "1", "inpkg_LRPROCAMERA": "1",
        "inpkg_LRCLOUD": "1", "inpkg_LRSYNC": "1", "inpkg_LRALBUM": "1",
        "inpkg_LRSEARCH": "1", "inpkg_LRPEOPLEVIEW": "1",
        "inpkg_LRBACKUP": "1", "inpkg_LRSHARE": "1",
        "inpkg_LRBATCH": "1", "inpkg_LRCOPYSETTINGS": "1",
        "inpkg_LRPASTESETTINGS": "1", "inpkg_LRVERSIONS": "1",
        "inpkg_LREXPORT": "1", "inpkg_LREXPORTJPEG": "1",
        "inpkg_LREXPORTDNG": "1", "inpkg_LREXPORTTIFF": "1",
        "inpkg_LRWATERMARK": "1",
        "storage_quota": "100"
      }
    },
    
    // Дополнительные корневые поля
    plan: "premium",
    tier: "lightroom",
    subscription_name: "Lightroom Premium",
    is_pro: true,
    is_premium: true
  };
}

// Основная логика выполнения
if (typeof body === "string" && body.length > 0) {
  // Очистка от возможных управляющих символов
  body = body.replace(/^\s*while[^\n]*\n/gm, "");

  try {
    let obj = JSON.parse(body);
    // Принудительное слияние с фиктивным чеком
    obj = Object.assign({}, obj, generateFakeReceipt());
    $done({ body: JSON.stringify(obj) });
  } catch (e) {
    // Если сервер вернул невалидный JSON или ошибку — полностью заменяем ответ
    $done({ body: JSON.stringify(generateFakeReceipt()) });
  }
} else {
  // Если тело ответа пустое (что часто бывает при ошибке проверки) — отдаем фиктивный чек
  $done({ body: JSON.stringify(generateFakeReceipt()) });
}
