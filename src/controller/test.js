const test = require("../../data/test");

module.exports = (req, res, next) => {
  const testData = test();
  testData.desc = "test";
  res.fail("请求失败", -1, testData);
};
