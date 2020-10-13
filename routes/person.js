const express = require("express");
const router = express.Router();
const Person=require('../models/Person');

//test
router.get('/test',(req,res)=>{
    res.send("tested")
})

// 1-create One person 
router.post("/createOne",(req,res)=>{
    const {name,age,favoriteFoods}=req.body
    const newPerson=new Person({
        name,age,favoriteFoods
    })
    newPerson.save()
    .then(persons=>res.send(persons))
    .catch(err=>console.log(err))
}
)
//2-create many persons
router.post("/createMany",(req,res)=>{
    Person.create(req.body)
    .then(persons=>res.send(persons))
    .catch(err=>console.log(err))
    
}
)
//3- find all persons 

router.get("/all",(req,res)=>{
    Person.find({})
    .then(persons=>res.send(persons))
    .catch(err=>console.log(err))
    
     
 }
 )
 //4-Find only person by food
 router.get("/:favoriteFoods",(req,res)=>{
    const {favoriteFoods}=req.params;
    Person.findOne({favoriteFoods})
    .then(persons=>res.send(persons))
    .catch(err=>console.log(err))
     
 })
 //5-Find  person by id
 
 router.get( "/findby/:_id",( req , res ) => {
    const  {_id} = req.params ;
    Person.findOne({ _id })
    .then( persons => res.send( persons ) )
    .catch(err=>console.log(err))
     
 })
 //6-Find person by id , update favoriteFoods then save 
 router.put("/update/:_id",(req,res)=>{
    const {_id}=req.params
    const {favoriteFoods}=req.body;

    Person.findById({_id},(err,data)=>{

        if(err){console.log(err)}
        else {data.favoriteFoods.push(favoriteFoods)};

        data.save((err,data)=>{
          if(err){console.log(err)}
          else {console.log(data),res.send(data)}
        }) 
     
 })
});

//7-find a person by name,update his age
router.put("/UpdateAge",(req,res)=>{
    const {name,age}=req.body
    Person.findOneAndUpdate({name},{age},{new: true} ,(err,data)=>{
        if(err){console.log(err)}
        else{console.log(data);res.send(data)}                   
        })
    
    })
    //8-delete Person
    router.delete("/deletePerson/:_id",(req,res)=>{
        const{_id}=req.params
        Person.findOneAndDelete({_id})
        .then( persons => res.send( persons ) )
    .catch(err=>console.log(err))
    })
    //9-delete many persons with specified name with model.remove()   
 router.delete("/remove-many",(req,res)=>{
    const {name}=req.body;
    Person.remove({name} ,(err,data)=>{
        if(err){console.log(err)}
        else{console.log(data);res.send(data)}                   
        })
    
    })
    //10-find peoples who like burrito,sort them by name,limit the result to 2 documents and hide age field
router.get("/query/:favoriteFoods",(req,res)=>{
    const {favoriteFoods}=req.params;
    Person.find( { favoriteFoods: { $all: [ favoriteFoods] } })
        .sort({name:'asc'})
        .limit(2)
        .select('-age')
         .exec((err,data)=>{
    if(err){console.log(err)}
    else{console.log(data);res.send(data)}
  })
    
    })

module.exports=router