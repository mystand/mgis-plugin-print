export const MAP_PRINT = 'MAP_PRINT'

export const printMap = (zoom, ratio) => ({
  type: MAP_PRINT,
  zoom,
  ratio
})
