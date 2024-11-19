CREATE SEQUENCE IF NOT EXISTS user_id_seq START 1;

CREATE TABLE IF NOT EXISTS users (
    user_id     BIGINT PRIMARY KEY,
    email       VARCHAR(128) UNIQUE NOT NULL,
    username    VARCHAR(128) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS survey (
    survey_id       VARCHAR(128) PRIMARY KEY,
    creator_id      BIGINT REFERENCES users (user_id),
    name            VARCHAR(128) NOT NULL,
    description     TEXT,
    date_created    TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS task_group (
    survey_id       VARCHAR(128) REFERENCES survey (survey_id),
    task_group_name VARCHAR(128),
    task_group_id   BIGINT,

    PRIMARY KEY (survey_id, task_group_name)
);

CREATE TABLE IF NOT EXISTS task (
    survey_id               VARCHAR(128) NOT NULL,
    task_group_name         VARCHAR(128) NOT NULL,
    task_id                 BIGINT NOT NULL,
    name                    VARCHAR(128) NOT NULL,
    question                TEXT,
    type                    BIGINT,
    answer_variants         VARCHAR[],
    tree                    TEXT,
    true_answer             TEXT,
    true_route              VARCHAR[],
    card_sort_values        VARCHAR[],
    card_sort_categories    VARCHAR[],
    card_sort_type          BIGINT,

    PRIMARY KEY (survey_id, task_group_name, task_id)
);

CREATE TABLE IF NOT EXISTS response (
    response_id             VARCHAR(128) UNIQUE NOT NULL,
    survey_id               VARCHAR(128) REFERENCES survey (survey_id),
    date_created            TIMESTAMPTZ,
    time_spent_seconds      INTEGER,

    PRIMARY KEY (response_id, survey_id)
);

CREATE TABLE IF NOT EXISTS answer_group (
    response_id         VARCHAR(128) NOT NULL REFERENCES response(response_id),
    task_group_name     VARCHAR(128) NOT NULL,
    time_spent_seconds  INTEGER,

    PRIMARY KEY (response_id, task_group_name)
);

CREATE TABLE IF NOT EXISTS answer (
    response_id VARCHAR(128) NOT NULL,
    answer_group VARCHAR(128) NOT NULL,
    survey_id   VARCHAR(128) NOT NULL,
    task_id     BIGINT NOT NULL,
    answer_text TEXT,
    tree_trace  VARCHAR[],
    board       TEXT,    

    FOREIGN KEY (response_id, survey_id) REFERENCES response (response_id, survey_id)
);

