/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    if (await knex.schema.hasTable("box_tariffes")) {
        return;
    }

    await knex.schema.createTable("box_tariffes", (table) => {
        table.increments("id").primary();

        table.decimal("box_delivery_base", 10, 2);
        table.integer("box_delivery_coef_expr");
        table.decimal("box_delivery_liter", 10, 2);

        table.decimal("box_delivery_marketplace_base", 10, 2);
        table.integer("box_delivery_marketplace_coef_expr");
        table.decimal("box_delivery_marketplace_liter", 10, 2);

        table.decimal("box_storage_base", 10, 2);
        table.integer("box_storage_coef_expr");
        table.decimal("box_storage_liter", 10, 2);

        table.string("geo_name");
        table.string("warehouse_name").notNullable();
        table.date("date").index().notNullable();

        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());

        table.unique(["date", "warehouse_name"]);
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTableIfExists("box_tariffes");
}
