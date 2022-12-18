var express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
var createError = require('http-errors')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')

//var bodyParser = require('body-parser');
//app.use(bodyParser.json());// support parsing of application/json type post data
//app.use(bodyParser.urlencoded({ extended: true }));//support parsing of application/x-www-form-urlencoded post data
//GraphQl with expressexpress-graphql
var { graphqlHTTP } = require('express-graphql')
var { buildSchema, graphql } = require('graphql')
//Here You Can Import All The Http EndPoint Source File Inside The Route Folder
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var jwtAuthenticationRouter = require('./routes/jwt_authentication')
var cheaprestobysavinduRouter = require('./routes/cheaprestobysavindu')
var googleLogin = require('./routes/googleLogin')
var mongooseBook = require('./mongodb/controllers/bookController')

// View Engine Setup
var app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.json())
app.use(
  express.urlencoded({ extended: false }),
) /**extended: true  =   content type :  form-data not support*   raw , x-ww-form-urlencodel support*/
app.use(cors({ origin: 'http://localhost:3008' }))
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//Here You Can Define All The Https/Http Endpoints
app.use('/', indexRouter) //http://localhost:5000/layout,error
app.use('/user', usersRouter) //http://localhost:5000/users
app.use('/jwt', jwtAuthenticationRouter) //http://localhost:5000/jwt/login
app.use('/api/cheapresto', cheaprestobysavinduRouter) //http://localhost:5000/api/cheapresto
app.use('/google', googleLogin) //http://localhost:5000/google/api/signin
app.use('/mongoose', mongooseBook) //http://localhost:5000/mongoose/book

mongoose
  .connect(
    'mongodb+srv://savindumongodb:35Cvo5apGYHvAMNY@cluster0.3j6vlx5.mongodb.net/sample_db1?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then((res) => console.log(res, '\n mongodb connected'))
  .catch((err) => console.log(err, 'mongodb connection have error!'))
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
  console.log('mongodb databse Connected successfully')
})

//GraphQl
const user_data = [
  { id: 1, name: '1savindu', age: 123 },
  { id: 2, name: '2savindu', age: 223 },
  { id: 3, name: '3savindu', age: 323 },
]
// Construct a schema, using GraphQL schema language
var typeDfs = buildSchema(`
  type Query {
    get_id: ID,
    get_name: String,
    get_age: Int,
    get_float: Float,
    get_bool: Boolean,
    get_listOfNum:[Int],
    get_argument_values(numDice: Int!): [Int]
    get_argument_values2(a: String!,b: Int!) : [String]
    get_argument_values3(a: String!,b: Int!) : [String]
    get_user_array_index(index: Int!): User
    get_user_find_by_id(id: ID!): User
    get_user_find_by_name(name: ID!): User
    get_same_age_users_filter_by_age(age: Int!): [User]

    id: ID!,
    name: String,
    age: Int,
    get_users: [User],  
  },

  type User {
    id: ID!,
    name: String,
    age: Int
  }
  
`)

// The root provides a resolver function for each API endpoint
var resolverr = {
  get_id: () => {
    return 1
  },
  get_name: () => {
    return 'I am a name'
  },
  get_age: () => {
    return new Date().getFullYear() - 1999
  },
  get_float: () => {
    return 10.22
  },
  get_bool: () => {
    return true
  },
  get_listOfNum: () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  get_users: () => {
    return [
      { id: 0, name: '0savindu', age: 123 },
      { id: 1, name: '1savindu', age: 123 },
      { id: 2, name: '2savindu', age: 223 },
      { id: 3, name: '3savindu', age: 323 },
    ]
  },
  get_argument_values: ({ numDice }) => {
    var output = []
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numDice || 6)))
    }
    return output
    //{ get_argument_values(numDice:5)}
  },
  get_argument_values2: ({ a, b }) => {
    return [a, b.toString()]
    //{ get_argument_values2(a:"savindu",b:23)}
  },
  get_argument_values3: (args) => {
    return [args.a, args.b.toString()]
    //{ get_argument_values2(a:"jone",b:23)}
  },
  get_user_array_index: (args) => {
    return user_data[args.index]
    //{get_user_array_index(index:0){id,name,age}}
  },
  get_user_find_by_id: (args) => {
    return user_data.find((item) => item.id == args.id)
    //{get_user_filter_by_id(id:2){id,name,age}}
  },
  get_user_find_by_name: (args) => {
    return user_data.find((item) => item.name == args.name)
    //{get_user_filter_by_id(name:"savindu"){id,name,age}}
  },
  get_same_age_users_filter_by_age: (args) => {
    return user_data.filter((item) => item.age > args.age)
    //get_same_age_users_filter_by_age(ahe:23){id,name,age}}
  },
}
app.use(
  '/graphql',
  graphqlHTTP({
    schema: typeDfs,
    rootValue: resolverr,
    graphiql: true,
  }),
)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
