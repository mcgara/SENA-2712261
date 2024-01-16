def cursos(curso: list[str] = []) -> list[str]:
    materia = input("\nIngrese una materia: ")
    curso.append(materia)
    print(f"Materia {materia} agregada al curso exitosamente.")
    opcion = input("\n¿Desea agregar otra materia? SI | NO: ").upper()
    if opcion in ["SI", "S", "YES", "Y"]: cursos(curso)
    elif not opcion in ["NO", "N"]: 
       print("\nError: Solo se puede seleccionar SI o NO")
       exit(1)
    return curso

# print("\nYo he estudiado: " + ", ".join(cursos()))

def numeros(lista_numeros: list[str] = []) -> list[str]:
    numero = input("\nIngrese un numero, si dijita 0 se termina: ")
    if not numero.isdigit(): 
       print("Error: Solo se aceptan numeros.")
       exit(1)
    if not numero == "0":
      lista_numeros.append(numero)
      print(f"Numero {numero} agregado exitosamente.")
      numeros(lista_numeros)
    return lista_numeros

print("\nLos numeros en la lista son:", ", ".join(numeros()))

