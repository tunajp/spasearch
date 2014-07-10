:server side build
node node_modules\traceur\traceur --out tmp\app.compiled.js src\app.js
type node_modules\traceur\bin\traceur.js tmp\app.compiled.js > bin\application.js
:client side build
