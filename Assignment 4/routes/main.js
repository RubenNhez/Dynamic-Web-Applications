// Route handler for forum web app

module.exports = function(app, forumData) {

    // Handle our routes

    // Home page
    app.get('/',function(req,res){
        res.render('index.ejs', forumData)
    });

    // About page
    app.get('/about',function(req,res){
        res.render('about.ejs', forumData);
    });

    // View Posts page
    app.get('/viewposts',function(req,res){
        // Query to select all posts from the database
        let sqlquery = `SELECT  * From vw_posts`;

        // Run the query
        db.query(sqlquery, (err, result) => {
          if (err) {
             res.redirect('./');
          }

          // Pass results to the EJS page and view it
          let data = Object.assign({}, forumData, {posts:result});
          console.log(data)
          res.render('viewposts.ejs', data);
        });
    });

//View User Page
    app.get('/viewusers/:user',function(req,res){

        let username = req.params.user;

        console.log(username);


        // Query to select all posts from the database
        let sqlquery = `SELECT * FROM vw_user WHERE username = '${username}'`;


        // Run the query
        db.query(sqlquery, (err, result) => {
          if (err) {
             res.redirect('./');
          }

          // Pass results to the EJS page and view it
          let data = Object.assign({}, forumData, {posts:result});
          console.log(data)
          res.render('viewusers.ejs', data);
        });
    });

    // View Topics
    app.get('/viewtopics/:topic',function(req,res){

        let topic_title = req.params.topic;

        console.log(topic_title);


        // Query to select all posts from the database
        let sqlquery = `SELECT * FROM vw_topicpost WHERE topic_title = '${topic_title}'`;


        // Run the query
        db.query(sqlquery, (err, result) => {
          if (err) {
             res.redirect('./');
          }

          // Pass results to the EJS page and view it
          let data = Object.assign({}, forumData, {posts:result});
          console.log(data)
          res.render('viewtopics.ejs', data);
        });
    });

    // List Users page
    app.get('/users',function(req,res){
        // Query to select all users
        let sqlquery = `SELECT * FROM vw_users`

        // Run the query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }   

            // Pass results to the EJS page and view it
            let data = Object.assign({}, forumData, {users:result});
            console.log(data)
            res.render('users.ejs', data);
        });                        
    });

    // List Topics page
    app.get('/topics',function(req,res){
        // Query to select all topics
        let sqlquery = `SELECT * FROM vw_topics`

        // Run the query       
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }

            // Pass results to the EJS page and view it
            let data = Object.assign({}, forumData, {topics:result});
            console.log(data)
            res.render('topics.ejs', data);
        });    
    });

    // Add a New Post page
    app.get('/addpost',function(req,res){
        // Set the initial values for the form
        let initialvalues = {username: '', topic: '', title: '', content: ''}

        // Pass the data to the EJS page and view it
        return renderAddNewPost(res, initialvalues, "") 
    });

    // Helper function to 
    function renderAddNewPost(res, initialvalues, errormessage) {
        let data = Object.assign({}, forumData, initialvalues, {errormessage:errormessage});
        console.log(data)
        res.render("addpost.ejs", data);
        return 
    }

    app.post('/postadded', function (req,res) {
         let params = [req.body.title, req.body.content, req.body.topic, req.body.username]
         let sqlquery = `CALL sp_insert_post(?,?,?,?)`
         db.query(sqlquery, params, (err, result) => {
         if (err) {
                return renderAddNewPost(res, req.body, err.message)
             }
             res.send('You post has been added to forum');
         });
    });


    // Search for Posts page
    app.get('/search',function(req,res){
        res.render("search.ejs", forumData);
    });

    // Search for Posts form handler
    app.get('/search-result', function (req, res) {
        //searching in the database
        let term = '%' + req.query.keyword + '%'
        let sqlquery = `SELECT * FROM vw_search WHERE  post_title LIKE ? OR post_content LIKE ?`

        db.query(sqlquery, [term, term], (err, result) => {
            if (err) {
                res.redirect('./');
            }
            // let searchData = Object.assign({}, forumData, {searchTerm : result})
            // console.log(searchData)
            // res.send("search-result.ejs", searchData);
            let data = Object.assign({}, forumData, {posts:result});
          console.log(data)
          res.render('search-result.ejs', data);
        });      
    });
}
