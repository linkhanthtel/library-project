import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

app.get('/', (req,res) => {
    res.status(201).send("This is server site");
})

app.get('/books', (req,res) => {
    const q = `Select * From books`
    pool.query(q, (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post('/books', (req,res) => {
    const q = `Insert Into books(title,about,cover,price) Values(?)`
    const values = [
        req.body.title,
        req.body.about,
        req.body.cover,
        req.body.price,
    ]

    pool.query(q, [values], (err,data) => {
        if (err) return res.json(err)
        return res.json("Book added successfully")
    })
})

app.put('/books/:id', (req,res) => {
    const q = `Update books Set title = ?, about = ?, cover = ?, price = ? where id = ${req.params.id}`
    const values = [
        req.body.title,
        req.body.about,
        req.body.cover,
        req.body.price,
    ]

    pool.query(q, [...values], (err,data) => {
        if (err) return res.json(err)
        return res.json("Book updated successfully")
    })
})

app.delete('/books/:id', (req,res) => {
    const q = `Delete From books Where id = ${req.params.id}`
    pool.query(q, (err,data) => {
        if (err) return res.json(err)
        return res.json("Book deleted successfully")
    })
})

app.listen(8000, () => {
    console.log("Listening to port 8000");
})