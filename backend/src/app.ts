import express from "express"
import fs from "fs/promises"
import type { Request, Response } from "express"
import cors from "cors"
import {z} from "zod"
import path from "path"

const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static('data'))

const port = 3000

const CreationSchema = z.object({
  pizza: z.array(z.object({
    pizza: z.string(),
    price: z.string(),
    piece: z.string(),
  })),
  date: z.string(),
  name: z.string(),
  phone: z.string(),
  zipCode: z.string(),
  city: z.string(),
  street: z.string(),
  house: z.string(),
})

const folderPath = './orders' 
const outputFilePath = './orders.json'
const refreshInterval = 10 * 1000

app.get('/api/pizzas', async (req: Request, res: Response) => {
  const pizzasData = await fs.readFile("./data/pizzascript.json", "utf-8")
  res.send(JSON.parse(pizzasData)) 
})

app.post('/api/orders', async (req: Request, res: Response) => {

  const result = CreationSchema.safeParse(req.body)
  if(!result.success) {
      return res.sendStatus(400)
  }

  await fs.writeFile(`./orders/order_${result.data.name}_${result.data.date}.json`, JSON.stringify(result.data), "utf-8")

  res.status(200).json(result.data)
})

app.get('/api/orders', async (req: Request, res: Response) => {
  const ordersData = await fs.readFile("./orders.json", "utf-8")
  res.send(JSON.parse(ordersData)) 
})

async function mergeJSONFiles(folderPath: string, outputFile: string) {
  const mergedData: Record<string, any> = []

  // Read all files in the folder
  const fileNames = await fs.readdir(folderPath)

  for (const fileName of fileNames) {
      const filePath = path.join(folderPath, fileName)

      // Check if the file is a JSON file
      if (path.extname(filePath) === '.json') {
          try {
              const data = JSON.parse(await fs.readFile(filePath, 'utf8'))
              mergedData.push(data)
          } catch (error) {
              console.error(`Error reading or parsing ${fileName}: ${error}`)
          }
      }
  }

  await fs.writeFile(outputFile, JSON.stringify(mergedData, null, 2))
  console.log(`Merged data saved to ${outputFile}`)
}

// Call the merge function

setInterval(() => {
mergeJSONFiles(folderPath, outputFilePath)
}, refreshInterval)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})