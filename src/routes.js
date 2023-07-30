const tasks = []

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      
      const body = {
        title: "Estudar node",
        description: "estudando nodejs blablabla"
      }

      tasks.push(body)

      return res.end(JSON.stringify(tasks))
    }
  }
]