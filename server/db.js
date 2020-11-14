const Sequelize = require('sequelize');
const sequelize = new Sequelize('workoutlog', 'postgres', 'Louzer900!', {
    host: 'localhost',
    dialect: 'postgres' 
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to log postgres database');
    },
    function(err){
        console.log(err)
    }
)
module.exports = sequelize;