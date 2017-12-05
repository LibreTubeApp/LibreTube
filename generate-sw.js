const fs = require('fs');
const path = require('path');
const globby = require('globby');
const loadJsonFile = require('load-json-file');
const workbox = require('workbox-build');

const dotNext = path.resolve(__dirname, './.next')
const target = path.resolve(__dirname, './.next/sw.js')

async function buildWorker() {
  let app = {
    buildId: fs.readFileSync(`${dotNext}/BUILD_ID`, 'utf8'),
    precaches: []
  }

  const stats = await loadJsonFile(`${dotNext}/build-stats.json`);
  Object.keys(stats).map(src => {
    // /_next/9265fa769281943ee96625770433e573/app.js
    app.precaches.push(`/_next/${stats[src].hash}/${src}`)
  })

  app = await addChunks(app);
  app = await addBundles(app);

  const workboxSrc = await workbox.copyWorkboxLibraries(dotNext);

  fs.writeFileSync(
    target,
    swSnippet(
      JSON.stringify(app.precaches, null, 2),
      workboxSrc,
    ),
    'utf8'
  );
}

function addBundles(app) {
  return new Promise((resolve, reject) => {
    fs.readdir(`${dotNext}/bundles/pages`, (err, files) => {
      if (err) {
        resolve(app)
      }

      if (files) {
        const root = `/_next/${app.buildId}/page`
        app.precaches = app.precaches.concat(files
          .filter(file => file !== 'index.js')
          .map(file => {
            // req /_next/22321e97-8895-48db-b915-82e255f3faa8/new
            return path.join(root, file.replace(/.js$/, ''))
          })
        )
      }

      resolve(app)
    })
  })
}

function addChunks(app) {
  return new Promise((resolve, reject) => {
    fs.readdir(`${dotNext}/chunks`, (err, files) => {
      if (err) {
        resolve(app)
      }

      if (files) {
        const root = `/_next/webpack/chunks`
        app.precaches = app.precaches.concat(files
          .filter(file => /\.js$/.test(file))
          .map(file => {
            // req /_next/webpack/chunks/22321e97-8895-48db-b915-82e255f3faa8.js
            return path.join(root, file)
          })
        )
      }

      resolve(app)
    })
  })
}

const swSnippet = (precache, workboxSrc) =>
`importScripts('/.next/${workboxSrc}')

const workboxSW = new WorkboxSW({ clientsClaim: true });

// set precahe listed item
workboxSW.precaching.precache(${precache});

// cache very first page by sw
workboxSW.router.registerRoute(
  '/',
  workboxSW.strategies.staleWhileRevalidate()
);
`;

buildWorker();
