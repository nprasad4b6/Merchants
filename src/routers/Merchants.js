const express = require('express')
const { insertData, getData } = require('../db/oracle')
const {cashBackRate }= require('../utility')

const merchantRouter = new express.Router();

merchantRouter.post('/merchants', async (req, res) => {
    try {
        const data = req.body;
        if (data.name && data.description && data['cashback(%)'] && data.slug && data.merchant_redirection_url && data.country) {
            await insertData(req.body)
            res.status(201).send("Inserted successfully")
        } else {
            res.status(400).send("Not valid data to insert")
        }
    } catch (error) {
        res.status(400).send(error)
    }

})

// /merchants?offset=2&limit=3&orderBy={"name":-1}
merchantRouter.get('/merchants', async (req, res) => {
    try {
        let sortByField;
        let sortByOrder;
        if (req.query.orderBy) {
            sortByField = Object.keys(JSON.parse(req.query.orderBy))[0]
            sortByOrder = JSON.parse(req.query.orderBy)[sortByField] === -1 ? "DESC" : "ASC"
        }
        const records = await getData(undefined, sortByField, sortByOrder,
            req.query.offset,
            req.query.limit)
        if (records.length > 0) {
            res.status(200).send(records)
        } else {
            res.status(200).send("No records found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

// /merchants/idvalue
merchantRouter.get('/merchants/:id', async (req, res) => {
    try {
        const records = await getData(req.params.id)
        if (records.length > 0) {
            res.status(200).send(records)
        } else {
            res.status(200).send("No records found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = { merchantRouter }


