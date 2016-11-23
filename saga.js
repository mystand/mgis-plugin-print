import { takeEvery } from 'redux-saga'
import { select } from 'redux-saga/effects'
import R from 'ramda'

import { getMap } from 'core/frontend/plugin/api'
import * as MapHelper from 'core/frontend/helpers/map-helper'

import { MAP_PRINT } from './actions'

function* mapPrint(action) {
  const map = getMap()
  const center = map.getCenter()
  const canvas = map.getCanvas()
  const { zoom, ratio } = action
  const zoomScale = 2 ** (zoom - map.getZoom())
  const config = (yield select(state => state.pluginConfigs.print))
  fetch(config.url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      style: MapHelper.getStyle(map),
      center: [center.lng, center.lat],
      zoom,
      width: canvas.width * zoomScale,
      height: canvas.height * zoomScale,
      ratio
    })
  }).then(response => response.arrayBuffer())
    .then((arrayBuffer) => {
      const binary = R.arrayBufferToBinaryString(arrayBuffer)
      window.open(`data:image/png;base64,${btoa(binary)}`, '_blank')
    })
}

export default function* saga() {
  yield [
    takeEvery(MAP_PRINT, mapPrint)
  ]
}
