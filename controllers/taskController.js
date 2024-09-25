const asyncHandler = require("express-async-handler");

let data = {
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
  ],
  user_data: {
    id: 1,
    user_first_name: "Wade",
    user_last_name: "Wilson"

  }
}

exports.tasks_get = asyncHandler((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
})

exports.add_task_post = asyncHandler(async (req, res) => {
  
  data.new = [...data.new, ]
  res.json(req.body)
})