const express = require('express')
const mustacheExpress = require('mustache-express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

let movies = []

app.use(bodyParser.urlencoded({extended: false}))

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set("view engine", "mustache")

app.use('/moviesite',express.static('css'))

app.post('/filter', function(req, res){
    let genre_list = []
    let genre = req.body.selectedGenre
    console.log(genre)
    genre_list = movies.filter(function(movie){
        return movie.genre == genre
    }) 
    console.log(genre_list)
    
    res.render('index', {movieList: genre_list})
    

})

app.get('/', function(req, res){
    res.render('index', {movieList: movies})
})

app.post('/delete-movie', function(req, res){
    let name = req.body.movieName
    console.log(name)
    movies = movies.filter(function(movie){
        
        
        return movie.title != name
    })
    res.redirect('/')
})

app.post('/add-movie',function(req,res){
    let title = req.body.movie_name
    let genre = req.body.genre
    let description = req.body.description
    let url = req.body.url

    movies.push({title: title, description: description, genre: genre, url: url})

    res.redirect('/')
})

app.listen(port, function(){
    console.log("Server is running... ")
})
