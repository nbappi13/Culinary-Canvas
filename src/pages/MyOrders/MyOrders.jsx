import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { useMyOrders, useDeleteOrder } from '../../services/foodService';
import moment from 'moment';
import '../../styles/MyOrders.css';

const MyOrders = () => {
  const { currentUser } = useAuth();
  const { data: orders, refetch } = useMyOrders(currentUser.email);
  const deleteOrderMutation = useDeleteOrder();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (orderId) => {
    setIsDeleting(true);
    try {
      await deleteOrderMutation.mutateAsync({ id: orderId, email: currentUser.email });
      refetch();
    } catch (error) {
      console.error('Error deleting order:', error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="my-orders-page">
      <h1>My Orders</h1>
      <table className="my-orders-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Buyer Name</th>
            <th>Buying Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.length === 0 ? (
            <tr>
              <td colSpan="6">No orders found.</td>
            </tr>
          ) : (
            orders?.map((order) => (
              <tr key={order._id}>
                <td>
                  <img src={order.foodDetails.image} alt={order.foodDetails.name} />
                </td>
                <td>{order.foodDetails.name}</td>
                <td>${order.price.toFixed(2)}</td>
                <td>{order.buyerName}</td>
                <td>{moment(order.buyingDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td>
                  <button onClick={() => handleDelete(order._id)} disabled={isDeleting}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;