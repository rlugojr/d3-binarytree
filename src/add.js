var maxDepth = 64;

export default function(point) {
  if (isNaN(x = point[0]) || isNaN(y = point[1])) return; // ignore invalid points

  var point0,
      node = this._root,
      parent0,
      parent,
      depth = 0,
      x,
      y,
      xm,
      ym,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      right,
      bottom,
      i,
      i0;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) {
    this._root = new Leaf(point);
    this._x0 = this._x1 = x;
    this._y0 = this._y1 = y;
    return;
  }

  // If the new point is outside the existing bounds of the tree…
  if (x0 > x || x >= x1 || y0 > y || y >= y1) {

    // If the tree only contains coincident points so far…
    // If the points have the same x-coordinate but different y,
    // the bounds are squarified, so this tests exact coincidence!
    if (x0 === x1) {

      // If the root point is coincident with the new point, just add it.
      if (x === x0 && y === y0) return append(this._root, point);

      // Otherwise expand the tree to cover the first non-coincident point.
      xm = Math.max(Math.abs(x0 - x), Math.abs(y0 - y));
      if (right = x > x0) this._x1 = x0 + xm; else this._x0 = x1 - xm;
      if (bottom = y > y0) this._y1 = y0 + xm; else this._y0 = y1 - xm;
      this._root = new Array(4);
      this._root[i = bottom << 1 | right] = new Leaf(point);
      this._root[3 - i] = node;
      return;
    }

    // Otherwise, double the size of the root until the new point fits.
    xm = x1 - x0;
    switch (i = (y < (y0 + y1) / 2) << 1 | (x < (x0 + x1) / 2)) {
      case 0: do parent = new Array(4), parent[i] = node, node = parent, x1 = x0 + (xm *= 2), y1 = y0 + xm; while (x >= x1 || y >= y1); break;
      case 1: do parent = new Array(4), parent[i] = node, node = parent, x0 = x1 - (xm *= 2), y1 = y0 + xm; while (x0 > x || y >= y1); break;
      case 2: do parent = new Array(4), parent[i] = node, node = parent, x1 = x0 + (xm *= 2), y0 = y1 - xm; while (x >= x1 || y0 > y); break;
      case 3: do parent = new Array(4), parent[i] = node, node = parent, x0 = x1 - (xm *= 2), y0 = y1 - xm; while (x0 > x || y0 > y); break;
    }

    node[3 - i] = new Leaf(point);
    this._root = node;
    this._x0 = x0, this._x1 = x1;
    this._y0 = y0, this._y1 = y1;
    return;
  }

  // Find the appropriate leaf node for the new point.
  do {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    parent0 = parent, parent = node, node = node[i0 = i, i = bottom << 1 | right], ++depth;
  } while (node);

  // If the new point is in an empty node, just add it.
  if (!(point0 = parent.point)) return void (parent[i] = new Leaf(point));

  // If the new point is exactly coincident with the specified point, add it.
  if (x === point0[0] && y === point0[1]) return append(parent, point);

  // Otherwise, split the leaf node until the old and new point are separated.
  parent = parent0[i0] = new Array(4);
  while (i === (i0 = (point0[1] >= ym) << 1 | (point0[0] >= xm))) {
    if (++depth > maxDepth) return void (point.next = point0, parent[i] = new Leaf(point));
    parent = parent[i] = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    i = bottom << 1 | right;
  }

  parent[i0] = new Leaf(point0);
  parent[i] = new Leaf(point);
}

function Leaf(point) {
  this.point = point;
}

function append(leaf, point) {
  point.next = leaf.point;
  leaf.point = point;
}
