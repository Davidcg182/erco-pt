import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("products", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.integer("price").notNullable();
    table.integer("total_kwh").notNullable();
    table.timestamp("init_offer_date").notNullable();
    table.timestamp("end_offer_date").notNullable();
    table.uuid("created_by").notNullable().references("id").inTable("users");
    table.uuid("buy_by").references("id").inTable("users");
    table.boolean("is_available").defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("products");
} 