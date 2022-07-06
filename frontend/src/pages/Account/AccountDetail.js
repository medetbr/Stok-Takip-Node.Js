import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAccountDetail,  } from "../../Api/account";

function AccountDetail() {
  const [accountDetail, setAccountDetail] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await fetchAccountDetail(location.state);
      setAccountDetail(res);
    })();
   
  }, [setAccountDetail ]);

  const calculateDate = (date) => {
    let dt = new Date(date);
    return (
      dt.getDate() +
      "-" +
      parseInt(dt.getMonth() + 1) +
      "-" +
      dt.getFullYear() +
      " " +
      dt.getHours() +
      ":" +
      dt.getMinutes()
    );
  };
 
  return (
    <>
      <div className="row">
         <div className="col-md-12">
           <div className="strpied-tabled-with-hover card">
             <div className="card-header" style={{ backgroundColor: "#fff" }}>
               <i
                 onClick={(e) => navigate(-1)}
                 className="fa-solid fa-arrow-left"
               ></i>
               <h4 style={{ display: "inline-block" }} className="card-title">
                 Hesap Detay Tablosu
               </h4>
               <div className="table-full-width table-responsive px-0 card-body">
                 <button
                   className="btn-updated"
                   data-bs-toggle="modal"
                   data-bs-target="#addStockModal"
                 >
                   Ekle
                 </button>
                 <table className="table-hover table-striped table">
                   <thead>
                     <tr>
                       <th className="border-0">#</th>
                       <th className="border-0">Ürün Adı</th>
                       <th className="border-0">Ürün No</th>
                       <th className="border-0">Satış Fiyatı</th>
                       <th className="border-0">Miktarı</th>
                       <th className="border-0">Toplam Tutar</th>
                       <th className="border-0">Tarih</th>
                     </tr>
                   </thead>
                   <tbody>
                     {accountDetail?.map((account_detail, id) => (
                       <tr key={id + 1}>
                        <td>{id + 1}</td>
                         <td>
                           {account_detail.product_id.name}
                         </td>
                         <td>
                           {account_detail.product_id.stock_no}
                         </td>
                         <td>{account_detail?.sell ? account_detail.sell : " ---"}</td>
                         <td>{account_detail.amount}</td>
                         <td>{account_detail.amount*account_detail.sell
                          }</td>
                         <td>{calculateDate(account_detail.createdAt)}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
           </div>
         </div>
       </div>
    </>
  );
}

export default AccountDetail;
