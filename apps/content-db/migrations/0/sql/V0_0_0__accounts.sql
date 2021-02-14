SET TIMEZONE='Africa/Johannesburg';

CREATE TABLE accounts (
    id VARCHAR(35) NOT NULL,
    authentication_id VARCHAR(35) NOT NULL,
    handle VARCHAR(128) NOT NULL,
    description VARCHAR(256),
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    UNIQUE(handle)
);