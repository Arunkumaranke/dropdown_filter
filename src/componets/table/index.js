import React, { useEffect } from 'react'
import './style.css';


function Table() {

    const [data, setData] = React.useState([])
    const [fiterdata, setFilterdata] = React.useState([])
    

    // Get the API
    useEffect(() => {
        fetch('http://timeapi.kaaylabs.com/api/v1/project_view/')
            .then((resp) => resp.json())
            .then(function (datas) {
                setData(datas.data)
                setFilterdata(datas.data)
            })
            .catch(function () {
                console.log("error")
            });

    }, []);

     // Fiter the Status
    const filter = (event) => {
       if(event.target.value ===""){
        setFilterdata(data)
       }
       else{
        setFilterdata(data.filter( (output) => {
            return output.status === event.target.value

        }))
       }
        
    }

    return (
        <div>
             {/* Dropdown */}
            <div>
                <form className="dropdown">
                    <select className="dropdown_select" onClick={(e) => filter(e)} >
                        <option value="">Status</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                    </select>
                </form>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">End date</th>
                        <th scope="col">Start date</th>
                        <th scope="col">Project code</th>
                        <th scope="col">Project Id</th>
                        <th scope="col">Status</th>

                    </tr>
                </thead>
                <tbody>
        
                    {fiterdata.map((data, key) =>
                        <tr key={key}>
                            <th scope="row">{key + 1}</th>
                            <td>{data.company_name}</td>
                            <td>{data.description}</td>
                            <td>{data.end_date}</td>
                            <td>{data.start_date}</td>
                            <td>{data.project_code}</td>
                            <td>{data.project_id}</td>
                            <td>{data.status}</td>
                        </tr>
                    )}

                </tbody>
            </table>

        </div>
    )
}

export default Table
