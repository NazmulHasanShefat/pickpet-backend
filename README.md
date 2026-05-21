# Pet Adoption Platform
Our platform helps homeless pets find caring families through a simple, safe, and heartwarming adoption experience

backend url https://pickpet-backend.vercel.app

# Features
- user can get all pet data 
- user can adopt pet use this server
- user can see user requst or user can cancle her/his request

- admin can add pets
- admin can accept others users request
- admin can reject users request
- admin can delete and update his/her pet information

# Technology use
- node js 
- express js
- mongodb for database

# used packages
```bash
npm i cors
npm i express
npm i mongodb
npm i dotenv
npm i jose-cjs
```


# Api end points
get all pets
http://localhost:8000/all-pets

Search pet
http://localhost:8000/search?query=tommy

Delete
http://localhost:8000/delete-pet/:id

update pet
http://localhost:8000/update-pet/:id

create pet
http://localhost:8000/create-pet_details

get single pet
http://localhost:8000/single-pet/:id