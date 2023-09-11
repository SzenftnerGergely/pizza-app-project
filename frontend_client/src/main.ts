import "./style.css";
import http from "axios";
import { z } from "zod";

let pizzaOneName = document.getElementById("pizzaone")! as HTMLHeadingElement
let pizzaTwoName = document.getElementById("pizzatwo")! as HTMLHeadingElement
let pizzaThreeName = document.getElementById("pizzathree")! as HTMLHeadingElement
let pizzaFourName = document.getElementById("pizzafour")! as HTMLHeadingElement
let pizzaFiveName = document.getElementById("pizzafive")! as HTMLHeadingElement
let pizzaSixName = document.getElementById("pizzasix")! as HTMLHeadingElement
let pizzaSevenName = document.getElementById("pizzaseven")! as HTMLHeadingElement
let pizzaOneToppings = document.getElementById("pizzaonetoppings")! as HTMLParagraphElement
let pizzaTwoToppings = document.getElementById("pizzatwotoppings")! as HTMLParagraphElement
let pizzaThreeToppings = document.getElementById("pizzathreetoppings")! as HTMLParagraphElement
let pizzaFourToppings = document.getElementById("pizzafourtoppings")! as HTMLParagraphElement
let pizzaFiveToppings = document.getElementById("pizzafivetoppings")! as HTMLParagraphElement
let pizzaSixToppings = document.getElementById("pizzasixtoppings")! as HTMLParagraphElement
let pizzaSevenToppings = document.getElementById("pizzaseventoppings")! as HTMLParagraphElement
let pizzaOneImage = document.getElementById("pizzaoneimg")! as HTMLImageElement
let pizzaTwoImage = document.getElementById("pizzatwoimg")! as HTMLImageElement
let pizzaThreeImage = document.getElementById("pizzathreeimg")! as HTMLImageElement
let pizzaFourImage = document.getElementById("pizzafourimg")! as HTMLImageElement
let pizzaFiveImage = document.getElementById("pizzafiveimg")! as HTMLImageElement
let pizzaSixImage = document.getElementById("pizzasiximg")! as HTMLImageElement
let pizzaSevenImage = document.getElementById("pizzasevenimg")! as HTMLImageElement
let pizzaOnePrice = document.getElementById("pizzaoneprice")! as HTMLElement
let pizzaTwoPrice = document.getElementById("pizzatwoprice")! as HTMLElement
let pizzaThreePrice = document.getElementById("pizzathreeprice")! as HTMLElement
let pizzaFourPrice = document.getElementById("pizzafourprice")! as HTMLElement
let pizzaFivePrice = document.getElementById("pizzafiveprice")! as HTMLElement
let pizzaSixPrice = document.getElementById("pizzasixprice")! as HTMLElement
let pizzaSevenPrice = document.getElementById("pizzasevenprice")! as HTMLElement
const customerName = document.getElementById("name")! as HTMLInputElement
const customerZipCode = document.getElementById("zipcode")! as HTMLInputElement
const customerCity = document.getElementById("city")! as HTMLInputElement
const customerStreet = document.getElementById("street")! as HTMLInputElement
const customerHouseNumber = document.getElementById("house")! as HTMLInputElement
const customerEmail = document.getElementById("email")! as HTMLInputElement
const customerPhoneNumber = document.getElementById("phone")! as HTMLInputElement
const pizzaOneCount = document.getElementById("amountone")! as HTMLInputElement
const pizzaTwoCount = document.getElementById("amounttwo")! as HTMLInputElement
const pizzaThreeCount = document.getElementById("amountthree")! as HTMLInputElement
const pizzaFourCount = document.getElementById("amountfour")! as HTMLInputElement
const pizzaFiveCount = document.getElementById("amountfive")! as HTMLInputElement
const pizzaSixCount = document.getElementById("amountsix")! as HTMLInputElement
const pizzaSevenCount = document.getElementById("amountseven")! as HTMLInputElement
let amountArray: number[] = []
let pizzaOrders: Pizza[] = []
let priceSum = 0
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours()
const minutes = date.getMinutes()
const today = (`${year}-${month}-${day}-${hour}-${minutes}`).toString()

const PizzaResponseSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  toppings: z.string(),
  price: z.number(),
  link: z.string()
}))

type PizzaResponse = z.infer<typeof PizzaResponseSchema>;

const CustomerSchema = z.object({
  name: z.string(),
  zipcode: z.string(),
  city: z.string(),
  street: z.string(),
  house: z.string(),
  email: z.string(),
  phone: z.string()
})

type Customer = z.infer<typeof CustomerSchema>

const PizzaSchema = z.object({
  pizza: z.string(),
  piece: z.string(),
  price: z.string()
})

type Pizza = z.infer<typeof PizzaSchema>

const OrderSchema = z.object({
  pizza: z.array(z.object({
    pizza: z.string(),
    piece: z.string(),
    price: z.string(),
  })),
  date: z.string(),
  name: z.string(),
  phone: z.string(),
  zipCode: z.string(),
  city: z.string(),
  street: z.string(),
  house: z.string(),
})

type Order = z.infer<typeof OrderSchema>

const serverLoad = async (): Promise<PizzaResponse | null> => {
  const response = await http.get("http://localhost:3000/api/pizzas");
  const data = response.data
  
  const result = PizzaResponseSchema.safeParse(data)
  
  if (!result.success) {
    return null
  } else {
    return result.data
  }
};

