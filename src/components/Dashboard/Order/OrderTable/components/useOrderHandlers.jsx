// hooks/useOrderHandlers.js
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchViewStatus, finishOrder } from '@/redux/orderStatus/orderStatusSlice.js';
import { fetchOrder, setOrderStatus } from '@/redux/order/orderSlice.js';
import toast from 'react-hot-toast';

export const useOrderHandlers = () => {
  const dispatch = useDispatch();
  const [isFetchingOrder, setIsFetchingOrder] = React.useState(false)
  const [finishingOrderId, setFinishingOrderId] = React.useState(null)
  const [expandedRows, setExpandedRows] = React.useState('')

  //Смена статуса заказа
  const handleRowClick = useCallback((id, advert) => {
    setExpandedRows((prev) => (prev === id ? null : id));
    if (advert.status === 'sent') {
      dispatch(fetchViewStatus(id)).then((result) => {
        if (result.type === fetchViewStatus.fulfilled.toString()) {
          dispatch(setOrderStatus({ orderId: id, status: 'accepted' }));
        }
      });
    }
  }, [dispatch]);
  //Смена статуса заказа

  //Завершение заказа
  const handleFinishOrder = useCallback((id) => {
    setFinishingOrderId(id);
    setIsFetchingOrder(true);
    dispatch(finishOrder({ id }))
      .unwrap()
      .then(() => {
        toast.success('Заказ успешно завершен');
        dispatch(fetchOrder());
      })
      .catch((error) => {
        toast.error(`Ошибка завершения заказа: ${error.data.error.detail}`);
      })
      .finally(() => {
        setIsFetchingOrder(false);
        setFinishingOrderId(null);
      });
  }, [dispatch]);
  //Завершение заказа

  //Редирект на новую страницу
  const redirectToTariffDetails = useCallback((advert) => {
    const url = `/chart-order-table/${advert.id}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);
  //Редирект на новую страницу

  return { handleRowClick, handleFinishOrder, redirectToTariffDetails, isFetchingOrder, finishingOrderId, expandedRows };
};
