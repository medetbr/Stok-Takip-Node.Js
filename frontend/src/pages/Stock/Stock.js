import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
   fetchStockList,
} from "../../Api/stock";

function Stock() {
  // const [name, setName] = useState(null);
  // const [surname, setSurname] = useState(null);
  // const [email, setEmail] = useState(null);
  // const [address, setAddress] = useState(null);
  // const [phoneNumber, setPhoneNumber] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState(null);
  const [changeStockInfo, setChangeStockInfo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetchStockList(
        currentPage,
        limit,
        search?.length > 0 ? search : ""
      );
      setStocks(res);
    })();
  }, [limit, search, currentPage, setCurrentPage, loading]);
  const formik = useFormik({
    initialValues: {
      name: "",
      buy: "",
      sell: "",
      description: "",
      stock: "",
    },
    onSubmit: async (values, bag) => {
      // let element = document.getElementById("addSupplierBtn")
      // element.setAttribute("data-bs-dismiss","modal")
      setLoading(true);
      try {
        // await fetchCreateProduct(values);
        // setCurrentPage(1)
        formik.resetForm({});
      } catch (error) {
        bag.setErrors({ general: "Hata" });
      }
      setLoading(false);
    },
  });
  const deleteSupplierHandler = async (id) => {
    if (window.confirm("Silme işlemini onaylıyor musunuz.")) {
      setLoading(true);
      // await fetchDeleteProduct(id);
      setLoading(false);
    }
  };
  const supplierChangeHandle = async (id) => {
    // const res = await fetchUpdateProduct(id, changeStockInfo);
    // setChangeStockInfo(res);
  };
  return (
    <>
      <div
        className="modal fade"
        id="changeSupplierModal"
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
                Tedarikçi Güncelle
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
                    Ad
                  </label>
                  <input
                    onChange={(e) =>
                      setChangeStockInfo({
                        ...changeStockInfo,
                        name: e.target.value,
                      })
                    }
                    value={changeStockInfo.name}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Ad"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    Soyad
                  </label>
                  <input
                    onChange={(e) =>
                      setChangeStockInfo({
                        ...changeStockInfo,
                        surname: e.target.value,
                      })
                    }
                    value={changeStockInfo.surname}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput2"
                    placeholder="Soyad"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    onChange={(e) =>
                      setChangeStockInfo({
                        ...changeStockInfo,
                        email: e.target.value,
                      })
                    }
                    value={changeStockInfo.email}
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput3"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInpu4"
                    className="form-label"
                  >
                    Telefon
                  </label>
                  <input
                    onChange={(e) =>
                      setChangeStockInfo({
                        ...changeStockInfo,
                        phoneNumber: e.target.value,
                      })
                    }
                    value={changeStockInfo.phoneNumber}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput4"
                    placeholder="0555 555 55 55"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Adres
                  </label>
                  <textarea
                    onChange={(e) =>
                      setChangeStockInfo({
                        ...changeStockInfo,
                        address: e.target.value,
                      })
                    }
                    value={changeStockInfo.address}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
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
                  onClick={() => supplierChangeHandle(changeStockInfo._id)}
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
              <h4 className="card-title">Ürünler Tablosu</h4>
              <div className="form-outline ">
                <input
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={(e) => setCurrentPage(1)}
                  placeholder="Aramak istediğinizi bir kaç kelime ile yazınız..."
                  className="form-control"
                />               
              </div>

              <div className="limit-buttons">
                {[...Array(4)].map((x, i) => (
                  <button
                    key={i}
                    className={limit === (i + 1) * 5 ? "current-page" : ""}
                    disabled={limit === (i + 1) * 5}
                    onClick={() => {
                      setLimit((i + 1) * 5);
                      setCurrentPage(1);
                    }}
                    type="button"
                  >
                    {(i + 1) * 5}
                  </button>
                ))}
                <button
                  style={{ width: "50px" }}
                  className={limit === "all" ? "current-page" : ""}
                  disabled={limit === "all"}
                  onClick={() => {
                    setLimit("all");
                    setCurrentPage(1);
                  }}
                  type="button"
                >
                  Tümü
                </button>
              </div>
            </div>
            <div className="table-full-width table-responsive px-0 card-body">
              <table className="table-hover table-striped table">
                <thead>
                  <tr>
                    <th className="border-0">#</th>
                    <th className="border-0">Ürün ID</th>
                    <th className="border-0">Tür</th>
                    <th className="border-0">Miktar</th>
                    <th className="border-0">Alış</th>
                    <th className="border-0">Satış</th>
                    {/* <th className="border-0">Stok</th> */}
                    {/* <th className="border-0">Sil</th> */}
                  </tr>
                </thead>
                <tbody>
                  {stocks?.value?.reverse().map((stock,id) => (
                    <tr key={id+1}>
                      <td>
                        {limit === "all"
                          ? id + 1
                          : id + 1 + (currentPage - 1) * limit}
                      </td>                      
                      <td>{stock.product_id}</td>
                      <td>{
                      stock.type==="0"?"başlangıç":
                      stock.type==="1"?"giriş":
                      stock.type==="2"&&"çıkış"
                      }</td>
                      <td>{stock.amount}</td>
                      <td>{stock.buy}</td>
                      <td>{stock.sell}</td>
                      <td className="table-update-td">
                        <i
                          // onClick={() => setChangeStockInfo(supplier)}
                          data-bs-toggle="modal"
                          data-bs-target="#changeSupplierModal"
                          className="fa-solid fa-pen-to-square"
                        ></i>
                      </td>
                      <td>
                        <i
                          // onClick={() => deleteSupplierHandler(supplier._id)}
                          className="fa-solid fa-trash-can"
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {stocks?.value?.length < 1 && (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "22px",
                    color: "#767676",
                  }}
                >
                  Tedarikçi Bulunamadı
                </div>
              )} 

              {(limit === "all"||stocks?.value?.length < 1) ? (
                ""
              ) : (
                
                <div className="page-buttons">
                  <span>
                    {limit === "all"
                      ? ""
                      : `${currentPage * limit + 1 - limit}-${
                          stocks?.page === currentPage
                            ? stocks?.total
                            : currentPage * limit
                        } of ${stocks?.total}`}
                  </span>
                  <button
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? "current-page" : ""}
                    onClick={() => setCurrentPage(1)}
                    type="button"
                  >
                    <i className="fa-solid fa-angles-left"></i>
                  </button>
                  <button
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? "current-page" : ""}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    type="button"
                  >
                    <i className="fa-solid fa-angle-left"></i>
                  </button>

                  <button
                    disabled={currentPage === stocks?.page}
                    className={
                      currentPage === stocks?.page ? "current-page" : ""
                    }
                    onClick={() => setCurrentPage(currentPage + 1)}
                    type="button"
                  >
                    <i className="fa-solid fa-angle-right"></i>
                  </button>
                  <button
                    disabled={currentPage === stocks?.page}
                    className={
                      currentPage === stocks?.page ? "current-page" : ""
                    }
                    onClick={() => setCurrentPage(stocks?.page)}
                    type="button"
                  >
                    <i className="fa-solid fa-angles-right"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stock;
