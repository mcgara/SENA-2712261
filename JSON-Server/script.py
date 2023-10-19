import json

object = []

with open("./data.txt", "r", -1, "UTF-8") as file:
  names = file.readlines()
  id = 0
  for name in names:
    name_splited = name.split(" ")
    if len(name_splited) == 4: name_splited.insert(1, "")
    id += 1
    object.append(
      {
        "id": id,
        "nombres": {
          "primero": name_splited[0].capitalize(),
          "segundo": name_splited[1].capitalize()
        },
        "apellidos": {
          "primero": name_splited[2].capitalize(),
          "segundo": name_splited[3].capitalize()
        },
        "estado": name_splited[4],
        "correo": name_splited[0].capitalize() + name_splited[2].capitalize() + "@gmail.com"
      }
    )

with open("data_result.json", "w", -1, "UTF-8") as file_result:
  file_result.write(json.dumps(object))
