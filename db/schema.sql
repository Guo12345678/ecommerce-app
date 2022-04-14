pragma foreign_keys = on;

-- Schemas
    
create table Buyer (
    buyer_id integer primary key autoincrement,
    email varchar,
    username varchar,
    password varchar
);

create table Vendor (
    vendor_id integer primary key autoincrement,
    email varchar,
    username varchar,
    password varchar
);

create table Listing (
    listing_id integer primary key autoincrement,
    vendor_id integer,
    status integer,
    name varchar,
    price decimal,
    description text,
    foreign key (vendor_id) references Vendor(vendor_id)
        on update cascade on delete cascade
);

create table Payment (
    buyer_id integer,
    card_no char(16),
    expiry char(4),
    cvc char(3),
    primary key (buyer_id, card_no),
    foreign key (buyer_id) references Buyer(buyer_id)
        on update cascade on delete cascade
);

-- Relationships

create table Purchase (
    buyer_id integer,
    vendor_id integer,
    listing_id integer,
    card_no char(16),
    date char(8),
    primary key (buyer_id, vendor_id, listing_id),
    foreign key (buyer_id) references Buyer(buyer_id)
        on update cascade on delete cascade,
    foreign key (listing_id) references Listing(listing_id)
        on update cascade on delete cascade,
    foreign key (vendor_id) references Vendor(vendor_id)
        on update cascade on delete cascade
);

create table Cart (
    buyer_id integer,
    card_no char(16),
    listing_id integer,
    date char(8),
    primary key (buyer_id, listing_id),
    foreign key (buyer_id) references Buyer(buyer_id)
        on update cascade on delete cascade,
    foreign key (listing_id) references Listing(listing_id)
        on update cascade on delete cascade
);

create table ListingImages (
    image_id integer primary key autoincrement,
    listing_id integer not null,
    url varchar,
    foreign key (listing_id) references Listing(listing_id)
        on update cascade on delete cascade
);

-- Mock data

insert into Buyer (email, username, password) values
    ('foo@foo.com', 'foo', 'hunter2'),
    ('bar@bar.com', 'bar', 'hunter3');

insert into Vendor (email, username, password) values
    ('vendor@vendor.com', 'vendor', 'hunter2');

insert into Listing (vendor_id, name, price, description) values
    (1, 'PlayStation 5', 549.99, 'Sony PlayStation 5'),
    (1, 'Diapers Size 2, 186 Count', 18.99,
        'Diapers Size 2, 186 Count - Pampers Swaddlers Disposable Baby Diapers, ONE MONTH SUPPLY (Packaging May Vary)'),
    (1, '2021 Apple MacBook Proß', 849.99,
        '2021 Apple MacBook Pro (14-inch, Apple M1 Pro chip with 8‑core CPU and 14‑core GPU, 16GB RAM, 512GB SSD) - Space Gray'),
    (1, 'Oculus Quest 2', 299.99,
        'Diapers Size 2, 186 Count - Pampers Swaddlers Disposable Baby Diapers, ONE MONTH SUPPLY (Packaging May Vary)'),
    (1, 'Kindle', 29.99,
        'Kindle - With a Built-in Front Light - Black - Ad-Supported'),
    (1, 'Echo Dot', 129.99,
        'Echo Dot (4th Gen, 2020 release) | Smart speaker with Alexa | Charcoal');

insert into ListingImages (listing_id, url) values
    (1, 'https://www.nme.com/wp-content/uploads/2020/06/ps5-credit-sie@2000x1270.jpg'),
    (2, 'https://m.media-amazon.com/images/I/81p83lbc4ML._AC_SX679_.jpg'),
    (3, 'https://m.media-amazon.com/images/I/61vFO3R5UNL._AC_SX679_.jpg'),
    (4, 'https://m.media-amazon.com/images/I/615YaAiA-ML._SX522_.jpg'),
    (5, 'https://m.media-amazon.com/images/I/61LKmORUuXL._AC_SX679_.jpg'),
    (6, 'https://m.media-amazon.com/images/I/81Eqgg0cvrL._AC_SX679_.jpg');