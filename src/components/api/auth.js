import req from "./api";

const header = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const Login = (credentials) => {
  return req("post", "/api/token/", credentials);
};

export const Signup = (credentials) => {
  return req("post", "/api/account/register/", credentials);
};

export const Productlist = () => {
  return req("get", "/api/products/");
};

export const Orderlist = (token) => {
  return req("get", "/api/orders/", "", header(token));
};

export const Orderdetail = (query, token) => {
  return req("get", `/orderdetail/?${query}`, "", header(token));
};

export const Cancelorder = (order, token) => {
  return req("post", "/api/deleteorder/", { order: order }, header(token));
};

export const Searchproduct = (query) => {
  return req("get", `/api/products/?${query}`);
};

export const Placeorder = (items, token) => {
  return req("post", "/api/placeorder/", items, header(token));
};

export const Managestatus = (order, status, token) => {
  return req(
    "post",
    "/api/managestatus/",
    { order: order, status: status },
    header(token)
  );
};

export const Manageorder = (token) => {
  return req("get", "/api/manageorder/", "", header(token));
};

export const Autologin = (refresh) => {
  return req("post", "/api/token/refresh/", { refresh: refresh });
};
