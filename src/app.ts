import { CronJob } from 'cron';
import { getDate } from "#utils/helpers.js";
import { APP as log } from "#utils/logger.js";
import { migrate, seed } from "#postgres/knex.js";
import { getBoxTariffs } from "#services/wb.service.js";
import { uploadTariffsToSheets } from "#services/gs.service.js";
import { wb2DbMapper, db2SheetsMapper } from "#utils/mappers.js";
import { saveBoxTariffsToDb, getSortedTariffs } from "#services/db.service.js";

await migrate.latest();
// await seed.run();
log.info("All migrations have been run.");

const worker = async () => {
    log.info("Worker started.");
    const wbResponse = await getBoxTariffs();
    const dbMappedRows = wb2DbMapper(wbResponse, getDate());
    await saveBoxTariffsToDb(dbMappedRows);
    const sortedRows = await getSortedTariffs();
    await uploadTariffsToSheets(db2SheetsMapper(sortedRows));
};

const job = CronJob.from({
    cronTime: '*/10 * * * *',
    onTick: worker,
    start: true,
    waitForCompletion: true,
    runOnInit: true,
    timeZone: "UTC+3",
});

