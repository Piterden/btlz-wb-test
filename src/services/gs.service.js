import { google } from "googleapis";
import env from "#config/env/env.js";
import { GOOGLE as log } from "#utils/logger.js";
import { getAllSpreadsheets } from "#services/db.service.js";

const { GOOGLE_CREDENTIALS_PATH, GOOGLE_SHEET_NAME } = env;

export const uploadTariffsToSheets = async (data) => {
    const auth = new google.auth.GoogleAuth({
        keyFilename: GOOGLE_CREDENTIALS_PATH,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheetsClient = google.sheets({ version: "v4", auth });
    const spreadsheets = await getAllSpreadsheets();

    log.info(`Starting to update ${spreadsheets.length} spreadsheets.`);

    for (const sheet of spreadsheets) {
        log.info(`Updating spreadsheet ${sheet.name} - ${sheet.spreadsheet_id}`);

        const sheetsResponse = await sheetsClient.spreadsheets.get({
            spreadsheetId: sheet.spreadsheet_id,
        });
        const sheetsList = sheetsResponse.data.sheets?.map((s) => s.properties?.title);
        if (!sheetsList?.includes(GOOGLE_SHEET_NAME)) {
            await sheetsClient.spreadsheets.batchUpdate({
                spreadsheetId: sheet.spreadsheet_id,
                requestBody: {
                    requests: [
                        { addSheet: { properties: { title: GOOGLE_SHEET_NAME }}},
                    ],
                },
            });
            log.info(`Sheet "${GOOGLE_SHEET_NAME}" added to ${sheet.name} spreadsheet.`);
        }

        await sheetsClient.spreadsheets.values.clear({
            spreadsheetId: sheet.spreadsheet_id,
            range: `${GOOGLE_SHEET_NAME}!A:Z`,
        });

        await sheetsClient.spreadsheets.values.append({
            spreadsheetId: sheet.spreadsheet_id,
            range: `${GOOGLE_SHEET_NAME}!A1`,
            valueInputOption: "RAW",
            resource: data,
        });

        log.info(`Spreadsheet ${sheet.spreadsheet_id} updated.`);
    }
};
