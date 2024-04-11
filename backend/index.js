import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.listen(8800, () => {
	console.log("listening");
});

app.use(cors());

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "blogs",
});

// app.get("/", (req, res) => {
// 	res.json("hello world");
// });

app.get("/", (req, res) => {
	const queryOne = "SELECT * FROM blogs.table_one_blogs";
	db.query(queryOne, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.use(express.json());
app.post("/", (req, res) => {
	const queryTwo = "INSERT INTO blogs.table_one_blogs (`title`, `body`, `date`) VALUES (?)";
	const values = [req.body.title, req.body.body, req.body.date];
	db.query(queryTwo, [values], (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.delete("/:id", (req, res) => {
	const blogId = req.params.id;
	const queryThree = "DELETE FROM blogs.table_one_blogs WHERE id=?";
	const values = [req.body.title, req.body.body, req.body.date];
	db.query(queryThree, [blogId], (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.put("/:id", (req, res) => {
	const blogId = req.params.id;
	const queryFour = "UPDATE blogs.table_one_blogs SET `title=?` `body=?` `date=?` WHERE id=? ";
	//const values = [req.body.title, req.body.body, req.body.date];
	db.query(queryFour, [blogId], (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});
