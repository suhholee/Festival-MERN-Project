# Festival-MERN-Project

## Overview
This was my third project whilst enrolling on General Assembly’s Software Engineering Immersive Course. The assignment was to create a MERN stack application with my own database. Our group has decided to build an interactive website for users who are attending a festival. We provided them with information about the festival and allowed users to leave their marks (comments and attendance) throughout each of the stages.

## Requirements
- Build a full-stack application by making your own backend and your own front-end
- Use an Express API to serve your data from a Mongo database
- Consume your API with a separate front-end built with React
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
- Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
- Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers. ALLOW time for this.
- Be deployed online so it's publicly accessible.

## Timeframe
The timeframe given for this project was 10 days. I worked with [Tom Clegg](https://github.com/BesB0x) and [Eunyeong Jeong](https://github.com/spacejey) for this project.

## Technologies Used
- JavaScript
- HTML
- React
- SASS
- JSX
- Axios
- React-Router-Dom
- MongoDB
- Express
- Node
- DotEnv
- JSON Web Token
- Bcrypt
- VS Code
- Insomnia
- Trello
- Figma
- Git
- GitHub
- Netlify
- Cloudinary
- Zoom
- Slack

## Deployed Project Link
https://woozu-sounds.herokuapp.com/

Please login using the below account
- E-mail: woozu@email.com
- Password: pass

![Screen Grab of finished version](/client/src/images/woozu.gif)

## Plan
- The first step of planning was to choose a theme for the website. As we had a mutual love for music, we have decided to create a website designed specifically for people who are attending a music festival. In order to achieve this, we had to design a specific user experience that can allow attendees to gain information efficiently. 
- As the target for this website was those who are attending the festival, we decided that we need to validate those who have tickets. As we cannot actually let users buy the tickets for a fake festival, we made the tickets free and set registration as the way to get the free tickets, making those who have an account the ones who can access the website.
### Front-end
- Therefore, on the main page, we decided to have two ways to enter the website. First was to register and get the free ticket; the other was to login for those who already have an account.
- After the user registers/logs in, we have decided to move the user to the maps page, which has 3 stages. Each of us has chosen our favourite music genre (hip-hop, reggae, techno) and decided to make that as a specific stage. 
- Upon clicking each stage, the user is moved to the specific stage page which has information about the artists and a comment section below that the users can use to leave comments freely about the stage/artist.
### Back-end
- After we had a plan for how the front-end will look, we planned what the back-end will look like with schema models and controllers necessary for each route.
- The main schemas consisted of the Stages, Artists, and Users. The stages and artists schemas were planned to be set as a default database. (Specific keys referenced in the wireframe) 

  - Within the stage schema, comments were set as an embedded relationship as comments itself has components (owner, text, and likes). The owner component was a referenced relationship, referring to the user schema.
  - Within the artist schema, the stage name component was a referenced relationship, referring to the stage schema’s name.

- For the controllers and routers, we decided to use the CRUD (Create, Read, Update, Delete) method to GET, POST, PUT, and DELETE the necessary data.
- We delegated each other’s tasks as equally as possible. For example, I took on the stages schema, Tom with users, and Eunyeong with artists. Then, we decided to come together to check if there are any errors within each other’s work. For sections such as creating the seeding, we came together within the zoom call and worked together in these parts. Later on as some sections were greater in size than others, we decided to delegate tasks as we went on with each section. As the git branch leader, I was responsible for the main error checks and testing. Work was all done within the zoom call as we found it to be more efficient to ask each other questions immediately when we need each other.

### Wireframe & Trello Board
- We have used Figma to draw out our wireframe for the project as shown below. 
- Here is the link to our Figma wireframe: [Link](https://www.figma.com/file/kRu4u6XmA5mXmZ5vpAYloC/Project-3?type=design&node-id=0%3A1&t=ajFQDMRIivMpbXmb-1)

  ![Screen Grab of finished version](/client/src/images/wireframe.png)

- We have organised each other’s work by using our own Trello board: [Link](https://trello.com/invite/b/iiuKDL5y/ATTI8e15ada2230249f969017fd5ffc5fa61C541DE57/project-3)

  ![Screen Grab of finished version](/client/src/images/trello.png)

## Process
### Back-end
#### Models
- The first step of the server side would be creating the necessary schema models that will be later implemented within the controllers and routers. We equally divided the sections as I did the stages schema, Eunyeoung did the artists, and Tom did the users. The stages schema was the largest part of the server side as it not only needed to get all the stages and its information, but also add, edit, and delete comments.
- Within the stages.js file, the main schema was designated as the stageSchema. It consisted of three keys: name (name of the stage), text (short introduction of the stage), and comments. 
- The comments were linked to another schema called commentSchema which served as an embedded relationship with the stageSchema. The commentSchema consisted of three keys: text (the text component of what the users will leave as comments), likes (an array that the user ID of the user that has liked the comment), and the owner (used to check if the owner is allowed to edit or delete the comment). 
- The owner within the commentSchema and the user within the likesSchema were all referenced relationships with the User schema.

  ```js
  const commentSchema = new mongoose.Schema({
  text: { type: String, required: true,  maxlength: 300 },
  likes: { type: Array },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  }, {
  timestamps: true,
  })

  const stageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  attendance: { type: Array },
  comments: [commentSchema],
  })

  export default mongoose.model('Stage', stageSchema)
  ```

#### Default Database
- All of our group members came together and each created a database for the three stages, artists, and users.
- Artists were a total of 36, 12 from each stage, so that within the display, three artists are shown in one row.

#### Seed
- The default database will be added as a seed within the seed.js file and will be renewed and uploaded every time npm run seed is executed in the terminal. This was achieved through creating a script called seed within package.json and passing through ‘node db/seeds.js’. This will enable us to easily execute npm run seed.
- Along with using await Schema.create(schemaData), we have made a connection between the artist and stage which will be later utilised to add the specific artists that have the specific id of the stage. This was done through mapping the artistData and changing the artist’s stage key to the id of the stage.

#### Controllers
- Among the models, we needed controllers for each of them to either create, read, update, or delete the data. I decided to continue on with the model I made and make controllers for the stages and comments.

***Stages***
- The only controllers necessary for the stages was reading the entirety of the data and getting single stages, because it will be presented on the map page and each of the stage pages where it introduces the artists. I used the mongoose methods of find() and findById() to find the data and return it as JSON objects using res.json(). For getting the single stage, I have added an error which might occur when the id of the stage is not found.

  ```js
  // * Get all stages
  // Endpoints: /stages
  export const getStages = async (req, res) => {
    try {
      const stages = await Stage.find().populate('comments.owner')
      return res.json(stages)
    } catch (err) {
      return sendError(err, res)
    }
  }

  // * Get single stage
  // Endpoints: /stages/:id
  export const getSingleStage = async (req, res) => {
    try {
      const { id } = req.params
      const stage = await Stage.findById(id).populate('comments.owner')
      if (!stage) throw new NotFound('Stage not found')
      return res.json(stage)
    } catch (err) {
      return sendError(err, res)
    }
  }
  ```

***Comments***
- The comments had three controllers of creating, updating, and deleting as it is normal for users to add, edit, and delete the comment they wrote. These were a bit more complicated than the stages as the users need to be only able to add, delete, and edit their own comments, not others’ comments. Therefore, when the user adds a comment, the owner key is populated with the user’s information, so that it can be later recalled when the comment needs to be updated or deleted. For the update and delete controllers, the ID of the logged in user was called and if the owner of the comment equaled the logged in user, then they are able to edit and delete the comment.

  ```js
  // * Add Comment
  // Endpoint: /stages/:id/comments
  export const addComment = async (req, res) => {
    try {
      const { id } = req.params
      const stage = await Stage.findById(id).populate('comments.owner')
      if (!stage) throw new NotFound('Stage Not Found')
      const commentToAdd = { ...req.body, owner: req.loggedInUser }
      stage.comments.push(commentToAdd)
      await stage.save()
      return res.status(201).json(stage)
    } catch (err) {
      return sendError(err, res)
    }
  }

  // * Delete Comment
  // Endpoint: /stages/:stageId/comments/:commentId
  export const deleteComment = async (req, res) => {
    try {
      const { stageId, commentId } = req.params
      const loggedInUserId = req.loggedInUser._id
      const stage = await Stage.findById(stageId).populate('comments.owner')
      if (!stage) throw new NotFound('Stage not found')
      const commentToDelete = stage.comments.id(commentId)
      if (!commentToDelete) throw new NotFound('Comment not found')
      if (!commentToDelete.owner.equals(loggedInUserId)) throw new Unauthorized('Unauthorized')
      await commentToDelete.deleteOne()
      await stage.save()
      return res.sendStatus(204)
    } catch (err) {
      return sendError(err, res)
    }
  }

  // * Update Comment
  // Endpoint: /stages/:stageId/comments/:commentId
  export const updateComment = async (req, res) => {
    try {
      const { stageId, commentId } = req.params
      const loggedInUserId = req.loggedInUser._id
      const stage = await Stage.findById(stageId)
      if (!stage) throw new NotFound('Stage not found')
      const commentToUpdate = stage.comments.id(commentId)
      if (!commentToUpdate) throw new NotFound('Comment not found')
      if (!commentToUpdate.owner.equals(loggedInUserId)) throw new Unauthorized('Unauthorized')
      Object.assign(commentToUpdate, req.body)
      await stage.save()
      return res.json(commentToUpdate)
    } catch (err) {
      return sendError(err, res)
    }
  }
  ```

***Comment Likes***
- The likes needed an extra controller that edited the likes array within the comments schema every time the user liked the comment. The likes array adds and removes the ID of the logged in user every time the PUT route is run. Therefore, I figured out that a conditional needed to be set to see if the array includes the logged in user’s ID. If not, the PUT pushes the logged in user’s ID to the likes array. If the ID exists, which means the user has already liked the array, the PUT removes that user’s ID from the array. 
  ```js
  // * Update ID to likes key
  // Endpoint: /stages/:stageId/comments/:commentId/likes
  export const updateLikes = async (req, res) => {
    try {
      const { stageId, commentId } = req.params
      const loggedInUserId = req.loggedInUser._id
      const stage = await Stage.findById(stageId)
      if (!stage) throw new NotFound('Stage not found')
      const commentToUpdate = stage.comments.id(commentId)
      if (!commentToUpdate) throw new NotFound('Comment not found')
      const likesToUpdate = commentToUpdate.likes
      if (!likesToUpdate.includes(loggedInUserId)) {
        likesToUpdate.push(loggedInUserId)
      } else {
        likesToUpdate.splice(likesToUpdate.indexOf(loggedInUserId), 1)
      }
      await stage.save()
      return res.json(commentToUpdate)
    } catch (err) {
      return sendError(err, res)
    }
  }
  ```

***Users***
- The user controller was created for the profile page. Although this was decided later on the project, we decided that it would be the best experience for the users in that they can access their own information on the website by accessing their own comments and the stages they are attending on the profile page and for us as developers to learn how to make this most fundamental aspect of websites. Therefore, I took part in adding most of the necessary keys in the schema to make this work. As for comments, the user id was retrieved from the populated owner key in the comments. 
- For attendance, attendance was added within the stage schema. Similar to likes, attendance was set as an array of user ids, so a PUT request was set as the route. 

  ```js
  // * Update ID to attendance key
  // Endpoint: /stages/:id/attendance
  export const updateAttendance = async (req, res) => {
    try {
      const { id } = req.params
      const loggedInUserId = req.loggedInUser._id
      const stage = await Stage.findById(id)
      if (!stage) throw new NotFound('Stage not found')
      const attendanceToUpdate = stage.attendance
      if (!attendanceToUpdate.includes(loggedInUserId)) {
        attendanceToUpdate.push(loggedInUserId)
      } else {
        attendanceToUpdate.splice(attendanceToUpdate.indexOf(loggedInUserId), 1)
      }
      await stage.save()
      return res.json(attendanceToUpdate)
    } catch (err) {
      return sendError(err, res)
    }
  }
  ```

- Most importantly, to get the user information including username and email (deleted the hashed password when returned), the GET user route was created. 

  ```js
  // * GET SINGLE USER ROUTE
  // Endpoint: /users/:userId
  export const userSingle = async (req, res) => {
    try {
      const { userId } = req.params
      const user = await User.findById(userId)
      if (!user) throw new NotFound('User not found')
      return res.json(user)
    } catch (err) {
      sendError(res, err)
    }
  }
  ```

- We also decided that having the user set their own profile image would be a necessary setting to express themselves within the website. Therefore, an image schema was set as a string that has the cloudinary link of the image. My role for this section was to mainly implement the profile image to the necessary parts of the front-end (in the navbar and the profile page).

  ```js
  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
  })
  ```

- These controllers were added as routers at the end in router.js file within config with the corresponding routes for each controller with securing the route for the routes that need to work only when the user is logged in/approved.

### Front-end
#### App.js
- App.js served as the main router that connected all of the routes and its JavaScript components together. While working on the project, I found out that the when each page was loading, the necessary data were not called the first time the page was loaded, but the second time. Therefore, a getUser useCallback hook with an altered authenticated variable (mentioned in the Auth.js section below), which cached the value so that it does not need to be recomputed every time, needed to be passed down as a prop from App.js to be widely used in different components. This hook sets the user data within the user useState and is run within a useEffect.

  ```js
  const getUser = useCallback(async () => {
    try {
      const { data } = await authenticated.get(`/api/users/${loggedInUser()}`)
      setUser({ ...data })
    } catch (err) {
      console.log(err)
      setUserError(err.message)
    }
  }, [])

  useEffect(() => {
    getUser()
  }, [])
  ```

#### Auth.js
- Auth.js was created within the helpers folder to authenticate the user using its inherent token. First, the token was split in order to get the middle value, which is the payload. Within the payload, the expiry date (.exp) was used to see if the token is valid, which was done through the isAuthenticated function. This function was used to see whether the user was able to access specific routes within the webpage, as all of the users needed to be logged in to access the website.

  ```js
  export const isAuthenticated = () => {
    const payload = getPayload()
    if (!payload) return false
    const currentTime = Date.now() / 1000
    return currentTime < payload.exp
  }
  ```
- The remove token function was used when logging out the website, so that there is only one token stored in the local storage.

  ```js
  export const removeToken = () => {
    localStorage.removeItem(tokenName)
  }
  ```

- The authenticated variable was created to grab the token and authenticate the user when accessing the back end data. While creating the comments page, I found out that the token of the previously logged in owner was sent, which disallowed the user to send comments before reloading the page. In order to fix this, interceptors were used, which intercepts a request before being sent through and updates the config headers with the correct token. This allows the token to be already reset as the logged in user when the requests are made. This authenticated variable is connected to the useCallback in App.js, which allows the data to be loaded first time the page is loaded.

  ```js
  export const authenticated = axios.create()
  authenticated.interceptors.request.use(config => {
    // Updating config object to include an Authorization header
    config.headers['Authorization'] = `Bearer ${getToken()}`
    // Return updated config object
    return config
  })
  ```

- I also created the userIsOwner function to see whether the comment belongs to the owner so that they are able to edit or delete the comment.

  ```js
  export const userIsOwner = (comment) => {
    const payload = getPayload()
    if (!payload) return
    if (comment){
      return payload.sub === comment.owner._id
    }
  }
  ```

#### Navbar
- In order to specify the locations that need a navbar, the useLocation hook was used to check the current location of the page. As home, register, and login were the pages that did not need a navbar, a noNav array was created with the routes to these pages [‘/’, ‘/register’, ‘/login’]. Within the return statement in PageNavbar, a conditional was created to check if the location.pathname (which gets the location’s path) is not included within the noNav array, returning the PageNavbar so that it is shown within the paths that are not the home, register, or login page.

  ```js
   // ! Location variables
  const location = useLocation()
  const noNav = ['/', '/login', '/register']
  ...contiuned code
  return (
    <>
      {!noNav.includes(location.pathname) &&
      ...continued code
      }
    </>
  )
  ```

- Also I added a dropdown for the Stages link within the navbar, so that the users can access each stage through the navbar without returning to the map page repeatedly. This was done by importing the NavDropdown component from bootstrap. Within the component, I have used useState to set the state of showing the dropdown menus. The default state was set as false and every time the mouse is hovered, the boolean is changed to true then back to false so that when the mouse hovers, on the Stages navbar menu, it shows the page links to each stage. These changes in the state boolean were done within functions called showDropdown and hideDropdown and were passed within onMouseEnter and onMouseLeave. The stages were mapped to get the name and id as the text and key of each NavDropdown item.

  ```js
  const [ showStages, setShowStages ] = useState(false)
  const [ showProfile, setShowProfile ] = useState(false)

  const showStagesDropdown = (e) => {
    setShowStages(!showStages)
  }
  const hideStagesDropdown = (e) => {
   setShowStages(false)
  }
  const showProfileDropdown = (e) => {
    setShowProfile(!showProfile)
  }
  const hideProfileDropdown = (e) => {
   setShowProfile(false)
  }
  return (
    ...continued code

    <NavDropdown
      title="Stages"
      id="basic-nav-dropdown"
      show={showStages}
      onMouseEnter={showStagesDropdown}
      onMouseLeave={hideStagesDropdown}
      className={location.pathname.includes('/stages/') ? 'active navbar-link border-bottom stages-navbar' : 'navbar-link'}
    >
      {stages.length > 0 ?
        stages.sort((a, b) => a.name > b.name ? 1 : -1).map(stage => {
          const { _id, name } = stage
            return (
              <NavDropdown.Item key={_id} as={Link} to={`/stages/${_id}`}>{name}</NavDropdown.Item>
            )
        })
        :
        <>
          {stagesError ?
            <Error error={stagesError} />
            :
            <p>Loading...</p>}
        </>
      }
    </NavDropdown>
  )
  ```

#### Login
- As the webpage is constructed for users who attend the festival, when entering the main page, the users are allowed to enter the actual page through either registering or logging in. Therefore, among our group members, we divided the roles between ourselves so that each of us handles one component of the route that users will experience when entering the page. I decided to do the login page.
- For the login page, first, I created a handleChange function which sets the state of the typed email and password on each input. In order to save this, I used useState to set the state of each email and password form field and spread the values using e.target.name as the key (which can be either email or password) and e.target.value as the value of the set key. The function was then set within each input as an onChange event, so that it changes every time the email/password is input. 

  ```js
  const [ formFields, setFormFields ] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setLoginError('')
  }
  ```

- When actually submitting the email and password to the back end and checking if the database has the email and the matching password, I created another function called handleSubmit, which uses try and catch to check if the matching data is in the back-end, if not returning an error of “Invalid Email or Password. Try again.” Also, if the data matches when submitted, I used the “useNavigate” hook to navigate to the map page, allowing the users to access the actual information. 
- The token of the user was also added in the local storage with the key ‘Festival-MERN-Project’, which is later used in the auth.js file which authenticates the user in the front-end. This was crucial in authenticating the user to the maps and each stage page, as the users are not allowed to access those pages if they are not logged in. 
- Within this function, getUsers was run to update the user information every time the user was logged in. As logging in is the only route to enter the website, we set the useCallback hook in this page.

  ```js
  const handleSubmit = async (e) => {
   e.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formFields)
      localStorage.setItem('Festival-MERN-Project', data.token)
      console.log(data)
      navigate('/map')
      getUser()
    } catch (err) {
      console.log(err.message)
      setLoginError('Invalid Email or Password. Try again.')
    }
  }
  ```

#### Single Stages
- Within the single stages page, the main features included the stage title, the list of artists that had each of their information as cards and the comments section.
- In order to call the necessary data from the back end, we first called /api/stages/${stageId} to get the stage name and the comments data. As I figured that the get comments route is unnecessary as we can get it through getting stages, I removed that controller from the back end. This get call was used with the useCallback hook, which cached the value so that it does not need to be recomputed every time. Therefore, the getStages callback was passed on as props to the components that needed them (all the components related to comments which needed the stages schema to access each key value pair). Within the JSX, we first checked if the stage was present and passed the JSX components if the stage was present. Then, we displayed the stage name through stage.name.

  ```js
  const getStage = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/stages/${stageId}`)
      setStage(data)
    } catch (err) {
      console.log(err)
      setStageError(err.message)
    }
  }, [stageId])
  ```

- For the list of artists, we called the artist data using /api/artists and set the artists and its error using a react hook of useState. Using a ternary, we checked if the artists array existed using artists.length > 0, and if it did, I sorted the artists first alphabetically and mapped the array to the necessary react bootstrap cards. Within the card, there was the name of the artist, the image link, the stage id, the artist id, and the YouTube url. Each of these values were destructured and used within the map to create each artist card. For the YouTube url, I made a separate JavaScript component that used Modal Video, which is a feature in react that embeds the YouTube video as a pop up when the button is clicked. Booleans were used to check the status of whether the video was open or closed in order for the onClose and onClick events to operate.

  ```js
  useEffect(() => {
    !isAuthenticated() && navigate('/')
    const getArtists = async () => {
      try {
        const { data } = await axios.get('/api/artists')
        setArtists(data)
      } catch (err) {
        console.log(err)
        setArtistsError(err.message)
      }
    }
    getStage()
    getArtists()
  }, [stageId])
  ```

- Finally, the comments component was added at the end of the page, so that users can leave their comments about the stage freely. Details on the comments component will be elaborated below.

- We decided to add the attendance checker so that the users could check if they were attending the specific stage. Therefore, I created the handleAttendance function which had a PUT request that added the user’s id within the attendance array and used the useCallback getStages to recompute when the button was clicked. Also I made the text within the button change to “Attended” and “Are you attending” using a conditional.

  ```js
  const Attendance = ({ attendance, getStage, stageId }) => {

    // ! State
    const [ attending, setAttending ] = useState(false)

    // ! Execution
    const handleAttendance = async (e) => {
      e.preventDefault()
      try {
        await authenticated.put(`/api/stages/${stageId}/attendance`)
        getStage()
        setAttending(!attending)
      } catch (err) {
        console.log(err)
      }
    }

    return (
      <div className='attendance'>
        <button className='attendance-button' onClick={(e) => handleAttendance(e)}>{includesUserId(attendance) ? 'Attended!' : 'Are you attending?' }</button>
        <p>Total Attendance: {attendance.length}</p>
      </div>
    )
  }
  ```

- The conditional was done by calling the includesUserId function within helpers.js. I created this function which passed down an array parameter and checked whether the array had the user id retrieved from the payload as one of its variables. This was done in a similar format with the likes button.

  ```js
  export const includesUserId = (array) => {
    const payload = getPayload()
    if (!payload) return
    if (array) {
      return array.includes(payload.sub)
    }
  }
  ```

#### Comments
- The comments section was divided into four major sections: post comment box, edit comment, delete comment, and the like button. All of these features needed authentication. Therefore, the authenticated variable from auth.js was used when calling the data. My role for this section was to make the edit button work, handle all of the errors that appeared within all of the features of the code, and restructure the sections into components so that each comment and the buttons/functions within can be targeted separately within the map. In order to fix these errors, I needed a clear and thorough understanding of what each function did and how it was connected to the JSX component.

- For the post comment box, we needed two functions that handle the change within the comment and the submit button which was set using two states: newComments which handled the new input comment and postError which handled the error that might occur while typing in the comments. The handleChange function spreaded the input text within the newComments state using e.target.value to continuously update the newComment state as the input text. Because there might have been errors within the postErrors as there might have been comments that were submitted empty or the text is over 300 letters (set within the comments schema as the maxlength), the postError was reset as empty. For handleSubmit, a PUT request was made with the authenticated variable to pass the newComments to the comments schema with the user information. Then, the text was reset as an empty string. handleSubmit was run on onSubmit within the bootstrap column and handleChange was run on the textarea element.

  ```js
  // ! Executions
  const handleChange = (e) => {
    setNewComment({ ...newComment, text: e.target.value })
    setPostError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authenticated.post(`/api/stages/${stageId}/comments`, newComment)
      setNewComment({ text: '' })
      getStage()
    } catch (err) {
      console.log(err.message)
      setPostError(' •–• Your text is too long or there is no text input. •–• ')
    }
  }
  ```

- For the uploaded comment boxes, the stage.comments array was mapped to create each comment box. Within the map, we destructured each comment with the key values that we needed. Then, conditionals were made to check if the user was the owner of the box by checking the payload and the owner id of the comment. If so, the JSX component displayed the commentBox component which had the edit and delete button. If not, it just displayed the username, comment, and the likes component. We first had all of the post comment input box and each comments container within one JavaScript file. This caused chained issues as the mapped array did not target the specific comment when the edit, delete, save edit, and like buttons were run. Therefore, like the video modal above, I decided to make the edit/delete(CommetBox.js) and like(Likes.js) to each be a JavaScript component which would target specific comment boxes and fix this error. 

  ```js
  {stage.comments ?
    stage.comments.map(comment => {
      const { text, likes, owner: { username }, _id } = comment
      return (
        <Fragment key={_id}>
          {userIsOwner(comment) ?
            <CommentBox username={username} _id={_id} text={text} getStage={getStage} stageId={stageId} likes={likes} />
            :
            <div className='comment-section'>
              <h4 className='user-name'>@{username}</h4>
              <p className='posted-comments'>{text}</p>
              <Likes likes={likes} getStage={getStage} stageId={stageId} _id={_id} />
            </div>
          }
        </Fragment>
      )
    })
    :
    <>
      {stageError ?
        <Error error={stageError} />
        :
        <Spinner />
      }
    </>
  }
  ```

- Within the CommentBox component, necessary props (username, _id, text, likes, getStage, stageId) were passed down from the Comments.js file. First, the edit button had similar functions with post comments, except here a PUT route was used. When we were having a hard time figuring out how to get the id of the comment when handleSubmit is run, I decided to use a parameter and use the _id that was passed down as a prop when destructured within the mapped stages.comments array.

  ```js
  const handleSubmitEdit = async (e, id) => {
    e.preventDefault()
    try {
      await authenticated.put(`/api/stages/${stageId}/comments/${id}`, editedComment)
      setEditedComment({ text: '' })
      getStage()
      setEditCheck(false)
    } catch (err) {
      console.log(err.response)
      setEditError(' •–• Your text is too long or there is no text input. •–• ')
    }
  }

  return (
    ...continued code
    <div className='comment-section'>
      {editCheck ?
        <Container>
          <Col as='form' onSubmit={(e) => handleSubmitEdit(e, _id)}>
            <Col className='edit-box'>
              <input type='text' name='edit-comment' className='edit-input' onChange={handleChangeEdit} value={editedComment.text}/>
              <button className='save-button'>Save</button>
              {editError && <Error error={editError}/>}
            </Col>
          </Col>
        </Container>
        :
        <p className='posted-comments'>{text}</p>
      }
      <Likes likes={likes} getStage={getStage} stageId={stageId} _id={_id} />
    </div>
  )
  ```

- As there needed to be an edit toggle that opens and closes the edit text input and a save edit button that saves the edited text, I differentiated these two buttons. The toggle was set with a useState boolean which changes every time the button was clicked (onClick). 

  ```js
  const handleEdit = () => {
    setEditCheck(!editCheck)
    setEditError('')
  }

  ...continued code

  return (
    ...continued code

    <div className='top-buttons'>
      <button className='edit' onClick={(e) => handleEdit(e)}>Edit</button>
      <button className='delete' onClick={(e) => handleDelete(e, _id)}>Delete</button>
    </div>
  )
  ```

- The function, handleDelete, used the DELETE route to remove the comment from the stage.comments array.

  ```js
   const handleDelete = async (e, id) => {
    try {
      await authenticated.delete(`/api/stages/${stageId}/comments/${id}`)
      alert('Do you want to delete your comment?')
      getStage()
    } catch (err) {
      console.log(err)
    }
  }
  ```

- Finally, each of these functions had the getStage callback which in order to recompute getting the stages when these functions were run.

- The Likes.js component was set in a similar way with the attendance component.

#### Profile
- Tom set the basis of Profile.js and Eunyeong set ProfileImage.js. There needed to be some improvements including error handling and some attributes including the display of the attendance of that user. The main error was that the image wasn’t updated on the Navbar and when uploaded on the profile page. This was due to the getUser callback not running when the image was uploaded. Therefore, the getUser callback was passed on as props when the post request was made.

  ```js
  try {
    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
    await authenticated.put(`/api/users/${userId}/profile`, { image: data.secure_url })
    getUser()
  } catch (err) {
    console.log(err)
    setUserError(err.message)
  }
  ```

- Whilst fixing these errors, I added a dropdown within the navbar for the profile page, adding a username as the top dropdown text if the user had no images or a user image when they had added the image. The items were linked to the profile page and the logout page.

  ```js
  <NavDropdown
    title={ 
      user.image ?
        <div>
          <img className={location.pathname === `/users/${loggedInUser()}` ? 'navbar-image-active' : 'navbar-image'} src={user.image} />
        </div>
        :
        <>
          {userError ?
            <Error error={userError} />
            :
            <p className={location.pathname === `/users/${loggedInUser()}` ? 'navbar-username-active' : 'navbar-username'}>@{user.username}</p>
          }
        </>
    }
    id="basic-nav-dropdown" 
    show={showProfile}
    onMouseEnter={showProfileDropdown} 
    onMouseLeave={hideProfileDropdown}
    className={location.pathname === `/users/${loggedInUser()}` ? 'active navbar-link border-bottom' : 'navbar-link'}
  >
    <NavDropdown.Item to={`/users/${loggedInUser()}`} as={Link}>Profile</NavDropdown.Item>
    <NavDropdown.Item to="/" as={Link} onClick={handleLogout && hideProfileDropdown}>Logout</NavDropdown.Item>
  </NavDropdown>
  ```

- The attendance checks were done using the includesUserId function also. If the attendance array includes the logged in user’s id, the page displays “Attended” on the specific stage box. If not, it displayed “Not Attended”

#### Error Handling
- I added all of the possible errors that might occur by using ternary conditionals within each JSX component. For the errors that might occur through the getUser callback from App.js was passed through as props. In other places, errors were passed down as props when necessary.
- I also cleaned the code at the end so that the right names and standards were set within our code.

#### CSS
- We mainly used class components to target the specific section or div we want to style. My job was to style the register, login, navbar, and the profile page. The key style for me was the navbar which displayed the image/username of the user as a dropdown for the links to the profile page and the logout button.

  ![Screen Grab of finished version](/client/src/images/profile.png)

## Challenges and Bugs
### Challenges
- The main technical challenge I faced was mainly through learning new concepts along the way. For example, there was the inspector when authenticating the user and the useCallback function. It was a novel concept for all of our group members so we took time searching and trying various ways to find the problem and figure out that it was connected to updating the token. Although we had to learn the new concept in order to make it work, but It was a great experience coming together and trying to figure out what the problem was.

- Although we set a few of our goals as stretch goals such as the profile page, I absolutely wanted to complete all of them before the deadline because they seemed to be necessary elements of an application of this type. Although we were very happy to accomplish these goals as a result of the project, other members felt like it may have been too much for their workload. Therefore, I learned that setting the right expectations within the group is one of the most important aspects when working towards the same goal.

### Bugs
- The profile name/image on the navbar seems to work when I tested in my localhost server, but it is not working on the deployed version when rendered in the beginning. The error should be resolved with the useCallback getUser in App.js as it is passed down to PageNavbar.js as a prop, getting the user information every time the page is loaded. This works in my local testing server but not in the deployed page, which might mean there might be either problems with the environment variables or CORS policy, but it might be due to other potential reasons. As it works well when the page is refreshed, please take this in consideration. I will continue to find a way to solve the issue.

## Wins and Takeaways
### Wins
- I learned how much details were important in coding. Although some code might look clean, continuous testing was very important to catch the bugs that could hinder the way we set our application to be. As the main error handler and tester of the group, I enabled myself to be very detailed about every line of the code and reread numerous times. I believe that this enabled me to not only learn more concepts, but also the attitude a good software engineer needs to have.

- As it was my first team project during the course, it was a great experience to learn how a team works when heading towards the same goals. Sometimes it felt like I had higher expectations for the project than the others in the group. I believe that this was a win for me because it allowed me to work on more functions, test more to get all the errors, and learn more about different aspects of creating a MERN application. I also think my high expectations boosted my other teammates' ability to work and learn more on different functions.

- Also, I learned how to organise the project within the group using the Trello board. I was the leader of the board as I added tasks and moved them around when they were at different statuses. This helped the group in setting priorities within the tasks and organised our roles within the group.

### Takeaways
- The main learning I have gained from this project was the importance of different features such as useCallback, interceptors, props, and components. These features allowed the application to use the minimum amount of requests, making it have cleaner and more efficient functionality. As efficient functionality directly affects the efficient running of the application, I have learned how to restructure the code and make it clear and as efficient as I was able to. 

- Also, these features led to long discussions and team coding which helped my problem solving ability and team working when stuck with an error. Especially with props and components, I was able to figure out that this was the best way to target specific elements within the function, causing the chained errors to be solved. I was very proud of myself to reach this solution and I felt that I was step-by-step becoming a better software developer while encountering and winning against these problems.

## Future Improvements
- An improvement that can be made is with the error within the comment text box. Two errors that exist are when the text is not input and when it is over 300 letters. However, the same text is input. It would be best to have different error texts for different errors.

- The food stalls were set as a stretch goal. We decided that the profile page was a priority as the food stalls can be done in a similar way as the stages requests. However, in the future, it would be good to have these features within the application.
