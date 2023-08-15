const pageSize = 20;

exports.paging = (pageNumb, data) => {
  const begin = (pageNumb - 1) * pageSize;
  const end = begin + pageSize > data.length ? data.length : begin + pageSize;
  const dataPage = data.slice(begin, end);
  const totalPage = Math.ceil(data.length / pageSize);
  return { dataPage: dataPage, totalPage: totalPage };
};
