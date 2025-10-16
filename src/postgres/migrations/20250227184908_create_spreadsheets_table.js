/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    if (await knex.schema.hasTable("spreadsheets")) {
        return;
    }

    return knex.schema.createTable("spreadsheets", (table) => {
        table.string("spreadsheet_id").primary();
        table.string("name");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTableIfExists("spreadsheets");
}
