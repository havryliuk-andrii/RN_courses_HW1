export const paddingStyle = (top, right, bot, left) => ({
  paddingTop: top,
  paddingRight: right || right === 0 ? right : top,
  paddingBottom: bot || bot === 0 ? bot : top,
  paddingLeft: left || left === 0 ? left : right || right === 0 ? right : top,
});

export const marginStyle = (top, right, bot, left) => ({
  marginTop: top,
  marginRight: right || right === 0 ? right : top,
  marginBottom: bot || bot === 0 ? bot : top,
  marginLeft: left || left === 0 ? left : right || right === 0 ? right : top,
});
