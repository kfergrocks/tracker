import { useState, useEffect } from 'react';
import { getLogs } from '../utils/API';
import { Link } from 'react-router-dom';
import AuthUtil from '../utils/auth';
import { format } from 'date-fns';

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [name] = useState(AuthUtil.getUserData('fName'));

  useEffect(() => {
    const getPageInfo = async () => {
      try {
        const logResp = await getLogs();
        const logData = await logResp.json();
        setLogs(logData);
      } catch (err) {
        console.log(err);
      }
    };
    getPageInfo();
  }, []);

  return (
    <div className="row mx-1 mt-2">
      <div className="col-2"></div>
      <div className="col-8 mt-3">
        <h3>Welcome {name}</h3>

        {logs.length > 0 ? (
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col" className="table-dark">
                  Date
                </th>
                <th scope="col" className="table-dark">
                  Symptom Count
                </th>
                <th scope="col" className="table-dark">
                  Trigger Count
                </th>
                <th scope="col" className="table-dark" colSpan="3">
                  Exercise Count
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                return (
                  <tr key={`log-${log.id}`}>
                    <td>{format(new Date(log.date), 'MMMM dd, Y')}</td>
                    <td>{log.symptomCount}</td>
                    <td>{log.tiggerCount}</td>
                    <td>{log.exerciseCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-secondary mt-5" role="alert">
            <h3>You do not currently have any log entries.</h3>
          </div>
        )}
        <Link to="/addLog" className="btn bg-success-subtle float-end mt-5">
          Add Log Entry
        </Link>
      </div>
      <div className="col-2"></div>
    </div>
  );
}
