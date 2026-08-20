using { myte.db.master, myte.db.transaction } from '../db/datamodel';

service CatalogService @(path: 'CatalogService'){
    entity businesspartner as projection on master.businesspartner;
    entity address as projection on master.address;
    entity purchaseorder as projection on transaction.purchaseorder;
    entity poitems as projection on transaction.poitems;
    entity product as projection on master.product;
    entity worker as projection on master.worker;
}