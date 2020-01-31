const Blogs = require('../models/blogs');
const Blogs_category = require('../models/blogs_category');

// blogs list
exports.blogs_list = function (req, res) {
    res.locals = {  title: 'Blog List' };
    try{
        Blogs.findAll({ include:[
                {
                    model: Blogs_category
                }
            ] }).then(blogs => {
            console.log("All blogs:", JSON.stringify(blogs, null, 4));
            // res.json(blogs);
            return res.render('Blogs/blogs_list', {
                status: 200,
                data: blogs,
                message: "blogs fetched successfully."
            })
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "Blogs fetching failed."
            })
        });
    } catch (exception){
        console.log("An exception occured, please contact the administrator.", exception);
    }
};

// add BLOGS get
exports.add_blogs =  function (req, res) {
    res.locals = {  title: 'Add Blogs' };
    try{
        Blogs_category.findAll({ }).then(blogs_category => {
        console.log("All blogs_category:", JSON.stringify(blogs_category, null, 4));
        return res.render('Blogs/add_blogs', {
            status: 200,
            data: blogs_category,
            message: "blogs_category fetched successfully."
        })
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
        return res.json({
            status: 500,
            data: err,
            message: "company fetching failed."
        })
    });
    } catch (exception){
        console.log("An exception occured, please contact the administrator.", exception);
    }
};

//add blogs post
exports.add_blogs_post =  (req, res) =>{
    res.locals = {  title: 'Add Blogs' };
    Blogs.create(
        {
            user_id: 1,
            blogs_title: req.body.blogs_title,
            blogs_description: req.body.blogs_description,
            blogs_post_date : req.body.blogs_post_date,
            blogs_category_id: JSON.stringify(req.body.blogs_category_id ),
            blogs_image: req.file.filename
        }
        ).then(blogs => {
            console.log("New Blog's auto-generated ID:", blogs.blogs_id);
            return res.redirect('/blogs-list');
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "New Blogs creation failed."
            })
        }).catch((exception) => {
            console.log("An exception was encountered during the synchronization", exception);
    })
};

// blogs delete

exports.delete_blogs = function (req, res){
    console.log(`Attempting to destroy a blog with blogs_id ${req.params.blogs_id}`);
    Company.destroy({
        where: {
            blogs_id: req.params.blogs_id
        }
    }).then((result) => {
        if(result){
            console.log("The blog was deleted.", result);
            return res.json({
                status: 200,
                data: result,
                message: "blog delete successful."
            })
        } else {
            console.log("blog delete failed.", result)
            return res.json({
                status: 404,
                data: result,
                message: "blog delete failed, no record found to delete."
            })
        }
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
        return res.json({
            status: 500,
            data: err,
            message: "blog deletion failed."
        })
    });
};

// blogs category list
exports.blogs_category =  function (req, res) {
    res.locals = {  title: 'Blog Category' };
    try{
        Blogs_category.findAll({ }).then(blogs_category => {
        console.log("All blogs_category:", JSON.stringify(blogs_category, null, 4));
        return res.render('Blogs/blogs_category', {
            status: 200,
            data: blogs_category,
            message: "blogs_category fetched successfully."
        })
    }).catch(err => {
    console.error('Unable to connect to the database:', err);
        return res.json({
            status: 500,
            data: err,
            message: "company fetching failed."
        })
    });
    } catch (exception){
            console.log("An exception occured, please contact the administrator.", exception);
    }
};



// add blogs category get
exports.add_blogs_category =  function (req, res) {
    res.locals = {  title: 'Add Blogs Category' };
    res.render('Blogs/add_blogs_category');
};




//add blogs category POST 


exports.add_blogs_category_post =  function (req, res) {
    Blogs_category.create(
            req.body
        ).then(blogs_category_name => {
            console.log("New Blog Category's auto-generated ID:", blogs_category_name.blogs_category_id);
            return res.redirect('/blogs-category');
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            return res.json({
                status: 500,
                data: err,
                message: "New Blogs Category creation failed."
            })
        }).catch((exception) => {
            console.log("An exception was encountered during the synchronization", exception);
    })
};


//blog_catgory delete

exports.delete_blogs_category = function (req, res){
    console.log(`Attempting to destroy a company with blogs_category_id ${req.params.blogs_category_id}`);
    Company.destroy({
        where: {
            blogs_category_id: req.params.blogs_category_id
        }
    }).then((result) => {
        if(result){
            console.log("The blog category was deleted.", result);
            return res.json({
                status: 200,
                data: result,
                message: "blog category delete successful."
            })
        } else {
            console.log("blog category delete failed.", result)
            return res.json({
                status: 404,
                data: result,
                message: "blog category delete failed, no record found to delete."
            })
        }
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
        return res.json({
            status: 500,
            data: err,
            message: "blog category deletion failed."
        })
    });
};