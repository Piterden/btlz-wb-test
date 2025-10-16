export interface WBBoxTariffsResponse {
    response: {
        data: {
            dtNextBox: string;
            dtTillMax: string;
            warehouseList: WBWarehouse[];
        };
    };
}

export interface WBWarehouse {
    boxDeliveryBase: string;
    boxDeliveryCoefExpr: string;
    boxDeliveryLiter: string;
    boxDeliveryMarketplaceBase: string;
    boxDeliveryMarketplaceCoefExpr: string;
    boxDeliveryMarketplaceLiter: string;
    boxStorageBase: string;
    boxStorageCoefExpr: string;
    boxStorageLiter: string;
    geoName: string;
    warehouseName: string;
}

export interface TariffToDB {
    box_delivery_base: number | null;
    box_delivery_coef_expr: string | null;
    box_delivery_liter: number | null;
    box_delivery_marketplace_base: number | null;
    box_delivery_marketplace_coef_expr: string | null;
    box_delivery_marketplace_liter: number | null;
    box_storage_base: number | null;
    box_storage_coef_expr: string | null;
    box_storage_liter: number | null;
    geo_name: string;
    warehouse_name: string;
    date: Date;
}

export interface TariffFromDB {
    date: Date;
    geo_name: string;
    warehouse_name: string;
    avg_coof: number;
    box_delivery_base: string;
    box_delivery_coef_expr: number;
    box_delivery_liter: string;
    box_delivery_marketplace_base: string;
    box_delivery_marketplace_coef_expr: number;
    box_delivery_marketplace_liter: string;
    box_storage_base: string;
    box_storage_coef_expr: number;
    box_storage_liter: string;
    created_at: Date;
    updated_at: Date;
}

export interface TariffToGoogle {
    date: string;
    geo_name: string;
    warehouse_name: string;
    avg_coof: string;
    box_delivery_base: string;
    box_delivery_coef_expr: string;
    box_delivery_liter: string;
    box_delivery_marketplace_base: string;
    box_delivery_marketplace_coef_expr: string;
    box_delivery_marketplace_liter: string;
    box_storage_base: string;
    box_storage_coef_expr: string;
    box_storage_liter: string;
    created_at: string;
    updated_at: string;
}

export interface SpreadsheetFromDB {
    spreadsheet_id: string;
    name: string | null;
    created_at: Date;
}
