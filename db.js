import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
    user: 'postgres',
    password: 'Password@12',
    host: 'localhost',
    port: 5432,
    database: 'todoApp'
});

export default pool;