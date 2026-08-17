namespace myte.db;

entity ExternalData {
    key userId: Integer;
    that: Integer;
    title: String(50);
    body: String(100);
}