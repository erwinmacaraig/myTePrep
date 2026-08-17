namespace myte.db;

context master {
    entity businesspartner {
        key NODE_KEY                    : String(50);
        EMAIL_ADDRESS               : Integer;
        PHONE_NUMBER                : String(50);
        FAX_NUMBER                  : String(50);
        WEB_ADDRESS                 : String(100);
        ADDRESS_GUID_NODE_KEY       : String(50);
        BP_ID                       : Integer;
        COMPANY_NAME                : String(30);
    }

    entity product {
        key NODE_KEY                : String(50);
        PRODUCT_ID                  : String(25);
        TYPE_CODE                   : String(2);
        CATEGORY                    : String(32);
        DESCRIPTION                 : localized String(255);
        SUPPLIER_GUID               : Association to one businesspartner;
        TAX_TARIF_CODE              : Integer;
        MEASURE_UNIT                : String(2);
        CURRENCY_CODE               : String(4);
        PRICE                       : Decimal;
        WIDTH                       : Decimal;
        DEPTH                       : Decimal;
        HEIGHT                      : Decimal;
        DIM_UNIT                    : String(2);
    }

    // entity address {
    //     key NODE_KEY                : String(50);
    //     CITY                        : String(44);
    //     POSTAL_CODE                 : String(8);
    //     STREET                      : String(44);
    //     BUILDING                    : String(128);
    //     COUNTRY                     : String(44);
    //     ADDRESS_TYPE                : String(44);
    //     VAL_START_DATE              : Date;
    //     VAL_END_DATE                : Date;
    //     LATITUDE                    : Decimal;
    //     LONGITUDE                   : Decimal;
    //     businesspartner             : Association to one businesspartner on businesspartner.ADDRESS_GUID_NODE_KEY = $self;
    // }

    // entity employee {
    //     firstName                   : String(40);
    //     lastName                    : String(40);
    //     Gender                      : Gender;
    //     phoneNumber                 : phoneNumber;
    //     email                       : Email;
    //     Currency                    : Currency;
    //     salaryAmount                : AmountT;
    // }
} 

context transaction {
    entity purchaseorder {
        key NODE_KEY                : String(50);
        PO_ID                       : String(24);
        PARTNER_GUID                : Association to one master.businesspartner;
        LIFECYCLE_STATUS            : String(1);
        Items                       : Association to many poitems on Items.PARENT_KEY = $self;
    }

    entity poitems {
        key NODE_KEY                : String(50);
        PARENT_KEY                  : Association to one purchaseorder;
        PO_ITEM_POS                 : Integer;
        PRODUCT_GUID                : Association to one master.product;
    }
}