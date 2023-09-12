(async () => {
  await require('./plugins/system/core.plugins').setup()
  await require('./plugins/system/core.api').setup()
})()