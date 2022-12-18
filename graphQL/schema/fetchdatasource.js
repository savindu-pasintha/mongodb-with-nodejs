var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//GraphQl with expressexpress-graphql
var { graphqlHTTP } = require('express-graphql');
var { buildSchema, graphql } = require('graphql');
//GraphQl with expressexpress-graphql
//import typeDefs from './graphQL/schema/typedefs';
//import resolvers from './graphQL/schema/resolvers';

//Appolo server with Graphql
//const { ApolloServer, gql } = require('apollo-server-express');

//Here You Can Import All The Http EndPoint Source File Inside The Route Folder
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jwtAuthenticationRouter = require('./routes/jwt_authentication');

var app = express();

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Here You Can Define All The Https Endpoints 
app.use('/', indexRouter); //http://localhost:5000/layout,error
app.use('/user', usersRouter); //http://localhost:5000/users
app.use('/jwt', jwtAuthenticationRouter); //http://localhost:5000/jwt/login



//GraphQl
const user_data = [{ id: 1, name: "1savindu", age: 123 }, { id: 2, name: "2savindu", age: 223 }, { id: 3, name: "3savindu", age: 323 }];
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
  
`);


// The root provides a resolver function for each API endpoint
var resolverr = {
    get_id: () => {
        return 1
    },
    get_name: () => {
        return "I am a name"
    },
    get_age: () => {
        return (new Date().getFullYear() - 1999)
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
        return [{ id: 0, name: "0savindu", age: 123 }, { id: 1, name: "1savindu", age: 123 }, { id: 2, name: "2savindu", age: 223 }, { id: 3, name: "3savindu", age: 323 }]
    },
    get_argument_values: ({ numDice }) => {
        var output = [];
        for (var i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numDice || 6)));
        }
        return output;
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
        return user_data[args.index];
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
        return user_data.filter((item) => item.age > args.age);
        //get_same_age_users_filter_by_age(ahe:23){id,name,age}}
    }

};

app.use('/graphql', graphqlHTTP({
    schema: typeDfs,
    rootValue: resolverr,
    graphiql: true,
}));



// Apolo server with graphql
// Construct a schema, using GraphQL schema language
/*const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
