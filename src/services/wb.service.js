import fetch from "node-fetch";

import env from "#config/env/env.js";
import { getDate } from "#utils/helpers.js";
import { WB as log } from "#utils/logger.js";

const { WB_API_URL, WB_API_TOKEN } = env;

/**
 * Gets box tariffs from WB API.
 *
 * @return {Promise<WBWarehouse[]>} The box tariffs.
 */
export const getBoxTariffs = async () => {
    const queryString = new URLSearchParams({ date: getDate() }).toString();
    const url = `${WB_API_URL}?${queryString}`;

    log.info("Starting to fetch box tariffs from WB API.");

    /**
     * @type {WBBoxTariffsResponse}
     */
    const json = await fetch(url, { headers: { "Authorization": WB_API_TOKEN } })
        .then((res) => res.json())
        .catch((error) => {
            log.error("Can't get tariffs from WB API.", eroor);
        });

    if (json) {
        const tariffs = json.response?.data?.warehouseList;
        log.info(`${tariffs.length} box tariffs have been successfully fetched from WB.`);
        return tariffs;
    }
};
