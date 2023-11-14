import React from 'react'

const Preview = ({jsonData}) => {

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString()
  const formattedTime = currentDate.toLocaleTimeString()
  console.log(jsonData.Items)
  return (
    
    <div className='h-fit w-full max-w-md py-10 font-sans bg-yellow-100'>
                <h1 className='font-bold text-xl text-center'>Chandru's Cafe</h1>
            <p className="text-center">No 7 First Cross Road,</p>
            <p className="text-center pb-8">Coimbatore 641041.</p>
          <hr className="border-black border-dashed my-1"/>
                <p className="w-1/2 pl-3 inline-block">{formattedDate}</p>
                <p className="w-1/2 text-right pr-3 inline-block">{formattedTime}</p>
          <hr className="border-black border-dashed my-1"/>
          <div className="px-3 py-1">
            <p className=""><span className="font-semibold mr-2">Name : &nbsp;  </span>{jsonData.Customer.Name}</p>
            <p className=""><span className="font-semibold mr-2">Mobile : </span>{jsonData.Customer.Mobile}</p>
          </div>
          <hr className="border-black border-dashed my-1"/>
          <table className="table-fixed w-full font-mono ">
            <thead>
              <tr className='border-b border-dashed border-gray-800'>
                <th className="w-1/12">QTY</th>
                <th className="w-1/3 text-left pl-3">DESCRIPTION</th>
                <th className="w-1/5 text-right pr-3">PRICE</th>
                <th className="w-1/5 text-right pr-3">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
            {jsonData.Items
              .map(
                (item, index) => <tr key={index}>
                <td className="text-center py-1">{item.Count}</td>
                <td className="pl-3 py-1">{item.Item}</td>
                <td className="text-right pr-3 py-1">{item.Price}</td>
                <td className="text-right pr-3 py-1">{item.Amount}</td>
                </tr>
              )
              }
            </tbody>
          </table>
          <hr className="border-black border-dashed"/>
                <div className="text-right text-md font-semibold p-2 pt-3 pb-10">TOTAL PRICE:
                <span className="text-right text-md tracking-wide pl-3 ">Rs. {jsonData.Total.Total}</span></div>
          <hr className="border-gray-700 w-full border-double"/>
          <p className="py-2 text-center">Thank you! Visit Again!!</p>
          <hr className="border-gray-700 w-full border-double"/>
              
          </div>
  )
}

export default Preview