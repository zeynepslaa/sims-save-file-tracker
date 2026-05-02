#!/usr/bin/env node
/**
 * Local “game bridge” for Sims Save File Tracker.
 *
 * The Sims 4 game cannot talk to a browser directly. A future .ts4script mod (or a test script)
 * can POST updates here; the React app polls GET /api/pull and merges them.
 *
 * Run: npm run bridge
 * Default: http://localhost:3847
 */

import http from 'http'

const PORT = Number(process.env.ZESIRA_BRIDGE_PORT || 3847)
/** @type {{ worldName: string, lotName: string, [k: string]: unknown }[]} */
let queue = []

function send(res, status, body, extra = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    ...extra,
  }
  res.writeHead(status, headers)
  res.end(typeof body === 'string' ? body : JSON.stringify(body))
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    send(res, 204, '')
    return
  }

  if (req.method === 'POST' && req.url.startsWith('/api/push')) {
    let buf = ''
    req.on('data', (c) => {
      buf += c
    })
    req.on('end', () => {
      try {
        const j = JSON.parse(buf || '{}')
        const updates = Array.isArray(j.updates) ? j.updates : Array.isArray(j) ? j : []
        for (const u of updates) {
          if (u?.worldName && u?.lotName) queue.push(u)
        }
        send(res, 200, { ok: true, queued: updates.length, queueSize: queue.length })
      } catch {
        send(res, 400, { ok: false, error: 'invalid_json' })
      }
    })
    return
  }

  if (req.method === 'GET' && req.url.startsWith('/api/pull')) {
    const out = [...queue]
    queue = []
    send(res, 200, { updates: out })
    return
  }

  if (req.method === 'GET' && req.url === '/') {
    send(res, 200, {
      service: 'zesira-game-bridge',
      post: 'POST /api/push  body: { "updates": [ { "worldName":"Willow Creek", "lotName":"My Lot", "status":"finished" } ] }',
      pull: 'GET /api/pull  returns { "updates": [...] } and clears queue',
    })
    return
  }

  send(res, 404, { error: 'not_found' })
})

server.listen(PORT, () => {
  console.log(`Zesira game bridge → http://localhost:${PORT}`)
  console.log(`Try: curl -X POST http://localhost:${PORT}/api/push -H "Content-Type: application/json" -d '{"updates":[{"worldName":"Willow Creek","lotName":"Test","status":"finished"}]}'`)
})
