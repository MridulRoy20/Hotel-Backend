const express = require("express")
const app = express();
const {initializeDatabase} = require("./db/db.connect")
const Hotel = require("./models/hotel.models");


app.use(express.json())

initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// const newHotel = ({
//     name: "Sunset Resort",
//     category: "Resort",
//     location: "12 Main Road, Anytown",
//     rating: 4.0,
//     reviews: [],
//     website: "https://sunset-example.com",
//     phoneNumber: "+1299655890",
//     checkInTime: "2:00 PM",
//     checkOutTime: "11:00 AM",
//     amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
//     priceRange: "$$$$ (61+)",
//     reservationsNeeded: true,
//     isParkingAvailable: true,
//     isWifiAvailable: true,
//     isPoolAvailable: true,
//     isSpaAvailable: true,
//     isRestaurantAvailable: true,
//     photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
// })


async function createHotel(newHotel){
    try{
        const hotel =  new Hotel(newHotel)
        const saveHotel = await hotel.save();
        return saveHotel;
    }
    catch(error){
        throw error
    }
    
}
app.post("/hotels", async (req ,res) => {
    try{
        const savedData = await createHotel(req.body)
        res.status(200).json({message: "Hotel Added Successfully!", hotel: savedData})
    } catch (error){
        res.status(500).json({error: "Falied to add data."})
    }
})
// createHotel(newHotel)

// 3. Create a function to read all hotels from the database. Console all the hotels. Use proper function and variable names.

async function readAllHotels (){
    try{
        const hotels = await Hotel.find();
        return hotels;
        
    }
    catch(error){
        throw error;
    }
}

app.get("/hotels", async (req, res) => {
    try{
        const hotel = await readAllHotels();
        if(hotel != 0){
            res.json(hotel)
        } else {
            res.status(404).json({error: "Hotel not found."})
        }
   } catch(error){
        res.status(500).json({error: "Unable to fetch data."})
    }
})
// readAllHotels();

// 4. Create a function to read a hotel by its name ("Lake View"). Console the restaurant details of Lake View hotel. Use proper function and variable names.

async function readHotelByName (hotelName){
    try{
        const hotel = await Hotel.findOne({name: hotelName});
        return hotel;
        
    }
    catch(error){
        throw error;
    }
}
app.get("/hotels/:hotelName",async (req, res) => {
    try{
        const hotel = await readHotelByName(req.params.hotelName)
        if(hotel){
            res.json(hotel)
        } else {
            res.status(404).json({error: "Hotel not found."})
        }
    } catch{
        res.status(500).json({error: "Unable to fetch data."})
    }
})
// readHotelByName("Lake View");

// 5. Create a function to read all hotels which offers parking space. Console all the hotel details.

async function readAllHotelsByParking(){
    try{
        const hotel = await Hotel.find({isParkingAvailable: true});
        console.log(hotel);
        
    }
    catch(error){
        throw error;
    }
}
// readAllHotelsByParking()

// 6. Create a function to read all hotels which has restaurant available. Console all the hotels.

async function readAllHotelsWithRestaurant(){
    try{
        const hotel = await Hotel.find({isRestaurantAvailable: true});
        console.log(hotel);
        
    }
    catch(error){
        throw error;
    }
}
// readAllHotelsByParking();

// 7. Create a function to read all hotels by category ("Mid-Range"). Console all the mid range hotels.

async function readAllhotelsByCategory(prefferedCategory){
    try{
        const hotel = await Hotel.find({category: prefferedCategory});
        return hotel;
        
    } catch(error){
        throw error;
    }
}
app.get("/hotels/category/:hotelCategory", async(req, res) => {
    try{
        const hotel = await readAllhotelsByCategory(req.params.hotelCategory);
        if(hotel != 0){
            res.json(hotel)
        } else {
            res.status(404).json({error: "Hotel not found."})
        }
    } catch{
        res.status(500).json({error: "Unable to fetch data."})
    }
})
// readAllhotelsByCategory("Mid-Range")

// 8. Create a function to read all hotels by price range ("$$$$ (61+)"). Console all the hotels.

async function readAllHotelsByPriceRange(price){
    try{
        const hotel = await Hotel.find({priceRange: price})
        console.log(hotel);
        
    } catch(error){
        throw error;
    }
}
// readAllHotelsByPriceRange("$$$$ (61+)")

// 9. Create a function to read all hotels with 4.0 rating. Console the hotels.

