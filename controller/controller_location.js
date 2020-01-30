const Country = require('../models/country');
const State = require('../models/state');
const City = require('../models/city');
// require('../models/Associations')();

// Country.hasMany(State, { foreignKey: "country_id"});
// State.belongsTo(Country, { foreignKey: "country_id"});

// Country LIST

exports.country_list = function (req, res) {
    res.locals = {  title: 'Country' };
    try{
         Country.findAll({ }).then(country => {
            console.log("All Country:", JSON.stringify(country, null, 4));
            return res.render('Location/country', {
                status: 200,
                data: country,
                message: "Country fetched successfully."
            })
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "Country fetching failed."
            })
        })
    }
    catch (exception){
        console.log("An exception occurred, please contact the administrator.", exception);
    }
};

// Add country get

exports.add_country = function (req, res) {
    res.locals = {  title: 'Add Country' };
    res.render('Location/add_country');
};

// Add country post

exports.add_country_post = function (req, res) {
    res.locals = {  title: 'Add Country' };
    try{
        Country.create(req.body)
            .then(country => {
                console.log("New Country's auto-generated ID:", country.country_id);                if(!country.length){
                    res.redirect('/country')
                }
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "Country fetching failed."
            })
        })
    }
    catch (exception){
        console.log("An exception occured, please contact the administrator.", exception);
    }
};

// State LIST

exports.state_list =  function (req, res) {
    res.locals = {  title: 'State' };
    try{
          State.findAll({  
            include: [
            {
                model: Country
            }
        ]}).then(state => {
            console.log("All States:", JSON.stringify(state, null, 4));
            return res.render('Location/state', {
                status: 200,
                data: state,
                message: "State fetched successfully."
            })
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "State fetching failed."
            })
        })
    }
    catch (exception){
        console.log("An exception occurred, please contact the administrator.", exception);
    }
};

// Add state get

exports.add_state = function (req, res) {
    res.locals = {  title: 'Add State' };
    try{
        Country.findAll({ }).then(country => {
            console.log("All Country:", JSON.stringify(country, null, 4));
            return res.render('Location/add_state', {
                status: 200,
                data: country,
                message: "Country fetched successfully."
            })
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
        return res.json({
            status: 500,
            data: err,
            message: "Country fetching failed."
        })
    })
}
catch (exception){
    console.log("An exception occurred, please contact the administrator.", exception);
}
};

// add state post

exports.add_state_post = function (req, res) {
    res.locals = {  title: 'Add State' };
    try{
        State.create(req.body)
            .then(state => {
                console.log("New state's auto-generated ID:", state.state_id);                
                if(!state.length){
                    res.redirect('/state')
                }
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "state fetching failed."
            })
        })
    }
    catch (exception){
        console.log("An exception occured, please contact the administrator.", exception);
    }
};

//CITY LIST

exports.city_list = function (req, res) {
    res.locals = {  title: 'City' };
    try{
          City.findAll({  
            include: [
            {
                model: State,
                include: [
                {
                    model:Country
                }
            ]
        }
        ]
            // include: [
            //     {
            //         model:Country
            //     }
            // ]
    }).then(city => {
            console.log("All Cities:", JSON.stringify(city, null, 4));
            return res.render('Location/city', {
                status: 200,
                data: city,
                message: "City fetched successfully."
            })
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "State fetching failed."
            })
        })
    }
    catch (exception){
        console.log("An exception occurred, please contact the administrator.", exception);
    }
};



// Add city get
exports.add_city = function (req, res) {
    res.locals = {  title: 'Add City' };

    try{
        State.findAll({  }).then(state => {
            // console.log("All State:", JSON.stringify(state, null, 4));

        Country.findAll({  }).then(country => {
            // console.log("All Country:", JSON.stringify(country, null, 4));
            return res.render('Location/add_city', {
                status: 200,
                data: country,
                data1: state,
                message: "Country fetched successfully."
            })
        })
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
        return res.json({
            status: 500,
            data: err,
            message: "Country fetching failed."
        })
    })
}
catch (exception){
    console.log("An exception occurred, please contact the administrator.", exception);
}
};


// add city post

exports.add_city_post = function (req, res) {
    res.locals = {  title: 'Add City' };
        console.log(req.body);
    try{
        console.log(req.body);
        City.create(req.body)
            .then(city => {
                console.log("New city's auto-generated ID:", city.city_id);                
                if(!city.length){
                    res.redirect('/city')
                }
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "city fetching failed."
            })
        })
    }
    catch (exception){
        console.log("An exception occured, please contact the administrator.", exception);
    }
};
