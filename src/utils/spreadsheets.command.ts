import { Command } from "commander";
import { CLI as log } from "#utils/logger.js";
import {
    addSpreadsheet,
    getAllSpreadsheets,
    removeSpreadsheet,
} from "#services/db.service.js";

const program = new Command();

program
    .name("spreadsheets")
    .description("CLI spreadsheets manager.")

program
    .command("list")
    .summary("get all spreadsheets")
    .alias('ls')
    .action(async () => {
        const list = await getAllSpreadsheets();
        if (list.length === 0) {
            console.log("Empty list. Use 'add <id> [name]' to add new one.");
        } else {
            console.log("Spreadsheets list:");
            list.forEach((item, index) => {
                console.log(`(${index + 1}) ${item.name}
    spreadsheet_id: ${item.spreadsheet_id}
    created_at: ${new Date(item.created_at).toISOString()}\n`);
            });
        }
        process.exit(0);
    });

program
    .command("add <id> [name]")
    .summary("add spreadsheet to DB")
    .alias('new')
    .action(async (id, name) => {
        await addSpreadsheet(id, name);
    });

program
    .command("remove <id>")
    .summary("remove spreadsheet from DB")
    .alias('rm')
    .action(async (id) => {
        await removeSpreadsheet(id);
    });

program.parse();
