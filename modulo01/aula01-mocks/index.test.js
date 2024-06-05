const { error } = require("./src/contants");
const File = require("./src/file")
const assert = require("assert")

  // IFEE
  ; (async () => {
    {
      const filePath = "./mocks/empty-file-invalid.csv"
      const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
      const result = File.csvToJson(filePath)
      await assert.rejects(result, expected)
    }

    {
      const filePath = "./mocks/invalid-header.csv"
      const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
      const result = File.csvToJson(filePath)
      await assert.rejects(result, expected)
    }

    {
      const filePath = "./mocks/five-items-invalid.csv"
      const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
      const result = File.csvToJson(filePath)
      await assert.rejects(result, expected)
    }

    {
      const filePath = "./mocks/three-items-valid.csv"
      const expected = [
        {
          "id": 1,
          "name": "Gabriel da silva",
          "profession": "developer",
          "age": 120
        },
        {
          "id": 2,
          "name": "Joao da silva",
          "profession": "manager",
          "age": 20
        },
        {
          "id": 3,
          "name": "Marcos da silva",
          "profession": "manager",
          "age": 22
        }
      ]
      const result = await File.csvToJson(filePath)
      assert.deepEqual(result, expected)
    }
  })()