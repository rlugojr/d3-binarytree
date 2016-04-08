import Quad from "./quad";

export default function(callback) {
  var quads = [], next = [], q;
  if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
    if (node[0]) quads.push(new Quad(node[0], x0, y0, xm, ym));
    if (node[1]) quads.push(new Quad(node[1], xm, y0, x1, ym));
    if (node[2]) quads.push(new Quad(node[2], x0, ym, xm, y1));
    if (node[3]) quads.push(new Quad(node[3], xm, ym, x1, y1));
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
}