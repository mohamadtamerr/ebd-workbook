import { findAllOrders, findOrderById } from "./orders-db.js";

export async function loadOrders() {
  return await findAllOrders();
}

export function myOrders(orders) {
  return orders.filter(
    (order) =>
      order.city === "Alexandria" &&
      order.status === "cancelled"
  );
}

export function summarize(orders) {
  if (orders.length === 0) {
    return 0;
  }

  return Math.max(...orders.map((order) => order.price));
}

export async function describeOrder(id) {
  try {
    const order = await findOrderById(id);
    return `${order.student} ordered ${order.quantity} x ${order.item}`;
  } catch {
    return `Missing order: ${id}`;
  }
}

export function toJsonLines(orders) {
  const simplifiedOrders = orders.map((order) => ({
    item: order.item,
    price: order.price,
  }));

  return JSON.stringify(simplifiedOrders);
}