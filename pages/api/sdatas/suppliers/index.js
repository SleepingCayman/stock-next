import {connect, model, models, Schema} from "mongoose"
const connectionString ='mongodb+srv://user1:qqqqq123@cluster0.gkl5jni.mongodb.net/sdatas'

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method: ", req.method)

    if (req.method === 'GET') {
        const docs = await Supplier.find()
        res.status(200).json(docs)
    } else if (req.method === 'POST') {
        console.log(req.body)
        //res.status(200).json(req.body)
        const doc = await Supplier.create(req.body)
        res.status(201).json(doc)
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}



const supplierSchema = new Schema({
    supplier: String,
    address: String,
    phone: Number,
});

console.log("Mongoose Models", models)
const Supplier = models?.supplier || model('supplier', supplierSchema);


