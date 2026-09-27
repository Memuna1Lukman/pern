
import express from 'express'


const app = express()
const port  = 3000


const router = express.Router()
app.use(express.json())


app.use((req,res,next)=>{
    const timeStamp = Date().toString()

    console.log(`[${timeStamp}] ${req.method} ${req.url}`)
    next();
})

let cars = [
    {id:1,make:"Toyota",model:"camry",year:2022,price:2000},
    {id:2,make:"kaesar",model:"boss",year:2052,price:2500},
    {id:3,make:"bus",model:"bigoo",year:2062,price:2200},
    {id:4,make:"cola",model:"v8",year:2032,price:2400},
    {id:5,make:"malt",model:"cadd",year:2002,price:2800},
]

app.get("/",(req,res)=>{
    res.send(cars)
})


router.get("/",(req,res)=>{
    res.send(cars);
})


router.get(":id",(req,res)=>{
    const id = Number(req.params.id)
    const carss = cars.find(car => (car.id === id))
    if(!carss) return res.status(404).send('Car Not found')
    res.json(carss)
})

router.post("/",(req,res)=>{
    const {make,model,year,price} = req.body;
    if (!make|| !model || !year || !price) return res.status(400).json({error:'Make,model,year required'});
    const newCar = {
        id: cars.length+1,
        make,
        model,
        year: Number(year),
        price: Number(price)
    };
    
    cars.push(newCar);
    res.status(201).json(newCar)
})

router.put("/:id",(req,res)=>{
    // which car you want to update
    const id = req.params.id
    // does the car exist
    const index = cars.findIndex(car=>car.id === id)
    if(index === -1){
        res.status(404).send('Car Not found')
    }
    const {make,model,year,price} = req.body;
    if(make) cars[index].make = make
    if(model) cars[index].model  = model
    if(year) cars[index].year = Number(year)
    if (price) cars[index].price = Number(price)

    res.json(cars[index])
})


router.delete("/:id",(req,res)=>{
    const id = req.params.id
    // findd if the id exist
    const index = cars.findIndex(c =>c.id === id)
    if(index === -1){
        res.status(404).send('Car Not found')
    }
    cars.splice(index,1)[0];
    return "deleteion successful"
})

app.use("/api/v1/cars", router)
app.listen(port,()=>console.log(`server is running on http://localhost:${port}`))