async function readAllHotelsByRating(rating){
    try{
        const hotel = await Hotel.find({rating: rating})
        return hotel;
        
    } catch(error){
        throw error;
    }
}
app.get("/hotels/rating/:hotelRating", async(req, res) => {
    try{
        const hotel = await readAllHotelsByRating(req.params.hotelRating)
        if(hotel != 0){
            res.json(hotel)
        } else {
            res.status(404).json({error: "Hotel not found."})
        }
    } catch{
        res.status(500).json({error: "Unable to fetch data."})
    }
})
// readAllHotelsByRatingAbove4();

// 10. Create a function to read a hotel by phone number ("+1299655890"). Console the hotel data.

async function readHotelByPhone (contactNumber){
    try{
        const hotel = await Hotel.findOne({phoneNumber: contactNumber})
        return hotel;
        
    }
    catch(error){
        throw error;
    }
}
app.get("/hotels/directory/:phoneNumber",async (req, res) => {
    try{
        const hotel = await readHotelByPhone(req.params.phoneNumber);
        if(hotel){
            res.json(hotel)
        } else {
            res.status(404).json({error: "Hotel not found."})
        }
    } catch{
        res.status(500).json({error: "Unable to fetch data."})
    }
})
// readHotelByPhone("+1299655890");

// 2.3_HW2
// 1. Create a function that accepts a hotel ID and an object with updated data, and updates the hotel data with the provided ID. 
// Take the _id of the hotel from your database which has the name Lake View and update its checkOutTime to 11 AM. Console the updated hotel.

async function updateCheckoutTime(id, updateData){
    try{
        const updatedData = await Hotel.findByIdAndUpdate(id, updateData, {new : true})
        console.log(updatedData);
        
    }catch( error){
        throw error;
    }
}
// updateCheckoutTime("6846c42e7f0818507af9370c", {checkOutTime: "11 AM"})

// 2. Create a function that accepts a hotel name and an object with updated data, and updates the hotel data. 
// Take the hotel which has the name "Sunset Resort" and update its rating to 4.2. Console the updated hotel.

async function updateRating(hotelName, dataToUpdate){
    try{
        const updatedData = await Hotel.findOneAndUpdate({name: hotelName}, dataToUpdate, {new : true})
        console.log(updatedData);
        
    }catch( error){
        throw error;
    }
}
// updateRating("Sunset Resort", {rating: 4.2})

// 3. Create a function that accepts a hotel's phone number and an object with updated data, and updates the hotel data. 
// Take the hotel which has the phone number "+1299655890" and update its phone number  to "+1997687392". Console the updated hotel details.

async function updatePhoneNumber(number, dataToUpdate){
    try{
        const updatedData = await Hotel.findOneAndUpdate({phoneNumber: number}, dataToUpdate, {new : true})
        console.log(updatedData);
        
    }catch( error){
        throw error;
    }
}
// updatePhoneNumber("+1299655890", {phoneNumber: "+1997687392"})

// 2.4_HW2
// 1. Create a function deleteHotelById that accepts a hotel ID and deletes the hotel data from the db. 
// Take any hotel id from your database and delete the records of that hotel.

async function deleteHotelById(hotelId){
    try {
        const deletedData = await Hotel.findByIdAndDelete(hotelId);
        return deletedData;
    } catch (error) {
        console.log("Error while deleteing data." , error);  
    }
}
// delete through api
app.delete("/hotels/:hotelId", async (req, res) => {
    try {
        const deletedHotel = await deleteHotelById(req.params.hotelId)
        res.status(200).json({message: "Hotel deleted successfully!"})
    } catch (error) {
        res.status(500).json({error: "Unable to delete hotel."})
    }
})
// deleteHotelById("68468527233dca654f7bbb53")

// 2. Create a function deleteHotelByPhoneNumber that accepts a hotel's phone number and deletes the hotel data from the db. 
// Take any hotel phone number from your database and delete the records of that hotel.

async function deleteHotelByPhoneNumber(number){
    try {
        const deletedData = await Hotel.findOneAndDelete({phoneNumber: number})
        console.log("Deleted Data: ", deletedData);
        
    } catch (error) {
        console.log("Error while deleting ");
        
    }
}
// deleteHotelByPhoneNumber("+1997687392")


async function updateHotel(hotelId, dataToUpdate){
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {new : true});
        return updatedHotel;
    } catch (error) {
        console.log(error);
        
    }
}

// update api route
app.post("/hotels/:hotelId", async (req, res) => {
    try {
        const updatedHotel = await updateHotel(req.params.hotelId, req.body)
        if(updatedHotel){
            res.status(200).json({message: "Hotel updated successfully!", "updated Hotel": updatedHotel})
        } else {
            res.status(404).json({error: "Hotel not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Unable to update data."})
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})