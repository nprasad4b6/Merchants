const supertest = require("supertest");
const app =  require("../app")


test('merchants - post pass"', async () => {
    await supertest(app)
            .post("/merchants")
            .send({
                "name":"helo1",
                 "description":"test",
                "cashback":"20",
                "slug":"12",
                "merchant_redirection_url":"123",
                "country":"ind"
            })
            .expect(201)

})
test('merchants - post fail"', async () => {
    await supertest(app)
            .post("/merchants")
            .send("test")
            .expect(400)

})

test('merchants - get all records', async () => {
    await supertest(app)
            .get("/merchants")
            .expect(200)
})

test('merchants - get filter records', async () => {
    await supertest(app)
            .get("/merchants/1")
            .expect(200)

})

test('merchants - get- No record with given id', async () => {
    await supertest(app)
            .get("/merchants/9888")
            .expect(200)

})

