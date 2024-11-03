import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';


const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState([]);

  useEffect(() => {
    loadSavedCandidates();
  }, []);

  const loadSavedCandidates = () => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') ?? '[]');
    setSavedCandidates(saved);
  };

  const rejectCandidate = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, i) => i !== index);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };


  return (
    <div>
      <header>
        <h1>Potential Candidates</h1>
      </header>
      {savedCandidates.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate: Candidate, index) => (
              <tr key={index}>
                <td>
                  <img src={candidate.avatar_url} alt={candidate.login} />
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.company}</td>
                <td>{candidate.bio}</td>
                <td>
                  <button className='minus' onClick={() => rejectCandidate(index)}>-</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='noneSelected'>No candidates have been accepted</p>
      )}
    </div>
  );
};

export default SavedCandidates;