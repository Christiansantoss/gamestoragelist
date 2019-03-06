const path = require('path');

// ============ Express ============ 
const express = require('express');
const app = express();

// ============ Mongoose ============ 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gamestorage_db')
const GameSchema = mongoose.Schema({
    name: { type: String,  required: [true, 'Name is required.' ], minlength: [3, 'Name must be at least 3 characters long.']},
    esrb: { type: String,  required: [true, 'Esrb is required.' ], minlength: [1, 'Esrb must be at least 1 characters long.']},
    description: { type: String,  required: [true, 'Description is required.' ], minlength: [3, 'Description must be at least 3 characters long.']},
    genre1: { type: String, required: [true, 'Genre1 is required.'], minlength:[3, 'Genre1 must be at least 3 characters long.']},
    genre2: { type: String, required: [true, 'Genre2 is required.'], minlength:[3, 'Genre2 must be at least 3 characters long.']},
    score: { type: String, required: [true, 'Score is required.'], minlength:[3, 'Score must be at least 3 characters long.']}

    });
 mongoose.model('Game', GameSchema);
const Game = mongoose.model('Game');


// ============ Body Parser ============ 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ============ Static Routes ============ 
app.use(express.static(path.join(__dirname, "Angular-Project/dist/Angular-Project")));

// ============ Routes ============ 
// Get All
app.get('/api/games', function (request, response) {
    console.log("Server > app.get /api/gets");
    Game.find({}, function(err, games) {
        response.json(games);    
    })
})
// Get One
app.get('/api/games/:id', function (request, response) {
    Game.findById(request.params.id, function(err, game){
        if(game){
            response.json(game);
        } else {
            response.json(false);
        }
    }) 
})
// Update
app.put('/api/games/:id', function (request, response) {
    Game.findByIdAndUpdate(request.params.id, request.body, {runValidators:true}, function(err, data){
        if (err) {
            
            response.json({status: false, error: err});
        } else {
            response.json({status: true});
        }
    })
})
// Create
app.post('/api/games', function (request, response) {
    const gameInstance = new Game(request.body);
    gameInstance.save(function(err){
        if (err) {
            
            response.json({status: false, error: err});
        } else {
            response.json({status: true});
        }
    })

})
// Delete
app.delete("/api/games/:id", function(request, response) {
    Game.deleteOne({_id: request.params.id}, function(err, data){
        response.json(true);
    })
})


app.all("*", function(request, response){
    response.sendFile(path.resolve("./Angular-Project/dist/Angular-Project/index.html"));
})

// ============ Server ============ 
app.listen(8000);