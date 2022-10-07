# Ayudantía 5

En esta ayudantía se trabajó con sequelize y se comenzó con la creación de modelos para la Entrega 2 del pryecto. A continuación se dejará un resumen bastante explicativo de lo realizado en la ayudantía.

## Links Utilizados :link:
- [Presentación utilizada](https://docs.google.com/presentation/d/1YASHHK5-Z6rOq2jS1NLFzEi10hHLFzqi7RYljiBFs3Q/edit#slide=id.g1375db6076c_1_3)
- [Documentación Sequelize](https://sequelize.org/docs/v6/)

# Ejercicio realizado en la ayudantía :nerd_face:

Antes de comenzar les recomendamos clonar el repositorio que se creo para la ayudantía con nombre proyecto_base en el siguiente [link](https://github.com/IIC2513-2022-2/proyecto_base).

Una vez clonado este repositorio recuerden siempre hacer un `yarn install` o `npm install` para instalar las dependencias del proyecto.

Con las dependencias ya listas podemos comenzar a trabajar en el proyecto, primero inicializando sequelize con el comando:

```bash
yarn sequelize init
```
Cuando corran esto, algunas carpetas y archivos les quedarán ordenados de la siguiente forma:

<pre>
+-- config
| +-- config.js
+-- migrations
+-- models
| +-- index.js
+-- seeders
+-- src
</pre>

El archivo `config.js` les debe quedar de la siguiente forma (como se vió en las [cápsulas](https://github.com/IIC2513-2022-2/project/tree/main/cápsulas)):

```js
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_development`,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_production`,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};
```

---

Con toda la configuración anterior lista podemos comenzar a trabajar con nuestros modelos, migraciones, etc.

Primero se corre el comando para crear la base de datos utilizando nuestro ORM Sequelize.

```bash
yarn sequelize db:create
```

Esta línea de código lo que hará es crear nuestra base de datos, sin embargo se encontrará vacía, por lo que debemos crear las tablas que necesitamos para nuestra aplicación.

Para eso lo primero que debemos hacer es detenernos a pensar cual es la estructura de nuestra base de datos, en este caso corresponderá a la implementación de los usuarios y las partidas.

## Usuarios

Para los usuarios, necesitamos saber cuales son los atributos que tendrá nuestra relación, pensémoslo como que nuestra relación(la tabla en la base de datos) sequelize lo tomará como una clase y que cada columna de nuestra base de datos corresponderá a un atributo de clase.

Teniendo esta consideración clara, procedemos a detectar cuales son los atributos que tendrán nuestros usuarios:
- id: Corresponde al identificador único de nuestro usuario en la base de datos, sin embargo sequelize lo crea por defecto.
- Nombre: Corresponde al nombre del usuario, es un string.
- username: Corresponde al nombre de usuario que tendrá en la aplicación, es un string.
- password: Corresponde a la contraseña del usuario, es un string.
- email: Corresponde al correo electrónico del usuario, es un string.

Una vez que tenemos los atributos, podemos hacer uso de sequelize-cli para que sequelize cree este modelo por nosotros. Esto lo hacemos corriendo la siguiente línea de código:

```bash
yarn sequelize-cli model:generate --name User --attributes name:string,username:string,password:string,email:string
```

Recomendamos que los modelos tengan el nombre en inglés, para que sequilize no tenga problemas al trabajar, sobre todo cuando se trabaja en plural.

Esto lo que hará es crear un archivo en la carpeta models, el cual tendrá la estructura de la clase que representa a la tabla de usuarios en nuestra base de datos. Además, creará un archivo en la carpeta migraciones, que permitirá crear la tabla en la base de datos.

Como pueden ver en el archivo de migraciones, se creó una función up, la cual es la que se encarga de crear la tabla en la base de datos, y una función down, la cual es la que se encarga de eliminar la tabla en la base de datos.

Y como se ve en la carpeta models, se creó un archivo que contiene la clase User, la cual es la que representa a la tabla de usuarios en nuestra base de datos con todos los atributos que definimos y algunos adicionales.

## Partida

Ahora haremos lo mismo que hicimos para crear al usuario, sin embargo esta vez para la partida.

Identificamos los atributos que tendrá nuestra partida:
- id: Corresponde al identificador único de la partida en la base de datos, sin embargo sequelize lo crea por defecto.
- turno: Corresponde al turno actual de la partida, es un número entero.

Una vez que tenemos los atributos, podemos hacer uso de sequelize-cli para que sequelize cree este modelo por nosotros. Esto lo hacemos corriendo la siguiente línea de código:

```bash
yarn sequelize-cli model:generate --name Match --attributes turno:integer
```

----

## Comandos útiles postgres

Antes de correr las migraciones podemos abrir otra terminal y ver que efectivamente antes de hacer la migración no se crean las tablas dentro de la base de datos. Si quieren revisarlo deben hacer lo siguiente:

```bash
psql postgres
```

Esto lo que hará es abrir la consola de postgresql, y luego debemos ingresar la siguiente línea de código:

```bash
\l
```

Lo que nos permitirá ver las bases de datos que tenemos en postgresql, y como pueden ver, tenemos creada la de este proyecto.
Ahora debemos ingresar a la base de datos que creamos para este proyecto, para eso ingresamos la siguiente línea de código:

```bash
\c <nombre de la base de datos>
```
Y para poder ver las relaciones que tiene usamos la siguiente línea de código:

```bash
\dt
```
Y verán que no hay nada, si repiten este proceso luego de correr las migraciones, verán que se crearon las tablas.

---

Ahora que tenemos nuestros modelos creados, es necesario correr las migraciones para que se creen las tablas en la base de datos.

```bash
yarn sequelize db:migrate
```

# Algo nos faltó hacer para que funcione :worried:

Ya con los modelos creados nos damos cuenta que nos faltó definir la relación entre los usuarios y las partidas. Por lo que tenemos que definir en primer lugar que relación existe entre los usuarios y las partidas, y luego agregar esa relación a nuestros modelos.

## Relación entre usuarios y partidas

En este caso diremos que nuestros usuarios podrían tener más de una partida, y que las partidas deben tener dos usuarios, por lo que la relación será de muchos a muchos.

Es importante notar que esta relación no está diciendo que los usuarios podrían estár jugando en más de una partida a la vez, sino que podrían tener más de una partida en su historial.

Para poder tener mayor claridad de esto, es que se podría crear un atributo que indique si la partida está activa o no, y así poder saber si el usuario está jugando o no. Todas estas consideraciones las dejamos a su criterio, y ustedes en sus proyectos deben ir tomando las decisiones adecuadas para el modelamiento adecuado de su juego o cadena de suministro.

## Agregando la relación a nuestros modelos

Ahora que tenemos definida la relación entre los usuarios y las partidas, debemos agregarla a nuestros modelos.

Como ya corrimos nuestras migraciones, las cuales corresponde al código que nos permitirá crear las tablas en la base de datos y mantener un control en los cambios que vamos haciendo. Estos archivos de migraciones nos permiten definir de que forma vamos a transferir los cambios que hicimos en nuestro modelo hacia la base de datos.

Es importante que tengan claro que, una vez realizada una migración relacionada a un modelo, si necesitan hacer modificaciones sobre ese modelo será necesario crear una nueva migración utilizando el comando de sequelize-cli que se muestra a continuación:

```bash
yarn sequelize-cli migration:generate --name add-match-status
```

Y luego de crear la migración, debemos agregar el código que nos permitirá agregar la relación a la tabla de partidas. Es importante notar que la migración solo se encargará de modificar la base de datos, y no así el código que está en el modelo, por lo que eso lo deberemos hacer a mano.

Primero modificaremos la migración con todo lo que agregaremos. En este caso, agregaremos un atributo que nos permitirá saber si la partida está activa o no.

```js
'use strict';

const user = require("../models/user");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Matches', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'finished'
    });
  }
};
```

Y luego de esto, debemos modificar el modelo de partidas para que tenga el atributo que agregamos.

Este cambio es en `match.js`:

```js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Match.init({
    turno: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};
```

Con esto listo podemos correr la migración y el atributo habría sido agregado tanto en la base de datos como en nuestro modelo.

Finalmente, debemos hacer la relación que existe entre los usuarios y las partidas. Como es mucho es a muchos, podemos hacer una asociación normal o una más avanzada que se especifica en la [documentación](https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/) de sequelize. Pueden usar la que prefieran en sus proyectos mientras estén bien hechas.

Para hacer esta asociación necesitaremos una tabla intermedia, por lo que crearemos un modelo para hacer esto. Para esto, debemos correr el siguiente comando:

```bash
yarn sequelize-cli model:generate --name UserMatch --attributes userId:integer, matchId:integer
```

Con el modelo creado corremos las migraciones y luego procedemos a agregar las asociaciones en los modelos respectivos de la siguiente forma.

En `user.js`:

```js
// Esto debe ser definido en la función
// static associate(models)
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Match, {
        through: 'UserMatch',
        foreignKey: 'userId'
      });
      }
    }
  }
  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
```

Y lo mismo en `match.js`:

```js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: 'UserMatch',
        foreignKey: 'matchId'
      });
      }
    }
  }
  User.init({
    turno: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};
```

