import ThHeader from './core/ThHeader.jsx'
import TdFirstCell from './core/TdFirstCell.jsx'
import TdAlignRight from './core/TdAlignRight.jsx'
import { getYear } from "../../js/utilsPob.js"
import { getRowClassByTypeOfWork } from "../../js/utilsEmp.js"

const TableBalancePagos = ({ dataEmpPubPriv, dataBalanceDesempleo, dataBalancePensiones, dataBalanceIMV }) => {
    

    return (
        <div className="table table-separator">
            <div>
                <table className="table-spacing-bottom">
                    <thead>
                        <tr className="table-header table-header-empleo">
                       
                       
                        </tr>
                    </thead>
                    <tbody>
                       
                       
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default TableBalancePagos