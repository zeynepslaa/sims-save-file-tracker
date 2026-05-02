/** Simple unique IDs without relying on crypto (works everywhere). */
let n = 0
export function createId(prefix = 'id') {
  n += 1
  return `${prefix}_${Date.now().toString(36)}_${n}`
}
