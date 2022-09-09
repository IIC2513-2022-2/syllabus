# Ayudantía 3

Esta ayudantía se hizo un repaso de Event Loop, Asincronía y conexión entre cliente y servidor. Además, 
se hizo una introducción a Koa.

### Links Utilizados

[Presentación Utilizada](https://docs.google.com/presentation/d/1lMuMWlwCeDbtsuPbcLbWe9CP6UPogpASf2zhZAkxofo/edit?usp=sharing)

#### Fe de Erratas:
En la ayudantía se dijo que el primer parámetro del siguiente endpoint correspondía a la ruta.

```
router.get('movies.show', '/', async (ctx) => {
  ctx.body = movies;
})
```

Sin embargo, la ruta es la especificada en el archivo routes.js más "/" (segunda parámetro). Asignarle 'movies.show' es una forma de darle un nombre
al endpoint, para luego poder acceder a este desde otros lugares de la API. De esta forma, si se cambia la dirección (en vez de "/" sea "/display"), 
no se ve afectada la dependencia que puede tener con otros enpoints. 
