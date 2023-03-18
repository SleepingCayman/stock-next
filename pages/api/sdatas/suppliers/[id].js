
import { connect, model, models, Schema } from "mongoose"
const connectionString ='mongodb+srv://user1:qqqqq123@cluster0.gkl5jni.mongodb.net/sdatas'

export default async function handler(req, res) {
  await connect(connectionString);
  console.log("req.method: ", req.method)
  console.log("req.query.id", req.query.id)

  const id = req.query.id
  if (req.method === 'GET') {
      // Get only one document
      const doc = await Supplier.findOne({ _id: id })
      res.status(200).json(doc)
  } else if (req.method === 'DELETE') {
      const deletedDoc = await Supplier.deleteOne({ _id: id })
      res.status(200).json(deletedDoc)
  } else if (req.method === 'PUT') {
      console.log('id',req.query.id)
      console.log(req.body)
      const updatedDoc = await Supplier.updateOne({_id: id}, req.body)
      res.status(200).json(updatedDoc)
  } else {
      res.setHeader('Allow', ['GET', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}



const supplierSchema = new Schema({
    supplier: String,
    name: String,
    price: Number,
});

console.log("Mongoose Models", models)
const Supplier = models?.supplier || model('supplier', supplierSchema);