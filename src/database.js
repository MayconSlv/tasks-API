import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() =>{
        this.#persist()
      })
  }
  
  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  create(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      for (let prop in data) {
        this.#database[table][rowIndex][prop] = data[prop]
      }
      this.#database[table][rowIndex].id = id

      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)
    
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

  complete(table, id, completed_time) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex].completed_at = completed_time
      this.#persist()
    }
  }
}
