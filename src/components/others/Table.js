import React, { useState, useEffect } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Axios from "axios";
import Pagination from "react-js-pagination";
import { Dropdown } from "react-bootstrap";
import authHeader from '../../services/auth-header.js';
import './Table.css';

function Table(props) {
    /* Varibale Declaration */
    const [userData, setUserData] = useState([]);
    const [copyUserData, setCopyUserData] = useState([]);
    const [sizePerPage, setSizePerPage] = useState(100);
    const [activePage, setActivePage] = useState(1);
    const [noOfData, setNoOfData] = useState(1000);
    const [noOfAPICall, setNoOfAPICall] = useState(0);

    const handlePageChange = e => {
        console.clear();
        setActivePage(e);
        const currentIndex = (e - 1) * sizePerPage;
        setUserData(
            copyUserData.slice(
                currentIndex,
                parseInt(currentIndex, 10) + parseInt(sizePerPage, 10)
            )
        );
    };

    const handlePaginationDropdown = e => {
        setSizePerPage(Number.parseInt(e.currentTarget.textContent));
        setUserData(copyUserData.slice(0, e.currentTarget.textContent));
    };

    /* Fetch User Data */
    const fetchUserData = async (start = 0, limit = 1000, type) => {
        if (type === "next") {
            setNoOfAPICall(noOfAPICall + 1);
        }
        if (type === "prev") {
            setNoOfAPICall(noOfAPICall - 1);
        }
        const config = {
            method: 'get',
            url: `http://localhost:8080/api/principle?_start=${start}&_limit=${limit}`,
            headers: authHeader()
        };
        if (props.cnae !== "") {
            config.url = config.url + '&cnae_principal=' + props.cnae;
            if (props.register !== "") {
                config.url = config.url + '&situacao_registro=' + props.register + '&situacao_anuidade=' + props.annuity;
            }
        }

        let res = await Axios(config);
        setUserData(res.data.slice(0, sizePerPage));
        setActivePage(1);
        setCopyUserData(res.data);
    };

    /* React Hooks */
    useEffect(() => {
        fetchUserData();
    }, [props]);


    const renderShowsTotal = (start, to, total) => {
        return (
            <p style={{ color: "blue" }}>
                From {start} to {to}, totals is {total}&nbsp;&nbsp;(its a customize
                text)
            </p>
        );
    };

    const options = {
        paginationSize: 1,
        sizePerPageList: [15, 10],
        sizePerPage: 15, // which size per page you want to locate as default
        prePage: "Prev", // Previous page button text
        nextPage: "Next", // Next page button text
        firstPage: "First", // First page button text
        lastPage: "Last", // Last page button text
        totalSize: 100,
        paginationShowsTotal: renderShowsTotal, // Accept bool or function
        paginationPosition: "top", // default is bottom, top and both is all available
        alwaysShowAllBtns: true, // Always show next and previous button
        withFirstAndLast: false, // Hide the going to First and Last page button
    };

    return (
        <div className="App table-responsive">
            <div className="react-bootstrap-table container p-0">
                <h5 className="mb-3">RESULTADO  DA BUSCA</h5>
                {userData.length > 0 ? (
                    <React.Fragment>
                        <BootstrapTable
                            dataSort={true}
                            hover
                            // remote={true}
                            fetchInfo={{ dataTotalSize: 1000 }}
                            data={userData}
                            // pagination
                            options={options}
                            autoCollapse={{ sort: true, filter: true }}
                        >
                            <TableHeaderColumn dataField="CNPJ" isKey={true}>
                                CNPJ
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="Razao_Social">
                                RAZÃO SOCIAL
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="Nome_Fantasia">
                                NOME SOCIAL
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="Endereco">
                                Endereço
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="Cidade">
                                CIDADE
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="UF">
                                UF
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="CNAE_principal">
                                CNAE Principal
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="CNAE_Secundário">
                                CNAE Secundário
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="Situacao_registro">
                                Situação Registro
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="Registro_regional">
                                Registro Regional
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="Situacao_anuidade">
                                Situação Anuidade
                            </TableHeaderColumn>
                        </BootstrapTable>
                        <div>
                            <Dropdown style={{ float: "left", paddingBottom: ".5rem" }}>
                                <Dropdown.Toggle
                                    variant="default"
                                    className="
              border mt-3"
                                    id="dropdown-basic"
                                    style={{ boxShadow: "none" }}
                                >
                                    {sizePerPage}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={e => handlePaginationDropdown(e)}>
                                        100
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={e => handlePaginationDropdown(e)}>
                                        50
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={e => handlePaginationDropdown(e)}>
                                        25
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                {noOfAPICall > 0 ? (
                                    <button
                                        className="external-pagination-btn pagination-btn-prev"
                                        onClick={e =>
                                            fetchUserData((noOfAPICall - 1) * noOfData, 1000, "prev")
                                        }
                                    >
                                        Prev
                                    </button>
                                ) : null}
                                <Pagination
                                    hideFirstLastPages
                                    pageRangeDisplayed={1}
                                    activePage={activePage}
                                    itemsCountPerPage={sizePerPage}
                                    totalItemsCount={copyUserData.length}
                                    onChange={handlePageChange}
                                    innerClass="mt-2 pagination"
                                />
                                {copyUserData.length / sizePerPage === activePage ? (
                                    <button
                                        className="external-pagination-btn pagination-btn-next"
                                        onClick={e =>
                                            fetchUserData((noOfAPICall + 1) * noOfData, 1000, "next")
                                        }
                                    >
                                        Next
                                    </button>
                                ) : null}
                            </div>

                        </div>
                    </React.Fragment>
                ) : (
                    <h6>Os resultados da pesquisa estavam vazios.</h6>
                )}
            </div>

        </div>
    );
}

export default Table;
