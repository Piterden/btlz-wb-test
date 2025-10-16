import { getDate, getTime } from "#utils/helpers.js";

/**
 * Clean to common view as number.
 *
 * @param {string|number} value The value
 * @return {number|null}
 */
const normalizeNum = (value) => {
    if (value === "-") return null;
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
};

/**
 * Clean to common view as string.
 *
 * @param {string|number} value The value
 * @return {string}
 */
const normalizeStr = (value) => String(value).replace("null", "");

/**
 * WB response list to DB mapper.
 *
 * @param {WBWarehouse[]} list - The list of tariffs from WB.
 * @param {Date|string} date - Current date.
 * @return {TariffToDB[]}
 */
export const wb2DbMapper = (list, date) =>
    list.map((entry) => ({
        box_delivery_base: normalizeNum(entry.boxDeliveryBase),
        box_delivery_coef_expr: normalizeNum(entry.boxDeliveryCoefExpr),
        box_delivery_liter: normalizeNum(entry.boxDeliveryLiter),
        box_delivery_marketplace_base: normalizeNum(entry.boxDeliveryMarketplaceBase),
        box_delivery_marketplace_coef_expr: normalizeNum(entry.boxDeliveryMarketplaceCoefExpr),
        box_delivery_marketplace_liter: normalizeNum(entry.boxDeliveryMarketplaceLiter),
        box_storage_base: normalizeNum(entry.boxStorageBase),
        box_storage_coef_expr: normalizeNum(entry.boxStorageCoefExpr),
        box_storage_liter: normalizeNum(entry.boxStorageLiter),
        geo_name: entry.geoName,
        warehouse_name: entry.warehouseName,
        date,
    }));

/**
 * DB select to Google sheets mapper.
 *
 * @param {TariffFromDB[]} rows The rows from DB
 * @return {{ values: Array[] }}
 */
export const db2SheetsMapper = (rows) => ({
    values: [
        [
            "Дата",
            "Страна, для РФ — округ",
            "Название склада",
            "Средний коэффициент",
            "Логистика, первый литр, ₽",
            "Коэффициент Логистика, %",
            "Логистика, дополнительный литр, ₽",
            "Логистика FBS, первый литр, ₽",
            "Коэффициент FBS, %",
            "Логистика FBS, дополнительный литр, ₽",
            "Хранение в день, первый литр, ₽",
            "Коэффициент Хранение, %",
            "Хранение в день, дополнительный литр, ₽",
            "Создано",
            "Обновлено",
        ],
        ...rows.map((r) => [
            getDate(r.date),
            normalizeStr(r.geo_name),
            normalizeStr(r.warehouse_name),
            normalizeStr(r.avg_coof),
            normalizeStr(r.box_delivery_base),
            normalizeStr(r.box_delivery_coef_expr),
            normalizeStr(r.box_delivery_liter),
            normalizeStr(r.box_delivery_marketplace_base),
            normalizeStr(r.box_delivery_marketplace_coef_expr),
            normalizeStr(r.box_delivery_marketplace_liter),
            normalizeStr(r.box_storage_base),
            normalizeStr(r.box_storage_coef_expr),
            normalizeStr(r.box_storage_liter),
            getTime(r.created_at),
            getTime(r.updated_at),
        ]),
    ],
});