function renderData(apiData: PizzaResponse) {
  pizzaOneImage.src= apiData[0].link
  pizzaOneName.innerHTML= apiData[0].name
  pizzaOneToppings.innerHTML = apiData[0].toppings
  pizzaOnePrice.innerHTML = "" + (apiData[0].price)
  pizzaTwoImage.src= apiData[1].link
  pizzaTwoName.innerHTML= apiData[1].name
  pizzaTwoToppings.innerHTML = apiData[1].toppings
  pizzaTwoPrice.innerHTML = "" + (apiData[1].price)
  pizzaThreeImage.src= apiData[2].link
  pizzaThreeName.innerHTML= apiData[2].name
  pizzaThreeToppings.innerHTML = apiData[2].toppings
  pizzaThreePrice.innerHTML = "" + (apiData[2].price)
  pizzaFourImage.src= apiData[3].link
  pizzaFourName.innerHTML= apiData[3].name
  pizzaFourToppings.innerHTML = apiData[3].toppings
  pizzaFourPrice.innerHTML = "" + (apiData[3].price)
  pizzaFiveImage.src= apiData[4].link
  pizzaFiveName.innerHTML= apiData[4].name
  pizzaFiveToppings.innerHTML = apiData[4].toppings
  pizzaFivePrice.innerHTML = "" + (apiData[4].price)
  pizzaSixImage.src= apiData[5].link
  pizzaSixName.innerHTML= apiData[5].name
  pizzaSixToppings.innerHTML = apiData[5].toppings
  pizzaSixPrice.innerHTML = "" + (apiData[5].price)
  pizzaSevenImage.src= apiData[6].link
  pizzaSevenName.innerHTML= apiData[6].name
  pizzaSevenToppings.innerHTML = apiData[6].toppings
  pizzaSevenPrice.innerHTML = "" + (apiData[6].price)
}

const loadData = async () => {
  const apiData = await serverLoad()
  if (apiData) renderData(apiData)
}

loadData()

document.getElementById("addtoorder")!.addEventListener("click", () => {
  const customerData: Customer = {
    name: customerName.value,
    zipcode: customerZipCode.value,
    city: customerCity.value,
    street: customerStreet.value,
    house: customerHouseNumber.value,
    email: customerEmail.value,
    phone: customerPhoneNumber.value
  };

  document.getElementById("outname")!.textContent = customerData.name
  document.getElementById("outaddress")!.textContent = customerData.zipcode + " " + customerData.city + " " + customerData.street + " " + customerData.house
  document.getElementById("outemail")!.textContent = customerData.email
  document.getElementById("outphone")!.textContent = customerData.phone
  document.getElementById("pizzaordername")!.innerHTML=""
  document.getElementById("pizzaorderpiece")!.innerHTML=""
  document.getElementById("pizzaorderprice")!.innerHTML=""
  document.getElementById("totalprice")!.textContent=""
  amountArray= []
  pizzaOrders = []

  const pizzaOrder: Pizza[] = [
    { pizza: pizzaOneName.textContent!, piece: pizzaOneCount.value, price: pizzaOnePrice.textContent! },
    { pizza: pizzaTwoName.textContent!, piece: pizzaTwoCount.value, price: pizzaTwoPrice.textContent! },
    { pizza: pizzaThreeName.textContent!, piece: pizzaThreeCount.value, price: pizzaThreePrice.textContent! },
    { pizza: pizzaFourName.textContent!, piece: pizzaFourCount.value, price: pizzaFourPrice.textContent! },
    { pizza: pizzaFiveName.textContent!, piece: pizzaFiveCount.value, price: pizzaFivePrice.textContent! },
    { pizza: pizzaSixName.textContent!, piece: pizzaSixCount.value, price: pizzaSixPrice.textContent! },
    { pizza: pizzaSevenName.textContent!, piece: pizzaSevenCount.value, price: pizzaSevenPrice.textContent! },
  ];

  pizzaOrder.forEach((pizzaData) => {
    const count = parseInt(pizzaData.piece);
    if (count > 0) {
      const multiply = count * parseInt(pizzaData.price)
      const nameElement = document.createElement("h2");
      nameElement.textContent = pizzaData.pizza;
      document.getElementById("pizzaordername")!.appendChild(nameElement);
      const pieceElement = document.createElement("h2");
      pieceElement.textContent = pizzaData.piece + " pc"
      document.getElementById("pizzaorderpiece")!.appendChild(pieceElement);
      const priceElement = document.createElement("h2");
      priceElement.textContent = multiply.toString() + " Ft";
      document.getElementById("pizzaorderprice")!.appendChild(priceElement);

      let newOrder = { pizza: pizzaData.pizza, piece: pizzaData.piece, price: pizzaData.price }
      pizzaOrders.push(newOrder)

      amountArray.push(multiply)
    }
  });

  function sumAmountArray(numbers: number[]): number {
    let sum = 0;
    for (const num of numbers) {
      sum += num;
    }
    return sum;
  }

  priceSum = sumAmountArray(amountArray)

  if (priceSum !== 0) {
    const totalPriceElement = document.createElement("h2")
    totalPriceElement.textContent = priceSum.toString() + " Ft"
    document.getElementById("totalprice")!.appendChild(totalPriceElement)
  }

  const orderCheck = document.getElementById("ordercheck")!
  orderCheck.removeAttribute("style")

  const orderButton = document.getElementById("order")!
  orderButton.removeAttribute("style")
})


document.getElementById("order")!.addEventListener("click", () => {
  async function postJSON(data: any) {
    try {
      const response = await http("http://localhost:3000/api/orders", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      
      console.log(data)

      const result = await response.data;
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const orderData: Order = {
    pizza: pizzaOrders,
    date: today,
    name: customerName.value,
    phone: customerPhoneNumber.value,
    zipCode: customerZipCode.value,
    city: customerCity.value,
    street: customerStreet.value,
    house: customerHouseNumber.value,
    //email: customerEmail.value,
  };

  postJSON(orderData);

})
