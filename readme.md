# Challenge Automation NOS
Este repositorio contiene pruebas automatizadas para funcionalidades tanto de API como de Web, desarrolladas utilizando Playwright. El proyecto sigue buenas prácticas como el manejo de claves encriptadas, aislamiento de pruebas y modularidad. Además, se ha integrado Allure Reporting para la visualización de los resultados de las pruebas.


## Prerrequisitos
Antes de comenzar, asegura tener las siguientes instalaciones:

Node.js (version 16 or later)
npm (Node Package Manager)
Playwright browsers (will be installed during setup)

## Instalaciones
Clone the repository:
```
git clone https://github.com/yourusername/challenge-automation-nos.git
cd challenge-automation-nos

```

Instalación de dependecies:
```
npm install
```

Instalación de Playwright browsers:
```
npx playwright install
```

Set up your .env file: Create a .env file in the root of the project and add the following content:
```
SECRET_KEY=7b5880f7-a781-4b39-9ceb-f8e3bfbce32d
```

## Corrida de Tests

### Correr todos los Tests
Para correr todos los test:
``` 
npm test
```
### Correr solo API Tests
Para correr solo los API test:
```
npm test:api
```

### Correr solo test Web
Para correr solo los web:
```
npm run test:web
```

## GEneración de Reports
Para generar reportes:
````
npm run report
````

## Key Features

Clave encriptada: La SECRET_KEY se almacena en un archivo .env y se registra en un formato encriptado utilizando SHA256 antes de cada prueba. Esto asegura que la clave no sea visible en el código cumpliendo con los desafios planteados.

Entrada de datos desde Excel: El proyecto lee los datos de prueba directamente desde ./data/Datos-pruebas.xlsx utilizando la utilidad readExcel. Cada fila representa un caso de prueba.
Pense en dejarlo por fuera del repositorio pero para evitar mas pasos de instalacion, queda para descargar, puede er remplazado por otro con misma estructura.

Allure Reporting: Integrado para generar reportes detallados.

Proyectos en Playwright: Las pruebas están organizadas en proyectos separados de API y Web para mayor claridad y escalabilidad.