function separateBoard(board, rotateAxis) {
  const leftBoard = [];
  const rightBoard = [];

  // boardの各辺とrotateAxisの交点を求める
  function getAllIntersections() {
    const intersections = [];
    for (let i = 0; i < board.length; i++) {
      const p1 = board[i];
      const p2 = board[(i + 1) % board.length];
      const intersection = getIntersection(
        p1,
        p2,
        rotateAxis[0],
        rotateAxis[1]
      );
      if (intersection) {
        // 重複を避けるため、すでに求めた交点と同じ座標の場合は追加しない
        const isDuplicated = intersections.some(
          (p) =>
            p[0] === intersection[0] &&
            p[1] === intersection[1] &&
            p[2] === intersection[2]
        );
        if (!isDuplicated) {
          intersections.push(intersection);
        }
      }
    }

    return intersections;
  }

  const allIntersections = getAllIntersections();

  if (allIntersections.length !== 2) return; // 板と軸が交差していない

  // 板を左右(leftBoard, rightBoard)に分ける
  for (let i = 0; i < board.length; i++) {
    const p = board[i];
    const isLeft = isOnLeftSide(p, allIntersections[0], allIntersections[1]);
    isLeft ? leftBoard.push(p) : rightBoard.push(p);
  }

  // leftBoardとrightBoardにintersectionを重複を避けて追加
  allIntersections.forEach((p) => {
    const isDuplicated = leftBoard.some(
      (f) => f[0] === p[0] && f[1] === p[1] && f[2] === p[2]
    );
    if (!isDuplicated) leftBoard.push(p);

    const isDuplicated2 = rightBoard.some(
      (m) => m[0] === p[0] && m[1] === p[1] && m[2] === p[2]
    );
    if (!isDuplicated2) rightBoard.push(p);
  });

  return {
    leftBoard: leftBoard,
    rightBoard: rightBoard,
  };
}

function isOnLeftSide(point, axis1, axis2) {
  // 2つのベクトルの外積が正ならば左側にある
  // TODO: 真横の場合はどうするか
  const v1 = [axis2[0] - axis1[0], axis2[1] - axis1[1]];
  const v2 = [point[0] - axis1[0], point[1] - axis1[1]];
  return v1[0] * v2[1] - v1[1] * v2[0] > 0;
}

function getIntersection(p1, p2, axis1, axis2) {
  // 媒介変数t, uを用いたベクトル方程式による交点の算出
  // p1 + t(p2 - p1) = axis1 + u(axis2 - axis1)
  // これを整理して
  // t = ((axis1[1] - p1[1])(p2[0] - p1[0]) - (axis1[0] - p1[0])(p2[1] - p1[1])) / ((axis2[1] - axis1[1])(p2[0] - p1[0]) - (axis2[0] - axis1[0])(p2[1] - p1[1]))
  // u = ((axis1[1] - p1[1])(axis2[0] - axis1[0]) - (axis1[0] - p1[0])(axis2[1] - axis1[1])) / ((axis2[1] - axis1[1])(p2[0] - p1[0]) - (axis2[0] - axis1[0])(p2[1] - p1[1]))

  const denominator =
    (axis2[0] - axis1[0]) * (p2[1] - p1[1]) -
    (axis2[1] - axis1[1]) * (p2[0] - p1[0]);

  if (denominator === 0) return null; // 平行で交わらない

  const t =
    ((axis1[1] - p1[1]) * (axis2[0] - axis1[0]) -
      (axis1[0] - p1[0]) * (axis2[1] - axis1[1])) /
    denominator;
  const u =
    ((axis1[1] - p1[1]) * (p2[0] - p1[0]) -
      (axis1[0] - p1[0]) * (p2[1] - p1[1])) /
    denominator;

  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    // 交点が見つかった場合の座標
    const x = p1[0] + t * (p2[0] - p1[0]);
    const y = p1[1] + t * (p2[1] - p1[1]);
    const z = p1[2] + t * (p2[2] - p1[2]); // board は z=0 なので z=0 のまま

    return [x, y, z];
  }

  return null; // 交点がない
}

const board = [
  [0, 0, 0],
  [0, 36, 0],
  [18, 36, 0],
  [36, 18, 0],
  [36, 0, 0],
];
const rotateAxis = [
  [0, 18, 0],
  [18, 36, 0],
];

// console.log(separateBoard(board, rotateAxis));

export default separateBoard;
