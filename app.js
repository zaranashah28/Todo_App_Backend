import express from 'express';
import pool from './db.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', () => {
	console.log('Hello world');
});

// add a todo
app.post('/todos', async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			'INSERT INTO todo (description) VALUES ($1) RETURNING *',
			[description]
		);

		res.json(newTodo.rows[0]);
	} catch (err) {
		console.log(err);
	}
});

// get all todos
app.get('/todos', async (req, res) => {
	try {
		const allTodos = await pool.query('SELECT * FROM todo');
		res.json(allTodos.rows);
	} catch (err) {
		console.log(err.message);
	}
});

// get a todo
app.get('/todos/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const getTodo = await pool.query(`SELECT * FROM todo WHERE todo_id = $1`, [
			id,
		]);
		res.json(getTodo.rows);
	} catch (err) {
		console.log(err.message);
	}
});

// update todo
app.put('/todos/:id', async (req, res) => {
	const { id } = req.params;
	const { description } = req.body;
	try {
		const updateTodo = await pool.query(
			'UPDATE todo SET description = $1 WHERE todo_id = $2',
			[description, id]
		);

		res.json('Todo was updated');
	} catch (err) {
		console.log(err.message);
	}
});

// delete todo
app.delete('/todos/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
			id,
		]);

		res.json('Todo was deleted!!');
	} catch (err) {
		console.log(err.message);
	}
});

app.listen(5000, () => {
	console.log(`Server listening on port 3000`);
});
