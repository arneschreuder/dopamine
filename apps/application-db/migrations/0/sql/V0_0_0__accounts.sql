SET TIMEZONE='Africa/Johannesburg';

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE accounts (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    authentication_id UUID NOT NULL,
    handle VARCHAR(128) NOT NULL,
    description VARCHAR(256),
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    UNIQUE(handle)
);