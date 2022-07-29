import Sequelize from 'sequelize';

const env = process.env;

const POSTGRES_AUTH_HOST = env.POSTGRES_AUTH_HOST
    ? env.POSTGRES_AUTH_HOST
    : "auth-db";

const POSTGRES_AUTH_PORT = env.POSTGRES_AUTH_PORT
    ? env.POSTGRES_AUTH_PORT
    : 40101;

const POSTGRES_AUTH_USER = env.POSTGRES_AUTH_USER
    ? env.POSTGRES_AUTH_USER
    : "postgres";

const POSTGRES_AUTH_PASSWORD = env.POSTGRES_AUTH_PASSWORD
    ? env.POSTGRES_AUTH_PASSWORD
    : "postgres";

const POSTGRES_AUTH_DB = env.POSTGRES_AUTH_DB
    ? env.POSTGRES_AUTH_DB
    : "postgres";

const sequelize = new Sequelize(
    POSTGRES_AUTH_DB, 
    POSTGRES_AUTH_USER, 
    POSTGRES_AUTH_PASSWORD,
    {
        host: POSTGRES_AUTH_HOST,
        dialect: 'postgres',
        port: POSTGRES_AUTH_PORT,
        quoteIdentifiers: false,
        define: 
        {
            syncOnAssociation: true,
            timestamps: false,
            unserscored: true,
            underscoredAll: true,
            freezeTableName: true
        }, 
        pool: 
        {
            acquire: 180000
        }
    }
);

sequelize
.authenticate()
.then(
    () =>
    {
        console.log('Banco de dados online e conectado!');
    }
)
.catch(
    (_error) =>
    {
        console.error(_error);
    }
);

export default sequelize;
