import knex from "#postgres/knex.js";
import { DB as log } from "#utils/logger.js";

/**
 * Saves a box tariffs to database.
 *
 * @param {TariffToDB[]} rows The rows
 * @return {Promise<void>}
 */
export const saveBoxTariffsToDb = async (rows) => {
    if (rows.length === 0) {
        log.warn("There is nothing to save to DB.");
        return;
    }

    log.info("Starting to insert/update box tariffs in DB.");

    /**
     * @type {number[]}
     */
    const ids = await knex("box_tariffes")
        .insert(rows, ["id"])
        .onConflict(["date", "warehouse_name"])
        .merge([
            "box_delivery_base",
            "box_delivery_coef_expr",
            "box_delivery_liter",
            "box_delivery_marketplace_base",
            "box_delivery_marketplace_coef_expr",
            "box_delivery_marketplace_liter",
            "box_storage_base",
            "box_storage_coef_expr",
            "box_storage_liter",
            "geo_name",
            "updated_at",
        ])
        .catch((error) => {
            log.error("Can't insert/update tariffs to DB.", error);
        });

    if (ids) {
        log.info(`${ids.length} box tariffs have been successfully inserted/updated in DB.`);
    }
};

/**
 * Gets the sorted tariffs.
 *
 * @return {Promise<TariffFromDB[]>} The sorted tariffs.
 */
export const getSortedTariffs = async () => {
    log.info("Starting to load sorted box tariffs list from DB.");

    const result = await knex
        .raw(`
SELECT
    "date",
    "geo_name",
    "warehouse_name",
    ((
        coalesce(box_delivery_coef_expr, 0) +
        coalesce(box_delivery_marketplace_coef_expr, 0) +
        coalesce(box_storage_coef_expr, 0)
    ) / (
        (CASE WHEN "box_delivery_coef_expr" IS NULL THEN 0 ELSE 1 END) +
        (CASE WHEN "box_delivery_marketplace_coef_expr" IS NULL THEN 0 ELSE 1 END) +
        (CASE WHEN "box_storage_coef_expr" IS NULL THEN 0 ELSE 1 END)
    )) AS "avg_coof",
    "box_delivery_base",
    "box_delivery_coef_expr",
    "box_delivery_liter",
    "box_delivery_marketplace_base",
    "box_delivery_marketplace_coef_expr",
    "box_delivery_marketplace_liter",
    "box_storage_base",
    "box_storage_coef_expr",
    "box_storage_liter",
    "created_at",
    "updated_at"
FROM "box_tariffes"
ORDER BY "avg_coof" ASC, "date" DESC`,
        )
        .catch((error) => {
            log.error("Can't load sorted tariffs from DB.", error);
        });

    if (result) {
        log.info(`${result.rows.length} sorted tariffs have been successfully loaded from DB.`);
        return result.rows;
    }
};

/**
 * Gets all spreadsheets from DB.
 *
 * @return {Promise<SpreadsheetFromDB[]>} All spreadsheets.
 */
export const getAllSpreadsheets = async () => {
    const list = await knex("spreadsheets")
        .select("*")
        .orderBy("created_at", "desc")
        .catch((error) => {
            log.error("Can't load all spreadsheets from DB.", error);
        });
    return list;
};

/**
 * Adds a spreadsheet to DB.
 *
 * @param {string} spreadsheet_id The spreadsheet identifier
 * @param {string|null} name The name
 * @return {Promise<void>}
 */
export const addSpreadsheet = async (spreadsheet_id, name) => {
    await knex("spreadsheets")
        .insert({ spreadsheet_id, name })
        .onConflict("spreadsheet_id")
        .ignore()
        .catch((error) => {
            log.error(`Can't add new spreadsheet ${spreadsheet_id} to DB.`, error);
        });
};

/**
 * Removes a spreadsheet from DB.
 *
 * @param {string} spreadsheet_id The spreadsheet identifier
 * @return {Promise<void>}
 */
export const removeSpreadsheet = async (spreadsheet_id) => {
    await knex("spreadsheets")
        .where({ spreadsheet_id })
        .del()
        .catch((error) => {
            log.error(`Can't remove spreadsheet ${spreadsheet_id} from DB.`, error);
        });
};
