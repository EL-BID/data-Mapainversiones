# Ojosanciones.sociedad.info
ojosanciones-web-front es el front-end del proyecto Ojo a las sanciones, hecho en NodeJS.

# Requerimientos
- Base de datos elastic con datos generados por ojosanciones-transformer
- NodeJS 18+

# Instalación
```
git pull https://github.com/Abrimos-info/ojosanciones-web-front
cd ojosanciones-web-front
npm install 
```

# Desarrollo
``` 
node ojosanciones-web-front.js -e https://user@pass:elastic:9200
firefox http://localhost:8009/
```



# Deploy a producción
Se utiliza pm2
