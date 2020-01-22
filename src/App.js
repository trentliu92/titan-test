import React, { useState, useEffect } from 'react';

// api
import { PeopleApi } from './services/PeopleApi.js';

// style
// import styled from 'styled-components';
import './App.css';

function App() {
  const [ people, setPeople ] = useState(null);

  // fetches data on component mount
  useEffect(() => {
    async function fetchPeople() {
      try {
        const res = await PeopleApi.getPeople();
        setPeople(res);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPeople();
  }, []);

  const renderPeople = () => {
    if(people) {
      return people.map((person) => {
        const name = `${person.name.first} ${person.name.last}`

        return (
          <div key={person.login.uuid}>
            <div style={{ width: '100px' }}>
              <img style={{ width: '100%' }} src={person.picture.medium} alt="" />
            </div>

            <div>
              { name }
            </div>
          </div>
        );
      });
    }

    return null;
  }

  return (
    <div>
      { renderPeople() }
    </div>
  );
}

export default App;