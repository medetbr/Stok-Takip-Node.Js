import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchGetAccountList } from "../../Api/account";
import {
  fetchStockList,
  fetchUpdateStock,
  fetchAddStock,
} from "../../Api/stock";
import { supplierGetListAction } from "../../redux/actions/supplier";

function StockModal() {
  const [stocks, setStocks] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [productCurrentPrice, setProductCurrentPrice] = useState("");
  const [changeStockInfo, setChangeStockInfo] = useState([]);
  const [stockType, setStockType] = useState(0);
  const [account_id, set_account_id] = useState(null);
  const [supplier_id, set_supplier_id] = useState(null);
  const [buy, setBuy] = useState("");
  const [sell, setSell] = useState("");
  const [amount, setAmount] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { suppliers } = useSelector((state) => state.suppliers);
  useEffect(() => {
    (async () => {
      dispatch(supplierGetListAction(null,"all",""))
      const res = await fetchStockList(location.state);
      setStocks(res);
      setProductCurrentPrice(res[0].product_id.sell);
    })();
    (async () => {
      const { value } = await fetchGetAccountList(null, "all", "");
      setAccounts(value);
    })();
  }, [setStocks, changeStockInfo]);

  const stockChangeHandle = async (e, id) => {
    e.preventDefault();
    const res = await fetchUpdateStock(id, changeStockInfo);
    setChangeStockInfo(res);
  };
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
  const addStockHandler = async (e) => {
    e.preventDefault();
    let outSell;
    if(stockType == "1"){
      setSell("")
      set_account_id(null)
    };
    if (stockType == "2") {
      setBuy("");
      set_supplier_id(null)
      sell ? (outSell = sell) : (outSell = productCurrentPrice);
    }
    await fetchAddStock({
      product_id: stocks[0].product_id._id,
      type: stockType,
      buy,
      sell: outSell,
      account_id:stockType=="1"?null:account_id,
      supplier_id:stockType=="2"?null:supplier_id,
      amount,
    });
    setBuy(null);
    setStockType(1);
    setSell(null);
    setAmount(null);
    set_supplier_id(null)
    set_account_id(null)
    setChangeStockInfo([]);
  };
  console.log(stocks);
  return (
    <>
      <div
        className="modal fade"
        id="addStockModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Stok Ekle
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => setSell(productCurrentPrice)}
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInpu4"
                    className="form-label"
                  >
                    Türü
                  </label>
                  <select
                    onChange={(e) => setStockType(e.target.selectedIndex)}
                    className="form-control"
                    id="exampleFormControlInput4"
                  >
                    <option>Stok türünü seçin</option>
                    <option>Giriş</option>
                    <option>Çıkış</option>
                  </select>
                </div>
                {stockType == 1 && (
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Alış Fiyatı
                    </label>
                    <input
                      onChange={(e) => setBuy(e.target.value)}
                      type="text"
                      value={buy ? buy : ""}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Alış Fiyatı"
                    />
                  </div>
                )}
                {stockType == 2 && (
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput2"
                      className="form-label"
                    >
                      Satış Fiyatı
                    </label>
                    <input
                      onChange={(e) => setSell(e.target.value)}
                      value={productCurrentPrice}
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput2"
                      placeholder="Satış Fiyatı"
                    />
                  </div>
                )}
                {stockType == 2 && (
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput3"
                      className="form-label"
                    >
                      Hesap Seç
                    </label>
                    <select className="form-control"
                    onChange={(e) => set_account_id(e.target.value)}
                    >
                      <option>Hesap Seç</option>
                      {accounts.map((account) => (
                        <option value={account._id} >{account.name}</option>
                      ))}
                    </select>                   
                  </div>
                )}
                 {stockType == 1 && (
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput3"
                      className="form-label"
                    >
                      Tedarikçi Seç
                    </label>
                    <select className="form-control"
                    onChange={(e) => set_supplier_id(e.target.value)}                    
                    >
                      <option>Tedarikçi Seç</option>
                      {suppliers?.value.map((supplier) => (
                        <option value={supplier._id}>{supplier.name}</option>
                      ))}
                    </select>                   
                  </div>
                )}
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Miktarı
                  </label>
                  <input
                    type="text"
                    value={amount ? amount : ""}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-control"
                    id="exampleFormControlInput3"
                    placeholder="Miktar"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                type="reset"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={(e) => {
                    setSell(productCurrentPrice)
                    setStockType(0)
                  }}
                >
                  İptal
                </button>
                <button
                  id="addStockBtn"
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                  onClick={addStockHandler}
                >
                  Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="changeStockModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="changeStockModalLable"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="changeStockModalLable">
                Stok Güncelle
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Türü
                  </label>
                  <select
                    disabled={changeStockInfo.type == "0"}
                    onChange={(e) =>
                      setChangeStockInfo({
                        ...changeStockInfo,
                        type: e.target.selectedIndex + 1,
                      })
                    }
                    className="form-control"
                    id="exampleFormControlInput1"
                  >
                    {changeStockInfo.type == "0" && <option>Başlangıç</option>}
                    <option selected={changeStockInfo.type == "1"}>
                      Giriş
                    </option>
                    <option selected={changeStockInfo.type == "2"}>
                      çıkış
                    </option>
                  </select>
                </div>
                {changeStockInfo.type != "2" && (
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput2"
                      className="form-label"
                    >
                      Alış Fiyatı
                    </label>
                    <input
                      onChange={(e) =>
                        setChangeStockInfo({
                          ...changeStockInfo,
                          buy: e.target.value,
                        })
                      }
                      value={changeStockInfo.buy}
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput2"
                    />
                  </div>
                )}
                {changeStockInfo.type == "2" && (
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput2"
                      className="form-label"
                    >
                      Satış Fiyatı
                    </label>
                    <input
                      onChange={(e) =>
                        setChangeStockInfo({
                          ...changeStockInfo,
                          sell: e.target.value,
                        })
                      }
                      value={changeStockInfo.sell}
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput2"
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Miktarı
                  </label>
                  <input
                    onChange={(e) =>
                      setChangeStockInfo({
                        ...changeStockInfo,
                        amount: e.target.value,
                      })
                    }
                    value={changeStockInfo.amount}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput3"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="reset"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  İptal
                </button>
                <button
                  id="updateSupplierBtn"
                  className="btn btn-primary"
                  onClick={(e) => stockChangeHandle(e, changeStockInfo._id)}
                  data-bs-dismiss="modal"
                >
                  Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="strpied-tabled-with-hover card">
            <div className="card-header" style={{ backgroundColor: "#fff" }}>
              <i
                onClick={(e) => navigate(-1)}
                className="fa-solid fa-arrow-left"
              ></i>
              <h4 style={{ display: "inline-block" }} className="card-title">
                Ürün Stok Hareket Tablosu
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
                      <th className="border-0">Türü</th>
                      <th className="border-0">Alış Fiyatı</th>
                      <th className="border-0">Satış Fiyatı</th>
                      <th className="border-0">Tedarikçi</th>
                      <th className="border-0">Hesap</th>
                      <th className="border-0">Miktarı</th>
                      <th className="border-0">Tarih</th>
                      <th className="border-0"></th>
                      {/* <th className="border-0">Stok</th> */}
                      {/* <th className="border-0">Sil</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {stocks?.map((stock, id) => (
                      <tr key={id + 1}>
                        <td>{id + 1}</td>
                        <td>
                          {stock.type === "0"
                            ? "başlangıç"
                            : stock.type === "1"
                            ? "giriş"
                            : stock.type === "2" && "çıkış"}
                        </td>
                        <td>{stock?.buy ? stock.buy : " ---"}</td>
                        <td>{stock?.sell ? stock.sell : " ---"}</td>
                        <td>{stock?.supplier_id ? stock.supplier_id.name : " ---"}</td>
                        <td style={{display:"flex",alignItems:"center", position:"relative"}} >{stock?.account_id ? stock.account_id.name  : " ---"}
                        {stock?.account_id&&<Link className="account_detail_search_icon" state={stock?.account_id._id} to={"/accounts/detail"}><i class="fa-solid fa-magnifying-glass-plus"></i></Link> }
                        </td>
                        <td>{stock.amount}</td>
                        <td>{calculateDate(stock.createdAt)}</td>
                        <td className="table-update-td">
                          <i
                            onClick={() => setChangeStockInfo(stock)}
                            data-bs-toggle="modal"
                            data-bs-target="#changeStockModal"
                            className="fa-solid fa-pen-to-square"
                          ></i>
                        </td>
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

export default StockModal;
