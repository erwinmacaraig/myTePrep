namespace myte.db;
using { myte.db.master, myte.db.transaction } from './datamodel';

context CDSViews {
    define view ![PODetails] 
    as select from transaction.purchaseorder {
        key PO_ID as ![purchaseorders],
        PARTNER_GUID.BP_ID as ![VendorID],
        PARTNER_GUID.COMPANY_NAME as ![compnayName],
        GROSS_AMOUNT as ![POGrossAmount],
        CURRENCY_CODE as ![POCurrency],
        Key Items.PO_ITEM_POS as ![ItemPosition],
        Items.PRODUCT_GUID.PRODUCT_ID as ![ProductID],
        Items.PRODUCT_GUID.DESCRIPTION as ![ProductDescription],
        PARTNER_GUID.ADDRESS_GUID.CITY as ![CITY],
        PARTNER_GUID.ADDRESS_GUID.COUNTRY as ![Country],
        Items.GROSS_AMOUNT as ![ItemGrossAmount],
        Items.NET_AMOUNT as ![ItemNetAmount]
    }

    define view ![ItemView] as select from 
    transaction.poitems {
        key PARENT_KEY.PARTNER_GUID.NODE_KEY as ![Vendor],
        PRODUCT_GUID.NODE_KEY as ![ProductId],
        CURRENCY_CODE as ![CurrencyCode],
        NET_AMOUNT as ![NetAmount],
        TAX_AMOUNT as ![TaxAmount],
        PARENT_KEY.LIFECYCLE_STATUS as ![POStatus]
    }
    define view ProductSum as 
        select from master.product as prod {
            key PRODUCT_ID as ![ProductId], 
            texts.DESCRIPTION as ![Description], 
            (select from transaction.poitems as a {
                SUM(a.GROSS_AMOUNT) as SUM 
            }
            where a.PRODUCT_GUID.NODE_KEY = prod.NODE_KEY )as PO_SUM: Decimal(10,2) // If we dont define datatype here it gives a type error
    }
}

