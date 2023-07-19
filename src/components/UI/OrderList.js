import { Timestamp } from 'firebase/firestore';
import React from 'react'
import { Link } from 'react-router-dom';

const OrderList = ({item}) => {

    const { firstName, date, from, to, orderAt, email,id } = item;

  return (
    <Link to={`/orders/${id}`}>
    <div className="bg-white px-4 md:px-10 mb-6 border">
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <tbody>
            <tr className="text-sm leading-none text-gray-600 h-16">
              <td className="w-1/2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-700 rounded-sm flex items-center justify-center">
                    <p className="text-xs font-bold leading-3 text-white">
                      FIG
                    </p>
                  </div>
                  <div className="pl-2">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {firstName}
                    </p>
                    <p className="text-xs leading-3 text-gray-600 mt-2">
                      Order At{" "}
                      <p>{new Date(orderAt.seconds * 1000 + orderAt.nanoseconds / 1000000).toLocaleDateString()}</p>
                    </p>
                  </div>
                </div>
              </td>
              <td className="pl-16">
                <p>{email}</p>
              </td>
              <td>
                <p className="pl-16">{from}</p>
              </td>
              <td>
                <p className="pl-16">{to}</p>
              </td>
              <td>
                <p className="pl-16">Started on {date}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Link>
  )
}

export default OrderList