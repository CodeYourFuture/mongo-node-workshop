#Etza's Heroku Deployment Link
https://nameless-waters-65717.herokuapp.com/

# Node MongoDB Workshop
This is the exercise/homework repo alongside the Node/MongoDB class.

Fork and clone this repo. Then run `npm install` on the cloned directory. To run the application with hot reload (reloads when the files changes), run `npm run dev`.

# Homework
## Heroku
We expect you to deploy your application to heroku, and also push it to `origin` so that we can view your code.
- Add the link to Heroku website on the top of this README.

## Pull Request
Create a Pull Request with your changes and keep updating it based on your progress and the feedback of the mentors.
- Commit often, push and deploy. Then update the PR description.
- Make sure you notify mentors on Slack to review it.

## Code Quality
By this stage, we expect you to not just write code that solves the problem, but for the code to be elegant, modular and testable.

- DRY: Don't Repeat Yourself. Don't have any duplicate code, if you see that some code is repeated, extract it into a function (and pass the differences as arguments).
- Modularity: Do not put all your code in one big file. Make use of Node modules to put related logic in separate modules, and `require` them when needed.
- Naming: name your variables properly to reflect their use. The same applies for file and directory names. Also be consistent about the naming convention (camelCasedFileNames, file-names-with-dashes etc...)

# Tasks for Homework
## Link to Single post
- On the Home page, we display only the summary of a Post. We want the user to be able to click on a post, which will take them to a new page displaying the full contents of the post. The URL format should be `/posts/post_id` where post_id is the MongoDB _id field value.
> Read about [Route Parameters](https://expressjs.com/en/guide/routing.html#route-parameters) in ExpressJS to perform this task.

## Sorting functionality
- Add functionality allowing the user to toggle the order in which posts are displayed (from old to new, and vice versa)

## Search functionality
Create a page where users can search by post title
- Improve it to search by other fields as a stretch goal.

## CRUD
create, read, update, and delete (CRUD) are the four basic functions of persistent storage.
- Add functionality to be able to delete a post (UI/UX up to you - maybe a button or a link next to each post that takes you to a route that deletes the post or an AJAX call to an API endpoint to perform the DELETE operation)
- Add functionality to be able to edit a post (you might be able to reuse the same page you use for adding, but prepoulate the fields based on the selected post to edit)

## AJAX
You should have a Students API (if not create one based on this [data](https://airtable.com/shrhS7nKhzwmx5AqW)). Make an AJAX call to display the students information on the right side of the home page.
- Improve the UX to display [a spinner](http://www.ajaxload.info/) while the api is being called (maybe delibarately delay the call to show the spinner a little longer)
