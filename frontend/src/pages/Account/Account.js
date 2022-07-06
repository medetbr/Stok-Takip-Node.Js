import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  fetchUpdateAccount,
  fetchCreateAccount,
  fetchGetAccountList,
  fetchDeleteAccount,
} from "../../Api/account";
import { Link } from "react-router-dom";

function Account() {
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState(null);
  const [changeAccountInfo, setChangeAccountInfo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const accounts = await fetchGetAccountList(
        currentPage,
        limit,
        search?.length > 0 ? search : ""
      );
      setAccounts(accounts);
   
    })();
  }, [limit, search, currentPage, setCurrentPage, loading]);
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      iban_number: "",
      phone_number: "",
      tc_number: "",
    },
    onSubmit: async (values, bag) => {
      // let element = document.getElementById("addSupplierBtn")
      // element.setAttribute("data-bs-dismiss","modal")
      setLoading(true);
      try {
        await fetchCreateAccount(values);
        setCurrentPage(1)
        formik.resetForm({});
      } catch (error) {
        bag.setErrors({ general: "Hata" });
      }
      setLoading(false);
    },
  });
  const deleteAccountHandler = async (id) => {
    if (window.confirm("Silme işlemini onaylıyor musunuz.")) {
      setLoading(true);
      await fetchDeleteAccount(id);
      setLoading(false);
    }
  };
  const accountChangeHandle = async (id) => {
    const res = await fetchUpdateAccount(id, changeAccountInfo);
    setChangeAccountInfo(res);
  };
  
  return (
    <>
    
      <div
        className="modal fade"
        id="changeAccountModal"
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
                Hesap Güncelle
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
                    Adı
                  </label>
                  <input
                    onChange={(e) =>
                      setChangeAccountInfo({
                        ...changeAccountInfo,
                        name: e.target.value,
                      })
                    }
                    value={changeAccountInfo.name}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    Soyadı
                  </label>
                  <input
                    onChange={(e) =>
                      setChangeAccountInfo({
                        ...changeAccountInfo,
                        surname: e.target.value,
                      })
                    }
                    value={changeAccountInfo.surname}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput2"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    TC No
                  </label>
                  <input
                    onChange={(e) =>
                      setChangeAccountInfo({
                        ...changeAccountInfo,
                        tc_number: e.target.value,
                      })
                    }
                    value={changeAccountInfo.tc_number}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput2"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    IBAN
                  </label>
                  <input
                    onChange={(e) =>
                      setChangeAccountInfo({
                        ...changeAccountInfo,
                        iban_number: e.target.value,
                      })
                    }
                    value={changeAccountInfo.iban_number}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput2"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    Telefon
                  </label>
                  <input
                    onChange={(e) =>
                      setChangeAccountInfo({
                        ...changeAccountInfo,
                        phone_number: e.target.value,
                      })
                    }
                    value={changeAccountInfo.phone_number}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput2"
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
                  onClick={() => accountChangeHandle(changeAccountInfo._id)}
                  data-bs-dismiss="modal"
                >
                  Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="addAccountModal"
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
                Hesap Ekle
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Adı
                  </label>
                  <input
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Ad"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Soyadı
                  </label>
                  <input
                    name="surname"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput3"
                    placeholder="Soyadı"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInpu4"
                    className="form-label"
                  >
                    TC No
                  </label>
                  <input
                    name="tc_number"
                    max={11}
                    value={formik.values.tc_number}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput4"
                    placeholder="TC No"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    IBAN
                  </label>
                  <input
                    name="iban_number"
                    value={formik.values.iban_number}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput2"
                    placeholder="IBAN"
                  />
                </div> 
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    Telefon
                  </label>
                  <input
                    name="phone_number"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput2"
                    placeholder="Telefon"
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
                  id="addProductBtn"
                  type="submit"
                  className="btn btn-primary"
                  aria-label="Close"
                  data-bs-dismiss="modal"
                >
                  Ekle
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
              <h4 className="card-title">Hesaplar Tablosu</h4>
              <div className="form-outline ">
                <input
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={(e) => setCurrentPage(1)}
                  placeholder="Aramak istediğinizi bir kaç kelime ile yazınız..."
                  className="form-control"
                />
                <button
                  className="btn-updated "
                  data-bs-toggle="modal"
                  data-bs-target="#addAccountModal"
                >
                  Ekle
                </button>
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
                    <th className="border-0">Adı</th>
                    <th className="border-0">Soyadı</th>
                    <th className="border-0">TC No</th>
                    <th className="border-0">IBAN</th>
                    <th className="border-0">Telefon</th>
                    {/* <th className="border-0">Sil</th> */}
                  </tr>
                </thead>
                <tbody>
                  {accounts?.value?.map((account,id) => (                    
                    <tr key={id+1}>
                      <td>
                        {limit === "all"
                          ? id + 1
                          : id + 1 + (currentPage - 1) * limit}
                      </td>                      
                      <td>{account.name}</td>
                      <td>{account.surname}</td>
                      <td>{account.tc_number}</td>
                      <td>{account.iban_number}</td>
                      <td>{account.phone_number}</td>
                      <td className="table-icon-td">
                        <div>
                          <Link state={account._id} to={"/accounts/detail"}>
                          <i className="fa-solid fa-circle-info"                           
                          ></i>
                          </Link>                                            
                         <i
                           onClick={() => setChangeAccountInfo(account)}
                          data-bs-toggle="modal"
                          data-bs-target="#changeAccountModal"
                          className="fa-solid fa-pen-to-square"
                        ></i>  
                        <i
                          onClick={() => deleteAccountHandler(account._id)}
                          className="fa-solid fa-trash-can"
                        ></i>
                        </div>                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {accounts?.value?.length < 1 && (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "22px",
                    color: "#767676",
                  }}
                >
                  Kullanıcı Bulunamadı
                </div>
              )} 

              {(limit === "all"||accounts?.value?.length < 1) ? (
                ""
              ) : (
                
                <div className="page-buttons">
                  <span>
                    {limit === "all"
                      ? ""
                      : `${currentPage * limit + 1 - limit}-${
                          accounts?.page === currentPage
                            ? accounts?.total
                            : currentPage * limit
                        } of ${accounts?.total}`}
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
                    disabled={currentPage === accounts?.page}
                    className={
                      currentPage === accounts?.page ? "current-page" : ""
                    }
                    onClick={() => setCurrentPage(currentPage + 1)}
                    type="button"
                  >
                    <i className="fa-solid fa-angle-right"></i>
                  </button>
                  <button
                    disabled={currentPage === accounts?.page}
                    className={
                      currentPage === accounts?.page ? "current-page" : ""
                    }
                    onClick={() => setCurrentPage(accounts?.page)}
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

export default Account;
