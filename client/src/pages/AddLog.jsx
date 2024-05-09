import { getLogKeys, addLogs } from '../utils/API';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RangeList from '../components/RangeList';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function AddLog() {
  const [logKeys, setLogKeys] = useState({
    triggers: [],
    symptoms: [],
    exercises: [],
  });
  const [symptoms, setSymptoms] = useState({});
  const [triggers, setTriggers] = useState({});
  const [exercises, setExercises] = useState({});
  const [activeButton, setActiveButton] = useState('Symptoms');
  const navigate = useNavigate();

  useEffect(() => {
    const getPageInfo = async () => {
      const logKeysResp = await getLogKeys();
      const logKeysValues = await logKeysResp.json();

      const symptoms = {};
      const triggers = {};
      const exercises = {};

      logKeysValues.symptoms.forEach((symptom) => {
        symptoms[symptom.id] = 0;
      });
      logKeysValues.triggers.forEach((trigger) => {
        triggers[trigger.id] = 0;
      });

      logKeysValues.exercises.forEach((exercise) => {
        exercises[exercise.id] = 0;
      });

      setSymptoms(symptoms);
      setTriggers(triggers);
      setExercises(exercises);

      setLogKeys(logKeysValues);
    };
    getPageInfo();
  }, []);

  function getCount(obj) {
    let count = 0;
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      if (obj[i] > 0) count++;
    }
    return count;
  }

  const handleSave = async () => {
    const saveObj = {
      date: format(new Date(), 'MM/dd/yyyy'),
      symptoms,
      triggers,
      exercises: exercises,
      symptomCount: getCount(symptoms),
      tiggerCount: getCount(triggers),
      exerciseCount: getCount(exercises),
    };
    const addResp = await addLogs(saveObj);
    if (addResp.status === 500) {
      const add = await addResp.json();
      if (add.errors) {
        console.log(add.errors);
      }
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="row mx-1">
      <div className="col-3"></div>
      <div className="col-6">
        <h3 className="my-5">Add Log Entry</h3>
        <div className="row">
          <div className="col-4 center-cell">
            <button
              type="button"
              onClick={() => {
                setActiveButton('Symptoms');
              }}
              className={`btn btn-secondary
                ${activeButton === 'Symptoms' ? 'active' : ''}`}
            >
              Symptoms
            </button>
          </div>
          <div className="col-4 center-cell">
            <button
              type="button"
              onClick={() => {
                setActiveButton('Triggers');
              }}
              className={`btn btn-secondary
                ${activeButton === 'Triggers' ? 'active' : ''}`}
            >
              Triggers
            </button>
          </div>
          <div className="col-4 center-cell">
            <button
              type="button"
              onClick={() => {
                setActiveButton('Exercises');
              }}
              className={`btn btn-secondary
                ${activeButton === 'Exercises' ? 'active' : ''}`}
            >
              Exercises
            </button>
          </div>
        </div>
        <div
          className={`row mt-5 
                ${activeButton === 'Symptoms' ? '' : 'hide'}`}
        >
          <div className="cold-12">
            <RangeList
              prefix="symptoms"
              rangeItems={logKeys.symptoms}
              rangeValues={symptoms}
              handleUpdate={setSymptoms}
            ></RangeList>
          </div>
        </div>
        <div
          className={`row mt-5 
                ${activeButton === 'Triggers' ? '' : 'hide'}`}
        >
          <div className="cold-12">
            <RangeList
              prefix="triggers"
              rangeItems={logKeys.triggers}
              rangeValues={triggers}
              handleUpdate={setTriggers}
            ></RangeList>
          </div>
        </div>
        <div
          className={`row mt-5 
                ${activeButton === 'Exercises' ? '' : 'hide'}`}
        >
          <div className="cold-12">
            <RangeList
              prefix="exercises"
              rangeItems={logKeys.exercises}
              rangeValues={exercises}
              handleUpdate={setExercises}
            ></RangeList>
          </div>
        </div>
        <div className="my-5 center-cell">
          <Link to="/home" className="btn bg-success-subtle mt-3 w-25 mx-2">
            Back
          </Link>

          <button
            className="btn bg-success-subtle mt-3 w-25 mx-2"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
      <div className="col-3"></div>
    </div>
  );
}
