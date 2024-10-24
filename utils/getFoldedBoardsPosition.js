function getFoldedBoardsPosition(boards, axis) {
  boards.forEach((board) => {
    board.forEach((point) => {
      point[0] -= axis[0][0];
      point[1] -= axis[0][1];
      point[2] -= axis[0][2];
    });
  });

  const rotateAxis = [
    axis[1][0] - axis[0][0],
    axis[1][1] - axis[0][1],
    axis[1][2] - axis[0][2],
  ];

  // rotateAxisを標準化
  const norm = Math.sqrt(
    rotateAxis[0] ** 2 + rotateAxis[1] ** 2 + rotateAxis[2] ** 2
  );
  rotateAxis[0] /= norm;
  rotateAxis[1] /= norm;
  rotateAxis[2] /= norm;

  const foldedBoards = boards.map((board) => {
    return board.map((point) => {
      return round2Vector(rotateAroundAxis(point, rotateAxis, Math.PI));
    });
  });

  // z座標に+0.01を加える
  foldedBoards.forEach((board) => {
    board.forEach((point) => {
      point[2] += 0.01;
    });
  });

  // 並行移動を戻す
  foldedBoards.forEach((board) => {
    board.forEach((point) => {
      point[0] += axis[0][0];
      point[1] += axis[0][1];
      point[2] += axis[0][2];
    });
  });

  return foldedBoards;
}

// ロドリゲスの回転公式
function rotateAroundAxis(point, axis, angle) {
  const [x, y, z] = point;
  const [u, v, w] = axis;

  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);

  return [
    u * (u * x + v * y + w * z) * (1 - cosA) +
      x * cosA +
      (-w * y + v * z) * sinA,
    v * (u * x + v * y + w * z) * (1 - cosA) +
      y * cosA +
      (w * x - u * z) * sinA,
    w * (u * x + v * y + w * z) * (1 - cosA) +
      z * cosA +
      (-v * x + u * y) * sinA,
  ];
}
// 少数点第1位まで表示
function round2Vector(v) {
  return v.map((n) => Math.round(n * 100) / 100);
}

const board = [
  [36, 36, 0.01],
  [21.09, 0, 0.01],
  [36, 0, 0.01],
];

const axis = [
  [36, 36, 0.01],
  [21.09, 0, 0.01],
];

// console.log(getFoldedBoardsPosition([board], axis));

export default getFoldedBoardsPosition;
