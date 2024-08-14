const asyncHandler = require("express-async-handler");


exports.tasks_get = asyncHandler(async (req, res) => {
  console.log('req.body', req)
  const data = {
    "new": [
      {
        id: 5,
        title: "Project id 01",
        subtitle: "subtitle project id01"
      }
    ],
    "completed": [
      {
        id: 2,
        title: "Project id 02",
        subtitle: "subtitle project id02"
      },
      {
        id: 3,
        title: "Project id 03",
        subtitle: "subtitle project id03"
      },
      {
        id: 4,
        title: "Project id 04",
        subtitle: "subtitle project id04"
      }
    ],
    "in_progress": [
      {
        id: 1,
        title: "Project id 01",
        subtitle: "subtitle project id01"
      }
    ]
  }
  res.json(data)

  //res.send('<h1>Hello, Express.js Server!</h1>')
})

exports.create_task_post = asyncHandler(async (req, res) => {
  console.log('create_task_post route called')
  res.json(req.body)
})